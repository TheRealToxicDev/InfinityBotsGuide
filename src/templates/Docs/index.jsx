import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { graphql } from "gatsby";
import {
  isDefined,
  addMissingUnit,
  multiplyDimension,
  isEmptyOrNil,
  isIterable
} from "utility";
import moment from "moment";

import Mdx from "components/Mdx";
import Link from "components/Link";
import Icon from "components/Icon";
import Layout from "components/Layout";
import Tooltip from "components/Tooltip";
import Overview from "components/Overview";
import Breadcrumb from "components/Breadcrumb";
import TableOfContents from "components/TableOfContents";

import "./style.scss";

const LEAD_LENGTH = 200;

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      body
      tableOfContents(maxDepth: 4)
      excerpt(pruneLength: 250)
      mdxAST
    }
    site {
      siteMetadata {
        github {
          owner
          name
          branch
          docsRoot
        }
      }
    }
  }
`;

function DocsPageTemplate({
  data,
  pageContext: {
    breadcrumb,
    title,
    shortTitle,
    isOrphan,
    navRoot,
    noTOC,
    noBreadcrumb,
    originalPath,
    children,
    history
  }
}) {
  const { owner, name, branch, docsRoot } = data.site.siteMetadata.github;
  const githubRoot = `https://github.com/${owner}/${name}/blob/${branch}/${docsRoot}`;
  const showOverview = isOrphan && children.length > 0;
  const contentRoot = data.mdx;
  const hasContent = isDefined(contentRoot);
  const showTOC = !noTOC && !isOrphan && hasContent;
  const link = githubRoot + originalPath;

  // Find lead text
  const lead = useMemo(
    () => hasContent && trimLead(findLead(contentRoot.mdxAST), LEAD_LENGTH),
    [contentRoot.mdxAST]
  );

  return (
    <Layout
      title={shortTitle}
      navRoot={navRoot}
      description={isEmptyOrNil(lead) ? null : lead}
    >
      <article
        className={classNames("container docs-root--content", {
          "with-toc": showTOC
        })}
      >
        {!noBreadcrumb ? <Breadcrumb data={breadcrumb} /> : null}
        <h1>{title}</h1>
        <ContentWrapper
          noTOC={!showTOC}
          tableOfContents={showTOC ? contentRoot.tableOfContents : null}
        >
          <Overview.PageContext.Provider value={children}>
            {!isOrphan && isDefined(contentRoot) && (
              <Mdx content={contentRoot.body} />
            )}
            {showOverview && <Overview />}
            {!isOrphan && (
              <>
                <hr />
                <div className="metadata">
                  {isDefined(history) && <Authors authors={history.authors} />}
                  <span className="metadata--text">
                    {isDefined(history) && (
                      <span className="modified-time">
                        Last modified{" "}
                        {moment(new Date(history.lastModified)).fromNow()}
                      </span>
                    )}
                    <Link href={link} className="edit-link">
                      <Icon name="pencil-alt" className="mr-2" />
                      Edit this page on GitHub
                    </Link>
                  </span>
                </div>
              </>
            )}
          </Overview.PageContext.Provider>
        </ContentWrapper>
      </article>
    </Layout>
  );
}

export default DocsPageTemplate;

const authorsPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
).isRequired;
DocsPageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    isMdx: PropTypes.boolean,
    breadcrumb: PropTypes.arrayOf(
      PropTypes.shape({ text: PropTypes.string, path: PropTypes.string })
    ),
    title: PropTypes.string,
    shortTitle: PropTypes.string,
    isOrphan: PropTypes.bool,
    navRoot: PropTypes.object,
    noTOC: PropTypes.bool,
    noBreadcrumb: PropTypes.bool,
    children: PropTypes.array,
    originalPath: PropTypes.string,
    overview: PropTypes.bool,
    history: PropTypes.shape({
      lastModified: PropTypes.string.isRequired,
      authors: authorsPropTypes
    })
  }).isRequired
};

DocsPageTemplate.displayName = "DocsPageTemplate";

// ? ==============
// ? Sub-components
// ? ==============

function ContentWrapper({ noTOC, children, tableOfContents }) {
  return (
    <div
      className={classNames("docs-content--wrapper", {
        "with-toc": !noTOC
      })}
    >
      <div className="docs-content">{children}</div>
      {!noTOC && !!tableOfContents && (
        <div>
          <TableOfContents headers={tableOfContents} />
        </div>
      )}
    </div>
  );
}

ContentWrapper.propTypes = {
  noTOC: PropTypes.bool.isRequired,
  tableOfContents: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
};

function Authors({ authors }) {
  const first = authors.slice(0, Math.min(authors.length, 3));
  const hasMore = authors.length > 3;
  const additional = authors.length - 3;
  return (
    <div className="authors">
      {hasMore && (
        <div className="authors--more">
          <Tooltip text={`And ${additional} more`} bottom>
            <div>
              <More amount={additional} fontSize="1rem" />
            </div>
          </Tooltip>
        </div>
      )}
      {first.map(({ name, avatarUrl, login, url }) => (
        <Link className="authors--icon" href={url} key={login}>
          <Tooltip text={name || login} bottom>
            <div>
              <img src={avatarUrl}></img>
            </div>
          </Tooltip>
        </Link>
      ))}
    </div>
  );
}

Authors.propTypes = {
  authors: authorsPropTypes
};

function More({ amount, fontSize: baseFontSize }) {
  const text = `${amount}`;
  let fontSize = addMissingUnit(baseFontSize);
  if (text.length >= 3) fontSize = multiplyDimension(baseFontSize, 0.9);
  else if (text.length >= 4) style = multiplyDimension(baseFontSize, 0.75);
  return <span style={{ fontSize }}>{text}</span>;
}

More.propTypes = {
  amount: PropTypes.number,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

// ? =================
// ? Utility functions
// ? =================

function aggregateText(node) {
  function walkNode(node, accumulator) {
    if (node.type === "text") {
      accumulator.current += node.value;
    } else if (isDefined(node.children)) {
      node.children.forEach(n => walkNode(n, accumulator));
    }
    return accumulator;
  }
  return walkNode(node, { current: "" }).current;
}

function findLead(ast) {
  function findText(node, resultWrapper) {
    if (isIterable(node.children)) {
      for (let child of node.children) {
        if (isDefined(resultWrapper.current)) break;
        else if (child.type === "paragraph") {
          if (isDefined(child.children)) {
            const content = aggregateText(child);
            if (content.length >= 20) {
              resultWrapper.current = content;
              break;
            }
          }
        } else {
          findText(child, resultWrapper);
        }
      }
    }
    return resultWrapper;
  }
  if (isDefined(ast)) {
    return findText(ast, { current: null }).current;
  }
}

function trimLead(text, length) {
  if (isEmptyOrNil(text)) return "";
  if (text.length <= length + 3) return text;
  else return text.slice(0, length - 3) + "...";
}
