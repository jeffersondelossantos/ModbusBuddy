const express = require('express');
const appServer = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const configuration = require('./routes/configuration')
const slave = require('./routes/slave')

appServer.use(express.urlencoded());
appServer.use(express.json())
appServer.set('view engine', 'ejs');
appServer.set('views', __dirname + '/views');
appServer.set('layout', 'layouts/layout');
appServer.use(expressLayouts);
appServer.use(express.static('public'));
appServer.use('/', indexRouter);
appServer.use('/configuration', configuration)
appServer.use('/slave', slave)
appServer.listen(3000, () => {
    console.log("Client app started at port 3000...");
});