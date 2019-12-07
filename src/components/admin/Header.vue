<template lang="xtmin">
el-row
    el-col :span=2
        span .brand @click=gohome style="font-family:Bigruixian17a14273741bfa7;" "阳关三叠"
    el-col :span=15
        nav-menu @display-submenu=displaySubmenu($event)
</template>

<script>
import NavMenu from './Menu.vue'

export default {
    components: {
        NavMenu,
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
