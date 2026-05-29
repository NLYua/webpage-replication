'use client';

import { useState, useCallback } from 'react';

const HOT_SEARCHES = [
  { keyword: '2025年高考报名时间', rank: 1, hot: true },
  { keyword: 'AI大模型最新突破', rank: 2, hot: true },
  { keyword: '全国房价走势分析', rank: 3, hot: true },
  { keyword: '新能源汽车补贴政策', rank: 4, hot: false },
  { keyword: '热门旅游景点推荐', rank: 5, hot: false },
  { keyword: 'Python入门教程', rank: 6, hot: false },
  { keyword: '健康饮食搭配方案', rank: 7, hot: false },
  { keyword: '电影票房排行榜', rank: 8, hot: false },
];

const SEARCH_RESULTS = [
  {
    title: '人工智能 - 百度百科',
    url: 'baike.baidu.com',
    date: '2024-12-20',
    snippet: '人工智能（Artificial Intelligence），英文缩写为AI。它是研究、开发用于模拟、延伸和扩展人的智能的理论、方法、技术及应用系统的一门新的技术科学。人工智能是计算机科学的一个分支…',
  },
  {
    title: '什么是人工智能？AI技术的现状与未来发展趋势 - 知乎专栏',
    url: 'zhuanlan.zhihu.com',
    date: '2025-01-05',
    snippet: '本文详细介绍了人工智能的定义、发展历程以及当前主流技术方向，包括机器学习、深度学习、自然语言处理等核心领域。同时分析了AI技术在医疗、金融、教育等行业的应用前景…',
  },
  {
    title: '2025年人工智能十大趋势预测 - 36氪',
    url: '36kr.com',
    date: '2025-02-18',
    snippet: '随着大模型技术的持续突破，2025年人工智能领域将迎来新的变革。从多模态融合到Agent智能体，从具身智能到AI安全治理，本文梳理了最具影响力的十大技术趋势…',
  },
  {
    title: 'AI人工智能入门教程 - 菜鸟教程',
    url: 'www.runoob.com',
    date: '2024-11-10',
    snippet: '人工智能入门教程，涵盖机器学习基础、Python编程、TensorFlow框架使用等内容。适合零基础学习者，配有丰富的代码示例和实践项目，从理论到实战全面掌握AI开发技能…',
  },
  {
    title: '人工智能最新研究成果 - 中国科学院',
    url: 'www.cas.cn',
    date: '2025-01-22',
    snippet: '中国科学院自动化研究所发布最新AI研究成果，在视觉感知、语音识别、知识推理等方向取得重大突破。相关论文已在Nature和Science等顶级期刊发表…',
  },
  {
    title: '全球AI公司排名2025 - Forbes',
    url: 'www.forbes.com',
    date: '2025-03-01',
    snippet: 'Forbes发布2025年度全球最具影响力的AI公司榜单，OpenAI、Google DeepMind、Anthropic等公司名列前茅。中国企业在大模型领域表现亮眼…',
  },
  {
    title: '人工智能伦理与安全：我们需要关注什么？ - 新华网',
    url: 'www.xinhuanet.com',
    date: '2025-02-28',
    snippet: '随着AI技术的飞速发展，人工智能伦理和安全问题日益受到关注。从算法偏见到数据隐私，从自主武器到深度伪造，本文深入探讨了AI发展中的关键伦理挑战及应对策略…',
  },
];

const NAV_ITEMS = ['新闻', 'hao123', '地图', '贴吧', '视频', '图片', '网盘', '更多'];

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) return <span className="w-5 h-5 rounded-sm bg-error/20 text-error text-xs font-bold flex items-center justify-center shrink-0">{rank}</span>;
  if (rank <= 5) return <span className="w-5 h-5 rounded-sm bg-warning/20 text-warning text-xs font-bold flex items-center justify-center shrink-0">{rank}</span>;
  return <span className="w-5 h-5 rounded-sm bg-surface-container-high text-muted-foreground text-xs font-bold flex items-center justify-center shrink-0">{rank}</span>;
}

export default function BaiduPage() {
  const [view, setView] = useState<'home' | 'result'>('home');
  const [keyword, setKeyword] = useState('');
  const [resultKeyword, setResultKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [resultCount, setResultCount] = useState(0);

  const doSearch = useCallback((kw: string) => {
    if (!kw.trim()) return;
    setResultKeyword(kw.trim());
    setResultCount(Math.floor(Math.random() * 9000000) + 1000000);
    setCurrentPage(1);
    setView('result');
    window.scrollTo(0, 0);
  }, []);

  const handleHomeSearch = () => doSearch(keyword);
  const handleResultSearch = () => doSearch(resultKeyword);
  const handleHotClick = (kw: string) => {
    setKeyword(kw);
    doSearch(kw);
  };

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background">
      {/* 首页视图 */}
      {view === 'home' && (
        <div className="flex flex-col items-center" style={{ paddingTop: '12vh' }}>
          {/* 百度顶部导航 */}
          <nav className="w-full max-w-[640px] flex items-center justify-end gap-4 mb-6 px-2">
            {NAV_ITEMS.map((item) => (
              <a key={item} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors" onClick={(e) => e.preventDefault()}>
                {item}
              </a>
            ))}
          </nav>

          {/* 百度 Logo */}
          <div className="mb-8 select-none">
            <span className="text-6xl font-bold tracking-tight">
              <span className="text-primary">B</span><span className="text-foreground">aidu</span>
            </span>
          </div>

          {/* 搜索框区域 */}
          <div className="w-full max-w-[640px] flex items-center gap-2 px-2">
            <div className="flex-1 flex items-center bg-muted border-none rounded-full px-5 py-3 focus-within:ring-2 focus-within:ring-primary/30 transition-shadow">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleHomeSearch()}
                className="flex-1 bg-transparent border-none outline-none text-base text-foreground placeholder:text-muted-foreground/50"
                placeholder="输入搜索内容"
                autoComplete="off"
              />
              <div className="flex items-center gap-3 ml-2">
                <button className="text-muted-foreground hover:text-primary transition-colors" title="语音搜索">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </button>
                <button className="text-muted-foreground hover:text-primary transition-colors" title="拍照搜索">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />
                  </svg>
                </button>
              </div>
            </div>
            <button
              onClick={handleHomeSearch}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shrink-0"
            >
              百度一下
            </button>
          </div>

          {/* 搜索热榜 */}
          <div className="w-full max-w-[640px] mt-8 px-2">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              <span className="text-sm font-semibold text-foreground">百度热榜</span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {HOT_SEARCHES.map((item) => (
                <button
                  key={item.rank}
                  onClick={() => handleHotClick(item.keyword)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group text-left"
                >
                  <RankBadge rank={item.rank} />
                  <span className="truncate group-hover:underline">{item.keyword}</span>
                  {item.hot && <span className="text-xs text-error ml-auto shrink-0">热</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 搜索结果视图 */}
      {view === 'result' && (
        <div>
          {/* 结果页顶部栏 */}
          <div className="sticky top-14 z-30 bg-card/95 backdrop-blur-sm border-b border-border/20">
            <div className="max-w-[780px] mx-auto flex items-center gap-4 py-3 px-4">
              <button
                onClick={() => { setView('home'); setKeyword(''); }}
                className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                title="返回首页"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
                </svg>
              </button>
              <div className="flex-1 flex items-center bg-muted border-none rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-primary/30 transition-shadow">
                <input
                  type="text"
                  value={resultKeyword}
                  onChange={(e) => setResultKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleResultSearch()}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/50"
                  placeholder="输入搜索内容"
                  autoComplete="off"
                />
              </div>
              <button
                onClick={handleResultSearch}
                className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shrink-0"
              >
                百度一下
              </button>
            </div>
          </div>

          {/* 搜索结果内容区 */}
          <div className="max-w-[780px] mx-auto px-4 py-5">
            <p className="text-xs text-muted-foreground mb-5">百度为您找到相关结果约 {resultCount.toLocaleString()} 条</p>

            <div className="space-y-6">
              {SEARCH_RESULTS.map((result, i) => (
                <div key={i}>
                  <a href="#" className="text-lg font-medium text-primary hover:underline leading-snug" onClick={(e) => e.preventDefault()}>
                    {result.title}
                  </a>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">{result.snippet}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-success">{result.url}</span>
                    <span className="text-xs text-muted-foreground/50">- {result.date}</span>
                    <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors" onClick={(e) => e.preventDefault()}>百度快照</a>
                  </div>
                </div>
              ))}
            </div>

            {/* 翻页组件 */}
            <div className="flex items-center justify-center gap-1 mt-10 mb-8">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                上一页
              </button>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 text-sm rounded transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
                disabled={currentPage === 10}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
