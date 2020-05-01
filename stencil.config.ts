import { Config } from "@stencil/core";
import { postcss } from "@stencil/postcss";
import postcssPlugin from "rollup-plugin-postcss";

const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./src/**/*.html",
    "./src/**/*.ts",
    "./src/**/*.tsx"
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

export const config: Config = {
  namespace: "employer-nav",
  taskQueue: "async",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ],
  plugins: [
    postcss({
      plugins: [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
        ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
      ]
    })
  ]
};
