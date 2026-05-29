import Link from 'next/link';

const PAGES = [
  {
    id: 'baidu',
    name: '百度首页',
    domain: 'baidu.com',
    type: '内容展示型' as const,
    typeColor: 'bg-primary/15 text-primary',
    icon: (
      <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
    features: ['搜索输入与自动补全', '热搜榜单展示', '导航栏与快捷入口', '底部链接与版权信息'],
    status: '复刻完成' as const,
    statusColor: 'text-success',
    statusDot: 'bg-success',
    rate: '94.2%',
    href: '/baidu',
  },
  {
    id: 'wechat',
    name: '微信支付商户登录',
    domain: 'pay.weixin.qq.com',
    type: '表单交互型' as const,
    typeColor: 'bg-warning/15 text-warning',
    icon: (
      <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    features: ['登录表单交互', '验证码生成与刷新', '密码显示/隐藏切换', '表单验证与Toast提示'],
    status: '评估中' as const,
    statusColor: 'text-warning',
    statusDot: 'bg-warning',
    rate: '87.6%',
    href: '/wechat-pay-login',
  },
  {
    id: 'zhihu',
    name: '知乎登录',
    domain: 'zhihu.com',
    type: '表单交互型' as const,
    typeColor: 'bg-warning/15 text-warning',
    icon: (
      <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    features: ['登录方式Tab切换', '手机号验证码登录', '第三方账号登录', '密码显示/隐藏切换'],
    status: '复刻完成' as const,
    statusColor: 'text-success',
    statusDot: 'bg-success',
    rate: '91.3%',
    href: '/zhihu-login',
  },
];

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* 顶部：项目标题区域 */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">WebClone - 基于AI工具的网页复刻与一致性评估</h1>
          </div>
        </div>
        <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
          利用 AI 驱动的代码生成工具，对目标网页进行像素级复刻，并通过自动化一致性评估体系量化复刻结果与原始页面的视觉与功能差异，为前端开发效能提升提供可量化的参考依据。
        </p>
        <div className="flex items-center gap-4 mt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            3 个复刻页面
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <span className="w-2 h-2 rounded-full bg-warning" />
            评估进行中
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            main
          </span>
        </div>
      </section>

      {/* 中部：复刻页面卡片 */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
            复刻页面
          </h2>
          <span className="text-xs text-muted-foreground font-mono">共 3 个页面</span>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {PAGES.map((page) => (
            <Link
              key={page.id}
              href={page.href}
              className="bg-card rounded-lg shadow-card border border-border/15 p-5 flex flex-col hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                    {page.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{page.name}</h3>
                    <span className="text-xs text-muted-foreground font-mono">{page.domain}</span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium ${page.typeColor}`}>
                  {page.type}
                </span>
              </div>

              <div className="flex-1 mb-4">
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">核心功能</p>
                <ul className="space-y-1.5">
                  {page.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <svg className="w-3.5 h-3.5 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/15">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${page.statusDot}`} />
                  <span className={`text-xs font-medium ${page.statusColor}`}>{page.status}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">一致率 {page.rate}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 快速评估入口 */}
      <section className="mb-10">
        <Link href="/evaluation" className="block bg-muted/50 rounded-lg border border-border/10 p-6 hover:border-primary/20 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">自动化一致性评估</h3>
                <p className="text-sm text-muted-foreground mt-0.5">对复刻页面进行视觉、功能与交互三个维度的量化评估</p>
              </div>
            </div>
            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              运行评估
            </span>
          </div>
        </Link>
      </section>

      {/* 底部：技术栈信息 */}
      <section className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="bg-muted px-2 py-1 rounded font-mono">Next.js 16</span>
        <span className="bg-muted px-2 py-1 rounded font-mono">React 19</span>
        <span className="bg-muted px-2 py-1 rounded font-mono">TypeScript 5</span>
        <span className="bg-muted px-2 py-1 rounded font-mono">Tailwind CSS 4</span>
      </section>
    </main>
  );
}
