import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Link from "components/Link";

import "./style.scss";

function Footer() {
  const { links } = useStaticQuery(graphql`
    query FooterLinks {
      file(name: { eq: "footer" }, extension: { in: ["yaml", "yml"] }) {
        childDataYaml {
          links {
            ...Links
          }
        }
      }
    }
  `).file.childDataYaml;

  return (
    <div className="footer">
    <ul className="footer--inner">
      <p>Made with ♥️ by <a href="https://twitter.com/TheRealToxicDev">Toxic Dev</a></p>
        {links.map(({ href, ...rest }) => (
          <li key={href}>
            <Link href={href} {...rest} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;

Footer.displayName = "Footer";
