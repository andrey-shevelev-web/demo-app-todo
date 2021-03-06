const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        ie: "11",
        firefox: "60",
        chrome: "64",
        safari: "11.1",
        "esmodules": true
      },
      useBuiltIns: "usage",
      corejs: "3.0.0"
    }
  ],
];

module.exports = { presets };
