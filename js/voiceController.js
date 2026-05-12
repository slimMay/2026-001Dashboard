// ==============================
// ECharts
// ==============================

var myChart = echarts.init(
    document.getElementById('main')
);


// ==============================
// 載入預設台灣地圖
// ==============================

loadTaiwan();


// ==============================
// 載入台灣
// ==============================

async function loadTaiwan(){

    const geojson =
    await fetch(
        'https://slimmay.github.io/StoresDemo/map/taiwan/twCounty.json'
    ).then(res => res.json());

    echarts.registerMap(
        'Taiwan',
        geojson
    );

    renderMap('Taiwan');

}


// ==============================
// 載入台北市
// ==============================

async function loadTaipei(){

    const geojson =
    await fetch(
        'https://slimmay.github.io/StoresDemo/map/taiwan/taipei_12.json'
    ).then(res => res.json());

    echarts.registerMap(
        'Taipei',
        geojson
    );

    renderMap('Taipei');

}


// ==============================
// 載入新北市
// ==============================

async function loadNewTaipei(){

    const geojson =
    await fetch(
        'https://slimmay.github.io/StoresDemo/map/taiwan/new_taipei_29.json' // ← 請換成你實際的 GeoJSON 路徑
    ).then(res => res.json());

    echarts.registerMap(
        'NewTaipei',
        geojson
    );

    renderMap('NewTaipei');

}


// ==============================
// 地圖渲染
// ==============================

function renderMap(mapName){

    myChart.setOption({

        backgroundColor:'#221d4f',

        tooltip:{
            trigger:'item'
        },

        geo:{

            map: mapName,

            roam:true,

            itemStyle:{

                areaColor:'#001a33',

                borderColor:'#00d4ff',

                borderWidth:1.5,

                shadowBlur:15,

                shadowColor:'rgba(0,212,255,0.5)'

            },

            emphasis:{

                itemStyle:{

                    areaColor:'#ffe600'

                }

            }

        }

    });

}


// ==============================
// 語音 API
// ==============================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

const recognition =
    new SpeechRecognition();

recognition.lang = 'zh-TW';

recognition.continuous = true;

recognition.interimResults = false;


// ==============================
// DOM
// ==============================

const voiceBtn =
    document.getElementById("voiceBtn");

const voiceStatus =
    document.getElementById("voiceStatus");


// ==============================
// 點按鈕開始
// ==============================

voiceBtn.onclick = () => {

    recognition.start();

    voiceStatus.innerHTML =
        "🎤 Listening...";

};


// ==============================
// 語音辨識成功
// ==============================

recognition.onresult =
function(event){

    const text =
        event.results[
            event.results.length - 1
        ][0].transcript;

    console.log("你說:", text);

    voiceStatus.innerHTML =
        "✅ " + text;

    parseVoice(text);

};


// ==============================
// 指令解析
// ==============================

function parseVoice(text) {

    text = text.replace(/\s/g, '');

    console.log("解析指令:", text);

    // ==========================
    // 新北市（要在台北市之前判斷，避免「新北市」被其他條件吃掉）
    // ==========================
    if (text.includes("新北市")) {
        console.log("切換新北市");
        loadNewTaipei(); // ← 你需要新增這個 function
        return;
    }

    // ==========================
    // 台北市
    // ==========================
    if (text.includes("台北市") || text.includes("臺北市")) {
        console.log("切換台北市");
        loadTaipei();
        return;
    }

    // ==========================
    // 台灣（放最後，避免誤判）
    // ==========================
    if (text.includes("台灣") || text.includes("臺灣")) {
        console.log("切換台灣");
        loadTaiwan();
        return;
    }

    // ==========================
    // 北二處
    // ==========================
    if (text.includes("北二處")) {
        console.log("北二處");
        loadTaiwan();
        setTimeout(() => { highlightNorth2(); }, 500);
        return;
    }
}


// ==============================
// 北二處高亮
// ==============================

function highlightNorth2(){

    const regions = [

        '臺北市',
        '新北市',
        '基隆市'

    ];

    regions.forEach(name=>{

        myChart.dispatchAction({

            type:'highlight',

            geoIndex:0,

            name:name

        });

    });

}
