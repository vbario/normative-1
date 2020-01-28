'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    'NODE_ENV': '"development"',
    'AUGUST_API_KEY': '"727dba56-fe45–498d-b4aa-293f96aae0e5"',
    'AUGUST_INSTALLID': '"123"',
    'AUGUST_PASSWORD': '"qpwo5667!"',
    'AUGUST_ID_TYPE': '"email"',
    'AUGUST_ID': '"vbaranov@lowerprofile.com"',
    'VUE_APP_AUGUST_ID': '"vbaranov@lowerprofile.com"'
})
