module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: ["/", "/en/", "/ca/", "/proyectos/dont-touch-the-duck/"],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    // Reports stay local: nothing is uploaded to public storage.
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
