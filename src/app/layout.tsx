import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'WebClone - 基于AI工具的网页复刻与一致性评估',
    template: '%s | WebClone',
  },
  description:
    '利用AI驱动的代码生成工具，对目标网页进行像素级复刻，并通过自动化一致性评估体系量化复刻结果与原始页面的视觉与功能差异。',
  keywords: [
    'WebClone',
    '网页复刻',
    '一致性评估',
    'AI编程',
    '前端开发',
  ],
};

const NAV_ITEMS = [
  { href: '/', label: '总览' },
  { href: '/baidu', label: '百度首页' },
  { href: '/wechat-pay-login', label: '微信支付登录' },
  { href: '/zhihu-login', label: '知乎登录' },
  { href: '/evaluation', label: '一致性评估' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className="antialiased bg-background text-foreground font-sans">
        {isDev && <Inspector />}
        {/* 顶部导航栏 */}
        <header className="bg-card sticky top-0 z-40 h-14 flex items-center justify-between px-6 border-b border-border/20">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span className="font-bold text-base text-foreground">WebClone</span>
            <span className="text-xs text-muted-foreground ml-1 font-mono bg-muted px-1.5 py-0.5 rounded">v1.0</span>
          </div>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/evaluation"
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            运行评估
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}
