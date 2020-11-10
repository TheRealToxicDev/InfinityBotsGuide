import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function Iframe({ src, height }) {
  return (
    <div className="iframe">
      <iframe
        className="iframe--inner"
        src={src}
        height={height}
        allowTransparency="true"
        frameBorder="0"
      />
    </div>
  );
}

export default Iframe;

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Iframe.defaultProps = {
  height: 300
};

Iframe.displayName = "Iframe";
