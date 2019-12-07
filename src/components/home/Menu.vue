<template lang="xtmin">
el-menu .el-menu-demo :default-active=activeIndex @select=changeBoard mode=horizontal background-color=#545c64 text-color=#fff active-text-color=#ffd04b
    el-menu-item index=Data "数说大盘"
    el-menu-item index=News "资讯中心"
    el-submenu index=Favorite
        template slot=title "自选股"
        el-menu-item v-for="i in subMenu" :key=i :index=String(i) "{{i}}"
    el-menu-item index=HistoryTrade "历史交易"
    el-submenu index=Tools
        template slot=title "选股工具"
        el-menu-item index=Strategy "策略选股"
        el-menu-item index=Indicator "指标选股"
    el-menu-item index=Recommend
        el-badge value=vip
            div "智能荐股"
</template>

<script>
export default {
    data(){
        return {
            activeIndex: 'Data',
        }
    },
    computed: {
        user: function() {
            return this.$store.getters['user/getAll']
        },
        subMenu: function(){
            let favorite = this.user.favorite
            if (favorite) {
                return favorite.map(i => i.name)
            } else {
                return []
            }
        }
    },
    methods: {
        changeBoard(index, path) {
            if (path.length === 1) {
                this.$store.commit('app/setValue', {key: 'currentBoard', value: index})
            } else if (path.length === 2) {
                if (path[0] === 'Favorite') {
                    this.$store.commit('app/setValue', {key: 'currentBoard', value: path[0]})
                    this.$emit('display-submenu', path)
                }
                if (path[0] === 'Tools') {
                    this.$store.commit('app/setValue', {key: 'currentBoard', value: path[1]})
                }
            }
        }
    }
}
</script>

<style lang="stylus">
.el-badge
    transform: translateY(-1px)
.el-badge__content.is-fixed
    -webkit-transform: translateY(40%) translateX(100%) !important
    transform: translateY(40%) translateX(100%) !important
</style>
