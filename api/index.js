const { Nuxt, Builder } = require('nuxt')
const express = require('express')

var port = process.env.PORT || '3000'
var isProd = process.env.NODE_ENV === 'production'

//[Start Mongodb]
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);// fix for -> collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useMongoClient', true);// 
mongoose.set('useFindAndModify', true);// 

var uri = "mongodb+srv:// PLEASE PUT YOUR URI "; // Change This

mongoose.connect(uri, { useNewUrlParser: true},  function (err, res) {
    console.log(err || 'MongoDB connected');
});
mongoose.Promise = require('bluebird');

const app = express()


//NUXT CONFIG
let nuxtConfig = require('../nuxt.config.js')
const nuxt = new Nuxt(nuxtConfig)
//const nuxt = new Nuxt({ dev: !isProd })
// 프로덕션 환경에서 빌드되지 않음.
if (!isProd) {
    const builder = new Builder(nuxt)
    builder.build()
}
app.use(nuxt.render)

app.listen(port, function () {
    console.log('Server is listening on http://localhost:' + port);
})