<template lang="xtmin">
div
    el-row v-show="!stocks.length" .info
        h2 "此分组内没有股票"
    el-row :gutter=20 v-show="stocks.length"
        el-col :span=6 v-for="(i, index) in stocks" :key="i[0]" style="margin-bottom: 20px"
            el-card shadow=never .gradient-45deg-light-blue-cyan .gradient-shadow
                div :id="i[0]" .chart
                @contextmenu.prevent="$refs.ctxMenu.open($event, {index, code: i[0], name: i[1]})"
    context-menu ref="ctxMenu" @ctx-open="onCtxOpen"
        li @click="showChart" "查看"
        li @click="moveTo" "移动到..."
        li @click="deleteFavorite" "删除"
    groups-dialog ref=groupsDialog :groups=groups @move-success="showStocks(group)"
</template>

<script>
import {
    genFavoriteChartOption
} from '@/assets/js/data.js'
import ContextMenu from 'vue-context-menu'
import GroupsDialog from './GroupsDialog.vue'


export default {
    data() {
        return {
            stocks: [],
            menuData: null,
            group: '',
            groupIndex: 0,
        }
    },
    components: {
        ContextMenu,
        GroupsDialog,
    },
    computed: {
        user: function() {
            return this.$store.getters['user/getAll']
        },
        favorite: function() {
            return this.user.favorite
        },
        groups: function() {
            return this.favorite.map((i, index) => {
                return {
                    index,
                    name: i.name
                }
            })
        },
    },
    methods: {
        showStocks(group) {
            this.group = group
            this.groupIndex = this.favorite.findIndex(i => i.name === group)
            let stocks = this.favorite[this.groupIndex]
            this.stocks = stocks.stock
            this.$utils.post(
                this,
                this.$config.dataServer + '/web/data/getFavoriteStockData', {
                    stocks: JSON.stringify(this.stocks.map(i => i[0]))
                },
                (data) => {
                    let option = genFavoriteChartOption(this.$echarts)
                    this.stocks.forEach(i => {
                        let element = document.getElementById(i[0]),
                            stockData = {}
                        stockData.date = data[i[0]].map(i => i.date)
                        stockData.value = data[i[0]].map(i => i.close)
                        if (stockData) {
                            let chart = this.$echarts.init(element)
                            option.title.text = i[1];
                            option.title.link = `/#/stock/${i[0]}`;
                            option.title.target = 'self'
                            option.xAxis.data = stockData['date'];
                            option.series[0].data = stockData['value'];
                            chart.setOption(option);
                        }
                    })
                }
            )
        },
        showChart(){
            if (this.menuData && this.menuData.code) {
                this.$router.push({path: '/stock/'+this.menuData.code})
            } else {
                this.$utils.displayError(this, null, '未获取到股票信息')
            }
        },
        moveTo(){
            this.$refs.groupsDialog.show(this.menuData, this.groupIndex)
        },
        deleteFavorite() {
            let groupIndex = this.favorite.findIndex(i => i.name === this.group)
            let stockIndex = this.menuData.index
            this.$utils.post(
                this,
                this.$config.dataServer+'/web/user/deleteFavorite',
                {groupIndex, stockIndex},
                ()=>{
                    this.$utils.displaySuccess(this, '删除成功')
                    this.favorite[groupIndex].stock.splice(stockIndex, 1)
                    this.$store.commit('user/setValue', {key: 'favorite', value: this.favorite})
                }
            )
        },
        onCtxOpen(menuData) {
            this.menuData = menuData
        },
    }
}
</script>
<style lang="stylus">
.ctx-menu-container
    background-color: transparent
    border: none
    box-shadow: none
    transition: all 0.2s
    .ctx-menu
        background-color: #ffffffdd
        border: none
        box-shadow: none
        li
            height: 30px
            font-size: 14px
            line-height: 30px
            padding-left: 1rem
            cursor: pointer
            &:hover
                background-color: #0000ff20
</style>
<style scoped lang="stylus">
.chart
    height: 200px
.gradient-45deg-light-blue-cyan
    background: #0288d1
    background: -webkit-linear-gradient(45deg, #0288d1 0%, #26c6da 100%)
    background: linear-gradient(45deg, #0288d1 0%, #26c6da 100%)

.gradient-45deg-light-blue-cyan.gradient-shadow
    box-shadow: 0 6px 20px 0 rgba(38, 198, 218, 0.5)

.info
    h2
        font-size: 24px
        font-weight: 500
        color: #999
        text-align: center
</style>
