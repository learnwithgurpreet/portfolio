const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");
const { JSDOM } = require("jsdom");
const package = require("./package.json")

const cacheBusterOptions = {
  createResourceHash(outputDirectoy, url, target) {
    const { version } = package;
    return version;
  },
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.setTemplateFormats("njk");
  eleventyConfig.addPlugin(cacheBuster(cacheBusterOptions));

  eleventyConfig.addTransform("lazy-load-images", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      const dom = new JSDOM(content);
      const document = dom.window.document;

      const [...images] = document.getElementsByTagName("img");

      images.forEach((image) => {
        image.setAttribute("loading", "lazy");
      });

      return document.documentElement.outerHTML;
    } else {
      return content;
    }
  });
};
