// ==============================
// voiceController.js
// 地圖渲染完全交給 HTML 裡的 renderChart(key)
// 這裡只負責：快取、語音、縮放、鍵盤備援
// ==============================


// ==============================
// GeoJSON 快取 + 地圖切換
// ==============================

const geoCache = {};

async function loadMapWithCache(key) {
    const cfg = MAP_CONFIGS[key];
    if (!cfg) return;

    if (!geoCache[key]) {
        const geojson = await fetch(cfg.url).then(res => res.json());
        echarts.registerMap(cfg.name, geojson);
        geoCache[key] = true;
    }

    // 交給 HTML 裡的 renderChart 渲染（保留 pin、著色層）
    renderChart(key);
}


// ==============================
// 維護目前縮放狀態
// ==============================

let currentZoom = 1;


// ==============================
// 地圖縮放（平滑動畫版）
// ==============================

function mapZoom(factor) {
    const steps = 3;
    const stepFactor = Math.pow(factor, 1 / steps);
    let step = 0;

    const animate = () => {
        if (step >= steps) return;
        currentZoom = currentZoom * stepFactor;
        myChart.setOption({ geo: { zoom: currentZoom } });
        step++;
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
}


// ==============================
// 載入台灣
// ==============================

async function loadTaiwan() {
    currentZoom = 1;
    await loadMapWithCache('taiwan');
}


// ==============================
// 載入台北市
// ==============================

async function loadTaipei() {
    currentZoom = 1;
    await loadMapWithCache('taipei');
}


// ==============================
// 載入新北市
// ==============================

async function loadNewTaipei() {
    currentZoom = 1;
    await loadMapWithCache('newtaipei');
}


// ==============================
// 頁面載入完成後：
// 1. 顯示預設台灣地圖
// 2. 背景預載其他地圖
// ==============================

window.addEventListener('load', () => {

    // 預設顯示台灣
    loadTaiwan();

    // 背景靜默預載
    loadMapWithCache('taipei');
    loadMapWithCache('newtaipei');

});


// ==============================
// 責任區對照表
// 依公司實際責任區調整
// ==============================

const REGIONS = {
    '北一': ['臺北市'],
    '北二': ['基隆市', '桃園市', '新北市'],
    '桃竹': ['桃園市', '新竹市', '新竹縣'],
    '臺中': ['臺中市', '南投縣', '台中市', '苗栗縣', '金門縣'],
    '雲嘉': ['臺南市', '嘉義市', '雲林縣', '嘉義縣', '澎湖縣'],
    '北三': ['新北市', '宜蘭縣', '臺東縣', '花蓮縣'],
    '中彰': ['南投縣', '彰化縣','臺中市'],
    '高屏': ['高雄市', '屏東縣'],
    '南高': ['高雄市', '臺南市'],
};


// ==============================
// 語音 API
// ==============================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = 'zh-TW';
recognition.continuous = true;
recognition.interimResults = false;


// ==============================
// DOM
// ==============================

const voiceBtn    = document.getElementById("voiceBtn");
const voiceStatus = document.getElementById("voiceStatus");


// ==============================
// 持續監聽狀態
// ==============================

let isListening = false;


// ==============================
// 開始監聽
// ==============================

function startListening() {
    if (isListening) return;
    try {
        recognition.start();
        isListening = true;
        voiceStatus.innerHTML = "🎤 監聽中...";
        voiceBtn.classList.add('active');
    } catch(e) {
        console.warn('recognition.start error:', e);
    }
}


// ==============================
// 停止監聽
// ==============================

function stopListening() {
    recognition.stop();
    isListening = false;
    voiceStatus.innerHTML = "🔇 已暫停";
    voiceBtn.classList.remove('active');
}


// ==============================
// 辨識結束自動重啟
// ==============================

recognition.onend = () => {
    isListening = false;
    if (voiceBtn.classList.contains('active')) {
        startListening();
    }
};


// ==============================
// 按鈕：開關切換
// ==============================

voiceBtn.onclick = () => {
    if (isListening) {
        stopListening();
    } else {
        startListening();
    }
};


// ==============================
// 語音辨識成功
// ==============================

recognition.onresult = function(event) {

    const text =
        event.results[event.results.length - 1][0].transcript;

    console.log("你說:", text);

    voiceStatus.innerHTML = "✅ " + text;

    parseVoice(text);

};


// ==============================
// 辨識錯誤處理
// ==============================

recognition.onerror = function(event) {
    console.warn("語音錯誤:", event.error);

    if (event.error === 'no-speech') return;

    voiceStatus.innerHTML = "⚠️ " + event.error;
    isListening = false;
};


// ==============================
// 指令解析
// ==============================

function parseVoice(text) {

    text = text.replace(/\s/g, '');

    console.log("解析指令:", text);


    // ==========================
    // 地圖放大
    // ==========================

    if (
        text.includes("放大") ||
        text.includes("zoom in")
    ) {
        console.log("地圖放大");
        mapZoom(1.5);
        voiceStatus.innerHTML = "🔍 放大";
        return;
    }


    // ==========================
    // 地圖縮小
    // ==========================

    if (
        text.includes("縮小") ||
        text.includes("zoom out")
    ) {
        console.log("地圖縮小");
        mapZoom(0.7);
        voiceStatus.innerHTML = "🔎 縮小";
        return;
    }


    // ==========================
    // 地圖還原
    // ==========================

    if (
        text.includes("還原") ||
        text.includes("重置") ||
        text.includes("回到全圖")
    ) {
        console.log("地圖還原");
        loadTaiwan();
        voiceStatus.innerHTML = "🗺️ 還原全圖";
        return;
    }


    // ==========================
    // 責任區（優先判斷）
    // ==========================

    const matchedRegion = Object.keys(REGIONS).find(r => text.includes(r));

    if (matchedRegion) {
        console.log("切換責任區:", matchedRegion);
        loadTaiwan();
        setTimeout(() => { highlightRegion(matchedRegion); }, 500);
        return;
    }


    // ==========================
    // 新北市（在台北市之前判斷）
    // ==========================

    if (text.includes("新北市")) {
        console.log("切換新北市");
        loadNewTaipei();
        return;
    }


    // ==========================
    // 台北市
    // ==========================

    if (
        text.includes("台北市") ||
        text.includes("臺北市")
    ) {
        console.log("切換台北市");
        loadTaipei();
        return;
    }


    // ==========================
    // 台灣（放最後避免誤判）
    // ==========================

    if (
        text.includes("台灣") ||
        text.includes("臺灣")
    ) {
        console.log("切換台灣");
        loadTaiwan();
        return;
    }

}


// ==============================
// 責任區高亮（通用版）
// ==============================

function highlightRegion(regionName) {

    const cities = REGIONS[regionName];

    if (!cities) return;

    // 先清除所有高亮
    myChart.dispatchAction({
        type: 'downplay',
        geoIndex: 0
    });

    // 高亮該責任區所有縣市
    cities.forEach(name => {
        myChart.dispatchAction({
            type: 'highlight',
            geoIndex: 0,
            name: name
        });
    });

}


// ==============================
// 北二處高亮（保留舊函數相容性）
// ==============================

function highlightNorth2() {
    highlightRegion('北二');
}


// ==============================
// 鍵盤快捷鍵備援
// 語音收音差時的替代方案
// ==============================

document.addEventListener('keydown', (e) => {

    // 避免在 input 輸入框內觸發
    if (e.target.tagName === 'INPUT') return;

    switch(e.key) {

        // ==========================
        // 地圖切換
        // ==========================
        case '1':
            loadTaiwan();
            voiceStatus.innerHTML = "⌨️ 全台灣";
            break;

        case '2':
            loadTaipei();
            voiceStatus.innerHTML = "⌨️ 台北市";
            break;

        case '3':
            loadNewTaipei();
            voiceStatus.innerHTML = "⌨️ 新北市";
            break;

        case '0':
            loadTaiwan();
            voiceStatus.innerHTML = "⌨️ 還原全圖";
            break;


        // ==========================
        // 縮放控制
        // ==========================
        case '+':
        case '=': // 有些鍵盤 + 要加 shift，= 不用
            mapZoom(1.5);
            voiceStatus.innerHTML = "⌨️ 放大";
            break;

        case '-':
            mapZoom(0.7);
            voiceStatus.innerHTML = "⌨️ 縮小";
            break;


        // ==========================
        // 責任區高亮
        // ==========================
        case 'q':
        case 'Q':
            loadTaiwan();
            setTimeout(() => { highlightRegion('北一'); }, 500);
            voiceStatus.innerHTML = "⌨️ 北一";
            break;

        case 'w':
        case 'W':
            loadTaiwan();
            setTimeout(() => { highlightRegion('北二'); }, 500);
            voiceStatus.innerHTML = "⌨️ 北二";
            break;

        case 'e':
        case 'E':
            loadTaiwan();
            setTimeout(() => { highlightRegion('台中'); }, 500);
            voiceStatus.innerHTML = "⌨️ 台中";
            break;

        case 'r':
        case 'R':
            loadTaiwan();
            setTimeout(() => { highlightRegion('南高'); }, 500);
            voiceStatus.innerHTML = "⌨️ 南高";
            break;

        case 't':
        case 'T':
            loadTaiwan();
            setTimeout(() => { highlightRegion('桃竹'); }, 500);
            voiceStatus.innerHTML = "⌨️ 桃竹";
            break;

    }

});