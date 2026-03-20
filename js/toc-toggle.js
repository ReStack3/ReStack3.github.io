/* ============================================================
   TOC 悬浮目录 — 点击图标弹出/关闭
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  const tocCol = document.querySelector('.side-col:last-child');
  if (!tocCol) return;

  // 把原来的目录内容克隆出来放进悬浮面板
  const tocInner = tocCol.querySelector('#toc');
  if (!tocInner) return;

  // 隐藏原始右侧目录列，内容列撑满
  const contentCol = document.querySelector('.col-lg-8.nopadding-x-md');
  tocCol.style.cssText = 'display: none !important;';
  if (contentCol) {
    contentCol.style.cssText = 'flex: 0 0 100% !important; max-width: 100% !important;';
  }

  // ── 悬浮面板 ──────────────────────────────────────────────
  const panel = document.createElement('div');
  panel.id = 'toc-float-panel';
  panel.style.cssText = `
    position: fixed;
    top: 80px;
    right: -320px;
    width: 300px;
    max-height: 75vh;
    overflow-y: auto;
    background: rgba(250, 253, 246, 0.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(82, 183, 136, 0.25);
    border-right: none;
    border-radius: 8px 0 0 8px;
    box-shadow: -4px 4px 24px rgba(45, 106, 79, 0.15);
    padding: 1rem 1.2rem;
    z-index: 998;
    transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  `;

  // 把目录 HTML 复制进面板
  const tocClone = tocInner.cloneNode(true);
  panel.appendChild(tocClone);
  document.body.appendChild(panel);

  // ── 触发按钮 ──────────────────────────────────────────────
  const btn = document.createElement('button');
  btn.id = 'toc-toggle-btn';
  btn.title = '打开目录';
  btn.innerHTML = `
    <svg id="toc-icon-list" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
    <svg id="toc-icon-close" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  `;
  btn.style.cssText = `
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    z-index: 999;
    width: 36px;
    height: 52px;
    background: rgba(45, 106, 79, 0.82);
    color: #fff;
    border: none;
    border-radius: 8px 0 0 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -2px 2px 12px rgba(0,0,0,0.15);
    transition: background 0.2s, width 0.2s;
  `;
  document.body.appendChild(btn);

  // ── 滚动条样式 ─────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #toc-float-panel::-webkit-scrollbar { width: 4px; }
    #toc-float-panel::-webkit-scrollbar-thumb { background: rgba(82,183,136,0.4); border-radius: 2px; }
    #toc-toggle-btn:hover { background: rgba(45, 106, 79, 1) !important; width: 40px !important; }
    #toc-float-panel .toc-header { font-weight: 600; color: #2D6A4F; margin-bottom: .6rem; font-size: .9rem; letter-spacing: .08em; }
    #toc-float-panel a { color: #3D5A3E; font-size: .82rem; line-height: 1.8; text-decoration: none; display: block; }
    #toc-float-panel a:hover { color: #52B788; }
    #toc-float-panel .tocbot-active-link { color: #52B788 !important; font-weight: 600; }
  `;
  document.head.appendChild(style);

  // ── 开关逻辑 ──────────────────────────────────────────────
  let open = false;

  btn.addEventListener('click', function () {
    open = !open;

    if (open) {
      panel.style.right = '0';
      btn.style.right = '300px';
      btn.style.borderRadius = '8px 0 0 8px';
      btn.title = '关闭目录';
      document.getElementById('toc-icon-list').style.display = 'none';
      document.getElementById('toc-icon-close').style.display = 'block';
    } else {
      panel.style.right = '-320px';
      btn.style.right = '0';
      btn.title = '打开目录';
      document.getElementById('toc-icon-list').style.display = 'block';
      document.getElementById('toc-icon-close').style.display = 'none';
    }
  });

  // 点击面板外区域自动关闭
  document.addEventListener('click', function (e) {
    if (open && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      open = false;
      panel.style.right = '-320px';
      btn.style.right = '0';
      document.getElementById('toc-icon-list').style.display = 'block';
      document.getElementById('toc-icon-close').style.display = 'none';
    }
  });
});