import { defineAdditionalConfig, type DefaultTheme, type MarkdownLocaleOptions } from "vitepress";

export const markdown: MarkdownLocaleOptions = {
  container: {
    tipLabel: "提示",
    infoLabel: "信息",
    warningLabel: "警告",
    dangerLabel: "危险",
    detailsLabel: "详细信息",
    noteLabel: "注意",
    importantLabel: "重要",
    cautionLabel: "小心",
  },
  codeCopyButton: {
    // tooltipText: "aaa",
    // copiedText: "ddd",
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
