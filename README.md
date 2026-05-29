# Webpage Replication + Consistency Evaluation

本项目实现了基于 AI 工具的网页复刻与一致性评估，包含三个复刻页面和一个自动评估仪表盘。

## 公开仓库

- 仓库地址：请补充公开可访问的 GitHub / Gitee 仓库链接。


## 核心功能

- `src/app/baidu/page.tsx`：百度首页复刻，支持搜索输入、搜索按钮、结果展示和分页交互。
- `src/app/wechat-pay-login/page.tsx`：微信支付商户登录复刻，支持用户名、密码、验证码输入、密码显隐和登录交互。
- `src/app/zhihu-login/page.tsx`：知乎登录复刻，支持手机号/密码登录切换、验证码发送倒计时、密码显隐和登录交互。
- `src/app/evaluation/page.tsx`：一致性评估仪表盘，集成 `/api/evaluate` 自动评估接口，展示视觉、功能、交互三个维度评分。
- `src/app/api/evaluate/route.ts`：自动评估 API，优先调用 LLM 评估结果，失败时降级为规则评分。

## 运行说明

要求使用 `pnpm` 作为包管理器。

```bash
pnpm install
pnpm dev
```

默认开发服务器地址：`http://localhost:5000`

## 目录说明

```text
src/
├── app/
│   ├── api/evaluate/route.ts   # 一致性评估 API
│   ├── baidu/page.tsx          # 百度首页复刻
│   ├── wechat-pay-login/page.tsx # 微信支付登录复刻
│   ├── zhihu-login/page.tsx    # 知乎登录复刻
│   ├── evaluation/page.tsx     # 评估仪表盘
│   ├── layout.tsx              # 根布局
│   ├── page.tsx                # 首页
│   └── globals.css             # 全局样式
├── components/ui/              # shadcn/ui 组件库
├── hooks/                      # 自定义 Hook
└── lib/utils.ts                # 样式类名合并等工具
```

## 页面路由

- `/`：项目首页
- `/baidu`：百度首页复刻
- `/wechat-pay-login`：微信支付商户登录复刻
- `/zhihu-login`：知乎登录复刻
- `/evaluation`：一致性评估仪表盘

## 评估接口

- `POST /api/evaluate`：接收 `{ pageId: string }`，支持 `baidu`、`wechat-pay-login`、`zhihu-login`。
- `GET /api/evaluate`：返回可用评估页面列表。

## 项目验收覆盖

- 完成 3 个不同类型页面的复刻：
  - 内容展示型：百度首页
  - 表单交互型：微信支付商户登录、知乎登录
- 复刻页面包含核心交互逻辑：搜索、分页、表单输入、验证码刷新、登录切换、倒计时、密码显隐
- 自动评估部分支持量化指标：视觉、功能、交互三维度
- 评估结果可在 `/evaluation` 页面直接运行，无需额外人工驱动

## AI 工具使用记录

项目中包含 `AI_PROMPTS.md`，记录了关键 AI 生成与评估提示内容，方便审阅与复现。

## 依赖管理

本仓库已配置 `pnpm`。

```bash
pnpm install
pnpm dev
```

## 构建与启动

```bash
pnpm build
pnpm start
```

> 如果你使用的是 Windows，请确保启用 bash shell 或 Git Bash，以便运行 `scripts/*.sh` 脚本。

```tsx
// src/app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'no-store', // 或 'force-cache'
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

**客户端组件**

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
```

## 常见开发场景

### 添加新页面

1. 在 `src/app/` 下创建文件夹和 `page.tsx`
2. 使用 shadcn 组件构建 UI
3. 根据需要添加 `layout.tsx` 和 `loading.tsx`

### 创建业务组件

1. 在 `src/components/` 下创建组件文件（非 UI 组件）
2. 优先组合使用 `src/components/ui/` 中的基础组件
3. 使用 TypeScript 定义 Props 类型

### 添加全局状态

推荐使用 React Context 或 Zustand：

```tsx
// src/lib/store.ts
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

export const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### 集成数据库

推荐使用 Prisma 或 Drizzle ORM，在 `src/lib/db.ts` 中配置。

## 技术栈

- **框架**: Next.js 16.1.1 (App Router)
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **样式**: Tailwind CSS v4
- **表单**: React Hook Form + Zod
- **图标**: Lucide React
- **字体**: Geist Sans & Geist Mono
- **包管理器**: pnpm 9+
- **TypeScript**: 5.x

## 参考文档

- [Next.js 官方文档](https://nextjs.org/docs)
- [shadcn/ui 组件文档](https://ui.shadcn.com)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)

## 重要提示

1. **必须使用 pnpm** 作为包管理器
2. **优先使用 shadcn/ui 组件** 而不是从零开发基础组件
3. **遵循 Next.js App Router 规范**，正确区分服务端/客户端组件
4. **使用 TypeScript** 进行类型安全开发
5. **使用 `@/` 路径别名** 导入模块（已配置）
