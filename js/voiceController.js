// ==============================
// ECharts 初始化
// ==============================

var myChart = echarts.init(
    document.getElementById('main')
);


// ==============================
// GeoJSON 快取（避免重複下載）
// ==============================

const geoCache = {};

async function loadMapWithCache(name, url) {
    if (!geoCache[name]) {
        // 第一次才下載，之後直接從記憶體取用
        geoCache[name] = await fetch(url).then(res => res.json());
        echarts.registerMap(name, geoCache[name]);
    }
    renderMap(name);
}


// ==============================
// 載入台灣
// ==============================

async function loadTaiwan() {
    await loadMapWithCache(
        'Taiwan',
        'https://slimmay.github.io/StoresDemo/map/taiwan/twCounty.json'
    );
}


// ==============================
// 載入台北市
// ==============================

async function loadTaipei() {
    await loadMapWithCache(
        'Taipei',
        'https://slimmay.github.io/StoresDemo/map/taiwan/taipei_12.json'
    );
}


// ==============================
// 載入新北市
// ==============================

async function loadNewTaipei() {
    await loadMapWithCache(
        'NewTaipei',
        'https://slimmay.github.io/StoresDemo/map/taiwan/new_taipei_29.json'
    );
}


// ==============================
// 頁面載入完成後：
// 1. 顯示預設台灣地圖
// 2. 背景預載其他地圖（加速後續切換）
// ==============================

window.addEventListener('load', () => {

    // 預設顯示台灣
    loadTaiwan();

    // 背景靜默預載，不 await，不影響頁面速度
    loadMapWithCache(
        'Taipei',
        'https://slimmay.github.io/StoresDemo/map/taiwan/taipei_12.json'
    );
    loadMapWithCache(
        'NewTaipei',
        'https://slimmay.github.io/StoresDemo/map/taiwan/new_taipei_29.json'
    );

});


// ==============================
// 地圖渲染
// ==============================

function renderMap(mapName) {

    myChart.setOption({

        backgroundColor: '#221d4f',

        tooltip: {
            trigger: 'item'
        },

        geo: {

            map: mapName,

            roam: true,

            itemStyle: {
                areaColor: '#001a33',
                borderColor: '#00d4ff',
                borderWidth: 1.5,
                shadowBlur: 15,
                shadowColor: 'rgba(0,212,255,0.5)'
            },

            emphasis: {
                itemStyle: {
                    areaColor: '#ffe600'
                }
            }

        }

    });

    // ECharts 重新計算容器尺寸（手機版必要）
    setTimeout(() => { myChart.resize(); }, 100);

}


// ==============================
// 責任區對照表
// 依公司實際責任區調整
// ==============================

const REGIONS = {
    '北一處': ['臺北市', '基隆市'],
    '北二處': ['新北市', '宜蘭縣'],
    '中區':   ['臺中市', '南投縣', '苗栗縣'],
    '南一處': ['臺南市', '嘉義市', '嘉義縣'],
    '南二處': ['高雄市', '屏東縣'],
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
// 辨識結束自動重啟（保持持續監聽）
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

    // no-speech：沒偵測到聲音，靜默重啟即可
    if (event.error === 'no-speech') return;

    // 其他錯誤顯示提示
    voiceStatus.innerHTML = "⚠️ " + event.error;
    isListening = false;
};


// ==============================
// 指令解析
// ==============================

function parseVoice(text) {

    // 去除空白
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
        myChart.dispatchAction({
            type: 'geoRoam',
            zoom: 1.5
        });
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
        myChart.dispatchAction({
            type: 'geoRoam',
            zoom: 0.7
        });
        voiceStatus.innerHTML = "🔎 縮小";
        return;
    }


    // ==========================
    // 地圖還原（回到預設視角）
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
    // 台灣（放最後，避免誤判）
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
    highlightRegion('北二處');
}