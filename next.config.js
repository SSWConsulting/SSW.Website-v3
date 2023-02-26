const { redirect } = require("next/dist/server/api-utils");

module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  poweredByHeader: false,
  images: {
    domains: ["assets.tina.io", "i.ytimg.com", "www.ssw.com.au", "github.com"],
  },
  output: "standalone", // required for Docker support
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
  async redirects() {
    return [      
      {
        source: "/admin",
        destination: "/admin/index.html",
        permanent: true,
      },
    ]
  }
};
