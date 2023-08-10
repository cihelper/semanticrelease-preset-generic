const VERSION_FILE = process.env.VERSION_FILE;
const MAJOR_TAG = process.env.MAJOR_TAG;
const config = {
  // https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration
  branches: [
    { name: "main" },
    { name: "next" },
    { name: "+([0-9])?(.{+([0-9]),x}).x" },
    { name: "dev", prerelease: true },
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogTitle: "# Changelog",
      },
    ],
    VERSION_FILE && [
      "@semantic-release/exec",
      {
        prepareCmd: `echo -n \${nextRelease.version} > ${VERSION_FILE}`,
      },
    ],
    [
      "@semantic-release/github",
      {
        failComment: false,
        successComment: false,
        addReleases: "bottom",
      },
    ],
    MAJOR_TAG === "true" && [
      "semantic-release-major-tag",
      {
        customTags: ["v${major}", "v${major}.${minor}"],
      },
    ],
    [
      "@semantic-release/git",
      {
        message: "chore(release): ${nextRelease.version}",
        assets: ["CHANGELOG.md"],
      },
    ],
  ].filter((x) => x !== undefined),
};

module.exports = config;
