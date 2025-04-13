/** @type {import('next').NextConfig} */

const path = require("path");
const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]);

module.exports = withTM({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "@styles/_variables.scss"; @import "@styles/_mixins.scss";`,
  },
  images: {
    domains: [
      "m.media-amazon.com",
      "thumbnail7.coupangcdn.com",
      "thumbnail9.coupangcdn.com",
      "preview.colorlib.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
});
