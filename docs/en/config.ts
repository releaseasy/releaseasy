import { defineAdditionalConfig, type DefaultTheme, type MarkdownLocaleOptions } from "vitepress";

export const markdown: MarkdownLocaleOptions = {
  container: {
    tipLabel: "d",
    infoLabel: "a",
    warningLabel: "警dsa告",
    dangerLabel: "dsa",
    detailsLabel: "详细d信息",
    noteLabel: "dsa",
    importantLabel: "qq",
    cautionLabel: "ee",
  },
  codeCopyButton: {
    tooltipText: "aaa",
    copiedText: "ddd",
  },
};

export default defineAdditionalConfig({
  description: "dddddddd",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() },
      "/en/reference/": { base: "/en/reference/", items: sidebarReference() },
    },

    editLink: {
      pattern: "https://github.com/releaseasy/releaseasy/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面daaa",
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "Guide", link: "/en/guide/", activeMatch: "/en/guide/" },
    {
      text: "Reference",
      link: "/en/reference/cli",
      activeMatch: "/en/reference/",
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Introduction",
      collapsed: false,
      items: [
        { text: "Introduction", link: "/" },
        { text: "Getting Started", link: "getting-started" },
      ],
    },

    {
      text: "Advanced",
      collapsed: false,
      items: [
        { text: "CI/CD Integration", link: "cicd" },
        { text: "Configuration File", link: "config-file" },
        { text: "Changelog", link: "changelog" },
        { text: "Hooks", link: "hooks" },
        { text: "Dry Run", link: "dry-run" },
      ],
    },

    { text: "Configuration & CLI Reference", base: "/en/reference/", link: "cli" },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Reference",
      items: [
        { text: "CLI", link: "cli" },
        {
          text: "Configuration Options",
          // base: "/reference/option-",
          items: [
            { text: "Overview", link: "config" },
            { text: "increments", link: "option-increments" },
            { text: "distTags", link: "option-dist-tags" },
            { text: "git", link: "option-git" },
            { text: "hooks", link: "option-hooks" },
          ],
        },
      ],
    },
  ];
}
