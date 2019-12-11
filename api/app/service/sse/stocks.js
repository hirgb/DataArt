const Service = require('egg').Service
// const dayjs = require('dayjs')

module.exports = class extends Service {
    async updateName() {
        const ctx = this.ctx

        try {
            const res = await this.__getStockBasicInfo()
            if (res.status === 200) {
                const result = res.data.result
                for (const stock of result) {
                    const stockObj = {
                        code: stock[0],
                        name: stock[1],
                        updateAt: stock[2]
                    }
                    const [findStock, created] = await this.ctx.model.ShStocks.findOrCreate({
                        where: {
                            code: stockObj.code
                        },
                        defaults: stockObj
                    })
                    if (!created) {
                        if (findStock.name !== stockObj.name) {
                            await this.ctx.model.ShStocks.update({
                                name: stockObj.name,
                                updateAt: stockObj.updateAt
                            }, {
                                where: {
                                    code: stockObj.code
                                }
                            })
                        }
                    }
                }
            } else {
                ctx.logger.info('service.sse.stocks.updateName failed')
            }
        } catch (error) {
            ctx.logger.error('service.sse.stocks.updateName failed - ' + error)
        }
    }

    async __getStockBasicInfo() {
        const ctx = this.ctx
        const config = ctx.app.config
        return await ctx.curl(config.dataUrl.sse.allStocks, {
            method: 'get',
            dataType: 'json',
            headers: config.dataUrl.sse.headers
        })
    }
}