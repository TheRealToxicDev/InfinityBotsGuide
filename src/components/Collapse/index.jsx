import React, { useState, useCallback, cloneElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isDefined } from "utility";

import Icon from "components/Icon";

import "./style.scss";

function Collapse({ children, unwrap, render }) {
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const onClickExpand = useCallback(() => {
    setOpen(!open);
    if (!hasMounted && !open) setHasMounted(true);
  }, [open, hasMounted]);

  const getChildren = () => (isDefined(render) ? render() : children);
  const displayChildren = (
    <div
      className={classNames({ "d-none": !open })}
      children={
        open || hasMounted
          ? unwrap
            ? cloneElement(getChildren().props.children)
            : getChildren()
          : null
      }
    />
  );

  return (
    <div className={classNames("docs-collapse", { open })}>
      <button className="docs-collapse--button" onClick={onClickExpand}>
        <h5>{open ? "Hide" : "Show"}</h5>
        <Icon name="chevron-right" />
      </button>
      {displayChildren}
    </div>
  );
}

export default Collapse;

Collapse.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  unwrap: PropTypes.bool,
  render: PropTypes.func
};

Collapse.defaultProps = {
  unwrap: false,
  render: null
};

Collapse.displayName = "Collapse";
