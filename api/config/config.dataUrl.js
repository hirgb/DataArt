const agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'

module.exports = {
    global: {},
    legulegu: {
        marketPe: 'https://www.legulegu.com/stockdata/market_pe/getmarket_pe?token=baf9c54ce5023c971d70c9cffc86cee3',
    },
    sse: {
        headers: {
            referer: 'https://www.sseinfo.com/',
            "user-agent": agent
        },
        peIndustry: 'https://query.sse.com.cn/commonQuery.do?sqlId=COMMON_SYL_BKPE_LIST_L',
        yearTradeSummary: 'query.sse.com.cn/marketdata/tradedata/queryNewYearlyTrade.do',
        monthTradeSummary: 'query.sse.com.cn/marketdata/tradedata/queryMonthlyTradeNew.do',
    }
}