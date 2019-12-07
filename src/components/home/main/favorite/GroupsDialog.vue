<template lang="xtmin">
el-dialog title=移动到... :visible.sync=dialogFormVisible width=30%
    el-radio-group v-model=toGroupIndex
        el-radio v-for="i in groups" :key=i.index :label=i.index "{{i.name}}"
        style="display: block; padding: 5px 0"
    div slot=footer
        el-button @click="dialogFormVisible = false" "取消"
        el-button type=primary @click=moveTo  "确定"
</template>

<script>
export default {
    props: ['groups'],
    data(){
        return {
            dialogFormVisible: false,
            toGroupIndex: 0,
            stockData: null,
            fromGroupIndex: null,
            isLoading: false,
        }
    },
    computed: {
        user: function(){
            return this.$store.getters['user/getAll']
        },
        favorite: function(){
            return this.user.favorite
        }
    },
    methods: {
        show(stockData, fromGroupIndex){
            this.stockData = stockData
            this.fromGroupIndex = fromGroupIndex
            this.dialogFormVisible = true
        },
        moveTo(){
            if (this.stockData !== null && this.fromGroupIndex !== null) {
                this.isLoading = true
                this.$utils.post(
                    this,
                    this.$config.dataServer+'/web/user/moveFavoriteStock',
                    {
                        stockCode: this.stockData.code,
                        stockIndex: this.stockData.index,
                        fromGroupIndex: this.fromGroupIndex,
                        toGroupIndex: this.toGroupIndex,
                    },
                    ()=>{
                        let favorite = JSON.parse(JSON.stringify(this.favorite))
                        let stock = favorite[this.fromGroupIndex].stock.splice(this.stockData.index, 1)
                        if (stock.length) {
                            favorite[this.toGroupIndex].stock.push(stock[0])
                            this.$store.commit('user/setValue', {key: 'favorite', value: favorite})
                        }
                        this.$utils.displaySuccess(this, '操作成功')
                        this.$emit('move-success')
                        this.dialogFormVisible = false
                    },
                    null,
                    ()=>{
                        this.isLoading = false
                    }
                )
            } else {
                this.$utils.displayError(this, null, '未获取到股票信息')
            }
        },
    },
}
</script>

<style lang="css">
</style>
