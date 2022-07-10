const { JSDOM } = require("jsdom");

module.exports = function (eleventyConfig) {
  // Copy `img/` to `_site/img`
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.setTemplateFormats("njk");

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
