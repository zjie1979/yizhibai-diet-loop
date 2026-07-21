const STORAGE_KEY = "yizhibaiDietLoop.v2";
const ADVANCE_DELAY = 900;

const mealPlans = [
  {
    id: "yb-simple-a",
    title: "一只白日 A｜香蕉蛋白极简",
    series: "一只白日",
    source: "5+2 公开转述",
    summary: "香蕉、鸡蛋、豆浆组合，适合想快速省事的一天。",
    fit: "短期调整日，饭量小的人更容易执行。",
    meals: [
      { slot: "早餐", food: "香蕉 1 根 + 鸡蛋 1 个 + 黑咖啡或无糖茶。" },
      { slot: "午餐", food: "鸡蛋 2 个 + 无糖豆浆 1 杯。" },
      { slot: "晚餐", food: "鸡蛋 1 个 + 香蕉 1 根。" }
    ],
    rules: ["不加甜品、奶茶和零食。", "明显头晕、心慌或胃不舒服就停止。"]
  },
  {
    id: "yb-simple-b",
    title: "一只白日 B｜牛奶板烧三明治",
    series: "一只白日",
    source: "5+2 公开转述",
    summary: "早餐牛奶咖啡，午餐板烧类三明治，晚餐鸡蛋香蕉。",
    fit: "适合上班日或外食日，买起来简单。",
    meals: [
      { slot: "早餐", food: "牛奶 1 杯 + 黑咖啡或美式 1 杯。" },
      { slot: "午餐", food: "板烧鸡腿三明治或同类鸡肉三明治 1 个，饮品选无糖更稳。" },
      { slot: "晚餐", food: "鸡蛋 1 个 + 香蕉 1 根。" }
    ],
    rules: ["三明治不额外加薯条、甜品。", "如果午餐很晚，晚餐可以只保留鸡蛋。"]
  },
  {
    id: "seven-day-7-subway",
    title: "7天法 Day7｜赛百味分餐",
    series: "7天法",
    source: "B站打卡转述",
    summary: "一个三明治分成两餐，早上补鸡蛋和奶。",
    fit: "适合想吃主食感但不想做饭的一天。",
    meals: [
      { slot: "早餐", food: "鸡蛋 1 个 + 脱脂牛奶 1 杯，也可换无糖豆浆。" },
      { slot: "午餐", food: "赛百味或同类三明治半个，优先鸡肉、牛肉、金枪鱼或火鸡款。" },
      { slot: "晚餐", food: "剩下半个三明治；如果很饿，加鸡蛋 1 个。" }
    ],
    rules: ["酱料少放更稳。", "当天不再加薯片、曲奇和含糖饮料。"]
  },
  {
    id: "mid-small-1",
    title: "中小基数 Day1｜拿铁帕尼尼",
    series: "中小基数",
    source: "公开打卡记录",
    summary: "鸡蛋、帕尼尼、蛋白棒的方便版，原记录有个人改动。",
    fit: "适合早餐和午餐都靠外食解决的一天。",
    meals: [
      { slot: "早餐", food: "鸡蛋 1 个 + 自制拿铁或无糖拿铁 1 杯。" },
      { slot: "午餐", food: "芝士猪柳帕尼尼不带酱 + 冰美式。" },
      { slot: "晚餐", food: "蛋白棒 1 根；如果无法执行，可换鸡蛋 1 个 + 番茄。" }
    ],
    rules: ["这组来自打卡记录，存在个人替换。", "帕尼尼尽量不加额外酱。"]
  },
  {
    id: "mid-small-2",
    title: "中小基数 Day2｜高蛋白无主食",
    series: "中小基数",
    source: "公开打卡记录",
    summary: "两餐高蛋白，主食尽量不出现。",
    fit: "适合短期控碳日，不适合低血糖明显的人硬跟。",
    meals: [
      { slot: "第一餐", food: "凉拌牛肉 125g + 煎蛋 1 个，或换成去皮鸡腿、鸡胸。" },
      { slot: "第二餐", food: "水煮鸡蛋 1 个 + 蛋白棒 1 根。" }
    ],
    rules: ["原记录说明当天是高蛋白无碳水日。", "如果饿，可以加黄瓜、番茄或生菜。"]
  },
  {
    id: "mid-small-3",
    title: "中小基数 Day3｜魔芋三明治",
    series: "中小基数",
    source: "公开打卡记录",
    summary: "魔芋面加三明治，操作简单但饱腹感一般。",
    fit: "适合想有面感、又不想做复杂饭的一天。",
    meals: [
      { slot: "第一餐", food: "魔芋面 1 份 + 鸡蛋 1 个，调味尽量清淡。" },
      { slot: "第二餐", food: "三明治 1 个，优先鸡肉、牛肉、金枪鱼或鸡蛋款。" }
    ],
    rules: ["下午容易饿，先喝水或无糖茶再决定是否补蛋白。"]
  },
  {
    id: "mid-small-4",
    title: "中小基数 Day4｜包子吐司",
    series: "中小基数",
    source: "公开打卡记录",
    summary: "两餐制，包子鸡蛋和土豆泥吐司。",
    fit: "适合不想点汉堡、但想吃一点主食的人。",
    meals: [
      { slot: "第一餐", food: "小笋包 2 个 + 鸡蛋 1 个。" },
      { slot: "第二餐", food: "香肠土豆泥吐司 1 份 + 无糖可乐或无糖茶。" }
    ],
    rules: ["这天主食感较强，避免再加甜品和零食。"]
  },
  {
    id: "mid-small-5a",
    title: "中小基数 Day5｜三明治分餐",
    series: "中小基数",
    source: "公开打卡记录",
    summary: "鸡蛋牛奶开头，一个三明治和水果分两段吃。",
    fit: "适合想把午餐和下午加餐拆开的人。",
    meals: [
      { slot: "早餐", food: "鸡蛋 1 个 + 牛奶 1 杯。" },
      { slot: "午餐", food: "三明治半个 + 橙子半个。" },
      { slot: "下午餐", food: "剩下半个三明治 + 剩下半个橙子。" }
    ],
    rules: ["晚上尽量不再补面包；如果很饿，换鸡蛋或无糖豆浆。"]
  },
  {
    id: "mid-small-5b",
    title: "中小基数 Day5 备选｜玉米贝果",
    series: "中小基数",
    source: "公开打卡记录",
    summary: "同一组公开记录里的 Day5 备选写法，偏主食版。",
    fit: "适合家里刚好有包子、玉米、贝果时临时替换。",
    meals: [
      { slot: "早餐", food: "小笋包 2 个 + 吐司 1 片。" },
      { slot: "午餐", food: "玉米 1 根 + 鸡蛋 1 个。" },
      { slot: "晚餐", food: "奶盐贝果 1 个，或换成普通小贝果半个到 1 个。" }
    ],
    rules: ["这是个人打卡里的备选，不建议和三明治分餐版同一天叠加。"]
  },
  {
    id: "mid-small-7",
    title: "中小基数 Day7｜牛腱鸡蛋",
    series: "中小基数",
    source: "公开打卡记录",
    summary: "牛奶吐司、帕尼尼、卤牛腱和鸡蛋。",
    fit: "适合需要高蛋白、但不想完全无主食的一天。",
    meals: [
      { slot: "早餐", food: "牛奶 1 杯 + 吐司 1 片。" },
      { slot: "午餐", food: "芝士猪柳帕尼尼不带酱。" },
      { slot: "晚餐", food: "卤牛腱子肉 130g + 鸡蛋 1 个。" },
      { slot: "水果", food: "橙子 1 个；不饿可以不吃。" }
    ],
    rules: ["卤牛肉钠含量可能偏高，容易水肿的人少蘸汁。"]
  },
  {
    id: "kfc-1",
    title: "KFC Day1｜奥尔良堡鸡蛋",
    series: "KFC",
    source: "微博合集转述",
    summary: "两餐制：奥尔良烤鸡腿堡 + 鸡蛋。",
    fit: "适合只想买肯德基、不想做饭的一天。",
    meals: [
      { slot: "第一餐", food: "奥尔良烤鸡腿堡 1 个 + 饮品。" },
      { slot: "第二餐", food: "鸡蛋 1 个 + 饮品。" }
    ],
    rules: ["饮品选无糖更稳。", "不加薯条、蛋挞、甜品。"]
  },
  {
    id: "kfc-2",
    title: "KFC Day2｜鸡肉卷烤翅",
    series: "KFC",
    source: "微博合集转述",
    summary: "老北京鸡肉卷配一对奥尔良烤翅。",
    fit: "适合想吃卷类快餐的一天。",
    meals: [
      { slot: "第一餐", food: "老北京鸡肉卷 1 个 + 饮品。" },
      { slot: "第二餐", food: "奥尔良烤翅 1 对。" }
    ],
    rules: ["饮品尽量无糖。", "不把烤翅改成一整份炸鸡桶。"]
  },
  {
    id: "kfc-3",
    title: "KFC Day3｜牛堡蛋白",
    series: "KFC",
    source: "微博合集转述",
    summary: "牛堡或烤鸡腿堡，再配鸡蛋或蛋白棒。",
    fit: "适合三日快餐法最后一天。",
    meals: [
      { slot: "第一餐", food: "汁汁嫩牛堡 1 个，或滋滋 yes 烤鸡腿堡 1 个。" },
      { slot: "第二餐", food: "鸡蛋 1 个，或蛋白棒 1 根。" }
    ],
    rules: ["二选一不要都吃。", "当天不加甜品和含糖饮料。"]
  },
  {
    id: "tastien-1",
    title: "塔斯汀 Day1｜板烧凤梨堡",
    series: "塔斯汀",
    source: "微博合集转述",
    summary: "鸡蛋咖啡开头，另一餐吃板烧凤梨堡。",
    fit: "适合附近只有塔斯汀时执行。",
    meals: [
      { slot: "一餐", food: "鸡蛋 1 个 + 咖啡或无糖可乐。" },
      { slot: "另一餐", food: "板烧凤梨堡 1 个 + 无糖饮品。" }
    ],
    rules: ["沙拉酱去不去按接受度处理，想稳一点就少酱。"]
  },
  {
    id: "tastien-2",
    title: "塔斯汀 Day2｜菌菇牛肉堡",
    series: "塔斯汀",
    source: "微博合集转述",
    summary: "一餐汉堡，一餐苹果。",
    fit: "适合食量小、能接受晚餐很轻的人。",
    meals: [
      { slot: "一餐", food: "孜然菌菇牛肉汉堡 1 个 + 饮品。" },
      { slot: "另一餐", food: "苹果 1 个。" }
    ],
    rules: ["如果一个汉堡吃不完，可以留一部分到下一餐再配茶叶蛋。"]
  },
  {
    id: "tastien-3",
    title: "塔斯汀 Day3｜手扒鸡鸡蛋",
    series: "塔斯汀",
    source: "微博合集转述",
    summary: "蜜汁手扒鸡配鸡蛋，重点是不要太油。",
    fit: "适合想吃肉的一天。",
    meals: [
      { slot: "一餐", food: "蜜汁手扒鸡 1 份 + 饮品。" },
      { slot: "另一餐", food: "鸡蛋 1 个。" }
    ],
    rules: ["如果当地门店出品很油，尽量吸油或换别的餐单。"]
  },
  {
    id: "wallace-1",
    title: "华莱士 Day1｜香辣堡脆骨",
    series: "华莱士",
    source: "微博合集转述",
    summary: "香辣鸡腿堡配脆骨串，两餐制。",
    fit: "适合华莱士方便买到的一天。",
    meals: [
      { slot: "一餐", food: "香辣鸡腿堡 1 个 + 饮品。" },
      { slot: "另一餐", food: "华香脆骨串 2 串 + 饮品。" }
    ],
    rules: ["饮品尽量无糖。", "肠胃敏感的人谨慎选炸物。"]
  },
  {
    id: "wallace-2",
    title: "华莱士 Day2｜牛堡/虾堡烤翅",
    series: "华莱士",
    source: "微博合集转述",
    summary: "牛气冲天堡或劲脆鲜虾堡，再配烤翅。",
    fit: "适合想吃汉堡但要明确二选一的人。",
    meals: [
      { slot: "一餐", food: "牛气冲天堡 1 个，或劲脆鲜虾堡 1 个 + 饮品。" },
      { slot: "另一餐", food: "蜜制烤翅 1 对 + 饮品。" }
    ],
    rules: ["汉堡是二选一，不是两个都吃。", "喝水按口渴来，不必硬灌。"]
  },
  {
    id: "wallace-3",
    title: "华莱士 Day3｜手扒鸡鸡蛋",
    series: "华莱士",
    source: "微博合集转述",
    summary: "蜜汁手扒鸡加鸡蛋，和塔斯汀版本类似。",
    fit: "适合三日快餐法最后一天。",
    meals: [
      { slot: "一餐", food: "蜜汁手扒鸡 1 份 + 饮品。" },
      { slot: "另一餐", food: "鸡蛋 1 个。" }
    ],
    rules: ["门店出品差异大，明显很油就换餐单。"]
  },
  {
    id: "weekend-friday",
    title: "周末安全｜周五",
    series: "周末安全",
    source: "微博合集转述",
    summary: "咖啡鸡蛋、手撕鸡半个馒头、蛋白棒。",
    fit: "适合周五想收一收饮食。",
    meals: [
      { slot: "早餐", food: "咖啡 + 鸡蛋 1 个。" },
      { slot: "午餐", food: "手撕鸡 1 份 + 半个馒头。" },
      { slot: "晚餐", food: "蛋白棒 1 根。" }
    ],
    rules: ["手撕鸡尽量少油少酱。", "晚上不加甜品。"]
  },
  {
    id: "weekend-saturday",
    title: "周末安全｜周六聚餐",
    series: "周末安全",
    source: "微博合集转述",
    summary: "允许一餐出门吃饭，另一餐用三明治收住。",
    fit: "适合周六有社交或聚餐的一天。",
    meals: [
      { slot: "起床后", food: "睡到中午也可以，不强行补早餐。" },
      { slot: "一餐", food: "出门吃饭，把这一餐当正餐。" },
      { slot: "另一餐", food: "三明治 1 个 + 饮品。" }
    ],
    rules: ["聚餐当天不要再叠加夜宵和甜饮。", "如果正餐已经很饱，另一餐可减半。"]
  },
  {
    id: "weekend-sunday",
    title: "周末安全｜周日",
    series: "周末安全",
    source: "微博合集转述",
    summary: "早午餐鸡蛋青菜包，晚餐回到 KFC 汉堡规则。",
    fit: "适合周末结束、准备回到正常节奏的一天。",
    meals: [
      { slot: "早午餐", food: "鸡蛋 1 个 + 青菜包 1 个。" },
      { slot: "晚餐", food: "按 KFC 汉堡日规则：烤鸡腿堡或同类汉堡 1 个 + 饮品。" }
    ],
    rules: ["饮品选无糖更稳。", "不额外加薯条、甜品和奶茶。"]
  }
];

mealPlans.push(...[
  {
    id: "xhs-sanfu-1",
    title: "三伏天｜一类吃法",
    series: "三伏天",
    source: "小红书原图：三伏天食谱",
    summary: "红豆薏米水、鸡肉和魔芋蒸饭的一天。",
    fit: "适合想干净吃、操作不复杂的一天。",
    meals: [
      { slot: "早餐", food: "红豆薏米水 + 荷包蛋 1 个。原图提示可加黑芝麻。" },
      { slot: "午餐", food: "贡菜/青菜拌半只鸡 + 轻炒冬瓜，也可换成鸡腿、虾仁、鱼肉等。" },
      { slot: "晚餐", food: "嫩豆腐蔬菜汤已按你的要求剔除；保留魔芋蒸饭，搭配豆腐、金针菇和生菜。" }
    ],
    rules: ["原图含汤类，已在 APP 中改成不喝汤版本。", "有主食害怕饿时，鸡肉可略加量。"]
  },
  {
    id: "xhs-sanfu-2",
    title: "三伏天｜二类吃法",
    series: "三伏天",
    source: "小红书原图：三伏天食谱",
    summary: "红薯玉米、鸡胸和时蔬，偏清淡有碳水。",
    fit: "适合不想太饿、但仍要控量的一天。",
    meals: [
      { slot: "早餐", food: "无糖豆浆 + 水煮蛋 + 半根玉米。" },
      { slot: "午餐", food: "杂粮饭半碗 + 番茄巴沙鱼 + 清炒冬瓜。" },
      { slot: "晚餐", food: "白灼虾 8 只 + 凉拌丝瓜。" },
      { slot: "加餐", food: "下午 3 点左右：小番茄 6 颗。" }
    ],
    rules: ["原图提示这类不极水肿，但很实用。", "水肿体质可把晚餐主食继续压低。"]
  },
  {
    id: "xhs-sanfu-3",
    title: "三伏天｜三类精彩版",
    series: "三伏天",
    source: "小红书原图：三伏天食谱",
    summary: "鸡腿、卤味肉类和白灼虾，偏高蛋白。",
    fit: "适合想吃肉、不想只靠清淡菜的一天。",
    meals: [
      { slot: "早餐", food: "鸡腿 1 个 + 红豆薏米水。" },
      { slot: "午餐", food: "巴奴可选任一类肉：牛舌、香菜猪肉滑、牛肉、皇后、金针菇、贡菜、鸭血、鸭肠。" },
      { slot: "晚餐", food: "白灼虾 8 只。" }
    ],
    rules: ["原图提醒小料随便说说，实际执行时少蘸油碟。", "火锅当天不要再叠加甜品。"]
  },
  {
    id: "xhs-sanfu-4",
    title: "三伏天｜清热解暑版",
    series: "三伏天",
    source: "小红书原图：三伏天食谱",
    summary: "薯块、茶叶蛋、烤鱼和清爽蔬菜。",
    fit: "适合天气热、想吃得清爽的一天。",
    meals: [
      { slot: "早餐", food: "蒸红薯一小块 + 茶叶蛋 1 个。" },
      { slot: "午餐", food: "糯米饭半碗 + 清炖鲤鱼肉 + 蒜蓉空心菜。" },
      { slot: "晚餐", food: "凉拌第鱼一小块 + 凉拌黄瓜。" }
    ],
    rules: ["鱼类名称按图片可读文字整理，如买不到可换清蒸鱼。", "调味少油少盐。"]
  },
  {
    id: "xhs-beauty-1",
    title: "变漂亮三日 Day1｜牛肉杂粮",
    series: "变漂亮三日",
    source: "小红书原图：变瘦+变漂亮三日",
    summary: "蔬菜汁、蓝莓、小炒黄牛肉和香煎龙利鱼。",
    fit: "适合想有碳水又保证蛋白的一天。",
    meals: [
      { slot: "早餐", food: "椰浆汁鲜 + 蓝莓 80g + 黑咖啡 + 鱼油一粒。" },
      { slot: "午餐", food: "小炒黄牛肉 200g + 玉米半根 + 适量蔬菜，喜欢的话可少量加小米辣。" },
      { slot: "晚餐", food: "香煎龙利鱼 180g。" }
    ],
    rules: ["原图建议午餐牛肉少油。", "睡前可补维 C，不作为必打卡餐次。"]
  },
  {
    id: "xhs-beauty-2",
    title: "变漂亮三日 Day2｜大盘鸡虾仁",
    series: "变漂亮三日",
    source: "小红书原图：变瘦+变漂亮三日",
    summary: "鸡蛋、草莓、鱼油、大盘鸡和虾仁豆腐煲。",
    fit: "适合第二天继续高蛋白但不完全清水煮。",
    meals: [
      { slot: "早餐", food: "鸡蛋羹一份 + 无糖饮品 + 草莓 100g + 鱼油。" },
      { slot: "午餐", food: "大盘鸡 200g + 杂粮饭 80g。" },
      { slot: "晚餐", food: "虾仁嫩豆腐煲：虾仁 120g + 豆腐 100g + 清炒娃娃菜 180g。" },
      { slot: "加餐", food: "树莓 80g。" }
    ],
    rules: ["原图强调低盐。", "大盘鸡尽量少油少皮。"]
  },
  {
    id: "xhs-beauty-3",
    title: "变漂亮三日 Day3｜窑鸡清蒸鱼",
    series: "变漂亮三日",
    source: "小红书原图：变瘦+变漂亮三日",
    summary: "煎蛋、酸奶、半只窑鸡和清蒸鱼。",
    fit: "适合想把三天食谱收尾得干净一点。",
    meals: [
      { slot: "早餐", food: "煎蛋 2 个 + 无糖酸奶 100g + 随餐鱼油。" },
      { slot: "午餐", food: "窑鸡王半只，尽量去皮；可加一点水，别吃得太咸。" },
      { slot: "晚餐", food: "清蒸鱼 180g + 清炒芦笋 + 生菜 200g。" },
      { slot: "加餐", food: "树莓 + 蓝莓组合 80g。" }
    ],
    rules: ["优质蛋白、维生素 C、鱼油是这组重点。"]
  },
  {
    id: "xhs-city-1",
    title: "都市丽人五日 Day1｜鸡蛋牛肉三明治",
    series: "都市丽人五日",
    source: "小红书原图：都市丽人春夏五日",
    summary: "鸡蛋、牛肉轻盈三明治和金枪鱼能量碗。",
    fit: "适合工作日通勤外食。",
    meals: [
      { slot: "早餐", food: "鸡蛋 2 颗 + 黑咖啡或无糖饮品。" },
      { slot: "午餐", food: "香烤牛肉轻盈三明治 + 无糖饮品。" },
      { slot: "晚餐", food: "深海金枪鱼能量碗 + 椰皇水。" }
    ],
    rules: ["图片品牌为赛百味，买不到可用同类高蛋白三明治/能量碗替换。"]
  },
  {
    id: "xhs-city-2",
    title: "都市丽人五日 Day2｜番茄鸡蛋能量碗",
    series: "都市丽人五日",
    source: "小红书原图：都市丽人春夏五日",
    summary: "三明治、番茄鸡蛋杂粮饭和能量碗。",
    fit: "适合想有一点米饭的一天。",
    meals: [
      { slot: "早餐", food: "墨五方三明治 + 黑咖啡或无糖饮品。" },
      { slot: "午餐", food: "番茄炒蛋 + 杂粮米饭 50g + 无糖饮品。" },
      { slot: "晚餐", food: "烟熏大肉粒香肠能量碗 + 无糖饮品。" }
    ],
    rules: ["杂粮饭按 50g 控制，不额外加点心。"]
  },
  {
    id: "xhs-city-3",
    title: "都市丽人五日 Day3｜双牛三明治",
    series: "都市丽人五日",
    source: "小红书原图：都市丽人春夏五日",
    summary: "鸡蛋、双牛三明治和厚切牛排能量碗。",
    fit: "适合蛋白质需求高的一天。",
    meals: [
      { slot: "早餐", food: "鸡蛋 2 颗 + 黑咖啡或无糖饮品。" },
      { slot: "午餐", food: "王牌双牛轻盈三明治 + 无糖饮品。" },
      { slot: "晚餐", food: "黑椒厚切牛排能量碗 + 椰皇水。" }
    ],
    rules: ["牛肉类当天盐分可能偏高，晚餐后不再加咸零食。"]
  },
  {
    id: "xhs-city-4",
    title: "都市丽人五日 Day4｜鸡腿牛排",
    series: "都市丽人五日",
    source: "小红书原图：都市丽人春夏五日",
    summary: "鸡腿、牛排和赛百味能量碗。",
    fit: "适合想吃肉且不做饭的一天。",
    meals: [
      { slot: "早餐", food: "鸡腿 1 只 + 黑咖啡或无糖饮品。" },
      { slot: "午餐", food: "牛排 200g + 无糖饮品。" },
      { slot: "晚餐", food: "赛百味能量碗 1 份 + 无糖饮品。" }
    ],
    rules: ["图片中晚餐具体款名不完全清晰，按高蛋白能量碗执行。"]
  },
  {
    id: "xhs-city-5",
    title: "都市丽人五日 Day5｜蛋白棒牛肉",
    series: "都市丽人五日",
    source: "小红书原图：都市丽人春夏五日",
    summary: "蛋白棒、甜甜牛肉和照烧鸡能量碗。",
    fit: "适合工作周最后一天轻一点。",
    meals: [
      { slot: "早餐", food: "蛋白棒 1 根 + 黑咖啡或无糖饮品。" },
      { slot: "午餐", food: "甜甜牛肉一份 + 无糖饮品。" },
      { slot: "晚餐", food: "秘制照烧鸡能量碗 + 椰皇水。" }
    ],
    rules: ["如果午餐偏甜，晚餐和饮品必须无糖。"]
  },
  {
    id: "xhs-after-newyear-1",
    title: "年后恢复三日 Day1｜番茄蛋烧鸭饭",
    series: "年后恢复",
    source: "小红书原图：年后好好做人三日",
    summary: "番茄炒蛋配一份简化外卖饭。",
    fit: "适合节后先恢复秩序的一天。",
    meals: [
      { slot: "第一餐", food: "番茄炒蛋 200g + 咖啡或无糖饮品。" },
      { slot: "第二餐", food: "烧鸭饭、沙县鸡腿饭或鸭腿饭一份 + 无糖饮品。" }
    ],
    rules: ["先吃蔬菜，再吃肉，最后吃约 50g 米饭。", "不吃话梅，不额外加零食。"]
  },
  {
    id: "xhs-after-newyear-2",
    title: "年后恢复三日 Day2｜蒸蛋牛肉火锅",
    series: "年后恢复",
    source: "小红书原图：年后好好做人三日",
    summary: "蒸蛋加一顿瘦牛肉火锅。",
    fit: "适合节后想吃肉但不想油炸的一天。",
    meals: [
      { slot: "第一餐", food: "蒸蛋一份，可加儿菜 + 无糖饮品。" },
      { slot: "第二餐", food: "潮汕牛肉火锅：瘦肉约 300g，绿色蔬菜随意。" }
    ],
    rules: ["可蘸酱油，不要花生酱、麻酱。", "按你的要求不把火锅汤作为餐次。"]
  },
  {
    id: "xhs-after-newyear-3",
    title: "年后恢复三日 Day3｜汉堡麻辣烫",
    series: "年后恢复",
    source: "小红书原图：年后好好做人三日",
    summary: "汉堡加麻辣烫，适合恢复期最后一天。",
    fit: "适合想吃得像正常日但仍控量。",
    meals: [
      { slot: "第一餐", food: "汉堡王肉蛋堡；买不到可换卤鸡腿。" },
      { slot: "第二餐", food: "麻辣烫或关东煮：绿色蔬菜、虾滑、鱼片、鸡肉片、瘦牛肉、金针菇、海带、魔芋结、豆芽、芝类少量。" }
    ],
    rules: ["麻辣烫尽量少油；按你的要求不喝汤。", "仅用于三天恢复。"]
  },
  {
    id: "xhs-may-reset-1",
    title: "节后三日 Day1｜烤鸡半只",
    series: "节后恢复",
    source: "小红书原图：五一节后三日",
    summary: "烤鸡半只配鸡蛋或蛋白棒。",
    fit: "适合大餐后第一天快速收住。",
    meals: [
      { slot: "第一餐", food: "烤鸡半只 + 黑咖啡或无糖茶。" },
      { slot: "第二餐", food: "鸡蛋 2 个，或蛋白棒 1 根。" }
    ],
    rules: ["烤鸡可换椰子鸡、卤鸡、鲜鸡、烤鸡类；少油不要太咸。"]
  },
  {
    id: "xhs-may-reset-2",
    title: "节后三日 Day2｜牛排虾仁",
    series: "节后恢复",
    source: "小红书原图：五一节后三日",
    summary: "牛排、苋菜、虾仁和菌菇。",
    fit: "适合恢复期第二天，蛋白足且不复杂。",
    meals: [
      { slot: "第一餐", food: "牛排 200g + 苋菜。" },
      { slot: "第二餐", food: "虾仁 15 只 + 蘑菇和平菇。" }
    ],
    rules: ["做法尽量清淡。", "如果特别饿，可以加无糖饮品。"]
  },
  {
    id: "xhs-may-reset-3",
    title: "节后三日 Day3｜椰子水鸡蛋",
    series: "节后恢复",
    source: "小红书原图：五一节后三日",
    summary: "椰子水、鸡蛋、香蕉和海带汤去汤版。",
    fit: "适合恢复期最后一天，比较轻。",
    meals: [
      { slot: "早餐", food: "椰子水 1 瓶 + 鸡蛋 1 个。" },
      { slot: "午餐", food: "香蕉 1 根 + 鸡蛋 1 个。" },
      { slot: "晚餐", food: "海带配菜；饿了可加鸡蛋 1 个，按你的要求不喝汤。" }
    ],
    rules: ["适合小基数、不要暴食的人。", "第一天最好使，可按情况重复第一天，最多三天。"]
  },
  {
    id: "xhs-bigmeal-1",
    title: "大餐后恢复｜汉堡法",
    series: "大餐后恢复",
    source: "小红书原图：5个大餐后恢复食谱",
    summary: "黑咖啡、板烧鸡腿堡、鸡蛋。",
    fit: "适合昨天吃多、今天想简单补救。",
    meals: [
      { slot: "早餐", food: "黑咖啡 1 杯。" },
      { slot: "午餐", food: "板烧鸡腿堡 1 个。" },
      { slot: "晚餐", food: "鸡蛋 1 个。" }
    ],
    rules: ["不加薯条、甜品和含糖饮品。"]
  },
  {
    id: "xhs-bigmeal-2",
    title: "大餐后恢复｜香蕉鸡蛋法",
    series: "大餐后恢复",
    source: "小红书原图：5个大餐后恢复食谱",
    summary: "黑咖啡、香蕉、鸡蛋、酸奶。",
    fit: "适合前一天油盐多、今天想轻一点。",
    meals: [
      { slot: "早餐", food: "黑咖啡 1 杯 + 香蕉 1 根 + 鸡蛋 1 个。" },
      { slot: "午餐", food: "酸奶拌香蕉：小杯酸奶 + 香蕉 1 根。" },
      { slot: "晚餐", food: "香蕉 1 根 + 鸡蛋 1 个。" }
    ],
    rules: ["原图说不能长期照搬，只适合短期恢复体重。"]
  },
  {
    id: "xhs-bigmeal-3",
    title: "大餐后恢复｜Manji 法",
    series: "大餐后恢复",
    source: "小红书原图：5个大餐后恢复食谱",
    summary: "鸡肉、馒头和蛋白棒。",
    fit: "适合想吃扎实一点但仍控量。",
    meals: [
      { slot: "第一餐", food: "鸡肉 200g + 半个馒头。" },
      { slot: "第二餐", food: "蛋白棒 1 根。" }
    ],
    rules: ["原图提示 Manji 永远都很好。"]
  },
  {
    id: "xhs-bigmeal-4",
    title: "大餐后恢复｜补钾法",
    series: "大餐后恢复",
    source: "小红书原图：5个大餐后恢复食谱",
    summary: "红薯、牛肉、香蕉，偏补钾排水。",
    fit: "适合水肿明显的一天。",
    meals: [
      { slot: "早餐", food: "半块红薯 + 无糖饮品。" },
      { slot: "午餐", food: "牛肉 200g，做法清淡。" },
      { slot: "晚餐", food: "香蕉 1 根。" }
    ],
    rules: ["不是快速减脂原理，主要是帮助恢复水肿状态。"]
  },
  {
    id: "xhs-bigmeal-5",
    title: "大餐后恢复｜椰子鸡法",
    series: "大餐后恢复",
    source: "小红书原图：5个大餐后恢复食谱",
    summary: "一天去店里吃半只椰子鸡。",
    fit: "适合想用一顿正餐恢复，不想零碎吃。",
    meals: [
      { slot: "主餐", food: "去店里吃半只椰子鸡，吃得饱饱的，只吃鸡肉。" }
    ],
    rules: ["按你的要求不喝汤、不蘸花生酱。", "不建议长期用，只适合想快速恢复体重的次日。"]
  },
  {
    id: "xhs-yuanji-1",
    title: "袁记云饺五日 Day1｜鲜虾云吞",
    series: "袁记云饺五日",
    source: "小红书原图：袁记云饺五日",
    summary: "鸡蛋、鲜虾云吞和虾仁菌菇。",
    fit: "适合附近有袁记云饺的一天。",
    meals: [
      { slot: "早餐", food: "鸡蛋 2 个 + 黑咖啡。" },
      { slot: "午餐", food: "袁记云饺鲜虾云吞 5-10 颗，可加蛋白。" },
      { slot: "晚餐", food: "虾 5-10 只 + 蔬菜和平菇。" }
    ],
    rules: ["按你的要求少汤或不喝汤。", "原图说敢不吃皮更好，但不用强迫。"]
  },
  {
    id: "xhs-yuanji-2",
    title: "袁记云饺五日 Day2｜牛肉云吞",
    series: "袁记云饺五日",
    source: "小红书原图：袁记云饺五日",
    summary: "大份牛肉云吞拆成两餐。",
    fit: "适合食量想稳定但不做饭的一天。",
    meals: [
      { slot: "点单", food: "点一个大份牛肉云吞，约 18 个，吃一天。" },
      { slot: "第一餐", food: "牛肉云吞半份 + 无糖饮品。" },
      { slot: "第二餐", food: "把剩下的吃完；口小可分三餐，每顿约 6 个。" }
    ],
    rules: ["少汤或不喝汤。", "原图提醒口大的可少一个，口小的可再少一点。"]
  },
  {
    id: "xhs-yuanji-3",
    title: "袁记云饺五日 Day3｜马蹄鲜肉云吞",
    series: "袁记云饺五日",
    source: "小红书原图：袁记云饺五日",
    summary: "鸡蛋咖啡、马蹄鲜肉云吞和虾仁菌菇。",
    fit: "适合云饺五日中间日。",
    meals: [
      { slot: "早餐", food: "鸡蛋 2 个 + 黑咖啡。" },
      { slot: "午餐", food: "冬菇马蹄鲜肉云吞 5-10 颗，旁边可加蛋白。" },
      { slot: "晚餐", food: "虾 5-10 只 + 蔬菜和平菇。" }
    ],
    rules: ["少汤或不喝汤；可加紫苏，红油拌可不拌。"]
  },
  {
    id: "xhs-yuanji-4",
    title: "袁记云饺五日 Day4｜鲜肉云吞",
    series: "袁记云饺五日",
    source: "小红书原图：袁记云饺五日",
    summary: "白菜/紫菜/玉米鲜肉云吞吃一天。",
    fit: "适合很忙、只想一个点单解决的一天。",
    meals: [
      { slot: "点单", food: "点一个大份白菜鲜肉、紫菜鲜肉或玉米鲜肉云吞，吃一天。" },
      { slot: "加蛋白", food: "实在饿可加鸡蛋。" }
    ],
    rules: ["白醋或翡翠汤不作为餐次；按你的要求不喝汤。", "原图提醒这天比较舒服。"]
  },
  {
    id: "xhs-yuanji-5",
    title: "袁记云饺五日 Day5｜虾仁牛排",
    series: "袁记云饺五日",
    source: "小红书原图：袁记云饺五日",
    summary: "虾仁和牛排，最后一天更高蛋白。",
    fit: "适合云饺五日收尾。",
    meals: [
      { slot: "早餐", food: "虾仁 5-10 颗。" },
      { slot: "晚餐", food: "牛排 200g。" }
    ],
    rules: ["饿了就加餐鸡蛋。", "不同体质可自行测试是否适合。"]
  },
  {
    id: "xhs-goldenweek-1",
    title: "国庆7天 Day1｜椰子鸡日",
    series: "国庆7天",
    source: "小红书原图：国庆7天食谱2.0",
    summary: "椰子鸡、茶叶蛋、蘑菇辣椒。",
    fit: "适合想先用强一点的恢复日开头。",
    meals: [
      { slot: "第一餐", food: "椰子鸡半只 + 无糖饮品。" },
      { slot: "第二餐", food: "茶叶蛋 2 个 + 蘑菇和辣椒。" }
    ],
    rules: ["蔬菜可备用，清淡就可以；不喝椰子鸡汤。"]
  },
  {
    id: "xhs-goldenweek-2",
    title: "国庆7天 Day2｜烤鸭日",
    series: "国庆7天",
    source: "小红书原图：国庆7天食谱2.0",
    summary: "烤鸭、卤鸡腿和蔬菜。",
    fit: "适合想吃肉但控制量的一天。",
    meals: [
      { slot: "第一餐", food: "烤鸭 200g，可以吃点皮 + 无糖饮品。" },
      { slot: "第二餐", food: "卤鸡腿 1 个 + 无糖饮品，适量蔬菜。" }
    ],
    rules: ["不要卷大饼加一堆酱。"]
  },
  {
    id: "xhs-goldenweek-3",
    title: "国庆7天 Day3｜星巴克日",
    series: "国庆7天",
    source: "小红书原图：国庆7天食谱2.0",
    summary: "星巴克两份法棍三明治，晚上草莓。",
    fit: "适合出门逛街、只想在星巴克解决的一天。",
    meals: [
      { slot: "早餐", food: "星巴克满香牛肉法棍三明治 + 无糖饮品。" },
      { slot: "午餐", food: "星巴克黑松露鸡肉法棍三明治 + 无糖饮品。" },
      { slot: "晚餐", food: "草莓 10 颗；不饿可以不吃。" }
    ],
    rules: ["版本偏肉多，适合爱吃肉的人。"]
  },
  {
    id: "xhs-goldenweek-4",
    title: "国庆7天 Day4｜蜜汁扒鸡日",
    series: "国庆7天",
    source: "小红书原图：国庆7天食谱2.0",
    summary: "鸡蛋和半只鸡。",
    fit: "适合想一顿肉吃踏实的一天。",
    meals: [
      { slot: "早餐", food: "鸡蛋 2 个 + 无糖饮品。" },
      { slot: "午餐", food: "华莱士蜜汁手扒鸡、肯德基蜜汁全鸡、窑鸡王、黑鸡、蒸鸡或烤鸡，半只。" }
    ],
    rules: ["不喝原味汤；鸡肉明显油就吸油。"]
  },
  {
    id: "xhs-goldenweek-5",
    title: "国庆7天 Day5｜潮汕牛肉火锅",
    series: "国庆7天",
    source: "小红书原图：国庆7天食谱2.0",
    summary: "鸡蛋黑咖啡和牛肉火锅。",
    fit: "适合假期想吃火锅但不想失控的一天。",
    meals: [
      { slot: "早餐", food: "鸡蛋 1 个 + 黑咖啡；起不来可略过。" },
      { slot: "午餐", food: "潮汕牛肉火锅，牛肉两大盘。" }
    ],
    rules: ["原图含小甜品加餐，按你的要求已省略。", "不喝火锅汤，不加高热量蘸料。"]
  },
  {
    id: "xhs-goldenweek-6",
    title: "国庆7天 Day6｜海鲜糟粕醋",
    series: "国庆7天",
    source: "小红书原图：国庆7天食谱2.0",
    summary: "鸡蛋茶叶蛋和海鲜。",
    fit: "适合想吃海鲜的一天。",
    meals: [
      { slot: "第一餐", food: "鸡蛋茶叶蛋垫垫肚子。" },
      { slot: "第二餐", food: "糟粕醋海鲜：虾、鲍鱼、生蚝、鱿鱼都可以，调料不要过重。" }
    ],
    rules: ["按你的要求不把汤当餐次；吃海鲜本身。"]
  },
  {
    id: "xhs-goldenweek-7",
    title: "国庆7天 Day7｜袁记云饺日",
    series: "国庆7天",
    source: "小红书原图：国庆7天食谱2.0",
    summary: "虾仁、苹果和草莓的冲刺日。",
    fit: "适合最后一天收尾。",
    meals: [
      { slot: "早餐", food: "虾仁 5-10 颗。" },
      { slot: "晚餐", food: "苹果 1 个 + 草莓 5 个。" }
    ],
    rules: ["饿了加餐鸡蛋，蔬菜可以自己补。"]
  }
]);

const pendingPlans = [
  {
    title: "旅行/放纵后三天恢复食谱",
    reason: "登录后可见，但正文是视频，当前未读到三天完整文字餐单，暂不做可打卡。"
  },
  {
    title: "暴食后好好过日子 Vlog",
    reason: "主题相关，但需要逐帧确认视频/正文后再收录，暂不硬编。"
  },
  {
    title: "20 家减脂期外卖",
    reason: "公开标题属于外卖推荐清单，不是全天餐单，暂不放入循环打卡。"
  },
  {
    title: "减肥冷知识 / 单一食物 / 注意事项类笔记",
    reason: "不是全天餐单，已从循环打卡里排除。"
  }
];

const categories = ["全部", ...Array.from(new Set(mealPlans.map((plan) => plan.series)))];
const planById = new Map(mealPlans.map((plan) => [plan.id, plan]));
const allPlanIds = mealPlans.map((plan) => plan.id);

const state = loadState();
let advanceTimer = null;

const availableCount = document.querySelector("#availableCount");
const selectedCount = document.querySelector("#selectedCount");
const historyTotal = document.querySelector("#historyTotal");
const cycleTitle = document.querySelector("#cycleTitle");
const cycleSub = document.querySelector("#cycleSub");
const percentText = document.querySelector("#percentText");
const activeTitle = document.querySelector("#activeTitle");
const activeSub = document.querySelector("#activeSub");
const slotCount = document.querySelector("#slotCount");
const mealList = document.querySelector("#mealList");
const filterBar = document.querySelector("#filterBar");
const planList = document.querySelector("#planList");
const detailPanel = document.querySelector("#detailPanel");
const cycleList = document.querySelector("#cycleList");
const historyList = document.querySelector("#historyList");
const historyCount = document.querySelector("#historyCount");
const historyTotalNode = document.querySelector("#historyTotal");
const pendingList = document.querySelector("#pendingList");
const pendingCount = document.querySelector("#pendingCount");
const autoNote = document.querySelector("#autoNote");

function loadState() {
  const fallback = {
    cycleIds: allPlanIds,
    activeIndex: 0,
    round: 1,
    checked: [],
    history: [],
    detailId: allPlanIds[0],
    filter: "全部"
  };

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return normalizeState({ ...fallback, ...stored });
  } catch {
    return normalizeState(fallback);
  }
}

function normalizeState(nextState) {
  const normalized = { ...nextState };
  const incomingCycle = Array.isArray(normalized.cycleIds) ? normalized.cycleIds : allPlanIds;
  normalized.cycleIds = Array.from(new Set(incomingCycle)).filter((id) => planById.has(id));
  normalized.activeIndex = Number.isInteger(normalized.activeIndex) ? normalized.activeIndex : 0;
  normalized.activeIndex = Math.max(0, Math.min(normalized.activeIndex, Math.max(normalized.cycleIds.length - 1, 0)));
  normalized.round = Number.isInteger(normalized.round) && normalized.round > 0 ? normalized.round : 1;
  normalized.checked = Array.isArray(normalized.checked)
    ? Array.from(new Set(normalized.checked.map(Number))).filter((index) => Number.isInteger(index) && index >= 0)
    : [];
  normalized.history = Array.isArray(normalized.history) ? normalized.history.slice(0, 80) : [];
  normalized.detailId = planById.has(normalized.detailId) ? normalized.detailId : allPlanIds[0];
  normalized.filter = categories.includes(normalized.filter) ? normalized.filter : "全部";
  return normalized;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentPlan() {
  if (!state.cycleIds.length) return null;
  return planById.get(state.cycleIds[state.activeIndex]) || null;
}

function detailPlan() {
  return planById.get(state.detailId) || mealPlans[0];
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function percent() {
  const plan = currentPlan();
  if (!plan) return 0;
  return Math.round((state.checked.length / plan.meals.length) * 100);
}

function isInCycle(planId) {
  return state.cycleIds.includes(planId);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderStats() {
  availableCount.textContent = mealPlans.length;
  selectedCount.textContent = state.cycleIds.length;
  historyTotal.textContent = state.history.length;
}

function renderProgress() {
  const plan = currentPlan();
  const p = percent();
  document.documentElement.style.setProperty("--progress", `${p}%`);
  percentText.textContent = `${p}%`;

  if (!plan) {
    cycleTitle.textContent = "还没有选择循环";
    cycleSub.textContent = "先从下面餐单库加入想吃的餐单。";
    activeTitle.textContent = "今日打卡";
    activeSub.textContent = "已选循环为空，加入至少 1 个餐单后开始。";
    slotCount.textContent = "0/0";
    mealList.innerHTML = `<p class="empty">先查看餐单详情，再加入循环。</p>`;
    autoNote.textContent = "循环为空时不会自动前进。";
    autoNote.classList.remove("done");
    return;
  }

  state.checked = state.checked.filter((index) => index < plan.meals.length);
  cycleTitle.textContent = `第 ${state.round} 轮 · ${state.activeIndex + 1}/${state.cycleIds.length}`;
  cycleSub.textContent = `${plan.series} · ${plan.summary}`;
  activeTitle.textContent = plan.title;
  activeSub.textContent = plan.fit;
  slotCount.textContent = `${state.checked.length}/${plan.meals.length}`;
  autoNote.classList.toggle("done", p === 100);
  autoNote.textContent = p === 100
    ? "当前餐单完成，马上进入下一个所选餐单。"
    : "打完当前餐单所有餐次后，会短暂停留并自动进入下一份所选餐单。";

  mealList.innerHTML = plan.meals.map((meal, index) => `
    <button class="meal-button ${state.checked.includes(index) ? "done" : ""}" type="button" data-meal="${index}">
      <span class="box" aria-hidden="true"></span>
      <span>
        <span class="meal-name">${escapeHtml(meal.slot)}</span>
        <span class="meal-food">${escapeHtml(meal.food)}</span>
      </span>
    </button>
  `).join("");
}

function renderFilters() {
  filterBar.innerHTML = categories.map((category) => `
    <button class="filter-chip ${state.filter === category ? "active" : ""}" type="button" data-filter="${escapeHtml(category)}">
      ${escapeHtml(category)}
    </button>
  `).join("");
}

function renderPlanList() {
  const visiblePlans = state.filter === "全部"
    ? mealPlans
    : mealPlans.filter((plan) => plan.series === state.filter);

  planList.innerHTML = visiblePlans.map((plan) => {
    const inCycle = isInCycle(plan.id);
    return `
      <article class="plan-card ${state.detailId === plan.id ? "active" : ""}">
        <button class="plan-main" type="button" data-detail="${escapeHtml(plan.id)}">
          <span class="badge">${escapeHtml(plan.series)}</span>
          <strong>${escapeHtml(plan.title)}</strong>
          <span>${escapeHtml(plan.summary)}</span>
          <small>${plan.meals.length} 餐次 · ${escapeHtml(plan.source)}</small>
        </button>
        <button class="small-button ${inCycle ? "selected" : ""}" type="button" data-cycle-toggle="${escapeHtml(plan.id)}">
          ${inCycle ? "移出循环" : "加入循环"}
        </button>
      </article>
    `;
  }).join("");
}

function renderDetail() {
  const plan = detailPlan();
  const inCycle = isInCycle(plan.id);
  detailPanel.innerHTML = `
    <div class="section-head detail-head">
      <div>
        <span class="label">详情预览</span>
        <h2>${escapeHtml(plan.title)}</h2>
      </div>
      <span class="badge strong">${escapeHtml(plan.series)}</span>
    </div>
    <p class="panel-sub">${escapeHtml(plan.summary)}</p>
    <div class="detail-meta">
      <span>${plan.meals.length} 餐次</span>
      <span>${escapeHtml(plan.source)}</span>
      <span>${inCycle ? "已在循环" : "未加入"}</span>
    </div>
    <div class="detail-meals">
      ${plan.meals.map((meal) => `
        <div class="detail-meal">
          <strong>${escapeHtml(meal.slot)}</strong>
          <span>${escapeHtml(meal.food)}</span>
        </div>
      `).join("")}
    </div>
    <div class="rule-list">
      ${plan.rules.map((rule) => `<span>${escapeHtml(rule)}</span>`).join("")}
    </div>
    <div class="button-row">
      <button class="primary-button" type="button" data-set-current="${escapeHtml(plan.id)}">
        ${inCycle ? "设为今天打卡" : "加入并设为今天"}
      </button>
      <button class="secondary-button" type="button" data-cycle-toggle="${escapeHtml(plan.id)}">
        ${inCycle ? "从循环移出" : "加入循环"}
      </button>
    </div>
  `;
}

function renderCycleList() {
  if (!state.cycleIds.length) {
    cycleList.innerHTML = `<p class="empty">还没有选择餐单。可以在上面的餐单详情里加入，也可以一键全部加入。</p>`;
    return;
  }

  cycleList.innerHTML = state.cycleIds.map((planId, index) => {
    const plan = planById.get(planId);
    const active = index === state.activeIndex;
    return `
      <article class="cycle-item ${active ? "active" : ""}">
        <button class="cycle-main" type="button" data-set-current="${escapeHtml(plan.id)}">
          <span>${index + 1}</span>
          <strong>${escapeHtml(plan.title)}</strong>
          <small>${active ? "今天打卡" : escapeHtml(plan.series)}</small>
        </button>
        <div class="cycle-actions">
          <button type="button" data-move="${index}" data-direction="-1" aria-label="上移">↑</button>
          <button type="button" data-move="${index}" data-direction="1" aria-label="下移">↓</button>
          <button type="button" data-remove-cycle="${escapeHtml(plan.id)}" aria-label="移出">×</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderHistory() {
  historyCount.textContent = `${state.history.length} 天`;
  historyTotalNode.textContent = state.history.length;
  if (!state.history.length) {
    historyList.innerHTML = `<p class="empty">还没有完成记录。</p>`;
    return;
  }

  historyList.innerHTML = state.history.slice(0, 12).map((item) => `
    <div class="history-item">
      <strong>${escapeHtml(item.planTitle)}</strong>
      <span>${escapeHtml(item.date)} · 第 ${item.round} 轮完成</span>
    </div>
  `).join("");
}

function renderPending() {
  pendingCount.textContent = `${pendingPlans.length} 个`;
  pendingList.innerHTML = pendingPlans.map((item) => `
    <div class="pending-item">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.reason)}</span>
    </div>
  `).join("");
}

function render() {
  renderStats();
  renderProgress();
  renderFilters();
  renderPlanList();
  renderDetail();
  renderCycleList();
  renderHistory();
  renderPending();
}

function addPlanToCycle(planId) {
  if (!planById.has(planId) || state.cycleIds.includes(planId)) return;
  state.cycleIds.push(planId);
  if (state.cycleIds.length === 1) {
    state.activeIndex = 0;
    state.checked = [];
  }
}

function removePlanFromCycle(planId) {
  const index = state.cycleIds.indexOf(planId);
  if (index === -1) return;
  const wasActive = index === state.activeIndex;
  state.cycleIds = state.cycleIds.filter((id) => id !== planId);

  if (!state.cycleIds.length) {
    state.activeIndex = 0;
    state.checked = [];
    return;
  }

  if (index < state.activeIndex) {
    state.activeIndex -= 1;
  } else if (wasActive) {
    state.activeIndex = Math.min(state.activeIndex, state.cycleIds.length - 1);
    state.checked = [];
  }
}

function toggleCycle(planId) {
  if (isInCycle(planId)) {
    removePlanFromCycle(planId);
  } else {
    addPlanToCycle(planId);
  }
}

function setCurrent(planId) {
  if (!planById.has(planId)) return;
  addPlanToCycle(planId);
  const index = state.cycleIds.indexOf(planId);
  if (index !== -1 && index !== state.activeIndex) {
    state.activeIndex = index;
    state.checked = [];
  }
  state.detailId = planId;
}

function moveCycleItem(index, direction) {
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || index >= state.cycleIds.length || nextIndex >= state.cycleIds.length) return;
  const nextCycle = [...state.cycleIds];
  [nextCycle[index], nextCycle[nextIndex]] = [nextCycle[nextIndex], nextCycle[index]];
  state.cycleIds = nextCycle;

  if (state.activeIndex === index) {
    state.activeIndex = nextIndex;
  } else if (state.activeIndex === nextIndex) {
    state.activeIndex = index;
  }
}

function advancePlan() {
  const plan = currentPlan();
  if (!plan) return;

  state.history.unshift({
    date: todayStamp(),
    round: state.round,
    planId: plan.id,
    planTitle: plan.title
  });
  state.history = state.history.slice(0, 80);
  state.activeIndex += 1;

  if (state.activeIndex >= state.cycleIds.length) {
    state.activeIndex = 0;
    state.round += 1;
  }

  state.checked = [];
  saveState();
  render();
}

mealList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-meal]");
  const plan = currentPlan();
  if (!button || !plan) return;

  const index = Number(button.dataset.meal);
  if (state.checked.includes(index)) {
    state.checked = state.checked.filter((item) => item !== index);
  } else {
    state.checked = [...state.checked, index].sort((a, b) => a - b);
  }

  clearTimeout(advanceTimer);
  saveState();
  render();

  if (state.checked.length === plan.meals.length) {
    advanceTimer = setTimeout(advancePlan, ADVANCE_DELAY);
  }
});

document.addEventListener("click", (event) => {
  const filter = event.target.closest("[data-filter]");
  const detail = event.target.closest("[data-detail]");
  const cycleToggle = event.target.closest("[data-cycle-toggle]");
  const setCurrentButton = event.target.closest("[data-set-current]");
  const removeCycle = event.target.closest("[data-remove-cycle]");
  const moveButton = event.target.closest("[data-move]");

  if (filter) {
    state.filter = filter.dataset.filter;
  } else if (detail) {
    state.detailId = detail.dataset.detail;
  } else if (cycleToggle) {
    toggleCycle(cycleToggle.dataset.cycleToggle);
  } else if (setCurrentButton) {
    setCurrent(setCurrentButton.dataset.setCurrent);
  } else if (removeCycle) {
    removePlanFromCycle(removeCycle.dataset.removeCycle);
  } else if (moveButton) {
    moveCycleItem(Number(moveButton.dataset.move), Number(moveButton.dataset.direction));
  } else {
    return;
  }

  clearTimeout(advanceTimer);
  saveState();
  render();
});

document.querySelector("#addAllBtn").addEventListener("click", () => {
  const activePlan = currentPlan();
  state.cycleIds = [...allPlanIds];
  state.activeIndex = activePlan ? state.cycleIds.indexOf(activePlan.id) : 0;
  state.checked = [];
  saveState();
  render();
});

document.querySelector("#clearCycleBtn").addEventListener("click", () => {
  state.cycleIds = [];
  state.activeIndex = 0;
  state.checked = [];
  saveState();
  render();
});

document.querySelector("#undoBtn").addEventListener("click", () => {
  const last = state.history.shift();
  if (!last) return;
  addPlanToCycle(last.planId);
  state.activeIndex = state.cycleIds.indexOf(last.planId);
  state.round = last.round;
  state.checked = [];
  state.detailId = last.planId;
  saveState();
  render();
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  state.cycleIds = [...allPlanIds];
  state.activeIndex = 0;
  state.round = 1;
  state.checked = [];
  state.history = [];
  state.detailId = allPlanIds[0];
  state.filter = "全部";
  saveState();
  render();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js?v=20260722b");
  });
}

render();
