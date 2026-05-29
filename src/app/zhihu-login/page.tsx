'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

type LoginTab = 'phone' | 'password';

export default function ZhihuLoginPage() {
  const [activeTab, setActiveTab] = useState<LoginTab>('phone');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Toast
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({ visible: false, message: '' });

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: '' }), 2500);
  }, []);

  // 倒计时
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [countdown]);

  const sendCode = useCallback(() => {
    if (countdown > 0) return;
    showToast('验证码已发送至手机');
    setCountdown(60);
  }, [countdown, showToast]);

  const handleLogin = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('登录成功，欢迎回到知乎');
    }, 1800);
  }, [showToast]);

  return (
    <main className="flex-1 min-h-0 overflow-y-auto bg-background">
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        {/* 左侧品牌展示区域 */}
        <div className="flex-1 flex flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-16 w-64 h-64 rounded-full bg-primary blur-[100px]" />
            <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-primary blur-[80px]" />
            <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-primary blur-[60px]" />
          </div>

          <div className="relative z-10 text-center max-w-md">
            <div className="mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                <span className="text-primary font-bold text-3xl">知</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">有问题，就会有答案</h1>
            <p className="text-base text-muted-foreground leading-relaxed">知乎，让每个人高效获得可信赖的解答</p>

            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { icon: 'message', label: '提出问题' },
                { icon: 'pen', label: '分享知识' },
                { icon: 'lightbulb', label: '发现世界' },
              ].map((item) => (
                <div key={item.label} className="bg-muted/50 rounded-xl p-4 border border-border/10">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {item.icon === 'message' && <><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /></>}
                      {item.icon === 'pen' && <><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></>}
                      {item.icon === 'lightbulb' && <><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>}
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-8 text-center">
              {[
                { value: '4.2亿', label: '累计问题' },
                { value: '2.8亿', label: '累计回答' },
                { value: '1.0亿', label: '活跃用户' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-8">
                  {i > 0 && <div className="w-px h-10 bg-border/20 -ml-8" />}
                  <div>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧分割线 */}
        <div className="w-px bg-border/20" />

        {/* 右侧登录表单区域 */}
        <div className="w-[440px] shrink-0 flex flex-col items-center justify-center p-10">
          <div className="w-full max-w-sm">
            {/* 登录方式切换 Tab */}
            <div className="flex mb-8 bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveTab('phone')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'phone' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                手机号登录
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'password' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                密码登录
              </button>
            </div>

            {/* 手机号登录表单 */}
            {activeTab === 'phone' && (
              <div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-xs font-medium text-muted-foreground mb-1.5">手机号</label>
                  <div className="flex items-center bg-muted rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 transition-all">
                    <span className="pl-3 pr-1 text-sm text-muted-foreground shrink-0">+86</span>
                    <div className="w-px h-5 bg-border/30 mx-1" />
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="请输入手机号"
                      maxLength={11}
                      className="flex-1 bg-transparent border-none px-2 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="sms-code" className="block text-xs font-medium text-muted-foreground mb-1.5">验证码</label>
                  <div className="flex gap-3">
                    <input
                      id="sms-code"
                      type="text"
                      value={smsCode}
                      onChange={(e) => setSmsCode(e.target.value)}
                      placeholder="请输入验证码"
                      maxLength={6}
                      className="flex-1 bg-muted border-none rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                    />
                    <button
                      onClick={sendCode}
                      disabled={countdown > 0}
                      className={`shrink-0 px-4 py-2.5 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 active:scale-[0.98] transition-all whitespace-nowrap ${
                        countdown > 0 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {countdown > 0 ? `${countdown}s 后重发` : '发送验证码'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 密码登录表单 */}
            {activeTab === 'password' && (
              <div>
                <div className="mb-4">
                  <label htmlFor="account" className="block text-xs font-medium text-muted-foreground mb-1.5">邮箱或手机号</label>
                  <input
                    id="account"
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="请输入邮箱或手机号"
                    className="w-full bg-muted border-none rounded-md px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="zhihu-pwd" className="block text-xs font-medium text-muted-foreground mb-1.5">密码</label>
                  <div className="relative">
                    <input
                      id="zhihu-pwd"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="请输入密码"
                      className="w-full bg-muted border-none rounded-md px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mb-4 text-right">
                  <a href="#" className="text-xs text-primary hover:underline" onClick={(e) => e.preventDefault()}>忘记密码？</a>
                </div>
              </div>
            )}

            {/* 登录按钮 */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity={0.25} />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" opacity={0.75} />
                  </svg>
                  登录中
                </>
              ) : (
                '登录'
              )}
            </button>

            {/* 用户协议提示 */}
            <p className="text-xs text-muted-foreground/60 mt-3 text-center leading-relaxed">
              登录即表示同意
              <a href="#" className="text-primary/70 hover:text-primary hover:underline" onClick={(e) => e.preventDefault()}>《知乎协议》</a>
              和
              <a href="#" className="text-primary/70 hover:text-primary hover:underline" onClick={(e) => e.preventDefault()}>《隐私保护指引》</a>
            </p>

            {/* 分隔线 */}
            <div className="flex items-center gap-3 my-8">
              <div className="flex-1 h-px bg-border/20" />
              <span className="text-xs text-muted-foreground/50 shrink-0">第三方账号登录</span>
              <div className="flex-1 h-px bg-border/20" />
            </div>

            {/* 第三方登录区域 */}
            <div className="flex items-center justify-center gap-6">
              {[
                { name: '微信', icon: 'message' },
                { name: 'QQ', icon: 'penguin' },
                { name: '微博', icon: 'at-sign' },
              ].map((item) => (
                <button key={item.name} className="flex flex-col items-center gap-1.5 group" title={`${item.name}登录`}>
                  <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center border border-border/10 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                    <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {item.icon === 'message' && <><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /></>}
                      {item.icon === 'penguin' && <><circle cx="12" cy="12" r="10" /></>}
                      {item.icon === 'at-sign' && <><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" /></>}
                    </svg>
                  </div>
                  <span className="text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">{item.name}</span>
                </button>
              ))}
            </div>

            {/* 注册链接 */}
            <div className="mt-8 text-center">
              <span className="text-sm text-muted-foreground">还没有账号？</span>
              <a href="#" className="text-sm text-primary font-medium hover:underline ml-1" onClick={(e) => e.preventDefault()}>注册知乎账号</a>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.visible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-surface-container-high rounded-lg shadow-float px-5 py-3 flex items-center gap-2.5 border border-border/20">
            <div className="w-6 h-6 rounded-full bg-success/15 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-sm font-medium text-foreground">{toast.message}</span>
          </div>
        </div>
      )}
    </main>
  );
}
