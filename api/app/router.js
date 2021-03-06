'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {
        router,
        controller
    } = app;
    router.get('/', controller.home.index);
    router.get('/test', controller.home.test);

    router.resources('users', '/users', controller.users);
    router.resources('pe', '/data/pe', controller.data.pe);
};