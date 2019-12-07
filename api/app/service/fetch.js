const Service = require('egg').Service
const puppeteer = require('puppeteer');

module.exports = class extends Service {
    async get(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const c = await page.content();
        await browser.close();
        return c
    }

    async pe() {
        const ctx = this.ctx
        const pe = await ctx.curl(ctx.app.config.dataUrl.legulegu.marketPe, {
            dataType: 'json',
        })
        return pe
    }
}