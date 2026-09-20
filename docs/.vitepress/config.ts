import { defineConfig, type DefaultTheme } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { markdown as enMarkdown } from "../en/config.ts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "releaseasy",
  base: "/releaseasy/",
  description: "让版本发布更简单的 CLI",
  rewrites: {
    "zh/:rest*": ":rest*",
  },
  ignoreDeadLinks: true,
  head: [
    ["link", { rel: "icon", href: "favicon.svg", type: "image/svg+xml" }],
    [
      "meta",
      {
        name: "google",
        content: `notranslate`,
      },
    ],
  ],
  markdown: {
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
    config(md) {
      md.use(groupIconMdPlugin);
      md.use(tabsMarkdownPlugin);
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    logo: { src: "/logo-mini.svg", width: 24, height: 24 },
    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },

      "/reference/": { base: "/reference/", items: sidebarReference() },
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/releaseasy/releaseasy",
      },
    ],
    editLink: {
      pattern: "https://github.com/releaseasy/releaseasy/edit/main/docs/:path",
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
      level: "deep",
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
  locales: {
    root: { label: "简体中文", lang: "zh-Hans", dir: "ltr" },
    en: { label: "English", lang: "en-US", dir: "ltr", markdown: enMarkdown },
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
    {
      text: "Introduction",
      collapsed: false,
      items: [
        { text: "简介", link: "/" },
        { text: "快速开始", link: "getting-started" },
      ],
    },

    {
      text: "进阶",
      collapsed: false,
      items: [
        { text: "后续CI/CD 集成", link: "cicd" },
        { text: "配置文件", link: "config-file" },
        { text: "变更日志", link: "changelog" },
        { text: "Hooks", link: "hooks" },
        { text: "演练模式", link: "dry-run" },
      ],
    },

    { text: "配置和CLI参考", base: "/reference/", link: "cli" },
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Reference",
      items: [
        { text: "CLI", link: "cli" },
        {
          text: "配置选项",
          // base: "/reference/option-",
          items: [
            { text: "概览", link: "config" },
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
