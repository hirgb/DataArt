let option = {
    tooltip: {
        trigger: 'axis',
        position: ['3%', '4%'],
        axisPointer: {
            type: 'cross'
        },
        backgroundColor: '',
        textStyle: {
            color: '#000'
        },
        formatter: function(params) {
            let str
            if (params[0].seriesType == 'candlestick') {
                str = params[0].axisValue + ', 开盘:' + params[0].data[1] + ', 收盘:' + params[0].data[2] + ', 最高:' + params[0].data[4] + ', 最低:' + params[0].data[3];
                for (let i = 1; i < params.length; i++) {
                    str += ', ' + params[i].marker + params[i].seriesName + ':' + params[i].value;
                }
            } else {
                str = params[3].axisValue + ', 开盘:' + params[3].data[1] + ', 收盘:' + params[3].data[2] + ', 最高:' + params[3].data[4] + ', 最低:' + params[3].data[3];
                for (let i = 4; i < params.length; i++) {
                    str += ', ' + params[i].marker + params[i].seriesName + ':' + params[i].value;
                }
                for (let i = 0; i < 3; i++) {
                    str += ', ' + params[i].marker + params[i].seriesName + ':' + params[i].value;
                }
            }
            return str;
        }
    },
    axisPointer: {
        link: {
            xAxisIndex: 'all'
        },
        label: {
            show: true,
            backgroundColor: '#777'
        }
    },
    legend: [{
        right: 5,
        top: 5,
        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30', 'MA60'],
        selected: {
            '日K': true,
            'MA5': false,
            'MA10': false,
            'MA20': false,
            'MA30': true,
            'MA60': false
        }
    }],
    grid: [{
            top: '5%',
            left: '3%',
            right: 15,
            height: '50%'
        },
        {
            left: '3%',
            right: 15,
            top: '55%',
            height: '40%'
        }
    ],
    xAxis: [{
            type: 'category',
            gridIndex: 0,
            data: [],
            scale: true,
            boundaryGap: false,
            axisLine: {
                onZero: false
            },
            splitLine: {
                show: false
            },
            splitNumber: 20,
            max: 'dataMax',
            axisPointer: {
                label: {
                    show: false
                },
                snap: true
            }
        },
        {
            type: 'category',
            gridIndex: 1,
            data: [],
            scale: true,
            boundaryGap: false,
            axisLine: {
                onZero: true,
                show: true
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false
            },
            splitNumber: 20,
            axisPointer: {
                snap: true
            },
            max: 'dataMax'
        }
    ],
    yAxis: [{
            gridIndex: 0,
            scale: true,
            splitLine: {
                show: false
            },
            splitArea: {
                show: true
            }
        },
        {
            gridIndex: 1,
            axisLine: {
                onZero: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            splitArea: {
                show: true
            },
            axisLabel: {
                show: true
            }
        }
    ],
    dataZoom: [{
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 0,
            end: 100
        },
        {
            show: true,
            type: 'slider',
            xAxisIndex: [0, 1],
            start: 0,
            end: 100
        },
        {
            show: false,
            xAxisIndex: [0, 1],
            type: 'slider',
            start: 0,
            end: 100
        }
    ],
    series: [{
            name: '日K',
            type: 'candlestick',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [],
            itemStyle: {
                normal: {
                    color: '#ec0000',
                    color0: '#00da3c',
                    borderColor: '#8A0000',
                    borderColor0: '#008F28'
                }
            },
            markPoint: {
                label: {
                    formatter: function(params) {
                        return params.data.name;
                    }
                },
                data: []
            }
            // "[{"name": "buy", "coord": ["2018/05/15", "6.21"], "itemStyle": {"normal": {"color": "#cc3300"}}}]"
        },
        {
            name: 'MA5',
            type: 'line',
            data: [],
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: [],
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
        {
            name: 'MA20',
            type: 'line',
            data: [],
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
        {
            name: 'MA30',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [],
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
        {
            name: 'MA60',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [],
            smooth: true,
            lineStyle: {
                normal: {
                    opacity: 0.5
                }
            }
        },
        {
            name: 'MACD',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [],
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList;
                        if (params.data >= 0) {
                            colorList = '#ef232a';
                        } else {
                            colorList = '#14b143';
                        }
                        return colorList;
                    }
                }
            }
        },
        {
            name: 'DIF',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [],
        },
        {
            name: 'DEA',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [],
        }
    ]
}

export {option}
