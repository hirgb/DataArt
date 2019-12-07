<template lang="xtmin">
el-menu .el-menu-demo :default-active=activeIndex @select=changeBoard
mode=horizontal background-color=#545c64 text-color=#fff active-text-color=#ffd04b
    el-menu-item index=UserManage "用户管理"
    el-menu-item index=StockRecommand "股票推荐"
</template>

<script>
export default {
    data(){
        return {
            activeIndex: 'UserManage',
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
