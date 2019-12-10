const Service = require('egg').Service

module.exports = class extends Service {
    async get() {
        const ctx = this.ctx
        const config = ctx.app.config
        const pe = await ctx.curl(config.dataUrl.sse.peIndustry, {
            dataType: 'json',
            headers: {
                referer: config.dataUrl.sse.referer,
                "user-agent": config.dataUrl.global.agent
            }
        })
        return pe
    }

    async update() {
        const ctx = this.ctx
        const config = ctx.app.config
        try {
            const res = await ctx.curl(config.dataUrl.sse.peIndustry, {
                dataType: 'json',
                headers: {
                    referer: config.dataUrl.sse.referer,
                    "user-agent": config.dataUrl.global.agent
                }
            })
            if (res.status === 200) {
                const result = res.data.result
                const industryNames = result.map(i => i.MAIORNAME)
                for (const name of industryNames) {
                    await ctx.model.ShIndustry.findOrCreate({
                        where: {
                            name
                        },
                        defaults: {
                            name
                        }
                    })
                }

                ctx.logger.info('peIndustry update success')
                return true
            } else {
                ctx.logger.error('peIndustry update failed')
                return false
            }
        } catch (error) {
            ctx.logger.error('peIndustry update failed - ' + error)
            return false
        }
    }
}