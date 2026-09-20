import { defineConfig, type DefaultTheme } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "releaseasy",
  base: "/releaseasy/",
  description: "更智能的 `npm publish`",
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
    outline: {
      level: "deep",
    },
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
  },
  locales: {
    root: { label: "简体中文", lang: "zh-Hans", dir: "ltr" },
    en: { label: "English", lang: "en-US", dir: "ltr" },
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
        { text: "变更日志", link: "changelog" },
        { text: "Hooks", link: "hooks" },
        { text: "后续CI/CD 集成", link: "cicd" },
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
          base: "/reference/option-",
          items: [
            { text: "increments", link: "increments" },
            { text: "distTags", link: "dist-tags" },
            { text: "git", link: "git" },
            { text: "hooks", link: "hooks" },
          ],
        },
      ],
    },
  ];
}
