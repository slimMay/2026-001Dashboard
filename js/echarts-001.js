var chartData = [
    {
        "date": "2025-03-01",
        "總業績": 540710506,
        //"townName": "New York",
        "townSize": 25,
        "客單價": 337,
        "總來客數": 1603812
    },
    {
        "date": "2025-03-02",
        "總業績": 520914443,
        //"townName": "Washington",
        "townSize": 14,
        "客單價": 336,
        "總來客數": 1546536
    },
    {
        "date": "2025-03-03",
        "總業績": 465487556,
        //"townName": "Wilmington",
        "townSize": 6,
        "客單價": 308,
        "總來客數": 1510317
    },
    {
        "date": "2025-03-04",
        "總業績": 360585342,
        //"townName": "Jacksonville",
        "townSize": 7,
        "客單價": 304,
        "總來客數": 1184654
    },
    {
        "date": "2025-03-05",
        "總業績": 450934469,
        //"townName": "Miami",
        //"townName2": "Miami",
        "townSize": 10,
        "客單價": 316,
        "總來客數": 1425293
    },
    {
        "date": "2025-03-06",
        "總業績": 432175110,
        //"townName": "Tallahassee",
        "townSize": 7,
        "客單價": 326,
        "總來客數": 1323076
    },
    {
        "date": "2025-03-07",
        "總業績": 435286031,
        "townName": "New Orleans",
        "townSize": 10,
        "客單價": 328,
        "總來客數": 1324658
    },
    {
        "date": "2025-03-08",
        "總業績": 593738371,
        //"townName": "Houston",
        //"townName2": "Houston",
        "townSize": 16,
        "客單價": 378,
        "總來客數": 1570724
    },
    {
        "date": "2025-03-09",
        "總業績": 588148833,
        //"townName": "Dalas",
        "townSize": 17,
        "客單價": 360,
        "總來客數": 1630766
    },
    {
        "date": "2025-03-10",
        "總業績": 490008859,
        //"townName": "Oklahoma City",
        "townSize": 11,
        "客單價": 320,
        "總來客數": 1529671
    },
    {
        "date": "2025-03-11",
        "總業績": 445947258,
        //"townName": "Kansas City",
        "townSize": 10,
        "客單價": 306,
        "總來客數": 1452644
    },
    {
        "date": "2025-03-12",
        "總業績": 462760789,
        //"townName": "Denver",
        //"townName2": "Denver",
        "townSize": 18,
        "客單價": 309,
        "總來客數": 1494455
    },
    {
        "date": "2025-03-13",
        //"townName": "Salt Lake City",
        "townSize": 12,
        "總業績": 438248632,
        "總來客數": 1360542,
        "客單價": 322,
        "alpha":0.4
    },
    {
        "date": "2025-03-14",
        "總業績": 478379904,
        "客單價": 331,
        "總來客數": 1441266,
        //"townName": "Las Vegas",
        //"townName2": "Las Vegas",
        
        "bulletClass": "lastBullet"
    },
    {
        "date": "2025-03-15",
        "總業績": 541852588,
        //"townName": "Kansas City",
        //"townName2": "Kansas City",
        "townSize": 10,
        "客單價": 371,
        "bulletClass": "lastBullet",
        "總來客數": 1460243
    },
    {
        "date": "2025-03-16"
    },

    {
        "date": "2025-03-18"
    },
    {
        "date": "2025-03-19"
    },    
    {
        "date": "2025-03-20"
    },
    {
        "date": "2025-03-21"
    },
    {
        "date": "2025-03-22"
    },
    {
        "date": "2025-03-23"
    },
    {
        "date": "2025-03-24"
    }

];
var chart = AmCharts.makeChart("chartdiv", {
  type: "serial",
  theme: "dark",
  dataDateFormat: "YYYY-MM-DD",
  dataProvider: chartData,

  addClassNames: true,
  start總來客數: 1,
  color: "#FFFFFF",
  marginLeft: 0,

  categoryField: "date",
  categoryAxis: {
    parseDates: true,
    minPeriod: "DD",
    autoGridCount: false,
    gridCount: 50,
    gridAlpha: 0.1,
    gridColor: "#FFFFFF",
    axisColor: "#555555",
    dateFormats: [{
        period: 'DD',
        format: 'DD'
    }, {
        period: 'WW',
        format: 'MMM DD'
    }, {
        period: 'MM',
        format: 'MMM'
    }, {
        period: 'YYYY',
        format: 'YYYY'
    }]
  },

  valueAxes: [{
    id: "a1",
    title: "總業績",
    gridAlpha: 0,
    axisAlpha: 0
  },{
    id: "a2",
    position: "right",
    gridAlpha: 0,
    axisAlpha: 0,
    labelsEnabled: false
  },{
    id: "a3",
    title: "總來客數",
    position: "right",
    gridAlpha: 0,
    axisAlpha: 0,
    inside: true,
    總來客數: "mm",
    總來客數Units: {
        DD: "d. ",
        hh: "h ",
        mm: "min",
        ss: ""
    }
  }],
  graphs: [{
    id: "g1",
    valueField:  "總業績",
    title:  "總業績",
    type:  "column",
    fillAlphas:  0.9,
    valueAxis:  "a1",
    balloonText:  "總業績：[[value]] 萬",
    //legendValueText:  "[[value]] 萬",
    //legendPeriodValueText:  "total: [[value.sum]] 萬",
    lineColor:  "#4285f4",
    alphaField:  "alpha",
  },{
    id: "g2",
    valueField: "客單價",
    classNameField: "bulletClass",
    title: "客單價",
    type: "line",
    valueAxis: "a2",
    lineColor: "#eefe43",
    lineThickness: 1,
    //legendValueText: "[[description]]/[[value]]",
    descriptionField: "townName",
    bullet: "round",
    bulletSizeField: "townSize",
    bulletBorderColor: "#fed443",
    bulletBorderAlpha: 1,
    bulletBorderThickness: 1,
    bulletColor: "#367206",
    labelText: "[[townName2]]",
    labelPosition: "right",
    balloonText: "客單價:[[value]]",
    showBalloon: true,
    animationPlayed: true,
  },{
    id: "g3",
    title: "總來客數",
    valueField: "總來客數",
    type: "line",
    valueAxis: "a3",
    lineColor: "#ff5755",
    balloonText: "總來客數：[[value]]",
    lineThickness: 1,
    legendValueText: "[[value]]",
    bullet: "square",
    bulletBorderColor: "#ff5755",
    bulletBorderThickness: 1,
    bulletBorderAlpha: 1,
    dashLengthField: "dashLength",
    animationPlayed: true
  }],

  chartCursor: {
    zoomable: false,
    categoryBalloonDateFormat: "DD",
    cursorAlpha: 0,
    valueBalloonsEnabled: false
  },
  legend: {
    bulletType: "round",
    equalWidths: false,
    valueWidth: 120,
    useGraphSettings: true,
    color: "#FFFFFF"
  }
});