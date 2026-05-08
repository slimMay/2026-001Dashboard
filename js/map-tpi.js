var myChart = echarts.init(document.getElementById('main'));
    var currentMode = 'achievement'; // 預設模式

    // 模擬從 Google Sheets 讀取的資料 (日後可用 Papa.parse 替換)
    const rawStoreData = [
                        {name:'信義黎忠', lng:121.558, lat:25.020, val:2700, rank:1},
                        {name:'北投致遠', lng:121.511466, lat:25.117048, val:2800, rank:8},
                        {name:'文山保儀', lng:121.568447, lat:24.988543, val:2200, rank:2},
                        {name:'內湖康樂', lng:121.619006, lat:225.070877, val:2230, rank:9}, // 已將港湖修正為內湖
                        {name:'大直實踐', lng:121.54915, lat:25.084449, val:2410, rank:10},
                        {name:'松山吉祥', lng:121.562455, lat:25.050644, val:2830, rank:3},
                        {name:'南港中研', lng:121.616957, lat:25.044368, val:2420, rank:11}, // 已將港湖修正為南港
                        {name:'中正延平', lng:121.507484, lat:25.033729, val:3050, rank:4},
                        {name:'大直敬業', lng:121.558342, lat:25.080941, val:2180, rank:12},
                        {name:'文山景興', lng:121.544359, lat:24.992481, val:2880, rank:5},
                        {name:'北投明德', lng:121.519266, lat:25.111108, val:2860, rank:6},
                        {name:'內湖成功', lng:121.601443, lat:25.086469, val:2480, rank:14},
                        {name:'內湖民權', lng:121.585743, lat:25.067862, val:2410, rank:15},
                        {name:'內湖金龍', lng:121.587235, lat:25.088161, val:2400, rank:16},
                        {name:'內湖星雲', lng:121.596703, lat:25.080998, val:2390, rank:17},
                        {name:'內湖港墘', lng:121.576953, lat:25.077882, val:2360, rank:18},
                        {name:'內湖南湖', lng:121.613412, lat:25.069745, val:2340, rank:19},
                        {name:'內湖文德', lng:121.583989, lat:25.078246, val:2830, rank:7}
        // ... 更多資料
    ];

    const mapUrl = "https://slimmay.github.io/StoresDemo/map/taiwan/taipei_12.json";

    fetch(mapUrl).then(res => res.json()).then(geojson => {
        echarts.registerMap('TaipeiMap', geojson);
        renderChart();
    });

    function renderChart() {
        const option = {


            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,0,0.8)',
                textStyle: { color: '#fff' },
                formatter: function (params) {
                    // 區分地圖區域與散點的提示內容
                    if (params.seriesType === 'scatter') {
                        return `門市：${params.name}<br/>排名：第 ${params.value[3]} 名<br/>營業額：${params.value[2]}萬`;
                    }
                    return `${params.name}<br/>達成率：${params.value || 0}%`;
                }   
                }, 
            geo: {
                map: 'TaipeiMap',
                roam: true,
                itemStyle: {
                    areaColor: '#001a33', borderColor: '#00d4ff', borderWidth: 1.5,
                    shadowBlur: 15, shadowColor: 'rgba(0, 212, 255, 0.4)'
                }
            },
            series: [
                {
                    name: '門市標註',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    // 關鍵邏輯：判斷前10名
                    data: rawStoreData.map(item => ({
                        name: item.name,
                        value: [item.lng, item.lat, item.val, item.rank],
                        symbolSize: item.rank <= 10 ? 50 : 30, // 前十名較大
                        itemStyle: {
                            color: item.rank <= 10 ? '#ff4444' : '#00d4ff' // 前十名紅色
                        },
                        label: { show: item.rank <= 32, formatter: '{@[3]}', color: '#fff' }
                    })),
                    zlevel: 2
                },
                {
                    type: 'map',
                    geoIndex: 0,
                    data: [ 
                        {name: '北投區', value: 100}, {name: '士林區', value: 210},
                        {name: '內湖區', value: 158}, {name: '松山區', value: 620},
                        {name: '中山區', value: 800}, {name: '大同區', value: 205},
                        {name: '萬華區', value: 700}, {name: '中正區', value: 620},
                        {name: '大安區', value: 730}, {name: '信義區', value: 800},
                        {name: '南港區', value: 205}, {name: '文山區', value: 700}/* 行政區數據 */ ]
                }
            ]
        };
        myChart.setOption(option);
    }

    function updateMode(mode) {
        currentMode = mode;
        $('.menu-btn').removeClass('active');
        $(`button[onclick="updateMode('${mode}')"]`).addClass('active');
        // 這裡寫切換數據的邏輯
        console.log("切換至：" + mode);
    }

    window.addEventListener('resize', () => myChart.resize());