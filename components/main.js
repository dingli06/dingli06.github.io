/**
 * 装配层 — 将各组件渲染挂载到页面
 * 通过 data-* 属性决定每个挂载点渲染哪个区块
 * 提供两种视图：
 *   1. 拼图模式（默认）：WinPE8 Metro 磁贴，hover 磁贴渲染对应区块到详情面板
 *   2. 完整列表模式：按原来的竖排卡片完整展示所有区块
 */
import { sections } from './render.js';
import { metroTiles } from './data.js';

// ---------- 基础挂载 ----------
/**
 * 渲染指定区块到元素中
 * @param {string} mountId   挂载点元素 id（去掉 #）
 * @param {function} render  区块渲染函数
 */
function mount(mountId, render) {
  const el = document.getElementById(mountId);
  if (!el) {
    console.warn(`[mount] 未找到挂载点 #${mountId}`);
    return;
  }
  el.innerHTML = render();
}

/**
 * 渲染指定区块并返回 HTML 字符串（不写入 DOM）
 */
function renderSectionHtml(idx) {
  const render = sections[idx];
  return render ? render() : '';
}

// ---------- 完整列表模式 ----------
// 区块挂载映射：挂载点 id -> sections 索引
const listMounts = {
  'section-job': 1,         // 求职
  'section-education': 2,   // 教育
  'section-skills': 3,      // 技能
  'section-experience': 4,  // 工作
  'section-awards': 5,      // 荣誉
  'section-projects': 6,    // 项目
  'section-hobbies': 7,     // 兴趣
  'section-gallery': 8,     // 作品展示
};

function initListMode() {
  Object.entries(listMounts).forEach(([id, idx]) => {
    const render = sections[idx];
    if (render) mount(id, render);
  });
}

// ---------- 拼图（Metro 磁贴）模式 ----------
const METRO_CONTAINER = 'section-metro';

/**
 * 渲染拼图模式的磁贴网格 + 详情面板
 * 默认 hover 第一个磁贴，展示其对应区块内容
 */
function initMetroMode() {
  const container = document.getElementById(METRO_CONTAINER);
  if (!container) return;

  // 磁贴网格
  const tilesHtml = metroTiles
    .map(
      (t, i) => `
        <button class="rs-tile${i === 0 ? ' is-active' : ''}"
                data-rs-tile-idx="${t.idx}"
                data-rs-tile="${t.id}"
                style="--tile-bg:${t.color}"
                type="button"
                aria-pressed="${i === 0}">
          <i class="fas ${t.tile}"></i>
          <span class="rs-tile-label">${t.label}</span>
        </button>`
    )
    .join('');

  container.innerHTML = `
    <div class="rs-metro-body">
      <div class="rs-metro-grid">${tilesHtml}</div>
      <div class="rs-metro-panel" data-rs-metro-panel>
        ${renderSectionHtml(metroTiles[0].idx)}
      </div>
    </div>
  `;

  const panel = container.querySelector('[data-rs-metro-panel]');
  const tiles = container.querySelectorAll('.rs-tile');

  // 鼠标悬浮（或聚焦）磁贴 => 渲染对应区块到详情面板
  const showTile = (tile) => {
    tiles.forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-pressed', 'false');
    });
    tile.classList.add('is-active');
    tile.setAttribute('aria-pressed', 'true');
    panel.innerHTML = renderSectionHtml(Number(tile.dataset.rsTileIdx));
    bindTabsIn(panel); // 面板内新渲染的 rs-tabs 需要重新绑定
  };

  tiles.forEach((tile) => {
    // 触屏友好：click 也触发切换
    tile.addEventListener('click', () => showTile(tile));
    tile.addEventListener('mouseenter', () => showTile(tile));
    tile.addEventListener('focus', () => showTile(tile));
  });
}

// ---------- 视图切换 ----------
function switchView(view) {
  const metro = document.getElementById(METRO_CONTAINER);
  const list = document.getElementById('section-list-hidden');
  const buttons = document.querySelectorAll('#view-switch [data-rs-view]');

  buttons.forEach((btn) => {
    const active = btn.dataset.rsView === view;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  const isMetro = view === 'metro';
  if (metro) metro.hidden = !isMetro;
  if (list) list.hidden = isMetro;

  document.documentElement.dataset.rsView = view;
}

function initViewSwitch() {
  const bar = document.getElementById('view-switch');
  if (!bar) return;

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-rs-view]');
    if (!btn) return;
    switchView(btn.dataset.rsView);
  });
}

// ---------- 初始化 ----------
function init() {
  // 头部与页脚始终分别渲染
  mount('section-header', sections[0]);
  mount('section-footer', sections[9]);

  // 两种视图内容均预先渲染，切换时仅显示/隐藏
  initMetroMode();
  initListMode();

  // Tab 切换逻辑（渲染函数内的 rs-tabs）
  initTabs();
  initGallery();

  // 默认拼图模式
  initViewSwitch();
  switchView('metro');
}

// 为指定容器内的所有 .rs-tabs 启用 Tab 切换
function bindTabsIn(root) {
  root.querySelectorAll('[data-rs-tabs]').forEach((tabsRoot) => {
    const tabs = tabsRoot.querySelectorAll('.rs-tab');
    const panels = tabsRoot.querySelectorAll('.rs-tab-panel');
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('is-active'));
        panels.forEach((p) => p.classList.remove('is-active'));
        tab.classList.add('is-active');
        panels[i].classList.add('is-active');
      });
    });
  });
}

// 为整个文档的所有 .rs-tabs 启用 Tab 切换
function initTabs() {
  bindTabsIn(document);
}

function initGallery() {
  if (typeof window === 'undefined') return;

  window.__rsGallerySelectItem = (btn, index) => {
    const root = btn.closest('[data-rs-gallery]');
    if (!root) return;

    const itemButtons = root.querySelectorAll('[data-rs-gallery-item-btn]');
    const itemPanels = root.querySelectorAll('[data-rs-gallery-item-panel]');

    itemButtons.forEach((itemBtn) => {
      const active = Number(itemBtn.dataset.rsGalleryItemBtn) === index;
      itemBtn.classList.toggle('is-active', active);
    });

    itemPanels.forEach((panel) => {
      const active = Number(panel.dataset.rsGalleryItemPanel) === index;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  };

  window.__rsGallerySelectShow = (btn, index) => {
    const group = btn.closest('[data-rs-gallery-show]');
    if (!group) return;

    const chips = group.querySelectorAll('[data-rs-gallery-show-btn]');
    const panels = group.querySelectorAll('[data-rs-gallery-show-panel]');

    chips.forEach((chip) => {
      const active = Number(chip.dataset.rsGalleryShowBtn) === index;
      chip.classList.toggle('is-active', active);
    });

    panels.forEach((panel) => {
      const active = Number(panel.dataset.rsGalleryShowPanel) === index;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  };
}

// 页面加载完成后装配
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
