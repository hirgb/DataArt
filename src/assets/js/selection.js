function genSelection(code) {
    return [{
            title: '公司简介',
            url: `https://xueqiu.com/S/${code}/GSJJ`,
        },
        {
            title: '个股新闻',
            url: `http://gu.qq.com/${code}/gp/news`,
        },
        {
            title: '行业新闻',
            url: `http://gu.qq.com/${code}/gp/hyxw`
        },
        {
            title: '个股公告',
            url: `http://gu.qq.com/${code}/gp/notice`
        },
        {
            title: '重大事项',
            url: `http://gu.qq.com/${code}/gp/zdsx`
        },
        {
            title: '季报/年报',
            url: `http://gu.qq.com/${code}/gp/jbnb`
        },
        {
            title: '研究报告',
            url: `http://gu.qq.com/${code}/gp/yjbg`
        },
        {
            title: '股东股本',
            url: `http://gu.qq.com/${code}/gp/gbgd`
        },
        {
            title: '分红送配',
            url: `http://gu.qq.com/${code}/gp/fhsp`
        },
        {
            title: '财务报表',
            url: `http://gu.qq.com/${code}/gp/cwbb`
        },
        {
            title: '财务指标',
            url: `http://gu.qq.com/${code}/gp/cwzb`
        },
        {
            title: '财务分析',
            url: `http://gu.qq.com/${code}/gp/cwfx`
        },
        {
            title: '业绩预告',
            url: `http://gu.qq.com/${code}/gp/yjyg`
        },
        {
            title: '投资提示',
            url: `http://gu.qq.com/${code}/gp/tzts`
        },
        {
            title: '机构预测',
            url: `http://gu.qq.com/${code}/gp/jgyc`
        },
    ]
}

export {
    genSelection,
}
