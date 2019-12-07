/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1575257611139_5666';

    // add your middleware config here
    config.middleware = [];

    config.security = {
        csrf: {
            enable: false,
            headerName: 'x-csrf-token'
        }
    }

    config.sequelize = {
        dialect: 'sqlite',
        storage: path.resolve(`data/MarketView.sqlite`),
        define: {
            underscored: false,
            freezeTableName: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            timestamps: false
        }
    };

    // add your user config here
    const userConfig = {
        dataUrl: require('./config.dataUrl')
    };

    return {
        ...config,
        ...userConfig,
    };
};