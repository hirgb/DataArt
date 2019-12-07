<template lang="xtmin">
el-row
    el-col :span=1
        el-button type=text @click=gohome
            i .fa .fa-home .back
    el-col :span=2
        span .brand "{{ stock.name }}"
    el-col :span=2 .header-data
    :class="{'red': isRise, 'green': !isRise}" "{{ currentPrice }}"
    el-col :span=2 .header-data
    :class="{'red': isRise, 'green': !isRise}" "{{ riseOfFall }}"
    el-col :span=8
        nav-menu
    el-col :span=5
        nav-search @refresh-stock=$emit('refresh-stock')
    el-col :span=1 style="text-align: right"
        el-tooltip v-show=!isFavorite class=item effect=dark
        content=点击添加自选股 placement=bottom
            el-dropdown trigger=click @command=addFavorite
                el-button type=warning icon=el-icon-star-off :circle=true
                el-dropdown-menu slot=dropdown
                    el-dropdown-item v-for="i in favoriteGroups"
                    :key=i.index :command=i.index "{{i.name}}"
        el-tooltip v-show=isFavorite class=item effect=dark
        content=已添加自选股 placement=bottom
            el-button type=success icon=el-icon-check :circle=true
            @click=deleteFavorite
    el-col :span=1 style="text-align: right"
        el-tooltip class=item effect=dark
        content=点击添加交易 placement=bottom
            el-button type="primary" icon="el-icon-edit" :circle=true
            @click="$emit('add-trade')"
    el-col :span=1 style="text-align: right"
        el-tooltip class=item effect=dark
        content=显示/隐藏交易 placement=bottom
            el-button type="warning" icon="el-icon-location" :circle=true
            @click=""
    el-col :span=1 style="text-align: right"
        el-tooltip class=item effect=dark
        content=显示/隐藏预测 placement=bottom
            el-button type="danger" icon="el-icon-view" :circle=true
            @click="togglePredict"
</template>

<script>
import NavMenu from './Menu.vue'
import NavSearch from '../common/Search.vue'
export default {
    props: ['data'],
    components: {
        NavMenu,
        NavSearch,
    },
    data() {
        return {
            favoriteGroups: [{
                index: 0,
                name: '默认分组'
            }],
            predict: false,
        }
    },
    computed: {
        user: function() {
            return this.$store.getters['user/getAll']
        },
        stock: function() {
            return this.$store.getters['app/currentStock']
        },
        isRise: function() {
            if (this.data && this.data[3]) {
                return !this.data[3].value.startsWith('-')
            } else {
                return true
            }
        },
        isFavorite: function() {
            let favorite = this.user.favorite
            return JSON.stringify(favorite).includes(this.stock.code)
        },
        currentPrice: function() {
            if (this.data && this.data[0]) {
                return this.data[0].value
            } else {
                return ''
            }
        },
        riseOfFall: function() {
            if (this.data && this.data[3]) {
                return this.data[3].value
            } else {
                return ''
            }
        }
    },
    mounted() {
        this.getFavoriteGroup()
    },
    methods: {
        togglePredict(){
            this.predict = !this.predict
            this.predict ? this.$emit('show-predict') : this.$emit('hide-predict')
        },
        gohome() {
            this.$router.push({
                path: '/home'
            })
        },
        getFavoriteGroup() {
            let favorite = this.user.favorite
            this.favoriteGroups = favorite.map((i, index) => {
                return {
                    index,
                    name: i.name
                }
            })
        },
        addFavorite(e) {
            let q = {
                groupIndex: e,
                stockCode: this.stock.code,
                stockName: this.stock.name,
            }

            this.$utils.post(
                this,
                this.$config.dataServer + '/web/user/addFavorite',
                q,
                () => {
                    this.$utils.displaySuccess(this, '添加成功')
                    let f = this.user.favorite
                    f[e].stock.push([this.stock.code, this.stock.name])
                    this.$store.commit('user/setValue', {
                        key: 'favorite',
                        value: f
                    })
                }
            )
        },
        deleteFavorite() {
            this.$confirm('确认要删除该自选股吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let code = this.stock.code
                let favorite = this.user.favorite
                favorite.forEach((i, groupIndex) => {
                    if (i.stock.length) {
                        let stockIndex = i.stock.findIndex(j => j[0] === code)
                        if (stockIndex !== -1) {
                            this.$utils.post(
                                this,
                                this.$config.dataServer + '/web/user/deleteFavorite', {
                                    groupIndex,
                                    stockIndex
                                },
                                () => {
                                    i.stock.splice(stockIndex, 1)
                                    this.$store.commit('user/setValue', {
                                        key: 'favorite',
                                        value: favorite
                                    })
                                    this.$utils.displaySuccess(this, '删除成功')
                                }
                            )
                        }
                    }
                })
            }).catch();
        }
    }
}
</script>

<style scoped lang="stylus">
.back
    color: #fff
    font-size: 20px
.brand
    color: #fff
    font-size: 24px
    line-height: 60px
    cursor: pointer
.header-data
    color: #fff
    font-size: 24px
    line-height: 60px
    text-align: center
    user-select: none
.red
    color: #ff4c4c
.green
    color: #38d038
</style>
