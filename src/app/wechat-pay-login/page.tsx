'use client';

import { useState, useCallback } from 'react';

function generateCaptcha(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

type ToastType = 'success' | 'error';

export default function WechatPayLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('A7K2');
  const [loading, setLoading] = useState(false);

  // Toast
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: ToastType }>({
    visible: false,
    message: '',
    type: 'success',
  });

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
  }, []);

  const refreshCaptcha = useCallback(() => {
    setCaptchaCode(generateCaptcha());
  }, []);

  const isCaptchaValid = useCallback((value: string) => {
    return /^[A-Z0-9]{4}$/.test(value.trim().toUpperCase());
  }, []);

  const handleLogin = useCallback(() => {
    if (!username.trim()) {
      showToast('请输入用户名', 'error');
      return;
    }
    if (!password.trim()) {
      showToast('请输入密码', 'error');
      return;
    }
    const rawCaptcha = captcha.trim().toUpperCase();
    if (!rawCaptcha) {
      showToast('请输入验证码', 'error');
      return;
    }
    if (!isCaptchaValid(rawCaptcha)) {
      showToast('验证码位数不对，请输入4位验证码', 'error');
      return;
    }
    if (rawCaptcha !== captchaCode) {
      showToast('验证码错误，请重新输入', 'error');
      setCaptcha('');
      refreshCaptcha();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('登录成功，正在跳转...', 'success');
    }, 2000);
  }, [username, password, captcha, captchaCode, showToast, refreshCaptcha, isCaptchaValid]);

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)]">
      {/* 左侧品牌展示区域 */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center relative overflow-hidden bg-surface-container-lowest">
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-32 right-16 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-primary/15 blur-2xl" />
        </div>

        {/* 品牌内容 */}
        <div className="relative z-10 flex flex-col items-center text-center px-12">
          <div className="mb-10 flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl bg-primary/15 flex items-center justify-center shadow-float border border-primary/20">
              <svg viewBox="0 0 48 48" className="w-14 h-14" fill="none">
                <path d="M17.5 12C11.15 12 6 16.25 6 21.5c0 3 1.6 5.7 4.1 7.5L9 33l4.5-2.2c1.3.4 2.6.7 4 .7.4 0 .8 0 1.2-.1-.3-.9-.4-1.8-.4-2.8 0-5.8 5.3-10.6 11.7-10.6.5 0 1 0 1.5.1C29.8 14.2 24.1 12 17.5 12z" fill="#16A34A" />
                <path d="M30 19.5c-5.5 0-10 3.8-10 8.5s4.5 8.5 10 8.5c1.2 0 2.3-.2 3.3-.5L37 38l-1-3.5c2-1.5 3.2-3.7 3.2-6 0-4.7-4.5-9-9.2-9z" fill="#16A34A" opacity={0.7} />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">微信支付</h1>
          <p className="text-xl text-primary font-medium mb-6">不止支付</p>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            微信支付商户平台，为商户提供安全、便捷、高效的支付解决方案，助力商业数字化转型
          </p>

          <div className="mt-12 space-y-4 w-full max-w-xs">
            {[
              { icon: 'shield', title: '安全可靠', desc: '多重风控体系保障资金安全' },
              { icon: 'zap', title: '便捷高效', desc: '秒级到账，实时结算' },
              { icon: 'globe', title: '全面覆盖', desc: '支持线上线下全场景支付' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon === 'shield' && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>}
                    {item.icon === 'zap' && <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>}
                    {item.icon === 'globe' && <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>}
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 右侧登录表单区域 */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          {/* 移动端 Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/20">
              <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none">
                <path d="M17.5 12C11.15 12 6 16.25 6 21.5c0 3 1.6 5.7 4.1 7.5L9 33l4.5-2.2c1.3.4 2.6.7 4 .7.4 0 .8 0 1.2-.1-.3-.9-.4-1.8-.4-2.8 0-5.8 5.3-10.6 11.7-10.6.5 0 1 0 1.5.1C29.8 14.2 24.1 12 17.5 12z" fill="#16A34A" />
                <path d="M30 19.5c-5.5 0-10 3.8-10 8.5s4.5 8.5 10 8.5c1.2 0 2.3-.2 3.3-.5L37 38l-1-3.5c2-1.5 3.2-3.7 3.2-6 0-4.7-4.5-9-9.2-9z" fill="#16A34A" opacity={0.7} />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">微信支付商户平台</h1>
              <p className="text-xs text-primary">不止支付</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">商户登录</h2>
            <p className="text-sm text-muted-foreground mt-1.5">登录您的微信支付商户账号</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* 用户名 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1.5">用户名</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入商户号/用户名"
                  className="w-full bg-muted border-none rounded-md pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                />
              </div>
            </div>

            {/* 密码 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">密码</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full bg-muted border-none rounded-md pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* 验证码 */}
            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-foreground mb-1.5">验证码</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <input
                    id="captcha"
                    type="text"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    placeholder="请输入验证码"
                    maxLength={4}
                    className="w-full bg-muted border-none rounded-md pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                  />
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="w-[120px] h-[42px] rounded-md bg-surface-container-high flex items-center justify-center cursor-pointer select-none overflow-hidden shrink-0 hover:opacity-80 transition-opacity"
                  title="点击刷新验证码"
                >
                  <span className="text-lg font-bold tracking-widest text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.3em' }}>
                    {captchaCode}
                  </span>
                </button>
              </div>
              <p className="text-xs text-muted-foreground/60 mt-1.5">看不清？点击验证码图片刷新</p>
            </div>

            {/* 记住我 */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded bg-muted border-border text-primary focus:ring-2 focus:ring-primary/30 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">记住我</label>
            </div>

            {/* 登录按钮 */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-md text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 min-h-[42px]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4.5 h-4.5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity={0.3} />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  验证中...
                </>
              ) : (
                '登 录'
              )}
            </button>
          </form>

          {/* 底部链接 */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <a href="#" className="text-sm text-primary hover:underline" onClick={(e) => e.preventDefault()}>忘记密码</a>
            <span className="text-border">|</span>
            <a href="#" className="text-sm text-primary hover:underline" onClick={(e) => e.preventDefault()}>注册账号</a>
          </div>

          {/* 版权信息 */}
          <div className="mt-16 text-center">
            <p className="text-xs text-muted-foreground/60">Copyright &copy; 2012-2025 Tencent. All Rights Reserved.</p>
            <p className="text-xs text-muted-foreground/40 mt-1">微信支付 版权所有</p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.visible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
          <div className={`flex items-center gap-2.5 px-5 py-3 rounded-lg shadow-dialog border border-border/20 ${
            toast.type === 'success' ? 'bg-success/15 text-success' : 'bg-error/15 text-error'
          }`}>
            {toast.type === 'success' ? (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </main>
  );
}
