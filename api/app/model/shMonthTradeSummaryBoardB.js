module.exports = app => {
    const {
        STRING,
    } = app.Sequelize;

    const ShMonthTradeSummaryBoardB = app.model.define('sh_month_trade_summary_board_b', {
        month: {
            type: STRING,
            primaryKey: true
        },
        exchangeRate: STRING,
        mmarketValue: STRING,
        mmarketValuePre: STRING,
        mmaxTrAmt: STRING,
        mmaxTrAmtDate: STRING,
        mmaxTrAmtPre: STRING,
        mmaxTrVol: STRING,
        mmaxTrVolDate: STRING,
        mmaxTrVolPre: STRING,
        mmaxhighTrn: STRING,
        mmaxhighTrnDate: STRING,
        mmaxhighTrnPre: STRING,
        mminLowTrn: STRING,
        mminLowTrnDate: STRING,
        mminLowTrnPre: STRING,
        mminTrAmt: STRING,
        mminTrAmtDate: STRING,
        mminTrAmtPre: STRING,
        mminTrVol: STRING,
        mminTrVolDate: STRING,
        mminTrVolPre: STRING,
        mnegotiableValue: STRING,
        mnegotiableValuePre: STRING,
        mprofitRate: STRING,
        mprofitRatePre: STRING,
        mtotalAmt: STRING,
        mtotalAmtPre: STRING,
        mtotalTx: STRING,
        mtotalTxDate: STRING,
        mtotalTxPre: STRING,
        mtotalVol: STRING,
        mtotalVolPre: STRING,
        txNum: STRING
    });

    return ShMonthTradeSummaryBoardB;
};