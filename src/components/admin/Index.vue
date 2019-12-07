<template lang="xtmin">
el-container
    el-header
        home-header @display-submenu=displaySubmenu($event)
    el-main .my-scrollbar
        user-manage v-show="currentBoard === 'UserManage'"
        stock-recommand v-show="currentBoard === 'StockRecommand'"
</template>

<script>
import HomeHeader from './Header.vue'
import UserManage from './board/UserManage.vue'
import StockRecommand from './board/StockRecommand.vue'

export default {
    data() {
        return {
        }
    },
    components: {
        HomeHeader,
        UserManage,
        StockRecommand,
    },
    computed: {
        user: function(){
            return this.$store.getters['user/getAll']
        },
        currentBoard: function(){
            return this.$store.getters['app/currentBoard']
        },
    },
    mounted(){
        // this.$store.commit('app/setValue', {key: 'currentBoard', value: 'Data'})
    },
    methods: {
        displaySubmenu(e){
            if (e[0] === 'Favorite') {
                this.$refs.mainFavorite.showStocks(e[1])
            }
        }
    }
}
</script>

<style scoped lang="stylus">
.el-container
    height: 100vh
    overflow: hidden
.el-header
    background-color: #545c64
    color: #333
    height: 60px
    line-height: 60px
.el-main
    height: calc(100vh - 60px)
    background-color: #E9EEF3
    color: #333
.my-scrollbar::-webkit-scrollbar
    width: 6px
    background-color: #00000000
.my-scrollbar::-webkit-scrollbar-thumb
    width: 6px
    background-color: #999
    border-radius: 3px
</style>
