function handle(body) {
  body.forEach(childPath => {
    if (childPath.leadingComments) {
      childPath.leadingComments = [];
    }
    if (childPath.trailingComments) {
      childPath.trailingComments = [];
    }
    if (childPath.body && Array.isArray(childPath.body)) {
      handle(childPath.body);
    } else if (childPath.body && Array.isArray(childPath.body.body)) {
      handle(childPath.body.body);
    }
  });
}

module.exports = function (babel) {
  return {
    visitor: {
      Program(path) {
        handle(path.node.body);
      },
    },
  }
}