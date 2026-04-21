/**
 * Wejean Lin Personal Page - Vanilla JS (Optimized)
 * 🔹 修复：移除人为延迟，启用即时主题切换 + GPU加速扫光，消除卡顿感
 */
(function() {
  'use strict';

  const themeToggle = document.getElementById('themeToggle');
  const themeWipe = document.querySelector('.theme-wipe');
  const html = document.documentElement;
  const toast = document.getElementById('toast');
  const toastClose = toast.querySelector('.toast-close');
  
  let toastTimer = null;

  // ========================================
  // Theme System 🔹 无延迟即时切换
  // ========================================
  const initTheme = () => {
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && systemDark);
    
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  };

  const toggleTheme = () => {
    // 获取按钮中心坐标（百分比，避免 px 计算导致的布局重排）
    const rect = themeToggle.getBoundingClientRect();
    const cx = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const cy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    
    // 设置扫光原点
    themeWipe.style.setProperty('--wipe-x', `${cx}%`);
    themeWipe.style.setProperty('--wipe-y', `${cy}%`);
    
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    // 🔹 关键优化：立即切换主题变量，配合 CSS transition 实现平滑过渡
    html.setAttribute('data-theme', newTheme);
    themeToggle.setAttribute('aria-pressed', newTheme === 'dark' ? 'true' : 'false');
    localStorage.setItem('theme', newTheme);
    
    // 同步移动端状态栏
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', newTheme === 'dark' ? '#1C1F26' : '#FAFAF9');

    // 触发对角线扫光动画（GPU 加速）
    requestAnimationFrame(() => themeWipe.classList.add('active'));
    
    // 动画结束后重置状态（800ms 匹配 CSS 时长）
    setTimeout(() => themeWipe.classList.remove('active'), 800);
  };

  // ========================================
  // Toast & Clipboard
  // ========================================
  const showToast = () => {
    if (toastTimer) clearTimeout(toastTimer);
    toast.classList.add('visible', 'animating');
    toastTimer = setTimeout(hideToast, 3000);
  };

  const hideToast = () => {
    toast.classList.remove('visible', 'animating');
    if (toastTimer) { clearTimeout(toastTimer); toastTimer = null; }
  };

  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      showToast();
    } catch (err) {
      console.warn('Clipboard failed:', err);
      alert(`Copy failed. Please manually copy: ${email}`);
    }
  };

  // ========================================
  // Event Listeners
  // ========================================
  const setupListeners = () => {
    themeToggle.addEventListener('click', toggleTheme);
    
    document.querySelectorAll('[data-email]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        copyEmail(el.getAttribute('data-email'));
      });
    });
    
    toastClose.addEventListener('click', (e) => {
      e.stopPropagation();
      hideToast();
    });
    
    toast.addEventListener('click', (e) => { if (e.target === toast) hideToast(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && toast.classList.contains('visible')) hideToast(); });
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  };

  // Init
  const init = () => {
    initTheme();
    setupListeners();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();