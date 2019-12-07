'use strict';

const Controller = require('egg').Controller;

module.exports = class extends Controller {
    async index() {
        const {
            ctx
        } = this;
        ctx.body = await ctx.model.User.findAll()
        ctx.status = 200
    }

    async show() {
        const id = this.ctx.params.id
        this.ctx.body = await this.ctx.model.User.findByPk(id)
        this.ctx.status = 200
    }

    async create() {
        const {
            loginName,
            nickName,
            pwd
        } = this.ctx.request.body
        const user = await this.ctx.model.User.create({
            loginName,
            nickName,
            pwd
        })
        this.ctx.body = {
            id: user.id
        }
        this.ctx.status = 201
    }

    async update() {
        const id = this.ctx.params.id
        const {
            pwd
        } = this.ctx.request.body

        await this.ctx.model.User.update({
            pwd
        }, {
            where: {
                id
            }
        })
        this.ctx.status = 204
    }

    async destroy() {
        const id = this.ctx.params.id
        await this.ctx.model.User.destroy({
            where: {
                id
            }
        })
        this.ctx.body = {
            id
        }
        this.ctx.status = 200
    }
}