function genInfomation(code) {
    return [{
            title: '腾讯财经',
            url: `http://gu.qq.com/${code}/gp`,
        },
        {
            title: '新浪财经',
            url: `http://finance.sina.com.cn/realstock/company/${code}/nc.shtml`,
        },
        {
            title: '凤凰财经',
            url: `http://finance.ifeng.com/app/hq/stock/${code}/index.shtml`
        },
        {
            title: '雪球财经',
            url: `https://xueqiu.com/s/${code}`
        },
        {
            title: '同花顺',
            url: `http://stockpage.10jqka.com.cn/${code.substr(2)}/`
        },
        {
            title: '东方财富网',
            url: `http://quote.eastmoney.com/${code}.html`
        },
        {
            title: '和讯网',
            url: `http://stockdata.stock.hexun.com/${code.substr(2)}.shtml`
        },
        {
            title: '金融界',
            url: `http://stock.jrj.com.cn/share,${code.substr(2)}.shtml`
        },
        {
            title: 'GAF10',
            url: `http://www.gaf10.com/shareDetails.html?code=${code.substr(2)}`
        }
    ]
}

export {
    genInfomation,
}
