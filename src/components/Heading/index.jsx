import React from "react";
import classNames from "classnames";
import { useInitialRender } from "utility";

import "./style.scss";

function createHeading({ component: Component, rightLink = false }) {
  const heading = ({ children, id, ...rest }) => {
    const isInitial = useInitialRender();
    const link = (
      <a
        className={classNames("heading-link", `heading-${Component}`, {
          right: rightLink
        })}
        href={`#${id}`}
      >
        <span className="heading-link--icon" />
      </a>
    );
    return (
      <div className={classNames("anchor-wrapper", `anchor--${Component}`)}>
        <a className="anchor" name={id}>
          {" "}
        </a>
        <Component {...rest}>
          {children}
          {link}
        </Component>
      </div>
    );
  };
  heading.displayName = `Heading-${Component}`;
  return heading;
}

export default createHeading;
