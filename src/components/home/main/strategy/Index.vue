<template lang="xtmin">
div v-loading.fullscreen.lock=loading
    el-row :gutter=20 v-show="mode === 'strategy'"
        el-col :span=6 v-for="i in strategys" :key="i.id" style="margin-bottom: 20px"
            el-card shadow=never .gradient-45deg-light-blue-cyan .gradient-shadow
                div .chart
                    h3 .title "{{i.title}}"
                    h4 .subtitle "{{i.subtitle}}"
                    p .intro "{{i.introduce}}"
                    el-button .btn type=text "开始筛选"
                    @click=startSearch(i.id)

    el-row :gutter=20 v-show="mode === 'stock'"
        el-col :span=6 v-for="(i, index) in stocks" :key="i.code" style="margin-bottom: 20px"
            el-card shadow=never .gradient-45deg-light-blue-cyan .gradient-shadow
                div :id="i.code" .filter-chart
    el-row :gutter=20 v-show="mode === 'stock'"
        el-col :span=8 "&nbsp;"
        el-col :span=4
            el-button @click=goBack style="display: block; width: 100%" "返回"
        el-col :span=4
            el-button @click="startSearch(strategyId, page+1)" type=primary style="display: block; width: 100%" "更多"
        el-col :span=8 "&nbsp;"
</template>
<script>
import {
    loadData,
} from '@/assets/js/data.js'

export default {
    data(){
        return {
            strategys: [],
            loading: false,
            stocks: [],
            mode: 'strategy',
            strategyId: 0,
            page: 1,
        }
    },
    computed: {
        user: function(){
            return this.$store.getters['user/getAll']
        }
    },
    mounted(){
        this.refreshStrategy()
    },
    methods: {
        refreshStrategy(){
            this.$utils.post(
                this,
                this.$config.dataServer+'/web/strategy/getAllStrategy',
                null,
                (data)=>{
                    this.strategys = data
                }
            )
        },
        startSearch(i, page = 1){
            let id = i
            this.loading = true
            this.strategyId = id
            this.$utils.post(
                this,
                this.$config.dataServer+'/web/strategy/filteStock',
                {id, page},
                (data) => {
                    if (data.length) {
                        this.mode = 'stock'
                        this.stocks.push(...data)
                        this.page++
                        window.setTimeout(()=>{
                            data.forEach(i => {
                                let element = document.getElementById(i.code)
                                loadData(this.$echarts, i, element)
                            })
                        }, 0)
                    } else {
                        this.$utils.displayError(this, null, '没有找到相应股票')
                    }
                },
                null,
                () => {
                    this.loading = false
                }
            )
        },
        goBack(){
            this.mode = 'strategy'
            this.stocks = []
            this.page = 1
            this.strategyId = 0
        }
    }
}
</script>

<style scoped lang="stylus">
.filter-chart
    height: 200px
.chart
    position: relative
    color: #fff
    height: 200px
    padding: 0 10px
    .title
        font-size: 24px
        font-weight: 400
        padding: 10px 0
    .subtitle
        font-size: 18px
        font-weight: 400
        color: #ffffffdd
    .intro
        font-size: 14px
        font-weight: 400
        padding-top: 10px
        color: #ffffffdd
        text-align: left
    .btn
        position: absolute
        bottom: 0
        right: 10px
        font-size: 14px
        font-weight: 400
        color: #fff
        transition: all .5s
        &:hover
            text-shadow: 0 0 1px #fff

.gradient-45deg-light-blue-cyan
    background: #0288d1
    background: -webkit-linear-gradient(45deg, #0288d1 0%, #26c6da 100%)
    background: linear-gradient(45deg, #0288d1 0%, #26c6da 100%)
.gradient-45deg-light-blue-cyan.gradient-shadow
    box-shadow: 0 6px 20px 0 rgba(38, 198, 218, 0.5)
.gradient-45deg-amber-amber
    background: #ff6f00
    background: -webkit-linear-gradient(45deg, #ff6f00 0%, #ffca28 100%)
    background: linear-gradient(45deg, #ff6f00 0%, #ffca28 100%)

.gradient-45deg-amber-amber.gradient-shadow
    box-shadow: 0 6px 20px 0 rgba(255, 111, 0, 0.3)
</style>
