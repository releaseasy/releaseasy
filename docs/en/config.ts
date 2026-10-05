import { defineAdditionalConfig, type DefaultTheme, type MarkdownLocaleOptions } from "vitepress";

export const markdown: MarkdownLocaleOptions = {
  container: {
    tipLabel: "TIP",
    infoLabel: "INFO",
    warningLabel: "WARNING",
    dangerLabel: "DANGER",
    detailsLabel: "Details",
    noteLabel: "NOTE",
    importantLabel: "IMPORTANT",
    cautionLabel: "CAUTION",
  },
  codeCopyButton: {
    tooltipText: "Copy code",
    copiedText: "Copied",
  },
};

export default defineAdditionalConfig({
  description: "Simplify Your Releases",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() },
      "/en/reference/": { base: "/en/reference/", items: sidebarReference() },
    },

    editLink: {
      pattern: "https://github.com/releaseasy/releaseasy/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026-present ajiho",
    },
    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },
    outline: {
      level: "deep",
      label: "On this page",
    },
    lastUpdated: {
      text: "Last Updated",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "medium",
        forceLocale: true,
      },
    },
    notFound: {
      title: "PAGE NOT FOUND",
      quote:
        "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
      linkLabel: "go to home",
      linkText: "Take me home",
    },

    langMenuLabel: "Change language",
    returnToTopLabel: "Return to top",
    sidebarMenuLabel: "Menu",
    darkModeSwitchLabel: "Appearance",
    lightModeSwitchTitle: "Switch to light theme",
    darkModeSwitchTitle: "Switch to dark theme",
    skipToContentLabel: "Skip to content",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "Guide", link: "/en/guide/what-is-releaseasy", activeMatch: "/en/guide/" },
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
        { text: "What is releaseasy?", link: "what-is-releaseasy" },
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
