'use strict';

const Controller = require('egg').Controller;
const dayjs = require('dayjs')

module.exports = class extends Controller {
    async index() {
        const ctx = this.ctx;
        const c = await ctx.service.fetch.pe()
        const shSharesPE = c.data.shSharesPEList.map(i => ({
            time: dayjs(i.date).format('YYYY-MM-DD'),
            close: i.close,
            pe: i.pe,
        }))

        ctx.body = shSharesPE
        ctx.status = 200
    }

    async create() {
        const ctx = this.ctx;
        const c = await ctx.service.fetch.pe()
        const shSharesPE = c.data.shSharesPEList.map(i => ({
            date: dayjs(i.date).format('YYYY-MM-DD'),
            close: i.close,
            pe: i.pe,
        }))
        shSharesPE.pop()
        const lastPE = shSharesPE.pop()
        const index = await ctx.model.IndexSH.create(lastPE)
        ctx.body = index
        ctx.status = 201
    }

    async update() {
        const ctx = this.ctx;
        const c = await ctx.service.fetch.pe()
        const shSharesPE = c.data.shSharesPEList.map(i => ({
            date: dayjs(i.date).format('YYYY-MM-DD'),
            close: i.close,
            pe: i.pe,
        }))
        shSharesPE.pop()
        await ctx.model.IndexSH.bulkCreate(shSharesPE)
        ctx.status = 200
    }
}