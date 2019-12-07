'use strict';

const Controller = require('egg').Controller;

module.exports = class extends Controller {
    async index() {
        const {
            ctx
        } = this;
        ctx.body = 'This is a market view project.';
    }

    async hack() {
        const ctx = this.ctx
        const puppeteer = require('puppeteer');

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://new.qq.com/omn/20191207/20191207A01GUJ00');
        const c = await page.content();
        await browser.close();
        ctx.body = c;
    }
}