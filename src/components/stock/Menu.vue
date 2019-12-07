<template lang="xtmin">
el-menu mode=horizontal background-color=#545c64 text-color=#fff active-text-color=#ffd04b @select=handleSelect
    el-submenu index=infomation
        template slot=title "信息聚合"
        el-menu-item v-for="i in infomation" :key=i.title :index=i.url "{{i.title}}"
    el-submenu index=selection
        template slot=title "精选资讯"
        el-menu-item v-for="i in selection" :key=i.title :index=i.url "{{i.title}}"
    el-submenu index=latest
        template slot=title "最近浏览"
        el-menu-item v-for="i in historyStocks" :key=i.title :index=i.code "{{i.name}}"
</template>

<script>
import {
    genInfomation
} from '@/assets/js/infomation.js'
import {
    genSelection
} from '@/assets/js/selection.js'

export default {
    data() {
        return {
            activeIndex: 'Data',
        }
    },
    computed: {
        user: function() {
            return this.$store.getters['user/getAll']
        },
        infomation: function() {
            return genInfomation(this.stock.code)
        },
        selection: function() {
            return genSelection(this.stock.code)
        },
        stock: function() {
            return this.$store.getters['app/currentStock']
        },
        historyStocks: function() {
            return this.$store.getters['app/historyStock']
        }
    },
    methods: {
        handleSelect(index, path) {
            if (path.length == 2 && ['infomation', 'selection'].includes(path[0])) {
                window.open(index)
            }
            if (path.length == 2 && ['latest'].includes(path[0])) {
                this.$store.commit('app/setValue', {key: 'tradeMark', value: null})
                this.$store.commit('app/setValue', {key: 'isDisplayTradeMark', value: false})
                this.$router.push({
                    path: '/stock/' + index
                })
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
