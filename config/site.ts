export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "resume generator",
  description: "a simple resume generator",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/zealleaf",
    github: "https://github.com/zealleaf",
    docs: "https://github.com/zealleaf/resume-generator#readme",
  },
}
