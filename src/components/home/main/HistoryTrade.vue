<template lang="xtmin">
div
    el-row :gutter=20
        el-col :span=6 v-for="i in trade" :key="i.code" style="margin-bottom: 20px"
            el-popover placement=bottom width=800 trigger=click @show=getTradeData(i.code)
                el-table :data=tradeData max-height=300 :stripe=true :border=true
                    el-table-column prop=date label=日期 width=120
                    el-table-column prop=action label=买/卖 width=100
                    el-table-column prop=count label=数量 width=100
                    el-table-column prop=price label=价格 width=100
                    el-table-column prop=remark label=备注
                    el-table-column label=操作 width=100
                        template slot-scope=scope
                            el-button type=text "修改"
                            el-button type=text @click=deleteTrade(scope.row) "删除"

                el-card slot=reference shadow=never .gradient-45deg-light-blue-cyan .gradient-shadow
                    div .chart @contextmenu.prevent="$refs.tradeCtxMenu.open($event, i)"
                        h3 .title "{{i.name}}"
                        div .code "{{i.code}}"
                        div .trade-count "{{i.count}}"
    context-menu ref="tradeCtxMenu" @ctx-open="onCtxOpen"
        li @click="showTradeInK" "在K线图中查看"
        li @click="addTrade" "添加交易"
        li @click="deleteAllTradeOfStock" "删除交易"
    add-trade-dialog ref=addTradeDialogInTrade
</template>
<script>
import ContextMenu from 'vue-context-menu'
import AddTradeDialog from '../../common/AddTrade.vue'

export default {
    components: {
        ContextMenu,
        AddTradeDialog
    },
    data() {
        return {
            tradeCode: '',
            tradeData: [],
            trade: [],
            ctxMenuData: null,
        }
    },
    computed: {
        user: function() {
            return this.$store.getters['user/getAll']
        },
    },
    mounted() {
        this.refreshTradeGroup()
    },
    methods: {
        getTradeData(code) {
            this.tradeCode = code
            this.refreshTradeData()
        },
        refreshTradeData(){
            let code = this.tradeCode
            this.$utils.post(
                this,
                this.$config.dataServer + '/web/trade/getTradeOfStock', {
                    code
                },
                (data) => {
                    this.tradeData = data
                }
            )
        },
        getAllTrade() {
            this.$utils.post(
                this,
                this.$config.dataServer + '/web/trade/getAllTrade',
                null,
                () => {
                    // console.log(data);
                }
            )
        },
        refreshTradeGroup() {
            this.$utils.post(
                this,
                this.$config.dataServer + '/web/trade/getAllTradeGrouped',
                null,
                (data) => {
                    this.trade = data.map(i => {
                        return {
                            code: i.stockCode,
                            count: i.count,
                            name: i.stockName,
                        }
                    })
                }
            )
        },
        onCtxOpen(data) {
            this.ctxMenuData = data
        },
        addTrade() {
            if (this.ctxMenuData) {
                this.$refs.addTradeDialogInTrade.show(this.ctxMenuData.name, this.ctxMenuData.code)
            } else {
                this.$utils.displayError(this, null, '未获取到股票信息')
            }
        },
        showTradeInK(){
            let code = this.ctxMenuData.code
            this.$utils.post(
                this,
                this.$config.dataServer + '/web/trade/getTradeOfStock', {
                    code
                },
                (data) => {
                    // "[{"name": "buy", "coord": ["2018/05/15", "6.21"], "itemStyle": {"normal": {"color": "#cc3300"}}}]"
                    let tradeMark = data.map(i => {
                        return {
                            name: i.action,
                            coord: [i.date, i.price],
                            itemStyle: {
                                normal: {
                                    color: i.action === '买' ? '#cc3300' : '#009926'
                                }
                            }
                        }
                    })
                    this.$store.commit('app/setValue', {key: 'tradeMark', value: tradeMark})
                    this.$store.commit('app/setValue', {key: 'isDisplayTradeMark', value: true})
                    this.$router.push({path: '/stock/' + code})
                }
            )
        },
        deleteTrade(row){
            this.$utils.post(
                this,
                this.$config.dataServer+'/web/trade/deleteTrade',
                row,
                ()=>{
                    this.$utils.displaySuccess(this, '删除成功')
                    this.refreshTradeGroup()
                    this.refreshTradeData()
                }
            )
        },
        deleteAllTradeOfStock() {
            if (this.ctxMenuData) {
                this.$confirm('即将删除此股票的所有交易记录（无法恢复）, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$utils.post(
                        this,
                        this.$config.dataServer+'/web/trade/deleteAllTradeOfStock',
                        {code: this.ctxMenuData.code},
                        ()=>{
                            this.$utils.displaySuccess(this, '删除成功')
                            this.refreshTradeGroup()
                        }
                    )
                }).catch();
            } else {
                this.$utils.displayError(this, null, '未获取到股票信息')
            }
        }
    }
}
</script>

<style scoped lang="stylus">
.chart
    position: relative
    color: #fff
    height: 200px
    padding: 0 10px
    h3
        font-size: 24px
        font-weight: 400
        color: #fff
        padding: 10px 0
    .code
        color: #ffffffbb
        font-size: 18px
    .trade-count
        position: absolute
        bottom: -30px
        right: 0px
        color: #ffffff30
        font-size: 128px
        font-style: italic
        user-select: none
    .count
        font-size: 18px
        color: #ffffffbb
        .number
            font-size: 36px
            line-height: 36px
    .last
        position: absolute
        left: 10px
        bottom: 10px
        color: #ffffffbb
        font-size: 18px
.gradient-45deg-light-blue-cyan
    background: #0288d1
    background: -webkit-linear-gradient(45deg, #0288d1 0%, #26c6da 100%)
    background: linear-gradient(45deg, #0288d1 0%, #26c6da 100%)
.gradient-45deg-light-blue-cyan.gradient-shadow
    box-shadow: 0 6px 20px 0 rgba(38, 198, 218, 0.5)

.gradient-45deg-red-pink
    background: #FF5252
    background: -webkit-linear-gradient(45deg, #FF5252 0%, #f48fb1 100%)
    background: linear-gradient(45deg, #FF5252 0%, #f48fb1 100%)

.gradient-45deg-red-pink.gradient-shadow
    box-shadow: 0 6px 20px 0 rgba(244, 143, 177, 0.5)
</style>
