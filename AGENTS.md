# 项目上下文

## 项目概述

WebClone - 基于AI工具的网页复刻与一致性评估平台。该项目复刻3个不同类型的网页（百度首页-内容展示型、微信支付商户登录-表单交互型、知乎登录-表单交互型），并通过自动化一致性评估系统量化复刻质量。

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4
- **LLM SDK**: coze-coding-dev-sdk（用于AI驱动的一致性评估）

## 目录结构

```
├── public/                          # 静态资源
├── .cozeproj/prototype/web/         # 设计原型HTML文件
├── scripts/                         # 构建与启动脚本
├── src/
│   ├── app/
│   │   ├── page.tsx                 # 首页（项目总览）
│   │   ├── layout.tsx               # 全局布局（含顶部导航）
│   │   ├── globals.css              # 全局样式 + Design Token
│   │   ├── baidu/page.tsx           # 百度首页复刻
│   │   ├── wechat-pay-login/page.tsx # 微信支付商户登录复刻
│   │   ├── zhihu-login/page.tsx     # 知乎登录复刻
│   │   ├── evaluation/page.tsx      # 一致性评估仪表板
│   │   └── api/evaluate/route.ts    # AI评估API接口
│   ├── components/ui/               # Shadcn UI 组件库
│   ├── hooks/                       # 自定义 Hooks
│   └── lib/utils.ts                 # 通用工具函数
├── DESIGN.md                        # 设计规范
└── AGENTS.md                        # 本文件
```

## 页面路由

| 路由 | 说明 | 类型 |
|------|------|------|
| `/` | 项目总览页 | 服务端组件 |
| `/baidu` | 百度首页复刻 | 客户端组件 |
| `/wechat-pay-login` | 微信支付商户登录复刻 | 客户端组件 |
| `/zhihu-login` | 知乎登录复刻 | 客户端组件 |
| `/evaluation` | 一致性评估仪表板 | 客户端组件 |

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/evaluate` | AI驱动的一致性评估，参数: `{ pageId: string }` |
| GET | `/api/evaluate` | 获取可评估页面列表 |

pageId 可选值: `baidu`, `wechat-pay-login`, `zhihu-login`

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；禁止隐式 `any` 和 `as any`
- 函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄
- 清理未使用的变量和导入
- 客户端交互页面使用 `'use client'` 指令

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 `path.resolve(__dirname, ...)` 或 `process.cwd()` 动态拼接

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 `typeof window`、`Date.now()`、`Math.random()` 等动态数据
2. 必须使用 `'use client'` 并配合 `useEffect` + `useState` 确保动态内容仅在客户端挂载后渲染
3. 严禁非法 HTML 嵌套（如 `<p>` 嵌套 `<div>`）

## UI 设计规范

- 模板默认预装核心组件库 `shadcn/ui`，位于 `src/components/ui/` 目录下
- Next.js 项目默认采用 shadcn/ui 组件、风格和规范
- 复刻页面使用自定义内联SVG图标（不依赖Lucide CDN），确保页面独立可运行

## 评估系统架构

评估系统由两部分组成：
1. **前端仪表板** (`/evaluation`)：展示可视化评估指标、评分环形图、对比表格
2. **后端AI评估** (`/api/evaluate`)：调用LLM对原始页面与复刻页面的描述进行对比分析，输出量化评分

评估维度：视觉一致性、功能一致性、交互一致性，每个维度包含3-4个子指标。
