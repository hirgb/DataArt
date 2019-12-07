module.exports = app => {
    const {
        STRING,
        FLOAT
    } = app.Sequelize;

    const IndexCY = app.model.define('index_cy', {
        date: {
            type: STRING,
            primaryKey: true
        },
        close: FLOAT,
        pe: FLOAT
    });

    return IndexCY;
};