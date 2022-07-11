const cacheBuster = require("@mightyplow/eleventy-plugin-cache-buster");
const Image = require("@11ty/eleventy-img");
const package = require("./package.json");

const cacheBusterOptions = {
  createResourceHash(outputDirectory, url, target) {
    const { version } = package;
    return version;
  },
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.setTemplateFormats("njk");
  eleventyConfig.addPlugin(cacheBuster(cacheBusterOptions));

  async function imageShortcode(src, alt, classList = "", sizes = "100vw") {
    let metadata = await Image(src, {
      widths: [400, 640],
      formats: ["avif", "jpeg", "webp"],
      outputDir: "_site/assets/images/",
      urlPath: "/assets/images/",
      sharpOptions: {
        animated: true,
      },
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
      class: classList,
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes);
  }
  eleventyConfig.addNunjucksAsyncShortcode("responsiveImage", imageShortcode);
};
