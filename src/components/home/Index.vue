<template lang="xtmin">
el-container
    el-header
        home-header @display-submenu=displaySubmenu($event)
    el-main .my-scrollbar
        main-data v-show="currentBoard === 'Data'"
        main-news v-show="currentBoard === 'News'"
        main-favorite v-show="currentBoard === 'Favorite'" ref=mainFavorite
        main-history-trade v-show="currentBoard === 'HistoryTrade'"
        main-strategy v-show="currentBoard === 'Strategy'"
        main-recommend v-show="currentBoard === 'Recommend'"
        main-indicator v-show="currentBoard === 'Indicator'"
        main-setting v-show="currentBoard === 'Setting'"
</template>

<script>
import HomeHeader from './Header.vue'
import MainData from './main/Data.vue'
import MainNews from './main/News.vue'
import MainFavorite from './main/favorite/Index.vue'
import MainHistoryTrade from './main/HistoryTrade.vue'
import MainStrategy from './main/strategy/Index.vue'
import MainRecommend from './main/recommend/Index.vue'
import MainIndicator from './main/indicator/Index.vue'
import MainSetting from './main/setting/Index.vue'

export default {
    data() {
        return {
        }
    },
    components: {
        HomeHeader,
        MainData,
        MainNews,
        MainFavorite,
        MainHistoryTrade,
        MainStrategy,
        MainRecommend,
        MainIndicator,
        MainSetting,
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
