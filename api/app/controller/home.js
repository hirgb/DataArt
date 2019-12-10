'use strict';

const Controller = require('egg').Controller;

module.exports = class extends Controller {
    async index() {
        const {
            ctx
        } = this;
        ctx.body = 'This is a market view project.';
    }

    async test() {
        // const pe = await this.ctx.service.sse.pe.update()
        this.ctx.body = pe;
    }
}