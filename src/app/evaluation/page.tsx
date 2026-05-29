'use client';

import { useState, useCallback } from 'react';

/* ---------- 评估数据类型 ---------- */
interface PageEval {
  id: 'baidu' | 'wechat-pay-login' | 'zhihu-login';
  name: string;
  href: string;
  score: number;
  status: string;
  statusColor: string;
  metrics: { label: string; value: number }[];
  dims: { label: string; value: number; color: string }[];
}

interface EvalRow {
  item: string;
  weight: number;
  baidu: number;
  wechat: number;
  zhihu: number;
}

interface ApiEvalResult {
  pageId: string;
  timestamp: string;
  result: {
    visual: {
      overall: number;
      dom_structure: number;
      css_match: number;
      layout_similarity: number;
      color_accuracy: number;
    };
    functional: {
      overall: number;
      feature_coverage: number;
      feature_correctness: number;
      data_integrity: number;
    };
    interaction: {
      overall: number;
      interaction_fidelity: number;
      feedback_consistency: number;
      state_management: number;
    };
    overall: number;
    summary: string;
  };
}

const PAGE_IDS = ['baidu', 'wechat-pay-login', 'zhihu-login'] as const;

const PAGE_EVALS: PageEval[] = [
  {
    id: 'baidu',
    name: '百度首页',
    href: '/baidu',
    score: 88,
    status: '优秀',
    statusColor: 'text-success',
    metrics: [
      { label: '颜色匹配度', value: 94 },
      { label: '布局结构相似度', value: 89 },
      { label: '功能完整度', value: 90 },
      { label: '交互还原度', value: 82 },
    ],
    dims: [
      { label: '视觉', value: 91, color: 'bg-primary' },
      { label: '功能', value: 90, color: 'bg-blue-500' },
      { label: '交互', value: 82, color: 'bg-amber-500' },
    ],
  },
  {
    id: 'wechat-pay-login',
    name: '微信支付登录',
    href: '/wechat-pay-login',
    score: 83,
    status: '良好',
    statusColor: 'text-primary',
    metrics: [
      { label: '颜色匹配度', value: 88 },
      { label: '布局结构相似度', value: 85 },
      { label: '功能完整度', value: 82 },
      { label: '交互还原度', value: 78 },
    ],
    dims: [
      { label: '视觉', value: 86, color: 'bg-primary' },
      { label: '功能', value: 82, color: 'bg-blue-500' },
      { label: '交互', value: 78, color: 'bg-amber-500' },
    ],
  },
  {
    id: 'zhihu-login',
    name: '知乎登录',
    href: '/zhihu-login',
    score: 72,
    status: '一般',
    statusColor: 'text-warning',
    metrics: [
      { label: '颜色匹配度', value: 78 },
      { label: '布局结构相似度', value: 76 },
      { label: '功能完整度', value: 70 },
      { label: '交互还原度', value: 65 },
    ],
    dims: [
      { label: '视觉', value: 76, color: 'bg-primary' },
      { label: '功能', value: 70, color: 'bg-blue-500' },
      { label: '交互', value: 65, color: 'bg-red-500' },
    ],
  },
];

const EVAL_ROWS: EvalRow[] = [
  { item: 'DOM结构一致性', weight: 15, baidu: 92, wechat: 85, zhihu: 73 },
  { item: 'CSS属性匹配度', weight: 20, baidu: 90, wechat: 82, zhihu: 70 },
  { item: '布局相似度', weight: 20, baidu: 89, wechat: 85, zhihu: 76 },
  { item: '色彩还原度', weight: 15, baidu: 94, wechat: 88, zhihu: 78 },
  { item: '功能覆盖率', weight: 15, baidu: 90, wechat: 82, zhihu: 70 },
  { item: '交互还原度', weight: 15, baidu: 82, wechat: 78, zhihu: 65 },
];

/* ---------- 辅助函数 ---------- */
function getScoreColor(score: number): string {
  if (score >= 90) return 'text-success';
  if (score >= 80) return 'text-primary';
  if (score >= 70) return 'text-warning';
  return 'text-error';
}

function getScoreBg(score: number): string {
  if (score >= 90) return 'bg-success/10';
  if (score >= 80) return 'bg-primary/10';
  if (score >= 70) return 'bg-warning/10';
  return 'bg-error/10';
}

function RingScore({ score, size = 80, strokeWidth = 6, color }: { score: number; size?: number; strokeWidth?: number; color: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-surface-container-high" />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth}
        className={color}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- 主页面 ---------- */
export default function EvaluationPage() {
  const [evaluating, setEvaluating] = useState(false);
  const [evalTime, setEvalTime] = useState('2025-05-29 14:32:00');
  const [apiResults, setApiResults] = useState<Record<string, ApiEvalResult>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const overallScore = Math.round(PAGE_EVALS.reduce((sum, p) => sum + p.score, 0) / PAGE_EVALS.length);
  const visualScore = Math.round(PAGE_EVALS.reduce((sum, p) => sum + p.dims[0].value, 0) / PAGE_EVALS.length);
  const funcScore = Math.round(PAGE_EVALS.reduce((sum, p) => sum + p.dims[1].value, 0) / PAGE_EVALS.length);
  const interScore = Math.round(PAGE_EVALS.reduce((sum, p) => sum + p.dims[2].value, 0) / PAGE_EVALS.length);
  const hasApiResults = Object.keys(apiResults).length > 0;

  const getPageOverall = (page: PageEval) => apiResults[page.id]?.result.overall ?? page.score;
  const getPageSummary = (page: PageEval) => apiResults[page.id]?.result.summary ?? `${page.name} 的静态评估结论。`;

  const handleRunEval = useCallback(async () => {
    setEvaluating(true);
    setApiError(null);
    try {
      const results = await Promise.all(
        PAGE_IDS.map(async (pageId) => {
          const response = await fetch('/api/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pageId }),
          });

          if (!response.ok) {
            throw new Error(`评估接口返回错误：${response.status}`);
          }

          const data = (await response.json()) as ApiEvalResult | { error: string };
          if ('error' in data) {
            throw new Error(data.error);
          }
          return data;
        })
      );

      setApiResults(Object.fromEntries(results.map((item) => [item.pageId, item])));
      setEvalTime(new Date().toLocaleString('zh-CN', { hour12: false }));
    } catch (error: unknown) {
      setApiError(error instanceof Error ? error.message : '评估失败');
    } finally {
      setEvaluating(false);
    }
  }, []);

  const weightedTotal = (col: 'baidu' | 'wechat' | 'zhihu') =>
    Math.round(EVAL_ROWS.reduce((sum, row) => sum + row[col] * row.weight, 0) / EVAL_ROWS.reduce((sum, row) => sum + row.weight, 0));

  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* 页面标题区 */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">一致性评估报告</h1>
            <p className="text-sm text-muted-foreground mt-1">对复刻页面进行视觉、功能与交互三个维度的自动化量化评估</p>
            <p className="text-sm text-muted-foreground mt-2">
              当前评估数据来源：<span className="font-medium text-foreground">{hasApiResults ? '自动评估 API' : '静态演示数据'}</span>
            </p>
            {apiError ? (
              <p className="text-sm text-destructive mt-2">评估接口异常：{apiError}</p>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-mono">最近评估: {evalTime}</span>
            <button
              onClick={handleRunEval}
              disabled={evaluating}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {evaluating ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity={0.3} />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  评估中...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  运行评估
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 总体评分区域 - 4列 */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {/* 综合评分 */}
        <div className="bg-card rounded-lg shadow-card border border-border/15 p-6 flex flex-col items-center justify-center relative">
          <div className="relative">
            <RingScore score={overallScore} size={100} strokeWidth={8} color="text-primary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{overallScore}</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm font-medium text-muted-foreground">综合评分</p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-sm text-xs font-medium ${getScoreColor(overallScore)} ${getScoreBg(overallScore)}`}>
              {overallScore >= 90 ? '优秀' : overallScore >= 80 ? '良好' : '一般'}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse block" />
          </div>
        </div>

        {/* 视觉一致性 */}
        <div className="bg-card rounded-lg shadow-card border border-border/15 p-6 flex flex-col items-center justify-center">
          <div className="relative">
            <RingScore score={visualScore} size={80} strokeWidth={6} color="text-primary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-foreground">{visualScore}</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm font-medium text-muted-foreground">视觉一致性</p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-sm text-xs font-medium ${getScoreColor(visualScore)} ${getScoreBg(visualScore)}`}>
              {visualScore >= 90 ? '优秀' : visualScore >= 80 ? '良好' : '一般'}
            </span>
          </div>
        </div>

        {/* 功能一致性 */}
        <div className="bg-card rounded-lg shadow-card border border-border/15 p-6 flex flex-col items-center justify-center">
          <div className="relative">
            <RingScore score={funcScore} size={80} strokeWidth={6} color="text-blue-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-foreground">{funcScore}</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm font-medium text-muted-foreground">功能一致性</p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-sm text-xs font-medium ${getScoreColor(funcScore)} ${getScoreBg(funcScore)}`}>
              {funcScore >= 90 ? '优秀' : funcScore >= 80 ? '良好' : '一般'}
            </span>
          </div>
        </div>

        {/* 交互一致性 */}
        <div className="bg-card rounded-lg shadow-card border border-border/15 p-6 flex flex-col items-center justify-center">
          <div className="relative">
            <RingScore score={interScore} size={80} strokeWidth={6} color="text-amber-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-foreground">{interScore}</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm font-medium text-muted-foreground">交互一致性</p>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-sm text-xs font-medium ${getScoreColor(interScore)} ${getScoreBg(interScore)}`}>
              {interScore >= 90 ? '优秀' : interScore >= 80 ? '良好' : '一般'}
            </span>
          </div>
        </div>
      </div>

      {/* 各页面评估详情 */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
          页面评估详情
        </h2>
        <div className="grid grid-cols-3 gap-5">
          {PAGE_EVALS.map((page) => (
            <a
              key={page.id}
              href={page.href}
              className="bg-card rounded-lg shadow-card border border-border/15 p-5 hover:border-primary/30 transition-colors block"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-foreground">{page.name}</h3>
                <div className="flex items-center gap-1.5">
                  <span className={`text-lg font-bold ${getScoreColor(getPageOverall(page))}`}>{getPageOverall(page)}</span>
                  <span className={`text-xs font-medium ${page.statusColor}`}>/ {page.status}</span>
                </div>
              </div>

              {/* 维度进度条 */}
              <div className="space-y-2 mb-4">
                {page.dims.map((dim) => (
                  <div key={dim.label} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-8 shrink-0">{dim.label}</span>
                    <div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${dim.color}`} style={{ width: `${dim.value}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono w-8 text-right shrink-0">{dim.value}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{getPageSummary(page)}</p>

              {/* 关键指标 */}
              <div className="grid grid-cols-2 gap-2">
                {page.metrics.map((metric) => (
                  <div key={metric.label} className="bg-muted/50 rounded px-2.5 py-1.5">
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                    <p className={`text-sm font-semibold ${metric.value >= 80 ? 'text-success' : metric.value >= 70 ? 'text-warning' : 'text-error'}`}>{metric.value}%</p>
                  </div>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* 详细对比表格 */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          详细对比
        </h2>
        <div className="bg-card rounded-lg shadow-card border border-border/15 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">评估项</th>
                <th className="text-center px-4 py-3 text-muted-foreground font-medium">百度首页</th>
                <th className="text-center px-4 py-3 text-muted-foreground font-medium">微信支付登录</th>
                <th className="text-center px-4 py-3 text-muted-foreground font-medium">知乎登录</th>
                <th className="text-center px-4 py-3 text-muted-foreground font-medium">权重</th>
              </tr>
            </thead>
            <tbody>
              {EVAL_ROWS.map((row) => (
                <tr key={row.item} className="border-b border-border/10 last:border-0">
                  <td className="px-4 py-2.5 text-foreground">{row.item}</td>
                  <td className={`text-center px-4 py-2.5 font-mono ${getScoreColor(row.baidu)}`}>{row.baidu}</td>
                  <td className={`text-center px-4 py-2.5 font-mono ${getScoreColor(row.wechat)}`}>{row.wechat}</td>
                  <td className={`text-center px-4 py-2.5 font-mono ${getScoreColor(row.zhihu)}`}>{row.zhihu}</td>
                  <td className="text-center px-4 py-2.5 text-muted-foreground font-mono">{row.weight}%</td>
                </tr>
              ))}
              <tr className="bg-muted/30 font-semibold">
                <td className="px-4 py-3 text-foreground">加权总分</td>
                <td className={`text-center px-4 py-3 font-mono ${getScoreColor(weightedTotal('baidu'))}`}>{weightedTotal('baidu')}</td>
                <td className={`text-center px-4 py-3 font-mono ${getScoreColor(weightedTotal('wechat'))}`}>{weightedTotal('wechat')}</td>
                <td className={`text-center px-4 py-3 font-mono ${getScoreColor(weightedTotal('zhihu'))}`}>{weightedTotal('zhihu')}</td>
                <td className="text-center px-4 py-3 text-muted-foreground font-mono">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 评估方法说明 */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
          </svg>
          评估方法
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              title: 'DOM结构对比',
              desc: '解析原始页面与复刻页面的DOM树，计算节点类型、层级关系和语义标签的一致性比率',
              icon: 'code',
            },
            {
              title: 'CSS属性对比',
              desc: '提取关键CSS属性值（颜色、字体、间距、圆角、阴影），计算属性匹配度和偏差范围',
              icon: 'palette',
            },
            {
              title: '像素级视觉对比',
              desc: '对页面截图进行逐像素对比，使用SSIM结构相似性指标量化视觉还原度',
              icon: 'image',
            },
            {
              title: '功能测试用例覆盖率',
              desc: '基于预定义的功能测试用例集，自动执行交互测试并统计功能实现的完整度和正确率',
              icon: 'check',
            },
          ].map((method) => (
            <div key={method.title} className="bg-card rounded-lg shadow-card border border-border/15 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {method.icon === 'code' && <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>}
                    {method.icon === 'palette' && <><circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" /><circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" /><circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" /><circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></>}
                    {method.icon === 'image' && <><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></>}
                    {method.icon === 'check' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>}
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{method.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pl-11">{method.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
