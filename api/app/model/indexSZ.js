module.exports = app => {
    const {
        STRING,
        FLOAT
    } = app.Sequelize;

    const IndexSZ = app.model.define('index_sz', {
        date: {
            type: STRING,
            primaryKey: true
        },
        close: FLOAT,
        pe: FLOAT
    });

    return IndexSZ;
};