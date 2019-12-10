module.exports = app => {
    const {
        STRING,
        INTEGER,
    } = app.Sequelize;

    const ShIndustry = app.model.define('sh_industry', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING
    });

    return ShIndustry;
};