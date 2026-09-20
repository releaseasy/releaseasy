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
    tooltipText: "复制代码",
    copiedText: "已复制",
  },
};

export default defineAdditionalConfig({
  description: "由 Vite 和 Vue 驱动的静态站点生成器",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() },
      "/en/reference/": { base: "/en/reference/", items: sidebarReference() },
    },

    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页面",
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: "版权所有 © 2019-至今 尤雨溪",
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
    },

    notFound: {
      title: "页面未找到",
      quote: "但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。",
      linkLabel: "前往首页",
      linkText: "带我回首页",
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    skipToContentLabel: "跳转到内容",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "指南", link: "/guide/", activeMatch: "/guide/" },
    {
      text: "参考",
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
