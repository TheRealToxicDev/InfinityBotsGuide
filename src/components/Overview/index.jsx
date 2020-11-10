import React, { createContext, useContext } from "react";

import Link from "components/Link";

function Overview() {
  const children = useContext(Overview.PageContext);
  return (
    <>
      <h2>In this section</h2>
      <ul>
        {children.map(({ title, path, slug }) => (
          <li key={slug}>
            <Link href={path}>{title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Overview;

Overview.propTypes = {};

Overview.defaultProps = {};

Overview.displayName = "Overview";

Overview.PageContext = createContext([]);
