import Z from './z.js'

let stockCode = ''
let interval = null

function getStockData(code, receiver, callback = null){
    stockCode = code
    let url = 'http://qt.gtimg.cn/q=' + code
    let e = document.getElementById('tcData');
    if (e) {
        document.head.removeChild(e);
        let a = document.createElement('script');
        a.id = 'tcData';
        a.src = url;
        document.head.appendChild(a);
        a.onload = stockDataSender(receiver, callback);
    } else {
        let a = document.createElement('script');
        a.id = 'tcData';
        a.src = url;
        document.head.appendChild(a);
        a.onload = stockDataSender(receiver, callback);
    }
}

function stockDataSender(receiver, callback = null) {
    return () => {
        let stockstr = window['v_' + stockCode];
        let stockdata = stockstr.split('~');
        callback && callback(stockdata)
        receiver.splice(0)
        receiver.push({value: stockdata[3], title: '当前'})
        receiver.push({value: stockdata[4], title: '昨收'})
        receiver.push({value: stockdata[5], title: '今开'})
        receiver.push({value: stockdata[32] + '%', title: '涨跌'})
        receiver.push({value: stockdata[33], title: '最高'})
        receiver.push({value: stockdata[34], title: '最低'})
        receiver.push({value: stockdata[47], title: '涨停'})
        receiver.push({value: stockdata[48], title: '跌停'})
        receiver.push({value: stockdata[44], title: '流通市值'})
        receiver.push({value: stockdata[45], title: '总市值'})
        receiver.push({value: stockdata[39] + '%', title: '市盈率'}) //市盈率
        receiver.push({value: stockdata[46] + '%', title: '市净率'}) //市净率
        receiver.push({value: stockdata[38] + '%', title: '换手率'}) //换手率
    }
}

function getStockDataTiming(code, receiver, timer, callback = null) {
    getStockData(code, receiver, callback)
    if (isTrading()) {
        interval = setInterval(()=>{
            return getStockData(code, receiver)
        }, timer)
    }
}

function isTrading() {
    let inweek = Z.getTime('inweek');
    let hour = Z.getTime('hour');
    let minute = Z.getTime('minute');
    if (inweek >= 1 && inweek <= 5) {
        if (hour > 9 && hour < 15) {
            return true;
        } else if (hour === 9) {
            if (minute >= 20) {
                return true;
            }
        }
    } else {
        return false;
    }
}

function stopGetStockData(){
    window.clearInterval(interval)
}

export {
    getStockData,
    getStockDataTiming,
    stopGetStockData,
}
