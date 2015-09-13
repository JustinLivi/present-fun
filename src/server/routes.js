'use strict';

exports = module.exports = function(app) {

    //front end
    app.get('/slides/:index', require('./views/index').init);
    
};