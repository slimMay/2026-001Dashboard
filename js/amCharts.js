var chartData = [
    { "date": "2025-03-01", "總業績": 227, "townSize": 25, "客單價": 407.1, "去年同期": 408, "來客數": 120 },
    { "date": "2025-03-02", "總業績": 371, "townSize": 14, "客單價": 388.9, "去年同期": 482, "來客數": 130 },
    { "date": "2025-03-03", "總業績": 433, "townSize": 6, "客單價": 134.22, "去年同期": 562, "來客數": 170 },
    { "date": "2025-03-04", "總業績": 345, "townSize": 7, "客單價": 300.35, "去年同期": 379, "來客數": 210 },
    { "date": "2025-03-05", "總業績": 480, "townSize": 10, "客單價": 205.83, "去年同期": 501, "來客數": 300 },
    { "date": "2025-03-06", "總業績": 386, "townSize": 7, "客單價": 310.46, "去年同期": 443, "來客數": 256 },
    { "date": "2025-03-07", "總業績": 348, "townSize": 10, "客單價": 229.94, "去年同期": 405, "來客數": 328 },
    { "date": "2025-03-08", "總業績": 238, "townSize": 16, "客單價": 209.76, "去年同期": 309, "來客數": 320 },
    { "date": "2025-03-09", "總業績": 218, "townSize": 17, "客單價": 302.8, "去年同期": 287, "來客數": 400 },
    { "date": "2025-03-10", "總業績": 349, "townSize": 11, "客單價": 135.49, "去年同期": 485, "來客數": 350 },
    { "date": "2025-03-11", "總業績": 603, "townSize": 10, "客單價": 139.1, "去年同期": 890, "來客數": 360 },
    { "date": "2025-03-12", "總業績": 371, "townSize": 14, "客單價": 388.9, "去年同期": 482, "來客數": 510 },
    { "date": "2025-03-13", "總業績": 433, "townSize": 6, "客單價": 134.22, "去年同期": 562, "來客數": 320 },
    { "date": "2025-03-14", "總業績": 345, "townSize": 7, "客單價": 300.35, "去年同期": 379, "來客數": 195 },
    { "date": "2025-03-15", "總業績": 480, "townSize": 10, "客單價": 205.83, "去年同期": 501, "來客數": 188 },
    { "date": "2025-03-16", "總業績": 386, "townSize": 7, "客單價": 310.46, "去年同期": 443, "來客數": 270 },
    { "date": "2025-03-17", "總業績": 348, "townSize": 10, "客單價": 229.94, "去年同期": 405, "來客數": 311 },
    { "date": "2025-03-18", "總業績": 238, "townSize": 16, "客單價": 209.76, "去年同期": 309, "來客數": 309 },
    { "date": "2025-03-19", "總業績": 218, "townSize": 17, "客單價": 302.8, "去年同期": 287, "來客數": 405 },
    { "date": "2025-03-20", "總業績": 349, "townSize": 11, "客單價": 135.49, "去年同期": 485, "來客數": 411 },
    { "date": "2025-03-21", "總業績": 603, "townSize": 10, "客單價": 139.1, "去年同期": 890, "來客數": 329 },
    { "date": "2025-03-22", "總業績": 371, "townSize": 14, "客單價": 388.9, "去年同期": 482, "來客數": 220 },
    { "date": "2025-03-23", "總業績": 433, "townSize": 6, "客單價": 134.22, "去年同期": 562, "來客數": 130 },
    { "date": "2025-03-24", "總業績": 345, "townSize": 7, "客單價": 300.35, "去年同期": 379, "來客數": 258 },
    { "date": "2025-03-25", "總業績": 480, "townSize": 10, "客單價": 205.83, "去年同期": 501, "來客數": 420 },
    { "date": "2025-03-26", "總業績": 386, "townSize": 7, "客單價": 310.46, "去年同期": 443, "來客數": 300 },
    { "date": "2025-03-27", "總業績": 348, "townSize": 10, "客單價": 229.94, "去年同期": 405, "來客數": 149 },
    { "date": "2025-03-28", "總業績": 238, "townSize": 16, "客單價": 209.76, "去年同期": 309, "來客數": 188 },
    { "date": "2025-03-29", "總業績": 218, "townSize": 17, "客單價": 302.8, "去年同期": 287, "來客數": 380 },
    { "date": "2025-03-30", "總業績": 349, "townSize": 11, "客單價": 135.49, "去年同期": 485, "來客數": 328 },
    { "date": "2025-03-31", "總業績": 0.18, "townSize": 10, "客單價": 139.1, "去年同期": 890, "來客數": 410 }
];


var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "dark",
    "dataDateFormat": "YYYY-MM-DD",
    "dataProvider": chartData,
    "addClassNames": true,
    "color": "#FFFFFF",



    // 2. 圖表標題
    "titles": [{
        "text": "北一處 3 月即時業績 (單位：億)",
        "size": 18,
        "bold": true
    }],

    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "minPeriod": "DD",
        "autoGridCount": true,
        "axisColor": "#555555",
        "gridAlpha": 0.1,
        "dateFormats": [
            { "period": "fff", "format": "MM/DD" },
            { "period": "ss", "format": "MM/DD" },
            { "period": "mm", "format": "MM/DD" },
            { "period": "hh", "format": "MM/DD" },
            { "period": "DD", "format": "MM/DD" },
            { "period": "WW", "format": "MM/DD" },
            { "period": "MM", "format": "MM/DD" },
            { "period": "YYYY", "format": "MM/DD" }
        ]
    },

    "valueAxes": [
        {
            "id": "a1",
            "title": "總業績 (億)",
            "gridAlpha": 0,
            "position": "left"
        },
        {
            "id": "a2",
            "title": "客單價 (元)",
            "gridAlpha": 0,
            "position": "right" // 5. 差距過大：使用右側獨立軸
        }
    ],

    "graphs": [
        {
            "id": "g1",
            "valueField": "總業績", // 改為中文欄位名稱
            "title": "當前總業績",
            "type": "column",
            "fillAlphas": 0.8,
            "valueAxis": "a1",
            "lineColor": "#4285f4",
            "balloonText": "業績: [[value]] 億"
        },
        {
            "id": "g2",
            "valueField": "客單價", // 改為中文欄位名稱
            "title": "平均客單價",
            "type": "line",
            "valueAxis": "a2",
            "lineColor": "#eefe43",
            "bullet": "round",
            "bulletSizeField": "townSize",
            "balloonText": "客單價: [[value]] 元"
        },
        {
            "id": "g3",
            "valueField": "去年同期",
            "title": "去年同期",
            "type": "line",
            "valueAxis": "a1",
            "lineColor": "#ff5755",
            "bullet": "square",
            bulletBorderThickness: 1,
            bulletBorderAlpha: 1,
            dashLengthField: "dashLength",
            "balloonText": "去年同期業績: [[value]] 億"
        },
        {
            "id": "g4",
            "valueField": "來客數", // 改為中文欄位名稱
            "title": "來客數",
            "type": "line",
            "valueAxis": "a2",
            "lineColor": "#36BC06",
            "bullet": "round",
            "balloonText": "來客數: [[value]] 人"
        }
    ],

    "chartCursor": {
        "categoryBalloonDateFormat": "MM-DD",
        "cursorAlpha": 0.1
    },

    "legend": {
        "position": "bottom",
        "useGraphSettings": true
    },

    // 4 & 6. RWD 自定義規則
    "responsive": {
        "enabled": true,
        "rules": [
            {
                "maxWidth": 550, // 當螢幕寬度小於 550px 時
                "overrides": {
                    "legend": { "enabled": false }, // 隱藏圖例增加空間
                    "titles": [{ "size": 14 }],     // 縮小標題
                    "categoryAxis": { "labelRotation": 45 } // 日期斜放避免擠壓
                }
            }
        ]
    }
});