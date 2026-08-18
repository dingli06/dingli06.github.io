/**
 * 数据层 — 所有页面内容集中在此管理
 * 修改简历内容只需改这里，无需动 HTML
 */

// 头部信息
// 公用计算：从起始日期算到现在的年/月（复用同一套逻辑）
// ageMode 为 true 时按“周岁”返回（如 26岁），否则按“年/月”返回（如 3年、2年5个月）
function calcSince(start, ageMode) {
  const s = new Date(start);
  const now = new Date();
  const years = now.getFullYear() - s.getFullYear();
  const months = now.getMonth() - s.getMonth();
  const totalMonths = years * 12 + months;
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (ageMode) return `${y}岁`;
  if (y === 0) return `${m}个月`;
  if (m === 0) return `${y}年`;
  return `${y}年${m}个月`;
}

export const profile = {
  name: '李定嘉',
  avatar: './avatar/avatar.jpg',
  gender: '男',
  // 年龄自动计算：按出生日期推算（周岁）
  age: calcSince('2000-06-09', true),
  hometown: '重庆',
  phone: '18523369184',
  email: 'dingjiali69@163.com',
};

// 求职信息
// duration 自动计算：从 2023 年 8 月至今
export const job = {
  duration: calcSince('2023-08-01'),
  intent: '算法工程师',
  advantage: 'Hard starts. Easy follows.',
  salary: '28k-32k',
};

// 教育经历（支持多条，渲染为时间线）
export const education = [
  {
    school: '黑龙江工程学院',
    major: '本科 智能科学与技术 (2019-2023)',
    gpa: 'GPA: 4.4/5 (系3%,专业第一)',
  },
];

// 专业技能 — 分类分组，key 为分类名，value 为技能数组
export const skills = {
  '编程语言': ['Python',"React"],
  '机器学习': ['回归', '分类', '聚类', '降维', 'RNN', 'Transformer/BERT', 'Spacy', 'HF', 'Sklearn'],
  '数据工程': ['数据挖掘', '数据清洗', '数据存储', '数据分析', 'MySQL', 'requests', 'pandas'],
  '部署与Web服务': ['Docker', 'FastAPI'],
  '大模型': ['数据生产', 'SFT/Lora', 'RAG评估', 'Vllm/Flash/Fast LLM/Sglang', '国产GPU部署'],
};

// 工作经历
export const experiences = [
  {
    company: '广州希姆计算科技有限公司',
    duration: '算法工程师 (2024.07-至今)',
    desc: '主要负责一体机的算法研发工作以及提效设计',
  },
  {
    company: '北京文因互联科技有限公司',
    duration: '算法工程师 (2023.07-2024.06)',
    desc: '主导大模型的训练/测试/推理/硬件部署/应用落地(优化)',
  },
  {
    company: '合肥信息技术服务有限公司',
    duration: '实习生 (2022.06-2023.07)',
    desc: '主要负责政府(12345热线,舆情分析)业务部门的智能化模块开发和优化,包括但不限于多文本分类,热点推荐等',
    isLast: true, // 最后一个时间线节点不显示连线
  },
];

// 荣誉奖项
export const awards = [
  '系3%,专业第一,GPA 4.4/5',
  '2020 中国机器人及人工智能大赛 智能创新项目组 一等奖',
  '2020 中国团体程序天梯赛 省三等奖',
  '2019 至今学校二三等奖学金若干,2022校级三好学生',
  'CLEF2022 at PAN EI期刊 第二作者  [论文链接:https://ceur-ws.org/Vol-3180/paper-212.pdf]',
];

// 项目经历
// 每个项目：title / duration / desc(字符串或数组) / items(要点列表，可选)
export const projects = [
  {
    title: 'ChipZone 智能体(桌面应用)',
    duration: '开发设计(2026.04-2026.08)',
    items: [
    '1. UI 开发标准流程设计：探索两种 AI 驱动的 UI 开发方案（VLM 生成 UI 描述语言与 Figma MCP），并结合 AI Coding 自动生成标准化前端页面及后端交互逻辑，提升传统前端应用的开发效率与用户体验。',
    '2. Agent Memory 开发：构建智能体长期记忆机制，定期从会话组中提炼与业务场景相关的关键信息，并沉淀至 agent.md，持续补充和更新智能体的业务上下文。',
    '3. Skill 开发：建设可复用的 Skill 能力体系，包括：1. 数据分析 Skill，支持数据库连接、数据查询与统计分析；2. Deep Research Skill，支持深度研究内容生成与编辑；3. Skill 初始化能力，支持 Skill 模块的标准化创建与配置。'
    ],
    "tablist":{
      "Chipzone":"./resource/design/app.png"
    }
  },
  {
    title: '政务问答智能体',
    duration: '算法工程师 (2024.07-2025.06)',
    items: [
      '主导黄埔区政务智能体系统的设计与开发,重点负责前置分类模块架构优化及路由模块分发,提升智能体响应效率与安全性',
      '负责政务一体机核心算法研发,构建知识图谱动态校验机制及服务端到端加密体系,优化业务逻辑处理效率与数据安全性',
      '基于HugeGraph搭建政务知识图谱管理平台,设计数据同步流程架构,完成图谱服务的标准化封装与性能优化',
    ],
  },
  {
    title: 'Prompt多项目实践优化',
    duration: 'prompt engineer (2023.08-2024.06)',
    desc: '包括但不限于nl2sql one-shot(航空项目),nl2chart 任务拆解 (百威数据分析),prompt context 聚类优化调整 (宁波投行税单抽取),消除幻觉(知识库项目),结合规则召回的 RAG(金融核查系统)',
    "tablist":{
      "航空One-shot":"./resource/design/aironeshot.jpg",
      "NL2Chart":"./resource/design/nl2chat.jpg",
      "聚类分块抽取":"./resource/design/ocr_cluster.jpg"
    }
  },
  {
    title: '客服多轮对话Agent',
    duration: '(2024.01-2024.03)',
    items: [
      '设计并实现问答Agent,专注于处理多轮对话中的问题收集和改写',
      '引入动态记忆机制,将历史信息作为最新的记忆,以优化上下文窗口的长度',
      '开发检索Agent,负责调用检索工具链,为问答提供丰富的召回内容',
      '通过优化问答Agent和检索Agent的协同工作,实现更高效､更准确的对话管理',
    ],
    "tablist":{
      "架构图":"./resource/design/wanke.jpg"
    }

  },
  {
    title: 'AI 开门助手',
    duration: '(2023.12-2024.02)',
    desc: '此项目与万科合作,通过文本预处理和引入先验知识提升大模型的开门要素抽取能力和意图识别能力,并通过bad case分析,不断优化prompt,最终实现了直通率80%的显著提升｡降低了在物业在安保人力资源的投入｡现已落地｡',
    "tablist":{
      "测试结果":"./resource/design/wanke_eval.jpg",
      "信息抽取Prompt":"./resource/design/extract_prompt.png",
      "意图分析Prompt":"./resource/design/intent_prompt.png",
    }
  },
  {
    title: '大模型工具箱',
    duration: '(2023.10-2024.01)',
    desc: '大模型启动控制台(为内部模型提供了一个第三方控制界面,增强了模型的安全防护,并接入了日志接口以实现更好的监控和管理｡)大模型抽取数据质控平台(利用ChatGPT生成高质量数据,并在后期由人工进行复核,确保数据的准确性和可靠性｡),大模型回答评测工具(主要用于测试大模型回答文本与标准答案之间的差异｡),大模型抽取评测工具(通过类hash算法计算抽取结果与标准实体的相似度差异)',
    extra: '通过整合以上工具,与内部大模型训练平台形成了一个完整的生态闭环,实现了模型开发､数据质控､回答质量测试､抽取评测的全流程管理｡',
    tablist:{
      "1. 模型控制台":"./resource/design/model-plat.jpg",
      "2. 评估设计":"./resource/design/model_eval.jpg"

    }
  },
  {
    title: '金融抽取大模型',
    duration: '(2023.09-2023.11)',
    desc: '负责Baichuan,Qwen 开源模型的SFT｡迭代多个版本｡ 优化提取模板,收集多样性数据以丰富模型的训练样本,提升模型的提取效果, 在40类金融文档上,实现了89%的F1值｡',
  },
  {
    title: 'LLM 智能热线客服',
    duration: '(2024.03-2023.04)',
    desc: '此项目主要和科大实验室进行合作,开发热线客服大模型:',
    items: [
      '设计并开发了一款集成数据标注和审核功能的一体式平台(Streamlit)｡',
      '管理并指导30名标注人员进行数据标注和审核工作,确保项目进度和质量｡',
      '培养团队成员对复杂问题的分析和解决能力,尤其是在处理制度数据和表格数据的问题生产方面,为大模型提供更丰富､高质量的数据语料｡',
    ],
  },
  {
    title: '智能司法平台',
    duration: '(2023.02-2023.04)',
    desc: '使用种子式+层次挖掘获取大量数据信息,通过doc2vec和Es作为语义表达和存储引擎,完成法律咨询模块,设计层次化拆解算法对法律法规进行层次编码(章条款目),使用doc2vec转换文档语义作为相似文档功能和检索引擎的基础,并使用范围搜索优化单个法条对比的查询速度,为地方立法者决策提供依据和参考｡',
  },
  {
    title: '监狱心理风险测评系统',
    duration: '(2022.10-2023.01)',
    desc: '针对安徽监狱系统的实际需求,构建科学化､数据驱动的服刑人员风险评估体系,结合规则计算和图谱分析,实现动态风险评估与心理画像生成,辅助监狱管理决策｡',
  },
  {
    title: '政务民情(实习项目)',
    duration: '(2022.08-2022.10)',
    sections: [
      {
        heading: '热线工单:',
        desc: '主要是针对民众填写的12345热线工单内容进行三级分类,并进行对应的推送,以此提高政务部门的分工效率,通过多种技术方案的实验,最终使用以搜代分的思想减少对不均衡样本的数据依赖,最终800个三级类别中macro-f1达90%｡整体模型为30m实现轻量级部署｡',
      },
      {
        heading: '舆情分析:',
        items: [
          '通过时间窗口缓存,实现增量查询,降低SQL查询数据量,最长支持6个月数据查询',
          '对原代码进行性能分析和bug排查,并加以改善',
          '通过引入词性和词频形成初步簇,提升聚类效率,通过牺牲一定的准确率来获得性能提升',
        ],
      },
    ],
  },
];

// 兴趣爱好
export const hobbies = [
  { icon: 'fa-music', text: '古典嘻哈' },
  { icon: 'fa-swimming-pool', text: '游泳' },
  { icon: 'fa-table-tennis', text: '业余羽毛球' },
  { icon: 'fa-book', text: '阅读' },
];

// 页脚
export const footer = {
  text: 'created by',
  link: 'https://space.coze.cn',
  linkText: 'coze space',
  note: '页面内容均由 AI 生成,仅供参考',
};
