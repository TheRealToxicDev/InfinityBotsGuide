import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useLocation } from "utility";
import classNames from "classnames";

import Link from "components/Link";
import Icon from "components/Icon";

import "./style.scss";

function SideNav({ navRoot }) {
  function generateNav(node) {
    const { children } = node;
    return children.map((child, i) =>
      child.children.length > 0 ? (
        <CollapsibleNavLink
          href={child.path}
          label={child.navTitle}
          key={child.slug}
          isLast={
            i !== children.length - 1 && children[i + 1].children.length === 0
          }
        >
          <ul>{generateNav(child)}</ul>
        </CollapsibleNavLink>
      ) : (
        <li key={child.slug}>
          <Link
            className="side-nav--link no-children"
            href={child.path}
            children={child.navTitle}
            partiallyActive={false}
          />
        </li>
      )
    );
  }

  return (
    <div className="side-nav">
      <h5>{navRoot.navTitle}</h5>
      <ul>{generateNav(navRoot)}</ul>
    </div>
  );
}

export default SideNav;

SideNav.propTypes = {
  navRoot: PropTypes.object.isRequired
};

SideNav.displayName = "SideNav";

// ? =================
// ? Helper components
// ? =================

function CollapsibleNavLink({ href, label, children, isLast }) {
  const { location } = useLocation();
  const isPartiallyActive = location.pathname.startsWith(href);
  const [open, setOpen] = useState(isPartiallyActive);
  const onClick = useCallback(() => setOpen(!open), [open]);
  return (
    <li
      className={classNames({
        "partially-active": isPartiallyActive,
        "is-last": isLast
      })}
    >
      <div className="side-nav--expander-outer">
        <Link
          className="side-nav--link with-children"
          href={href}
          partiallyActive={false}
        >
          <span>{label}</span>
        </Link>
        <button
          className={classNames("side-nav--expander", { open })}
          onClick={onClick}
        >
          <Icon name="chevron-right" />
        </button>
      </div>
      {open ? children : null}
    </li>
  );
}

CollapsibleNavLink.propTypes = {
  href: PropTypes.string,
  isMasquerade: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  isLast: PropTypes.bool
};

CollapsibleNavLink.displayName = "CollapsibleNavLink";
