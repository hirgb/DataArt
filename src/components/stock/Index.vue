<template lang="xtmin">
el-container
    el-header
        stock-header
        @add-trade=addTrade
        @refresh-stock=refreshStock
        @show-predict=showPredict
        @hide-predict=hidePredict
        :data=stockData
    el-main
        add-trade-dialog ref=addTradeDialog
        el-container style="height: 100%"
            el-aside
            style="width: 250px; height: 100%;"
                el-row
                .stock-info-row
                v-for="i in stockData"
                :key="i.title"
                    el-col :span=12 .data-title "{{i.title}}:"
                    el-col :span=12 .data-value "&nbsp;{{i.value}}"
            el-main style="height: 100%;"
                div #years
                    el-tag
                    size=mini
                    type=info
                    v-for="i in years"
                    :key=i.title @click=changeYears(i)
                    :class="{'active-tag': i.title === activeYear}"
                    "{{i.title}}"
                div #main style="width: 100%; height: 100%;"

</template>

<script>
import StockHeader from './Header.vue'
import AddTradeDialog from '../common/AddTrade.vue'
import {
    option
} from '@/assets/js/stock-chart-option.js'
import {getStockDataTiming, stopGetStockData} from '@/assets/js/stock-price-real-time.js'

export default {
    props: ['code'],
    data() {
        return {
            years: [
                {title: "一月", value: 0.1},
                {title: "六月", value: 0.5},
                {title: "一年", value: 1},
                {title: "三年", value: 3},
                {title: "五年", value: 5},
                {title: "十年", value: 10}
            ],
            activeYear: '一年',
            stockData: [],
            stockCode: '',
        }
    },
    components: {
        StockHeader,
        AddTradeDialog,
    },
    mounted() {
        this.stockCode = this.code
        this.getStockInfo(this.stockCode)
    },
    computed: {
        currentStock: function() {
            return this.$store.getters['app/currentStock']
        },
        isDisplayTradeMark: function() {
            return this.$store.getters['app/isDisplayTradeMark']
        },
    },
    watch: {
        '$route': function(){
            this.stockCode = this.$route.params.code
            this.getStockInfo(this.stockCode)
            this.activeYear = '一年'
        }
    },
    methods: {
        getStockInfo(code, years = 1) {
            this.$utils.post(
                this,
                this.$config.dataServer + '/web/stock/getStockInfo',
                {code, years},
                (data) => {
                    this.$store.commit('app/setValue', {
                        key: 'currentStock',
                        value: data
                    })
                    this.display(data, years * -250)
                    this.addHistoryStock(data)
                    getStockDataTiming(code, this.stockData, 3000, this.updateStockName)
                }
            )
        },
        addTrade(){
            this.$refs.addTradeDialog.show(this.currentStock.name, this.currentStock.code)
        },
        display(data, count = -250) {
            this.chart = this.$echarts.init(document.getElementById('main'))

            option.xAxis[0].data = data.date.slice(count)
            option.xAxis[1].data = data.date.slice(count)
            option.series[0].data = data.value.slice(count)
            option.series[1].data = data.ma5.slice(count)
            option.series[2].data = data.ma10.slice(count)
            option.series[3].data = data.ma20.slice(count)
            option.series[4].data = data.ma30.slice(count)
            option.series[5].data = data.ma60.slice(count)
            option.series[6].data = data.bar.slice(count)
            option.series[7].data = data.dif.slice(count)
            option.series[8].data = data.dea.slice(count)

            if (this.isDisplayTradeMark) {
                option.series[0].markPoint.data = this.$store.getters['app/tradeMark']
            } else {
                option.series[0].markPoint.data = []
            }
            this.chart.setOption(option)
        },
        changeYears(i){
            if (this.currentStock.years >= i.value) {
                this.display(this.currentStock, i.value * -250)
            } else {
                this.getStockInfo(this.stockCode, i.value)
            }
            this.activeYear = i.title
        },
        addHistoryStock(data){
            let t = {
                code: data.code,
                name: data.name
            }
            this.$store.commit('app/addHistoryStock', t)
        },
        refreshStock(){
            stopGetStockData()
        },
        updateStockName(tcStock){
            if (this.currentStock.name !== tcStock[1]) {
                let q = {
                    code: this.currentStock.code,
                    name: tcStock[1],
                }
                this.$utils.post(
                    this,
                    this.$config.dataServer+'web/stock/updateStockName',
                    q,
                    ()=>{
                        this.currentStock.name = tcStock[1]
                        this.$store.commit('app/setValue', {key: 'currentStock', value: this.currentStock})
                    }
                )
            }
        },
        showPredict(){
            // console.log(this.$store.getters['app/tradeMark']);
            // return
            let bar = option.series[6].data,
                dif = option.series[7].data,
                dea = option.series[8].data,
                value = option.series[0].data,
                date = option.xAxis[0].data,
                stat = 'bull', // bull or bear
                power = 0,
                predicts = []

            bar.forEach((i, index, arr) => {
                if (index === 0) {
                    stat = i > 0 ? 'bull' : 'bear'
                } else {
                    let t = i > 0 ? 'bull' : 'bear'
                    if (t != stat) {
                        // console.log(power);
                        if ((dea[index] > 0.3 || dea[index] < -0.5) && Math.abs(power) > 1) {
                            predicts.push({
                                coord: [date[index], value[index][3]],
                                itemStyle: {
                                    normal: {
                                        color: "#cc3300"
                                    }
                                },
                                name: t === 'bull' ? 'buy' : 'sell',
                            })
                        }
                        power = 0
                        stat = t
                        power += i
                    } else {
                        power += i
                    }
                }
            })

            // console.log(predicts);
            option.series[0].markPoint.data = predicts
            this.chart.setOption(option)
        },
        hidePredict(){},
    },
    beforeDestroy(){
        stopGetStockData()
    }
}
</script>

<style scoped lang="stylus">
#years
    position: absolute
    top: 0
    left: 0
    z-index: 1000
    height: 36px
    width: 300px
    padding-left: 50px
    padding-top: 7px
.el-tag
    margin-left: 10px
    cursor: pointer
    border-color: transparent
    color: #444
    user-select: none
    &.active-tag
        color: #409EFF
        border-color: #409EFF
        background-color: #dddbff
    &:hover
        color: #409EFF
        border-color: #409EFF
.el-container
    height: 100vh
    overflow: hidden
.el-header
    background-color: #545c64
    color: #333
    height: 60px
    line-height: 60px
    overflow: hidden
.el-aside
    padding: 30px 20px
    .stock-info-row
        height: 50px
        line-height: 30px
        font-size: 16px
        user-select: none
        .data-title
            text-align: right
            .data-value
                padding-left: 10px
.el-main
    position: relative
    height: calc(100vh - 60px)
    background-color: #E9EEF3
    color: #333
    padding: 0
    overflow: hidden
</style>
