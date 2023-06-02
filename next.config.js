const fs = require("fs");
const { getHighlighter, BUNDLED_LANGUAGES } = require("shiki");
const nextra = require("nextra");
const grammar = fs.readFileSync(
  require.resolve("./keel.tmGrammar.json"),
  "utf-8"
);

const rehypePrettyCodeOptions = {
  getHighlighter: (options) => {
    return getHighlighter({
      ...options,
      langs: [
        ...BUNDLED_LANGUAGES,
        {
          id: "keel",
          scopeName: "source.keel",
          grammar: JSON.parse(grammar),
          aliases: ["keel"],
        },
      ],
    });
  },
};

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  mdxOptions: {
    rehypePrettyCodeOptions,
  },
});

module.exports = withNextra();