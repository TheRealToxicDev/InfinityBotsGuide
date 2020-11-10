import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import { splitFragments, isDefined } from "utility";
import classNames from "classnames";

import Icon from "components/Icon";

import "./style.scss";

const regex = /{[^{}]+}/g;

const Route = {};
export default Route;

const useVersions = () =>
  useStaticQuery(graphql`
    query RouteVersionQuery {
      site {
        siteMetadata {
          api {
            restVersion
            gatewayVersion
          }
        }
      }
    }
  `).site.siteMetadata.api;

// ? =================
// ? Restful API route
// ? =================

Route.Restful = function({ method, path, auth, version }) {
  const { restVersion } = useVersions();
  const derivedVersion = isDefined(version) ? version : restVersion;

  const formattedPath = splitFragments(path, regex).map(fragment => (
    <span
      className={regex.test(fragment) ? "route--path__param" : undefined}
      key={fragment}
    >
      {fragment}
    </span>
  ));
  return (
    <div className="route route__restful">
      <span className="route--version">{derivedVersion}</span>
      <h3>
        <span className="route--method">{method}</span>
        <span className="route--path">{formattedPath}</span>
      </h3>
      {auth ? (
        <span className="route--auth">Requires authentication</span>
      ) : null}
    </div>
  );
};

Route.Restful.propTypes = {
  method: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  auth: PropTypes.bool,
  version: PropTypes.string
};

Route.Restful.defaultProps = {
  auth: false
};

Route.Restful.displayName = "Route.Restful";

// ? =================
// ? Gateway API route
// ? =================

Route.Gateway = function({
  eventName,
  requiresElevation,
  version,
  payload,
  sentFrom,
  room
}) {
  const { gatewayVersion } = useVersions();
  const derivedVersion = isDefined(version) ? version : gatewayVersion;

  return (
    <div className={classNames("route route__gateway", `route__${sentFrom}`)}>
      <span className="route--version">{derivedVersion}</span>
      <div className="route--gateway-wrapper">
        <div className="route--gateway-header">
          <div className="route--gateway-metadata">
            <div>
              <h5 className="route--label">Event Name</h5>
              <h4 className="route--event-name">{eventName}</h4>
            </div>
            <div>
              <h5 className="route--label">Room</h5>
              <h4 className="route--room">{room}</h4>
            </div>
          </div>
          <h4 className="route--sent-from">
            Sent from: <span className="route--sent-from-text">{sentFrom}</span>
            <Icon name="arrow-right" className="route--sent-from-icon" />
          </h4>
          {requiresElevation && (
            <div className="route--gateway-elevation">
              <span className="route--auth">
                <Icon name="lock" className="route--auth-icon" />
                Requires elevation
              </span>
            </div>
          )}
          <h5 className="route--label">Payload Schema</h5>
        </div>
        <div className="route--gateway-row row__table">
          <div className="table-responsive-lg table-outer">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(payload).map(key => (
                  <tr key={key} className="route-schema-row">
                    <td>{key}</td>
                    <td>{payload[key].type}</td>
                    <td>{payload[key].description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Route.Gateway.propTypes = {
  eventName: PropTypes.string.isRequired,
  requiresElevation: PropTypes.bool,
  version: PropTypes.string,
  payload: PropTypes.object,
  sentFrom: PropTypes.oneOf(["client", "server"]).isRequired,
  room: PropTypes.string
};

Route.Gateway.defaultProps = {
  requiresElevation: false
};

Route.Gateway.displayName = "Route.Gateway";
