module.exports = app => {
    const {
        STRING
    } = app.Sequelize;

    const User = app.model.define('user', {
        loginName: STRING,
        nickName: STRING,
        pwd: STRING
    });

    return User;
};