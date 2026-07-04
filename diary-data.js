// ==========================================
// 日记数据文件 - 数据管理核心
// ==========================================
// 数据直接存储在此文件中
// 通过 edit.html 编辑后自动同步写入本地文件

// 日记数据（编辑后自动同步到此文件）
var defaultDiaryData = [
    {
        date: "2026-06-26",
        paragraphs: [
            "今天是6月26日，开始记录这段特别的日子。",
            "希望接下来的每一天都能有所收获。",
        ]
    },
    {
        date: "2026-06-27",
        paragraphs: [
            "6月27日，阳光明媚。",
            "继续探索前端开发的世界，每一天都有新的发现。",
        ]
    },
    {
        date: "2026-06-28",
        paragraphs: [
            "6月28日，复习的压力逐渐加大。",
            "但学习新知识的热情并没有减退。",
        ]
    },
    {
        date: "2026-06-29",
        paragraphs: [
            "6月29日，离期末周结束越来越近了。",
            "期待假期里能做更多有趣的项目。",
        ]
    },
    {
        date: "2026-06-30",
        paragraphs: [
            "每到期末周，复习最紧张的时候，我就想乱搞一些别的东西。先前到B站学了用html做网站，现在就想来试试。",
            "以后有什么好玩的东西都会搞上来。",
        ]
    },
    {
        date: "2026-07-01",
        paragraphs: [
            "7月1日，新的一个月开始了。",
            "暑假即将到来，计划学习更多前端技术。",
        ]
    },
    {
        date: "2026-07-02",
        paragraphs: [
            "7月2日，今天结束了这段连续的记录。",
            "期待未来能把更多想法变成现实。",
        ]
    },
    {
        date: "2026-07-03",
        paragraphs: [
            "7月3日，我把网站部署到 Github 上啦！",
        ]
    },
    {
        date: "2026-07-04",
        paragraphs: [
            "今天增加了内容，能够通过网站修改本地的数据。",
            "当然，只有我能修改并更新到Github上，读者不能修改。",
        ]
    }
];

// ===== 数据读写接口 =====

function loadDiaryData() {
    return defaultDiaryData;
}

function saveDiaryData(data) {
    defaultDiaryData = data;
}

function getDiaryEntry(date) {
    return defaultDiaryData.find(function(e) { return e.date === date; });
}

function addDiaryEntry(date, paragraphs) {
    if (defaultDiaryData.find(function(e) { return e.date === date; })) return false;
    defaultDiaryData.push({ date: date, paragraphs: paragraphs });
    defaultDiaryData.sort(function(a, b) { return a.date < b.date ? -1 : 1; });
    return true;
}

function updateDiaryEntry(date, paragraphs) {
    var entry = defaultDiaryData.find(function(e) { return e.date === date; });
    if (entry) { entry.paragraphs = paragraphs; return true; }
    return false;
}

function deleteDiaryEntry(date) {
    var newData = defaultDiaryData.filter(function(e) { return e.date !== date; });
    if (newData.length === defaultDiaryData.length) return false;
    defaultDiaryData = newData;
    return true;
}

function getDiaryByMonth() {
    var grouped = {};
    defaultDiaryData.forEach(function(entry) {
        var month = entry.date.substring(0, 7);
        if (!grouped[month]) grouped[month] = [];
        grouped[month].push(entry);
    });
    return grouped;
}

function getMonthLabel(month) {
    var parts = month.split("-");
    return parts[0] + "年" + parseInt(parts[1]) + "月";
}

function formatDate(dateStr) {
    var parts = dateStr.split("-");
    return parseInt(parts[1]) + "月" + parseInt(parts[2]) + "日";
}

function formatDateTitle(dateStr) {
    var parts = dateStr.split("-");
    return parts[0] + "." + parseInt(parts[1]) + "." + parseInt(parts[2]);
}