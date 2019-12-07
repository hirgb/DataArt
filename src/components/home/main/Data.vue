<template lang="xtmin">
div
    el-row :gutter=20
        el-col :span=6
            el-card shadow=never .gradient-45deg-light-blue-cyan .gradient-shadow
                div #shindex .exponent
        el-col :span=6
            el-card shadow=never .gradient-45deg-red-pink .gradient-shadow
                div #szindex .exponent
        el-col :span=6
            el-card shadow=never .gradient-45deg-amber-amber .gradient-shadow
                div #zxindex .exponent
        el-col :span=6
            el-card shadow=never .gradient-45deg-green-teal .gradient-shadow
                div #cyindex .exponent
    el-row :gutter=20
        el-col :span=12
            el-card shadow=never .shadow
                div #riseorfall .fundflow
        el-col :span=12
            el-card shadow=never .shadow
                div #rate .fundflow
    el-row :gutter=20
        el-col :span=12
            el-card shadow=never .shadow
                div #fundflow-overview .fundflow
        el-col :span=12
            el-card shadow=never .shadow
                div #fundflow-industry .fundflow
    el-row :gutter=20
        el-col :span=12
            el-card shadow=never .shadow
                div #fundflow-concept .fundflow
        el-col :span=12
            el-card shadow=never .shadow
                div #fundflow-area .fundflow
</template>

<script>
import {
    loadData,
    loadOverViewData,
    loadIndustryData,
    loadConceptData,
    loadAreaData,
    loadZdfbData,
    loadDppjData,
} from '@/assets/js/data.js'

export default {
    computed: {
        indexData: function() {
            return this.$store.getters['app/indexData']
        },
    },
    mounted() {
        this.getIndexData()
    },
    activated() {
        this.getIndexData()
    },
    methods: {
        getIndexData() {
            let chartSH = document.getElementById('shindex'),
                chartSZ = document.getElementById('szindex'),
                chartZX = document.getElementById('zxindex'),
                chartCY = document.getElementById('cyindex'),
                chartOverView = document.getElementById('fundflow-overview'),
                chartIndustry = document.getElementById('fundflow-industry'),
                chartConcept = document.getElementById('fundflow-concept'),
                chartArea = document.getElementById('fundflow-area'),
                chartZD = document.getElementById('riseorfall'),
                chartPJ = document.getElementById('rate')

            if (this.indexData) {
                let data = this.indexData
                // console.log(data.dataSH);
                loadData(this.$echarts, data.dataSH, chartSH)
                loadData(this.$echarts, data.dataSZ, chartSZ)
                loadData(this.$echarts, data.dataZX, chartZX)
                loadData(this.$echarts, data.dataCY, chartCY)
                loadOverViewData(this.$echarts, data.dataOverView, chartOverView)
                loadIndustryData(this.$echarts, data.dataIndustry, chartIndustry)
                loadConceptData(this.$echarts, data.dataConcept, chartConcept)
                loadAreaData(this.$echarts, data.dataArea, chartArea)
                loadZdfbData(this.$echarts, data.dataZD, chartZD)
                loadDppjData(this.$echarts, data.dataPJ, chartPJ)
                return
            }

            this.$utils.post(
                this,
                this.$config.dataServer + '/web/data/getIndexData',
                null,
                (data) => {
                    this.$store.commit('app/setValue', {
                        key: 'indexData',
                        value: data
                    })
                    loadData(this.$echarts, data.dataSH, chartSH)
                    loadData(this.$echarts, data.dataSZ, chartSZ)
                    loadData(this.$echarts, data.dataZX, chartZX)
                    loadData(this.$echarts, data.dataCY, chartCY)
                    loadOverViewData(this.$echarts, data.dataOverView, chartOverView)
                    loadIndustryData(this.$echarts, data.dataIndustry, chartIndustry)
                    loadConceptData(this.$echarts, data.dataConcept, chartConcept)
                    loadAreaData(this.$echarts, data.dataArea, chartArea)
                    loadZdfbData(this.$echarts, data.dataZD, chartZD)
                    loadDppjData(this.$echarts, data.dataPJ, chartPJ)
                }
            )
        },
    }
}
</script>

<style lang="stylus">
.el-card
    background-color: #f9f9f9
    border: none
.el-card__body
    padding: 0
</style>

<style scoped lang="stylus">
.el-row
    margin-bottom: 20px
    &:last-child
        margin-bottom: 0
.exponent
    height: 200px

.fundflow
    height: 350px
    padding: 15px

.bgnone
    background-color: transparent !important

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

.gradient-45deg-amber-amber
    background: #ff6f00
    background: -webkit-linear-gradient(45deg, #ff6f00 0%, #ffca28 100%)
    background: linear-gradient(45deg, #ff6f00 0%, #ffca28 100%)

.gradient-45deg-amber-amber.gradient-shadow
    box-shadow: 0 6px 20px 0 rgba(255, 111, 0, 0.3)

.gradient-45deg-green-teal
    background: #43A047
    background: -webkit-linear-gradient(45deg, #43A047 0%, #1de9b6 100%)
    background: linear-gradient(45deg, #43A047 0%, #1de9b6 100%)

.gradient-45deg-green-teal.gradient-shadow
    box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)

.shadow
    box-shadow: 0 6px 20px 0 rgba(244, 143, 177, 0.5)
</style>
