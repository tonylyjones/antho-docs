import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

const config: Config = {
  title: "Anthony Ly",
  tagline: "CTO Co-founder, Software Engineer & Dev Mentor",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://anthonyly.dev/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "tonylyjones", // Usually your GitHub org/user name.
  projectName: "antho-docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "fr",
    locales: ["fr"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/og-banner.jpg",
    navbar: {
      title: "Anthony Ly",
      logo: {
        alt: "Anthony Ly Logo",
        src: "img/logo-anthonyly.png",
      },
      items: [
        { to: "/resume", label: "CV", position: "left" },
        { to: "/mentoring", label: "Mentorat", position: "left" },
        { to: "/collective", label: "Collectif", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "projectsSidebar",
          position: "left",
          label: "Projets",
        },
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Notes",
        },
        //{ to: "/blog", label: "Blog", position: "left" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/anthonyly-dev/",
          position: "right",
        },
        {
          label: "Twitter",
          href: "https://twitter.com/tonylyjones",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Website",
          items: [
            {
              label: "CV",
              to: "/resume",
            },
            { to: "/mentoring", label: "Mentorat" },
            { to: "/collective", label: "Collectif" },
            {
              label: "Projets",
              to: "/docs/projects/intro",
            },
            {
              label: "Notes",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Network",
          items: [
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/anthonyly-dev/",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/tonylyjones",
            },
          ],
        },
        {
          title: "More",
          items: [
            /* {
              label: "Blog",
              to: "/blog",
            },*/
            {
              label: "GitHub",
              href: "https://github.com/tonylyjones",
            },
          ],
        },
      ],
      copyright: `Written by Anthony Ly. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
