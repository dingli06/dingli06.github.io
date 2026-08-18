/**
 * 渲染层 — 各区块的模板函数
 * 接收 data.js 中的数据，返回 HTML 字符串
 */
import * as data from './data.js';

// ---------- 通用工具 ----------
// 把描述渲染成多行段落（按换行或指定的 extra 副文本）
function renderDesc(project) {
  let html = '';
  if (project.desc) html += `<p>${project.desc}</p>`;
  if (project.extra) html += `<p class="rs-muted">${project.extra}</p>`;
  return html;
}

// 把要点数组渲染成列表
function renderItems(items) {
  if (!items || !items.length) return '';
  return `
    <ul class="rs-list">
      ${items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}

// 以 Tab 形式渲染一组内容（tablist: { tab名: 图片/mp4 路径 }）
// 仅接受图片或 mp4，自动转换为对应的 <img> / <video> 标签
function mediaTag(path) {
  try {
    const pathname = path.split('?')[0].split('#')[0];
    const ext = pathname.split('.').pop().toLowerCase();
    if (ext === 'mp4') {
      return `<video controls preload="metadata" src="${path}"></video>`;
    }
    // 图片（png/jpg/jpeg/gif/webp/svg 等）
    return `<img src="${path}" alt="tab 内容" loading="lazy">`;
  } catch (e) {
    return '';
  }
}

function renderTabs(tablist) {
  if (!tablist || typeof tablist !== 'object') return '';
  const entries = Object.entries(tablist);
  if (!entries.length) return '';

  const tabs = entries
    .map(
      (t, i) => `
      <button class="rs-tab ${i === 0 ? 'is-active' : ''}"
              data-rs-tab="${i}"
              type="button">${t[0]}</button>`
    )
    .join('');

  const panels = entries
    .map(
      (t, i) => `
      <div class="rs-tab-panel ${i === 0 ? 'is-active' : ''}" data-rs-panel="${i}">
        ${mediaTag(t[1])}
      </div>`
    )
    .join('');

  return `
    <div class="rs-tabs" data-rs-tabs>
      <div class="rs-tab-bar">${tabs}</div>
      <div class="rs-tab-body">${panels}</div>
    </div>
  `;
}

// 时间线节点（用于工作经历/教育经历）
function timelineNode([title, sub, descHtml], isLast) {
  return `
    <div class="rs-timeline-node">
      <div class="rs-timeline-rail">
        <div class="rs-timeline-dot"></div>
        ${isLast ? '' : '<div class="rs-timeline-line"></div>'}
      </div>
      <div class="rs-timeline-content">
        <p class="rs-subhead">${title}</p>
        <p class="rs-muted">${sub}</p>
        ${descHtml}
      </div>
    </div>
  `;
}

// 区块标题（图标圆 + 文字）
function sectionHead(icon, text) {
  return `
    <h2 class="rs-section-head">
      <div class="rs-head-icon">
        <i class="fas ${icon}"></i>
      </div>
      ${text}
    </h2>
  `;
}

// 把文本中 [文字:URL] 的片段渲染为可点击链接
function linkify(text) {
  return String(text).replace(
    /\[([^\]]+?):(https?:\/\/[^\]]+)\]/g,
    (_, label, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`
  );
}

// ---------- 区块模板 ----------

export function renderHeader() {
  const p = data.profile;
  return `
    <div class="rs-card">
      <div class="rs-header-body">
        <div class="rs-avatar-wrap">
          <img src="${p.avatar}" alt="${p.name}头像">
        </div>
        <div class="rs-header-info">
          <h1 class="rs-name">${p.name}</h1>
          <div class="rs-bio">
            <span class="rs-bio-item"><i class="fas fa-venus-mars"></i> ${p.gender} | ${p.age}</span>
            <span class="rs-bio-item"><i class="fas fa-map-marker-alt"></i> 籍贯:${p.hometown}</span>
          </div>
          <div class="rs-contact">
            <div><i class="fas fa-phone"></i><span>${p.phone}</span></div>
            <div><i class="fas fa-envelope"></i><span>${p.email}</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderJob() {
  const j = data.job;
  return `
    <div class="rs-card">
      ${sectionHead('fa-briefcase', '求职信息')}
      <div class="rs-grid-2">
        <div>
          <p><span class="rs-label">工作时长:</span> ${j.duration}</p>
          <p><span class="rs-label">求职意向:</span> ${j.intent}</p>
        </div>
        <div>
          <p><span class="rs-label">Slogan:</span> ${j.advantage}</p>
          <p><span class="rs-label">期望薪资:</span> ${j.salary}</p>
        </div>
      </div>
    </div>
  `;
}

export function renderEducation() {
  const items = data.education
    .map((e, i) =>
      timelineNode(
        [e.school, e.major, `<p><span class="rs-label">${e.gpa}</span></p>`],
        i === data.education.length - 1
      )
    )
    .join('');
  return `
    <div class="rs-card">
      ${sectionHead('fa-graduation-cap', '教育经历')}
      ${items}
    </div>
  `;
}

export function renderSkills() {
  const groups = Object.entries(data.skills)
    .map(
      ([name, pills]) => `
      <div class="rs-skill-group">
        <h3 class="rs-subhead">${name}:</h3>
        <div class="rs-pills">
          ${pills.map((s) => `<span class="rs-pill">${s}</span>`).join('')}
        </div>
      </div>
    `
    )
    .join('');
  return `
    <div class="rs-card">
      ${sectionHead('fa-code', '专业技能')}
      ${groups}
    </div>
  `;
}

export function renderExperience() {
  const items = data.experiences
    .map((e) =>
      timelineNode([e.company, e.duration, `<p>${e.desc}</p>`], !!e.isLast)
    )
    .join('');
  return `
    <div class="rs-card">
      ${sectionHead('fa-building', '工作经历')}
      ${items}
    </div>
  `;
}

export function renderAwards() {
  return `
    <div class="rs-card">
      ${sectionHead('fa-trophy', '荣誉奖项')}
      <ul class="rs-list">
        ${data.awards.map((a) => `<li>${linkify(a)}</li>`).join('')}
      </ul>
    </div>
  `;
}

export function renderProject(project, isLast) {
  let body = renderDesc(project);
  body += renderItems(project.items);

  // 带子标题的分区项目（如政务民情）
  if (project.sections) {
    body = project.sections
      .map((s) => {
        let html = `<h4 class="${s !== project.sections[0] ? 'rs-subhead-mt' : 'rs-subhead'}">${s.heading}</h4>`;
        if (s.desc) html += `<p>${s.desc}</p>`;
        html += renderItems(s.items);
        return html;
      })
      .join('');
  }

  // 以 Tab 形式渲染的一组内容（tablist）
  body += renderTabs(project.tablist);

  return `
    <div class="${isLast ? '' : 'rs-block'}">
      <h3 class="rs-title">${project.title}</h3>
      <p class="rs-muted">${project.duration}</p>
      ${body}
    </div>
  `;
}

export function renderProjects() {
  const items = data.projects
    .map((p, i) => renderProject(p, i === data.projects.length - 1))
    .join('');
  return `
    <div class="rs-card">
      ${sectionHead('fa-project-diagram', '项目经历')}
      ${items}
    </div>
  `;
}

export function renderHobbies() {
  return `
    <div class="rs-card">
      ${sectionHead('fa-heart', '兴趣爱好')}
      <div class="rs-pills">
        ${data.hobbies
          .map((h) => `<span class="rs-pill"><i class="fas ${h.icon}"></i> ${h.text}</span>`)
          .join('')}
      </div>
    </div>
  `;
}

export function renderFooter() {
  const f = data.footer;
  return `
    <footer class="rs-footer">
      <div class="rs-container">
        <p>${f.text} <a href="${f.link}">${f.linkText}</a></p>
        <p class="rs-footer-note">${f.note}</p>
      </div>
    </footer>
  `;
}

// 导出所有区块，供装配器按需挂载
export const sections = [
  renderHeader,
  renderJob,
  renderEducation,
  renderSkills,
  renderExperience,
  renderAwards,
  renderProjects,
  renderHobbies,
  renderFooter,
];
