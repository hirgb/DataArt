const Subscription = require('egg').Subscription;

module.exports = class extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            // interval: '1s',
            // cron: '0 2 20 * * *',
            type: 'worker',
            immediate: true
        };
    }

    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        // this.ctx.service.sse.tradeSummary.updateMonth()
    }
}