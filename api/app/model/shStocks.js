module.exports = app => {
    const {
        STRING
    } = app.Sequelize;

    const ShStocks = app.model.define('sh_stocks', {
        code: {
            type: STRING,
            primaryKey: true,
        },
        name: STRING,
        updateAt: STRING
    });

    return ShStocks;
};