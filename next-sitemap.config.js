/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://ssw.com.au",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      // TODO: add sitemaps for other sites when they are available
      // 'https://ssw.com.au/people/sitemap.xml',
      // 'https://ssw.com.au/rules/sitemap.xml',
    ],
    policies: [
      process.env.NEXT_PUBLIC_TINA_BRANCH === "main"
        ? {
            userAgent: "*",
            allow: "/",
          }
        : {
            userAgent: "*",
            disallow: "/",
          },
    ],
  },
};
