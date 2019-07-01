const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = {
  "presets": [
    "@babel/react", 
    "@babel/env",
    '@babel/preset-typescript',
],
  "plugins": ["@babel/plugin-proposal-class-properties",  "transform-es2015-modules-commonjs"]
};