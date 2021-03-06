module.exports = app => {
    const {
        STRING,
    } = app.Sequelize;

    const ShYearTradeSummaryBoardB = app.model.define('sh_year_trade_summary_board_b', {
        year: {
            type: STRING,
            primaryKey: true
        },
        exchangeRate: STRING,
        txNum: STRING,
        ymarketValue: STRING,
        ymarketvaluePre: STRING,
        ymaxTrAmt: STRING,
        ymaxTrAmtDate: STRING,
        ymaxTrVol: STRING,
        ymaxTrVolDate: STRING,
        ymaxhighTrn: STRING,
        ymaxhighTrnDate: STRING,
        yminLowTrn: STRING,
        yminLowTrnDate: STRING,
        yminTrAmt: STRING,
        yminTrAmtDate: STRING,
        yminTrVol: STRING,
        yminTrVolDate: STRING,
        ynegotiableVale: STRING,
        ynegotiablevaluePre: STRING,
        yprofitRate: STRING,
        yprofitratePre: STRING,
        ytotalAmt: STRING,
        ytotalTx: STRING,
        ytotalTxDate: STRING,
        ytotalVol: STRING,
        ytotalamtPre: STRING,
        ytotaltxPre: STRING,
        ytotalvolPre: STRING
    });

    return ShYearTradeSummaryBoardB;
};