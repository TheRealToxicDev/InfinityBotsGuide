import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./style.scss";

function Demo({ children, className, ...rest }) {
  return (
    <div
      className={classNames(className, "demo")}
      children={children}
      {...rest}
    >
      {Array.isArray(children)
        ? children.map((c, i) => (
            <div className="demo--inner" children={c} key={i} />
          ))
        : children}
    </div>
  );
}

export default Demo;

Demo.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  className: PropTypes.string
};

Demo.defaultProps = {
  className: ""
};

Demo.displayName = "Demo";
