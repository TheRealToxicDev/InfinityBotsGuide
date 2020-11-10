import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffectOnce, isDefined } from "utility";
import Prism from "prismjs";
import "../../languages";

import { Spinner } from "react-bootstrap";

import "./style.scss";

function ExternalSnippet({ src, language, prismLanguage }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState("");

  const languageDef = isDefined(prismLanguage)
    ? prismLanguage
    : Prism.languages[language];

  useEffectOnce(() => {
    axios
      .get(src)
      .then(result => {
        if (result.data) {
          setIsLoaded(true);
          setContent(result.data);
        }
      })
      .catch(error => {
        setContent(`An error ocurred loading ${src}:\n${error}`);
      });
  });

  const highlighted = useMemo(() => {
    return isLoaded && highlight(content, languageDef);
  }, [content, languageDef, isLoaded]);
  return (
    <div className="gatsby-highlight">
      {isLoaded ? (
        <pre className={`language-${language}`}>
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      ) : (
        <div className="highlighted-placeholder">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </div>
  );
}

export default ExternalSnippet;

ExternalSnippet.propTypes = {
  src: PropTypes.string.isRequired,
  prismLanguage: PropTypes.object,
  language: PropTypes.string
};

ExternalSnippet.defaultProps = {
  language: "snippet",
  prismLanguage: null
};

ExternalSnippet.displayName = "ExternalSnippet";

// ? =================
// ? Utility functions
// ? =================

function highlight(code, language) {
  return isDefined(language) ? Prism.highlight(code, language) : code;
}
