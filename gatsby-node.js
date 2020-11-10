const path = require("path");
const linkSchema = require("./src/components/Link/schema");
const DocsPageTemplate = path.resolve("./src/templates/Docs/index.jsx");
const {
  trimMarkdownPath,
  splitPath,
  capitalize
} = require("./src/utility/path.js");
const _ = require("lodash");

// Whether or not to print verbose debug messages to stdout
const verbose = true;
const ifVerbose = func => (verbose ? func() : void 0);
const debug = (reporter, text, mode = "info") =>
  ifVerbose(() =>
    ({
      info: content => reporter.info(content),
      success: content => reporter.success(content)
    }[mode](text))
  );

// Define custom graphql schema to enforce rigid type structures
exports.sourceNodes = ({
  actions,
  reporter,
  getNodesByType,
  loadNodeContent,
  createNodeId,
  createContentDigest
}) => {
  activity = reporter.activityTimer("implementing custom graphql schema");
  activity.start();

  const { createTypes, createNode } = actions;
  const typeDefs = `
    type Frontmatter {
      title: String!
      shortTitle: String
      overrideBreadcrumb: String
      overrideNav: String
      noTOC: Boolean
      isRoot: Boolean
      noBreadcrumb: Boolean
      childrenOrder: [String]
    }
    type Mdx implements Node {
      frontmatter: Frontmatter!
    }
    type ApiRoute implements Node {
      link: String!
      index: Int!
      type: String!
    }
    type File implements Node {
      childMdx: Mdx
    }
    type DataYaml implements Node {
      links: [Link]
      rightLinks: [Link]
    }
  `;
  createTypes(linkSchema);
  createTypes(typeDefs);

  activity.end();
  activity = reporter.activityTimer(`parsing docs pages for API routes`);
  activity.start();

  const fileNodes = getNodesByType(`File`);
  const docNodes = fileNodes.filter(
    ({ sourceInstanceName, extension }) =>
      sourceInstanceName === "docs" && extension === "md"
  );
  return Promise.all(docNodes.map(node => loadNodeContent(node))).then(
    nodeContent => {
      function getTags(contents, tag, map) {
        const regex = `(?:<${tag}>[\\s\\S]*?<\\/${tag}>)|(?:<${tag}[\\s\\S]*?\\/>)`;
        const pattern = RegExp(regex, "g");
        return contents
          .map((content, i) => map(content.match(pattern), i))
          .reduce((accum, i) => [...accum, ...i], []);
      }

      const tagNodeMatch = (matches, i) =>
        matches == null
          ? []
          : matches.map((content, index) => ({
              source: docNodes[i],
              content,
              index
            }));
      const gatewayRoutes = getTags(nodeContent, "GatewayRoute", tagNodeMatch);
      const restRoutes = getTags(nodeContent, "Route", tagNodeMatch);

      function createRouteNodes(routes, type) {
        routes.forEach(({ source, content, index }) => {
          const { relativePath } = source;
          const link = addTrailingSlash(trimMarkdownPath(relativePath));
          const nodeMeta = {
            id: createNodeId(`api-route-${link}--${index}`),
            parent: null,
            children: [],
            internal: {
              type: `ApiRoute`,
              mediaType: `text/x-markdown`,
              content: content,
              contentDigest: createContentDigest(content)
            }
          };
          const nodeData = {
            link,
            index,
            type
          };
          const node = Object.assign({}, nodeMeta, nodeData);
          createNode(node);
        });
      }

      activity.end();
      activity = reporter.activityTimer(
        `creating API gateway route shadow mdx nodes`
      );
      activity.start();
      createRouteNodes(gatewayRoutes, "gateway");

      activity.end();
      activity = reporter.activityTimer(
        `creating API rest route shadow mdx nodes`
      );
      activity.start();
      createRouteNodes(restRoutes, "rest");

      activity.end();
    }
  );
};

// Dynamically create documentation pages
exports.createPages = ({ graphql, actions, reporter }) => {
  let activity = reporter.activityTimer(`loading docs pages via graphql`);
  activity.start();

  const { createPage } = actions;
  const frontmatterFragment = `
    title
    shortTitle
    overrideBreadcrumb
    overrideNav
    noBreadcrumb
    noTOC
    isRoot
    childrenOrder
  `;

  const fetchPages = graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allFile(
          limit: $limit
          filter: {
            sourceInstanceName: { eq: "docs" }
            extension: { regex: "/^(?:md)|(?:mdx)$/" }
          }
        ) {
          edges {
            node {
              relativePath
              childMdx {
                id
                frontmatter {
                  ${frontmatterFragment}
                }
              }
            }
          }
        }
        site {
          siteMetadata {
            github {
              owner
              name
              docsRoot
              branch
            }
          }
        }
      }
    `,
    { limit: 1000 }
  );

  const fetchGithubMetadata = fetchPages.then(result => {
    if (result.errors) {
      activity.end();
      throw result.errors;
    }

    activity.end();

    if (process.env.GITHUB_TOKEN == null) {
      reporter.warn(
        "Could not find Github token. Skipping author metadata sourcing."
      );
      reporter.warn(
        "To enable author metadata, set the GITHUB_TOKEN environment variable"
      );
      return {
        errors: "Auth not found"
      };
    }

    activity = reporter.activityTimer(`fetching github metadata`);
    activity.start();

    const { data } = result;
    const { owner, name, docsRoot } = data.site.siteMetadata.github;
    const paths = data.allFile.edges.map(({ node }) => node.relativePath);
    const query = `
      query githubMetadataQuery($owner: String!, $name: String!, $limit: Int!) {
        github {
          repository(owner: $owner, name: $name) {
            object(expression: "master") {
              ... on GitHub_Commit {
                ${paths.map(
                  (p, i) => `f${i.toString()}: history(
                  first: $limit,
                  path: "${docsRoot + p}"
                ) {
                  nodes {
                    committedDate
                    author {
                      user {
                        name
                        avatarUrl
                        login
                        url
                      }
                    }
                  }
                }`
                )}
              }
            }
          }
        }
      }
    `;
    return graphql(query, { owner, name, limit: 100 });
  });

  return Promise.all([fetchPages, fetchGithubMetadata]).then(
    ([pageResult, githubResult]) => {
      if (!githubResult.errors) activity.end();
      activity = reporter.activityTimer(`walking navigation tree`);
      activity.start();

      // Walk the navigation tree and add each docs page node
      const navTree = {
        children: [],
        // Default root node
        slug: "",
        title: "Documentation",
        isRoot: true,
        invisible: true
      };
      pageResult.data.allFile.edges.forEach(
        ({
          node: {
            relativePath,
            childMdx: { frontmatter, id }
          }
        }) =>
          walkTree(
            {
              relativePath,
              id,
              ...frontmatter
            },
            navTree
          )
      );

      activity.end();
      activity = reporter.activityTimer(`adding defaults to nav tree nodes`);
      activity.start();
      addDefaults(navTree);

      if (!githubResult.errors) {
        activity.end();
        activity = reporter.activityTimer(
          `attaching github metadata to doc pages`
        );
        activity.start();

        // GraphQL result object
        const nodes = githubResult.data.github.repository.object;

        // Map object to array with indices
        let array = new Array(pageResult.data.allFile.edges.length);
        const entries = Object.entries(nodes);
        for (const [key, node] of entries) {
          const decodedKey = parseInt(key.substring(1));
          array[decodedKey] = node.nodes;
        }

        // Assemble path -> metadata map
        const paths = pageResult.data.allFile.edges.map(
          ({ node }) => node.relativePath
        );
        let map = new Object();
        array.forEach((v, i) => {
          map[paths[i]] = v;
        });

        attachHistory(navTree, map);
      }

      activity.end();
      activity = reporter.activityTimer(`separating nav roots`);
      activity.start();
      const roots = collectRoots(navTree);

      activity.end();
      activity = reporter.activityTimer(`assembling breadcrumbs`);
      activity.start();
      roots.forEach(root => assembleBreadcrumbs(root, []));

      activity.end();
      activity = reporter.activityTimer(`ordering children`);
      activity.start();
      roots.forEach(root => orderChildren(root, 0));

      activity.end();
      activity = reporter.activityTimer(`dynamically generating docs pages`);
      activity.start();
      function createSubtreePages(subtree, root) {
        if (!subtree.invisible) {
          createPage({
            path: subtree.path,
            component: DocsPageTemplate,
            context: { ..._.omit(subtree, "path"), navRoot: root }
          });

          const debugMessage = `docs page @ '${subtree.path}' ${
            subtree.invisible
              ? ""
              : subtree.isOrphan
              ? "(orphan)"
              : `=> ${subtree.id}`
          }`;
          debug(reporter, debugMessage);
        }

        subtree.children.forEach(child => createSubtreePages(child, root));
      }
      roots.forEach(root => createSubtreePages(root, root));

      activity.end();
    }
  );
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    // Allow relative imports like "import Foo from 'components/Foo'"
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".js", ".jsx", ".json", ".mdx", ".md"]
    }
  });
};

// ? ==========================
// ? Navigation tree processing
// ? ==========================

function addTrailingSlash(path) {
  return path.charAt(path.length - 1) === "/" ? path : `${path}/`;
}

function walkTree(node, navTree) {
  const path = trimMarkdownPath(node.relativePath);

  // If root, replace default root node with this one
  if (path === "/") {
    Object.assign(navTree, node, {
      path: addTrailingSlash(path),
      isOrphan: false,
      invisible: false
    });
  } else {
    // Walk tree as normal
    const fragments = splitPath(path);
    let subtree = navTree;
    for (let i = 0; i < fragments.length; ++i) {
      const previousNode = subtree.children.find(
        child => child.slug === fragments[i]
      );

      // Node existed before
      if (typeof previousNode !== "undefined") {
        subtree = previousNode;
      } else {
        // Create new node here
        const newNode = {
          children: [],
          title: capitalize(fragments[i]),
          slug: fragments[i],
          path: addTrailingSlash(`/${fragments.slice(0, i + 1).join("/")}`),
          isOrphan: true,
          invisible: false
        };
        subtree.children.push(newNode);
        subtree = newNode;
      }

      // Current node: merge page into
      if (i === fragments.length - 1) {
        Object.assign(subtree, node, {
          path: addTrailingSlash(path),
          isOrphan: false
        });
      }
    }
  }
}

function addDefaults(subtree) {
  // shortTitle; fallback to title
  if (subtree.shortTitle == null) subtree.shortTitle = subtree.title;

  // breadcrumbTitle; fallback to shortTitle
  if (subtree.overrideBreadcrumb == null) {
    subtree.breadcrumbTitle = subtree.shortTitle;
  } else {
    subtree.breadcrumbTitle = subtree.overrideBreadcrumb;
  }

  // navTitle; fallback to title
  if (subtree.overrideNav == null) {
    subtree.navTitle = subtree.title;
  } else {
    subtree.navTitle = subtree.overrideNav;
  }

  // isRoot; fallback to false
  if (!subtree.isRoot) subtree.isRoot = false;

  // originalPath = relativePath
  if (subtree.relativePath != null) subtree.originalPath = subtree.relativePath;

  // history default
  subtree.history = null;

  delete subtree.overrideBreadcrumb;
  delete subtree.overrideNav;
  delete subtree.relativePath;

  subtree.children.forEach(addDefaults);
}

function attachHistory(subtree, metadataMap) {
  if (metadataMap.hasOwnProperty(subtree.originalPath)) {
    const metadata = metadataMap[subtree.originalPath];
    const lastModified =
      metadata.length >= 0 && metadata[0] != null
        ? new Date(metadata[0].committedDate)
        : new Date();

    // Build authors list
    let authors = [];
    let logins = new Set();
    metadata.forEach(({ author: { user } }) => {
      if (user != null) {
        if (!logins.has(user.login)) {
          logins.add(user.login);
          authors.push(user);
        }
      }
    });

    subtree.history = {
      lastModified: lastModified.toString(),
      authors
    };
  }

  subtree.children.forEach(s => attachHistory(s, metadataMap));
}

function collectRoots(navTree) {
  const roots = [navTree];
  function separateRootNodes(subtree) {
    for (let i = 0; i < subtree.children.length; ++i) {
      const child = subtree.children[i];
      if (child.isRoot) {
        roots.push(child);
        // Remove and rewind iteration
        subtree.children.splice(i, 1);
        --i;
      } else {
        separateRootNodes(child);
      }
    }
  }
  // Iteratively separate all root nodes
  for (let i = 0; i < roots.length; ++i) {
    separateRootNodes(roots[i]);
  }
  // Remove empty roots
  for (let i = 0; i < roots.length; ++i) {
    if (roots[i].children.length === 0) {
      // Remove and rewind iteration
      roots.splice(i, 1);
      --i;
    }
  }
  return roots;
}

function assembleBreadcrumbs(subtree, currentBreadcrumb) {
  currentBreadcrumb.push({
    text: subtree.breadcrumbTitle,
    path: subtree.path == null ? null : subtree.path
  });
  if (!subtree.invisible && !subtree.noBreadcrumb) {
    const length = currentBreadcrumb.length;
    subtree.breadcrumb = currentBreadcrumb.map(({ text, path }, i) =>
      i === length - 1 ? { text, path: null } : { text, path }
    );
  }
  subtree.children.forEach(child =>
    assembleBreadcrumbs(child, [...currentBreadcrumb])
  );
}

function compareNodes(a, b) {
  return a.navTitle
    .toLocaleLowerCase()
    .localeCompare(b.navTitle.toLocaleLowerCase());
}

function orderChildren(subtree, depth) {
  function defaultSort(nodes) {
    const childless = nodes.filter(node => node.children.length === 0);
    const parent = nodes.filter(node => node.children.length !== 0);
    childless.sort(compareNodes);
    parent.sort(compareNodes);
    return depth === 0 ? [...childless, ...parent] : [...parent, ...childless];
  }

  if (subtree.childrenOrder != null) {
    // Custom sort order
    let custom = [];
    subtree.childrenOrder.forEach(slug => {
      const node = subtree.children.find(node => node.slug === slug);
      if (node != null) custom.push(node);
    });
    const fallback = subtree.children.filter(
      node => !subtree.childrenOrder.includes(node.slug)
    );
    subtree.children = [...custom, ...fallback];
  } else {
    subtree.children = defaultSort(subtree.children);
  }
  subtree.children.forEach(node => orderChildren(node, depth + 1));
}
