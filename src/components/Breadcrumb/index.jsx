import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { isDefined } from "utility";

import Icon from "components/Icon";
import Link from "components/Link";

import "./style.scss";

function Breadcrumb({ data }) {
  const length = data.length;
  return (
    <div className="docs-breadcrumb">
      {data.map((entry, index) => (
        <Fragment key={`${entry.text}=>${entry.href}`}>
          <BreadcrumbEntry {...entry} />
          {index !== length - 1 ? (
            <Icon className="docs-breadcrumb--icon" name="chevron-right" />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

export default Breadcrumb;

Breadcrumb.propTypes = {
  data: PropTypes.array
};

Breadcrumb.defaultName = "Breadcrumb";

// ? =================
// ? Helper components
// ? =================

function BreadcrumbEntry({ text, path }) {
  return isDefined(path) ? (
    <Link
      className="docs-breadcrumb--entry"
      href={isDefined(path) ? path : undefined}
    >
      {text}
    </Link>
  ) : (
    <span className="docs-breadcrumb--entry">{text}</span>
  );
}

BreadcrumbEntry.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string
};

BreadcrumbEntry.defaultName = "BreadcrumbEntry";
