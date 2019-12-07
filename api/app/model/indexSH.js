module.exports = app => {
    const {
        STRING,
        FLOAT
    } = app.Sequelize;

    const IndexSH = app.model.define('index_sh', {
        date: {
            type: STRING,
            primaryKey: true
        },
        close: FLOAT,
        pe: FLOAT
    });

    return IndexSH;
};