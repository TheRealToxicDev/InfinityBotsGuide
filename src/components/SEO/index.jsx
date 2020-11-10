import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { isNil } from "utility";

import Helmet from "react-helmet";

// Adds all meta/link tags to the document <head> using Helmet, including those
// geared towards SEO
function SEO({ description, lang, meta, title }) {
  const {
    title: globalTitle,
    description: globalDescription,
    author,
    themeColor,
    msTileColor
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            themeColor
            msTileColor
          }
        }
      }
    `
  ).site.siteMetadata;

  const metaDescription = description || globalDescription;
  const formattedTitle = isNil(title)
    ? globalTitle
    : `${title} | ${globalTitle}`;
  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={formattedTitle}
      meta={[
        {
          "http-equiv": "Content-Type",
          content: "text/html; charset=UTF-8"
        },
        // Web crawler
        {
          name: "robots",
          content: "index, follow"
        },
        // Misc. display meta
        {
          name: "theme-color",
          content: themeColor
        },
        {
          name: "msapplication-config",
          content: "/browserconfig.xml"
        },
        {
          name: "msapplication-TileColor",
          content: msTileColor
        },
        // Open Graph (Facebook)
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:image",
          content: "https://images-ext-1.discordapp.net/external/EZYpGUWYOqjWNbjLprFnQOVmB7zOzyzvcxb2sYo74G4/%3Fwidth%3D896%26height%3D896/https/images-ext-1.discordapp.net/external/ZAjvH-R269U8JwvGY-Nyb_frzVId_j-t7YuY_OuZvds/%253Fsize%253D1024/https/cdn.discordapp.com/avatars/758643392535199764/29266f4d2efe846207a1b07eb198c32b.png"
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:site_name`,
          content: globalTitle
        },
        // Twitter
        {
          name: "twitter:card",
          content: "summary"
        },
        {
          name: `twitter:creator`,
          content: author
        },
        {
          name: `twitter:title`,
          content: formattedTitle
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        // Other
        {
          name: `description`,
          content: metaDescription
        },
        ...meta
      ]}
      link={[
        // PWA
        {
          rel: "manifest",
          href: "/site.webmanifest"
        },
        // Favicons
        {
          rel: "mask-icon",
          color: themeColor,
          href: "/img/safari-pinned-tab.svg"
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/img/apple-touch-icon.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "https://images-ext-1.discordapp.net/external/EZYpGUWYOqjWNbjLprFnQOVmB7zOzyzvcxb2sYo74G4/%3Fwidth%3D896%26height%3D896/https/images-ext-1.discordapp.net/external/ZAjvH-R269U8JwvGY-Nyb_frzVId_j-t7YuY_OuZvds/%253Fsize%253D1024/https/cdn.discordapp.com/avatars/758643392535199764/29266f4d2efe846207a1b07eb198c32b.png"
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "https://images-ext-1.discordapp.net/external/EZYpGUWYOqjWNbjLprFnQOVmB7zOzyzvcxb2sYo74G4/%3Fwidth%3D896%26height%3D896/https/images-ext-1.discordapp.net/external/ZAjvH-R269U8JwvGY-Nyb_frzVId_j-t7YuY_OuZvds/%253Fsize%253D1024/https/cdn.discordapp.com/avatars/758643392535199764/29266f4d2efe846207a1b07eb198c32b.png"
        },
        {
          rel: "shortcut icon",
          href: "https://images-ext-1.discordapp.net/external/EZYpGUWYOqjWNbjLprFnQOVmB7zOzyzvcxb2sYo74G4/%3Fwidth%3D896%26height%3D896/https/images-ext-1.discordapp.net/external/ZAjvH-R269U8JwvGY-Nyb_frzVId_j-t7YuY_OuZvds/%253Fsize%253D1024/https/cdn.discordapp.com/avatars/758643392535199764/29266f4d2efe846207a1b07eb198c32b.png"
        }
      ]}
    />
  );
}

export default SEO;

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  title: null
};

SEO.displayName = "SEO";
