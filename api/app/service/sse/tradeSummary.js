const Service = require('egg').Service
const dayjs = require('dayjs')

module.exports = class extends Service {
    async updateYear() {
        const startYear = 1991 //从1991开始才有数据
        const endYear = dayjs().subtract(1, 'year').year()
        const ctx = this.ctx

        for (let year = startYear; year <= endYear; year++) {
            try {
                const res = await this.__getYearTradeSummary(year)
                if (res.status === 200) {
                    const result = res.data.result
                    await this.__updateYearTradeSummaryBoardA(result, year)
                    await this.__updateYearTradeSummaryBoardB(result, year)
                } else {
                    ctx.logger.info('service.sse.tradeSummary.updateYear failed')
                }
            } catch (error) {
                ctx.logger.error('service.sse.tradeSummary.updateYear failed - ' + error)
            }
        }
    }

    async updateMonth() {
        const monthList = await this.__genMonthList()
        // const lastMonth = await this.__getLastUpdateMonth()
        // return monthList
        for (const month of monthList) {
            const res = await this.__getMonthTradeSummary(month)
            if (res.status === 200) {
                const result = res.data.result
                await this.__updateMonthTradeSummaryBoardA(result, month)
                await this.__updateMonthTradeSummaryBoardB(result, month)
            } else {
                this.ctx.logger.error('service.sse.tradeSummary.updateMonth failed')
            }
        }
    }

    async __getYearTradeSummary(year) {
        const ctx = this.ctx
        const config = ctx.app.config
        return await ctx.curl(config.dataUrl.sse.yearTradeSummary, {
            method: 'post',
            dataType: 'json',
            headers: config.dataUrl.sse.headers,
            data: {
                prodType: 'gp',
                inYear: year
            }
        })
    }

    async __getMonthTradeSummary(month) {
        const ctx = this.ctx
        const config = ctx.app.config
        return await ctx.curl(config.dataUrl.sse.monthTradeSummary, {
            method: 'post',
            dataType: 'json',
            headers: config.dataUrl.sse.headers,
            data: {
                prodType: 'gp',
                inYear: month
            }
        })
    }

    async __genMonthList() {
        const startMonth = '1990-12'
        const endMonth = dayjs().subtract(1, 'month').format('YYYY-MM')
        const months = []
        while (months[months.length - 1] != endMonth) {
            const month = dayjs(startMonth).add(months.length, 'month').format('YYYY-MM')
            months.push(month)
        }
        return months
    }

    async __getLastUpdateMonth() {

    }

    async __updateMonthTradeSummaryBoardA(result, month) {
        const A = result.find(i => i.productType === '7') //主板A
        if (A) {
            A.month = month
            await this.ctx.model.ShMonthTradeSummaryBoardA.findOrCreate({
                where: {
                    month
                },
                defaults: A
            })
        } else {
            this.ctx.logger.error('service.tradeSummary.__updateMonthTradeSummaryBoardA failed')
        }
    }

    async __updateMonthTradeSummaryBoardB(result, month) {
        const B = result.find(i => i.productType === '8') //主板A
        if (B) {
            B.month = month
            await this.ctx.model.ShMonthTradeSummaryBoardB.findOrCreate({
                where: {
                    month
                },
                defaults: B
            })
        } else {
            this.ctx.logger.error('service.tradeSummary.__updateMonthTradeSummaryBoardB failed')
        }
    }

    async __updateYearTradeSummaryBoardA(result, year) {
        const A = result.find(i => i.productType === '7') //主板A
        if (A) {
            await this.ctx.model.ShYearTradeSummaryBoardA.findOrCreate({
                where: {
                    year
                },
                defaults: A
            })
        } else {
            this.ctx.logger.error('service.tradeSummary.__updateYearTradeSummaryBoardA failed')
        }
    }

    async __updateYearTradeSummaryBoardB(result, year) {
        const B = result.find(i => i.productType === '8') //主板B
        if (B) {
            await this.ctx.model.ShYearTradeSummaryBoardB.findOrCreate({
                where: {
                    year
                },
                defaults: B
            })
        } else {
            this.ctx.logger.error('service.tradeSummary.__updateYearTradeSummaryBoardB failed')
        }
    }
}