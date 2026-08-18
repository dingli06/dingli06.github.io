/**
 * 装配层 — 将各组件渲染挂载到页面
 * 通过 data-* 属性决定每个挂载点渲染哪个区块
 */
import { sections } from './render.js';

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

// 区块挂载映射：挂载点 id -> 渲染函数
const mounts = {
  'section-header': 0,      // 头部
  'section-job': 1,         // 求职
  'section-education': 2,   // 教育
  'section-skills': 3,      // 技能
  'section-experience': 4,  // 工作
  'section-awards': 5,      // 荣誉
  'section-projects': 6,    // 项目
  'section-hobbies': 7,     // 兴趣
  'section-footer': 8,      // 页脚
};

function init() {
  Object.entries(mounts).forEach(([id, idx]) => {
    const render = sections[idx];
    if (render) mount(id, render);
  });
  initTabs();
}

// 为所有 .rs-tabs 启用 Tab 切换
function initTabs() {
  document.querySelectorAll('[data-rs-tabs]').forEach((root) => {
    const tabs = root.querySelectorAll('.rs-tab');
    const panels = root.querySelectorAll('.rs-tab-panel');
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

// 页面加载完成后装配
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
