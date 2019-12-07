<template lang="xtmin">
div .search
    el-autocomplete
    v-model=word
    :fetch-suggestions="querySearchAsync"
    :debounce="1000"
    :clearable=true
    placeholder="搜索，例如：ccqc,600016,长城汽车"
    @select="handleSelect"
</template>

<script>
export default {
    data(){
        return {
            word:'',
        }
    },
    methods: {
        handleSelect(e){
            let code = e.code
            this.$emit('refresh-stock')
            this.$router.push({path: `/stock/${code}`})
        },
        querySearchAsync(e, cb){
            if (e.trim()) {
                this.$utils.post(
                    this,
                    this.$config.dataServer+'/web/stock/searchStock',
                    {word: this.word},
                    (data)=>{
                        let r = data.map(i => {
                            return {
                                value: i.name,
                                code: i.code
                            }
                        })
                        cb(r)
                    }
                )
            }
        },
    }
}
</script>

<style lang="stylus">
.search
    height: 100%
    width: 100%
    box-sizing:border-box
    // padding: 15px
    .el-autocomplete
        display: block
    input
        display: inherit
        box-sizing: border-box
        width: 100%
        height: 30px
        outline: none
        border: none
        border-radius: 20px
        padding: 0 15px
        background-color: #eee
        box-shadow: inset 1px 1px 3px #868686
        transition: all 0.5s
        &:focus
            background-color: #fff
</style>
