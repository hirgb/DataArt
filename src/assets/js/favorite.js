export let option = {
  title: {
    text: '',
    link: '',
    target: 'self',
    textStyle: {
      color: '#eee',
    }
  },
  tooltip: {
    trigger: 'axis',
    position: ['1%', '10%'],
    backgroundColor: ''
  },
  grid: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    min: function(value) {
      return value.min - (value.max - value.min) / 5
    },
    max: function(value) {
      return value.max + (value.max - value.min) / 5
    },
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    boundaryGap: [0, '100%']
  },
  series: [{
    name: '收盘',
    type: 'line',
    smooth: false,
    symbol: 'none',
    sampling: 'average',
    itemStyle: {
      normal: {
        color: 'rgb(204, 255, 51)'
      }
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(255, 255, 255, 0.7)'
          },
          {
            offset: 1,
            color: 'rgba(255, 255, 255, 0.1)'
          }
        ])
      }
    },
    data: [],
  }]
}
