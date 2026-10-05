---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  image:
    src: /logo-large.svg
    alt: releaseasy
  name: releaseasy
  text: 让版本发布更简单的 CLI
  tagline: 让每一次发布都成为一种享受
  actions:
    - theme: brand
      text: 什么是 releaseasy?
      link: /guide/what-is-releaseasy
    - theme: alt
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: Github
      link: https://github.com/releaseasy/releaseasy

features:
  - icon: 🏷️
    title: 语义化版本
    details: 智能计算并推荐语义化版本
  - icon: 📝
    title: 变更日志
    details: 自动生成变更日志 CHANGELOG.md
  - icon: 🪝
    title: hooks
    details: 支持灵活的hooks
  - icon: ↩️
    title: 自动回滚
    details: 如果发布失败，则将项目回滚到之前的状态
---
