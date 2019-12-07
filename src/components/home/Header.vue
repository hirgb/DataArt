<template lang="xtmin">
el-row
    el-col :span=2
        span .brand @click=gohome style="font-family:Bigruixian17a14273741bfa7;" "阳关三叠"
    el-col :span=15
        nav-menu @display-submenu=displaySubmenu($event)
    el-col :span=5
        nav-search
    el-col :span=2
        el-dropdown @command=handleCommand style="color: #fff; float: right; font-size: 18px"
            span .el-dropdown-link
                i .fa .fa-user-circle-o
                span v-text=user.nickName style="cursor: pointer; padding-left: 10px"
                i .el-icon-arrow-down .el-icon--right
            el-dropdown-menu slot=dropdown
                el-dropdown-item command=setting
                    i .fa .fa-sliders
                    span .title "用户设置"
                el-dropdown-item command=logout
                    i .fa .fa-sign-out
                    span .title "退出"
</template>

<script>
import NavMenu from './Menu.vue'
import NavSearch from '../common/Search.vue'

export default {
    components: {
        NavMenu,
        NavSearch,
    },
    computed: {
        user: function(){
            return this.$store.getters['user/getAll']
        },
    },
    methods: {
        gohome() {
            this.$router.push({
                path: '/'
            })
        },
        handleCommand(command){
            switch (command) {
                case 'logout':
                    this.$z.cookie.remove('jwt')
                    this.$store.commit('user/clear')
                    this.$store.commit('app/clear')
                    this.$router.push({path: '/'})
                    break;
                case 'setting':
                    this.$store.commit('app/setValue', {key: 'currentBoard', value: 'Setting'})
                    break;
                default:

            }
        },
        displaySubmenu(e){
            this.$emit('display-submenu', e)
        }
    }
}
</script>

<style scoped lang="stylus">
.brand
    color: #fff
    font-size: 24px
    cursor: pointer
.title
    display: inline-block
    padding-left: 10px
</style>
