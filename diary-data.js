// ==========================================
// 日记数据文件 - 数据管理核心
// ==========================================
// 默认日记数据（首次加载时写入 localStorage）
// 添加/编辑/删除日记通过 edit.html 操作，数据保存在 localStorage

const STORAGE_KEY = "diary_data";

// 默认数据
const defaultDiaryData = [
    {
        date: "2026-06-26",
        paragraphs: [
            "今天是6月26日，开始记录这段特别的日子。",
            "希望接下来的每一天都能有所收获。"
        ]
    },
    {
        date: "2026-06-27",
        paragraphs: [
            "6月27日，阳光明媚。",
            "继续探索前端开发的世界，每一天都有新的发现。"
        ]
    },
    {
        date: "2026-06-28",
        paragraphs: [
            "6月28日，复习的压力逐渐加大。",
            "但学习新知识的热情并没有减退。"
        ]
    },
    {
        date: "2026-06-29",
        paragraphs: [
            "6月29日，离期末周结束越来越近了。",
            "期待假期里能做更多有趣的项目。"
        ]
    },
    {
        date: "2026-06-30",
        paragraphs: [
            "每到期末周，复习最紧张的时候，我就想乱搞一些别的东西。先前到B站学了用html做网站，现在就想来试试。",
            "以后有什么好玩的东西都会搞上来。"
        ]
    },
    {
        date: "2026-07-01",
        paragraphs: [
            "7月1日，新的一个月开始了。",
            "暑假即将到来，计划学习更多前端技术。"
        ]
    },
    {
        date: "2026-07-02",
        paragraphs: [
            "7月2日，今天结束了这段连续的记录。",
            "期待未来能把更多想法变成现实。"
        ]
    },
    {
        date: "2026-07-03",
        paragraphs: [
            "7月3日，我把网站部署到 Github 上啦！"
        ]
    }
];

// ===== 数据读写接口 =====

// 加载所有日记数据（优先从 localStorage 读取）
function loadDiaryData() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("数据解析失败，使用默认数据", e);
        }
    }
    // 首次访问，初始化 localStorage
    saveDiaryData(defaultDiaryData);
    return defaultDiaryData;
}

// 保存所有日记数据到 localStorage
function saveDiaryData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// 获取单条日记
function getDiaryEntry(date) {
    var data = loadDiaryData();
    return data.find(function(e) { return e.date === date; });
}

// 新增日记（若日期已存在则返回 false）
function addDiaryEntry(date, paragraphs) {
    var data = loadDiaryData();
    if (data.find(function(e) { return e.date === date; })) {
        return false; // 已存在
    }
    data.push({ date: date, paragraphs: paragraphs });
    data.sort(function(a, b) { return a.date < b.date ? -1 : 1; });
    saveDiaryData(data);
    return true;
}

// 更新日记
function updateDiaryEntry(date, paragraphs) {
    var data = loadDiaryData();
    var entry = data.find(function(e) { return e.date === date; });
    if (entry) {
        entry.paragraphs = paragraphs;
        saveDiaryData(data);
        return true;
    }
    return false;
}

// 删除日记
function deleteDiaryEntry(date) {
    var data = loadDiaryData();
    var newData = data.filter(function(e) { return e.date !== date; });
    if (newData.length === data.length) {
        return false; // 未找到
    }
    saveDiaryData(newData);
    return true;
}

// 获取按月份分组的数据（用于菜单生成）
function getDiaryByMonth() {
    var data = loadDiaryData();
    var grouped = {};
    data.forEach(function(entry) {
        var month = entry.date.substring(0, 8);
        if (!grouped[month]) {
            grouped[month] = [];
        }
        grouped[month].push(entry);
    });
    return grouped;
}

// ===== 格式化工具 =====

// 月份中文标签（含年份）
function getMonthLabel(month) {
    var parts = month.split("-");
    return parts[0] + "年" + parseInt(parts[1]) + "月";
}

// 日期格式化: "2026-06-26" -> "6月26日"
function formatDate(dateStr) {
    var parts = dateStr.split("-");
    return parseInt(parts[1]) + "月" + parseInt(parts[2]) + "日";
}

// 日期标题格式化: "2026-06-26" -> "2026.6.26"
function formatDateTitle(dateStr) {
    var parts = dateStr.split("-");
    return parts[0] + "." + parseInt(parts[1]) + "." + parseInt(parts[2]);
}
