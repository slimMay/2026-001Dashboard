
        function createGaugeOption(id, title, value, mainColor) {
            const chartDom = document.getElementById(id);
            if (!chartDom) return;
            const myChart = echarts.init(chartDom);

            let angle = 0;

            const option = {
                backgroundColor: 'transparent',
                title: {
                    // 修正：僅顯示一組數據，並將文字置中
                    text: `{v|${value}}{unit|%}\n{t|${title}}`,
                    left: 'center',
                    top: 'center',
                    textStyle: {
                        rich: {
                            v: { fontSize: 34, color: '#fff', fontWeight: 480, padding: [10, 0, 0, 0] },
                            unit: { fontSize: 12, color: '#fff', padding: [0, 0, 10, 2] },
                            t: { fontSize: 15, color: 'rgba(255,255,255,0.7)', padding: [8, 0, 0, 0] }
                        }
                    }
                },
                series: [
                    // 1. 外部旋轉裝飾線 (維持動畫感)
                    {
                        type: 'custom',
                        coordinateSystem: 'none',
                        renderItem: (params, api) => {
                            const cx = api.getWidth() / 2, cy = api.getHeight() / 2;
                            const r = Math.min(cx, cy) * 0.75;
                            const style = { stroke: mainColor, fill: 'transparent', lineWidth: 1.5 };
                            return {
                                type: 'group',
                                children: [
                                    { type: 'arc', shape: { cx, cy, r, startAngle: (angle) * Math.PI / 180, endAngle: (angle + 90) * Math.PI / 180 }, style },
                                    { type: 'circle', shape: { cx: cx + r * Math.cos(angle * Math.PI / 180), cy: cy + r * Math.sin(angle * Math.PI / 180), r: 4}, style: { fill: mainColor } },
                                    { type: 'arc', shape: { cx, cy, r, startAngle: (angle + 180) * Math.PI / 180, endAngle: (angle + 270) * Math.PI / 180 }, style },
                                    { type: 'circle', shape: { cx: cx + r * Math.cos((angle + 180) * Math.PI / 180), cy: cy + r * Math.sin((angle + 180) * Math.PI / 180), r: 4 }, style: { fill: mainColor } }
                                ]
                            };
                        },
                        data: [0]
                    },
                    // 2. 儀表板主體
                    {
                        type: 'gauge',
                        radius: '68%', // 稍微加大比例
                        startAngle: 90,
                        endAngle: -270,
                        pointer: { show: false },
                        // 底層：較粗的銀/深灰色圈
                        detail: { show: false }, 
                        axisLine: {
                            lineStyle: {
                                width: 20,
                                color: [[1, '#383333']] // 使用深色背景模擬「銀灰色底座」
                            }
                        },
                        // 上層：純色進度條
                        progress: {
                            show: true,
                            width: 20,
                            itemStyle: {
                                color: mainColor, // 改為純色，讓比例更清晰
                                // 增加一點點外發光科技感
                                shadowBlur: 15,
                                shadowColor: mainColor
                            }
                        },
                        // 刻度線
                        splitLine: { show: false },
                        axisTick: {
                            distance: -20, // 貼合進度條內部
                            length: 8,
                            lineStyle: { color: '#1f1a48', width: 2 } // 黑色間隔線，製造齒輪感
                        },
                        axisLabel: { show: false },
                        data: [{ value: value }]
                    }
                ]
            };

            // 僅旋轉裝飾層
            setInterval(() => {
                angle += 2;
                myChart.setOption({ series: [{ type: 'custom' }] });
            }, 50);

            myChart.setOption(option);
            return myChart;
        }

        // 渲染
        // 用 setTimeout 確保 bprog-wrap 已有實際尺寸
setTimeout(() => {
    const yearChart = createGaugeOption('chart-year', '年度累計', 65.33, '#00f2ff');
    const dayChart  = createGaugeOption('chart-day',  '今日即時', 48.33, '#ff2d55');
}, 100);

        const resizeObserver = new ResizeObserver(() => {
    yearChart?.resize();
    dayChart?.resize();
});
resizeObserver.observe(document.getElementById('bprog-wrap'));