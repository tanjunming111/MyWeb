// ==========================================
// 日记数据文件 - 数据管理核心
// ==========================================
// 数据直接存储在此文件中
// 通过 edit.html 编辑后自动同步写入本地文件
// ===== 缓存版本号（更新数据后请同步修改此版本号） =====
var DATA_VERSION = "v1";
// 每次修改本文件中的数据后，将上面的版本号升级（v1→v2→v3……）
// 同时需要同步修改 menu.html、diary.html、edit.html 中
// script src="diary-data.js?t=..." 的版本号

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
            "新的一个月开始了。",
            "今天复习期末内容，优化网站。",
        ]
    },
    {
        date: "2026-07-02",
        paragraphs: [
            "下载了 Trae，发现真的好用，能够很快做出贪吃蛇小游戏等项目。就是Google账号一直注册不了，导致 ClaudeCode 和 Codex 用不了。",
            "把我之前写的 html 网站页面给 Trae 优化，让它帮我克隆成多个 html 页面，做成了这个日记网站。",
            "就是 Trae 限额，每天做多了东西额度就容易用完。",
        ]
    },
    {
        date: "2026-07-03",
        paragraphs: [
            "我把网站部署到 Github 上啦！",
            "Trae，容易限额，不知道有没有必要升级权益。",
            "现在已经当上 yes 工程师了，而且每天用完额度后都在期待第二天更新额度。",
            "还有就是在 Github 上上传文件之后，每次都要重新部署网站，失败的话又要删除再重新搞一遍，比较麻烦。",
        ]
    },
    {
        date: "2026-07-04",
        paragraphs: [
            "今天增加了一些内容，能够通过网站修改本地的数据。当然，只有我能修改并更新到 Github 上，读者不能修改。",
            "然后设计了页面编辑按钮，每一个日期页面都可以点击按钮编辑当前页。",
            "更新了 dairy-data.js 的存储方式，加了一个时间戳，使得上传到 Github 的过程中不用上传所有文件，只需要上传 dairy-data.js 的内容，其他文件会自动调用该文件的最新版本。",
            "不知道为什么，今天额度一下子就用完了，可能是字节想要赚钱，减少了每日提供的额度。后面在 Deepseek 上买了十块钱的 Tokens，用API密钥导入 Trae，就可以在 Trae 里用了。一开始用V4-Pro 问了一个问题，花了￥0.16，有点小贵。后来换成 V4-flash（这个便宜一点，性价比高），重新开了对话（可以减少AI对上下文的思考），问了一个问题，只要￥0.02，以后还是用这个好。",
            "......",
            "发现一个问题，在本地使用这个网站时还比较流畅，但在浏览器上却是先渲染网页框架再渲染文字，在观感上不太好。我就让 Agent 改成全部处理好后网页框架和文字一起渲染，这样既减少的页面转换的突兀，又让页面转换观感更好。",
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