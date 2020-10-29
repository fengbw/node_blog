const express = require('express')
const path = require('path')

const app = express()

app.use('/public/', express.static(path.join(__dirname, 'public')))
app.use('/node_modules/', express.static(path.join(__dirname, 'node_modules')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))

app.get('/', function (req, res) {
    res.render('index.html')
})

app.listen(5000, function () {
    console.log('server running at port 5000......')
})
