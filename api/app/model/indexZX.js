module.exports = app => {
    const {
        STRING,
        FLOAT
    } = app.Sequelize;

    const IndexZX = app.model.define('index_zx', {
        date: {
            type: STRING,
            primaryKey: true
        },
        close: FLOAT,
        pe: FLOAT
    });

    return IndexZX;
};