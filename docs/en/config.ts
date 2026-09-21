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

    editLink: {
      pattern: "https://github.com/releaseasy/releaseasy/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面daaa",
    },

    sidebar: {
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() },
      "/en/reference/": { base: "/en/reference/", items: sidebarReference() },
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "guide", link: "/guide/", activeMatch: "/guide/" },
    {
      text: "reference",
      link: "/reference/cli",
      activeMatch: "/reference/",
    },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    { text: "简介", link: "/" },
    { text: "快速开始", link: "getting-started" },
    { text: "变更日志", link: "changelog" },
    { text: "Hooks", link: "hooks" },
    { text: "后续CI/CD 集成", link: "cicd" },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    { text: "CLI", link: "cli" },
    { text: "配置", link: "configuration" },
  ];
}
