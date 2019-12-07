<template lang="xtmin">
div
    el-row v-show=!isVip .info
        h2 "智能荐股只对VIP用户开放。您还不是VIP用户。"
        p
        `成为VIP用户后，您可享受我们的智能荐股服务。<br>
        根据市场情况，随时推荐投资机会，实现财富增值。<br>
        利用最前沿技术、最稳妥的财富管理策略为你的投资保驾护航。<br><br>
        我们的推荐分为五个星级。<br>
        我们承诺，5星推荐为100%成功机会。<br>
        如果您跟随5星推荐投资失利，您损失多少我们赔付多少！`

        el-button type=danger :round=true "立即成为VIP用户"
    el-row v-show=isVip
        div "智能荐股"
</template>

<script>
export default {
    data(){
        return {}
    },
    computed: {
        user: function() {
            return this.$store.getters['user/getAll']
        },
        isVip: function() {
            return !!this.user.isVip
        }
    }
}
</script>

<style scoped lang="stylus">
.info
    text-align: center
    h2
        font-size: 24px
        font-weight: 500
        color: #999
        text-align: center
    p
        padding: 30px 0
        font-size: 18px
        font-weight: 400
        color: #666
        line-height: 36px

</style>
