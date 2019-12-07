<template lang="xtmin">
div
    el-button type=danger @click=showRecommandDialog "添加推荐"
    el-dialog
    title="收货地址"
    :visible.sync="dialogFormVisible"
    width=30%
        el-form :model="form"
        label-width=80px
            el-form-item label="股票代码"
                el-input v-model="form.code"
            el-form-item label="推荐日期"
                el-date-picker v-model="form.date" type="datetime" placeholder="选择日期时间"
            el-form-item label="操作"
                el-radio-group v-model="form.action"
                    el-radio-button label="买"
                    el-radio-button label="卖"
            el-form-item label=备注
                el-input type=textarea :rows=2 v-model=form.remark
        div slot=footer
            el-button @click="dialogFormVisible = false" "取 消"
            el-button type="primary" @click="submit" "确 定"
</template>

<script>
export default {
    data(){
        return {
            form: {
                code: '',
                date: Date.now(),
                action: '买',
                remark: '龙樊',
            },
            dialogFormVisible: false
        }
    },
    methods: {
        showRecommandDialog(){
            this.dialogFormVisible = true
        },
        submit(){
            let q = JSON.parse(JSON.stringify(this.form))
            q.date = this.$z.timeFormat('yyyy-MM-dd hh:mm:ss', null, this.form.date)
            this.$utils.post(
                this,
                this.$config.dataServer+'/web/predict/add',
                q,
                ()=>{
                    this.$utils.displaySuccess(this, '添加成功')
                },
                null,
                ()=>{
                    this.dialogFormVisible = false
                }
            )
        }
    }
}
</script>

<style lang="css">
</style>
