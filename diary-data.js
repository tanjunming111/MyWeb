// ==========================================
// 日记数据文件 - 数据管理核心
// ==========================================
// 数据直接存储在此文件中
// 通过 edit.html 编辑后自动同步写入本地文件

// 日记数据（编辑后自动同步到此文件）
var defaultDiaryData = [
    {
        date: "0001-01-01",
        paragraphs: [
            "今天是公元元年的第一天。",
        ]
    },
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
            "不过是静态网站，别人的操作不能上传上来。但也很好了，已经能让大家看见我的网站了。",
            "现在已经当上 yes 工程师了，而且每天用完额度后都在期待第二天更新额度。",
            "现在 Trae 容易限额，不知道有没有必要升级权益。升级权益最少也要 ￥59，还是新用户优惠后的结果。",
            "还有就是在 Github 上上传文件之后，每次都要重新更新网站，失败的话又要删除再重新搞一遍，比较麻烦。",
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
            "发现一个问题，在本地使用这个网站时还比较流畅，但在浏览器上却是先渲染网页框架再渲染文字，在观感上不太好。我让 Agent 修改成将文字内容处理好后，网页框架和文字同时渲染，这样既避免了新页面出现的突兀，又使得页面转换观感更好。",
            "这短短几天，我仿佛在经历我人生中的工业革命。在使用AI编程工具的过程中，我越来越感受到 AI 的强大与便捷，也逐渐了解到了许多和 AI 相关的东西。我感觉到我的水平在不断进步，以后有能力做出更多东西。",
        ]
    },
    {
        date: "2026-07-05",
        paragraphs: [
            "早上第一次用 Trae 的时候告诉我额度消耗完了，明明我今天没有用过，晚上十二点过后也没有用，结果莫名其妙告诉我额度用完了，要等到明天才有，无语了。",
            "我只能继续用 Deepseek 的 API。增大了编辑日记的内容框，使得编辑的时候能看到更多的内容。",
            "发现了一个问题，本来在任意页面点击头像都应该回到主页，但我尝试在主页点击头像，却显示页面不存在，检查了才发现是之前 Trae 在实现链接的时候多打了一个双引号，我也不知道打这个双引号的意义是什么，手动把它删了，问题就解决了。",
            "现在没有了免费的额度，相当于我每次提问都要为 Tokens 花钱。因此，我提问需要更加直接明了，Prompt 需要更加准确，以避免 AI 理解错误而浪费 Tokens 的情况；同时每完成一个小项目就要新增一个窗口，避免上下文太长而让 AI 理解太久；还不能换得太频繁，因为每换一次新窗口，AI 都要重新理解一次我的代码，也会消耗很多 Tokens。在这样的交互中，我和 AI 交流的能力逐渐提升，这也未尝不是一件好事。",
            "而且用了 Deepseek 才发现 Trae 的权益没必要买，因为最便宜的平摊下来也要 ￥2 一天，而我这两天用 Deepseek 才花了一块多一点，对于我这种小项目，还是直接买 Tokens 再接过来用更好。",
            "晚上问 AI 还有什么是可以优化的，它回答了很多，包括日期搜索功能、Markdown 支持、字数统计功能、上一天和下一天快捷链接等等，令人满意。有空我慢慢改。",
        ]
    },
    {
        date: "2026-07-06",
        paragraphs: [
            "好消息是 Trae 的额度更新了，坏消息是现在使用免费额度要排队，每次都要排好久，还是用付费好。",
            "新增了字数统计功能，还有部分 Markdown 功能，比如 **加粗**、*斜体* 等，还有列表功能：",
            "- 链接功能：[github项目](https://github.com/tanjunming111/MyWeb)",
            "- 图片功能：<img src=\"tjm.jpg\" width=\"80\" style=\"vertical-align:middle\">",
            "- >引用功能",
            "- `代码块功能`",
            "- 预览功能，因为 Markdown 功能用得少，所以我就没有做编辑和预览并排的功能，而是要点击切换。",
            "在编辑日记页面下方增加了删除日记按钮，避免后期日记太多时要下翻才能删除日记。",
        ]
    },
    {
        date: "2026-07-07",
        paragraphs: [
            "添加了更新日志页面。",
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