module.exports = {
  splitPath: function(path) {
    const trimmedPath = path.charAt(0) === "/" ? path.substr(1) : path;
    return (trimmedPath.slice(-1) === "/"
      ? trimmedPath.slice(0, -1)
      : trimmedPath
    ).split("/");
  },

  trimMarkdownPath: function(path) {
    return (
      "/" +
      path
        .replace(".mdx", "")
        .replace(".md", "")
        .replace("index", "")
        .replace(/\/$/, "")
    );
  },

  capitalize: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
