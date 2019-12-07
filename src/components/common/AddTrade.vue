<template lang="xtmin">
el-dialog :title="'添加交易-' + stockName" :visible.sync=dialogFormVisible width=30%
    el-form ref=tradeForm :model=form :inline=false label-width=80px
        el-form-item :span=12 label=时间
            el-date-picker v-model=form.time type=datetime align=right :picker-options=pickerOptions style="width: 100%"
        el-form-item :span=12 label=买/卖
            el-switch v-model=form.action style="width: 100%"
            active-color="#13ce66" inactive-color="#ff4949"
            active-text="卖出" inactive-text="买入"
        el-form-item label=数量
            el-input-number v-model=form.count :min=100 :step=100 style="width: 100%"
        el-form-item label=价格
            el-input-number v-model=form.price :min=1 :precision=2 :step=0.01 style="width: 100%"
        el-form-item label=备注
            el-input type=textarea :row=2 v-model=form.remark
    div slot=footer class=dialog-footer
        el-button @click="dialogFormVisible = false" "取 消"
        el-button type=primary @click="doAddTrade" "确 定"
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            stockName: '',
            stockCode: '',
            form: {
                time: new Date(),
                action: false,
                count: 100,
                price: 10,
                remark: ''
            },
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
        }
    },
    methods: {
        show(stockName, stockCode) {
            this.stockName = stockName
            this.stockCode = stockCode
            this.dialogFormVisible = true
        },
        doAddTrade(){
            let q = {
                code: this.stockCode,
                time: parseInt(this.form.time.getTime()/1000),
                action: this.form.action?'卖':'买',
                count: this.form.count,
                price: this.form.price,
                remark: this.form.remark,
            }
            this.$utils.post(
                this,
                this.$config.dataServer+'/web/trade/addTrade',
                q,
                () => {
                    this.$utils.displaySuccess(this, '添加成功')
                    this.dialogFormVisible = false
                }
            )
        },
    }
}
</script>

<style lang="css">
</style>
