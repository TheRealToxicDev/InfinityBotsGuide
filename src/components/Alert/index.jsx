import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Icon from "components/Icon";

import "./style.scss";

const types = ["info", "warning", "error", "success"];
const icons = {
  info: "info-circle",
  warning: "exclamation-triangle",
  error: "exclamation-circle",
  success: "check-circle"
};

function Alert({ children, type, className, ...rest }) {
  return (
    <div className={classNames(className, "alert", `alert__${type}`)} {...rest}>
      <div className="alert--icon">
        <Icon name={icons[type]} />
      </div>
      {children}
    </div>
  );
}

export default Alert;

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  type: PropTypes.oneOf(types),
  className: PropTypes.string
};

Alert.defaultProps = {
  type: "warning",
  className: null
};

Alert.displayName = "Alert";
