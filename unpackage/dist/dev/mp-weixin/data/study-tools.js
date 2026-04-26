"use strict";
const STUDY_TOOLS = [
  {
    id: "liuyao",
    name: "六爻卜卦",
    short: "返回首页进入摇卦主流程",
    operationTitle: "沿用首页摇卦流程",
    science: "六爻以三钱法连摇六次形成本卦与变卦，适合用于卦象结构学习与民俗文化阅读。",
    usage: "作用：用于卦象研习、口诀查看与本地记录管理。"
  },
  {
    id: "meihua",
    name: "梅花易数研习",
    short: "时间/数字起式并记录",
    operationTitle: "起式输入（时间 / 数字）",
    science: "梅花易数是传统易学推演方法，以简易起式为核心，侧重象数逻辑研习，是民俗易学入门常用体系，多用于文化学习与逻辑推演练习。",
    usage: "作用：用于学习起式方法、卦象结构与动爻变化的阅读框架，帮助建立研习笔记。"
  },
  {
    id: "bazi",
    name: "八字排盘参考",
    short: "生辰录入与干支展示",
    operationTitle: "输入生辰（公历/农历）",
    science: "四柱八字又称生辰八字，以干支历法为基础，记录出生时间的干支组合，本工具仅提供排盘展示，用于传统历法文化学习与资料记录。",
    usage: "作用：用于识别四柱干支与时间结构，辅助做历法知识整理和术语对照。"
  },
  {
    id: "ganzhi",
    name: "干支历法查询",
    short: "日期对应干支与节气",
    operationTitle: "选择日期并生成历法信息",
    science: "干支历法是中国传统纪年体系，由十天干、十二地支组合而成，广泛用于民俗文化与节气记录，是传统时间文化的重要载体。",
    usage: "作用：用于建立日期、干支、节气之间的对应关系，便于做节令文化学习。"
  },
  {
    id: "zodiac",
    name: "生肖流年研习",
    short: "生肖文化解读与笔记",
    operationTitle: "选择生肖并生成研习卡",
    science: "生肖文化是中国传统民俗符号，以十二地支对应生肖，本内容仅为民俗文化趣味研习，无运势预测，仅供传统文化爱好者参考。",
    usage: "作用：用于归纳生肖与地支的关系，梳理常见民俗意象和文化语境。"
  },
  {
    id: "name",
    name: "姓名民俗解析",
    short: "笔画字义与文化说明",
    operationTitle: "输入姓名并解析",
    science: "姓名民俗解析基于汉字文化与传统起名习俗，仅做字义、笔画的文化解读，为趣味民俗学习内容，不涉及任何评判与建议。",
    usage: "作用：用于学习姓名字形字义与笔画结构，积累汉字文化阅读素材。"
  }
];
function getStudyToolById(id) {
  return STUDY_TOOLS.find((x) => x.id === id) || null;
}
exports.STUDY_TOOLS = STUDY_TOOLS;
exports.getStudyToolById = getStudyToolById;
//# sourceMappingURL=../../.sourcemap/mp-weixin/data/study-tools.js.map
