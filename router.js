var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/', function (req, res) {
    // console.log(req.session.user)
    res.render('index.html', {
        user: req.session.user
    })
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {
    var body = req.body

    User.findOne({ 
        email: body.email, 
        password: md5(md5(body.password))
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: 'invalid email or nickname'
            })
        }

        req.session.user = user

        res.status(200).json({
            err_code: 0,
            message: 'Ok'
        })
    })
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', async function (req, res) {
    var body = req.body

    try {
        if (await User.findOne({ email: body.email })) {
            return res.status(200).json({
                err_code: 1,
                message: 'email exists'
            })
        }

        if (await User.findOne({ nickname: body.nickname})) {
            return res.status(200).json({
                err_code: 2,
                message: 'nickname exists'
            })
        }

        body.password = md5(md5(body.password))

        var user = await new User(body).save()

        //注册成功 使用session记录
        req.session.user = user

        res.status(200).json({
            err_code: 0,
            message: 'Ok'
        })
    }
    catch (err) {
        res.status(500).json({
            error_code: 500,
            message: err.message
        })
    }
}) 

router.get('/logout', function (req, res) {
    req.session.user = null
    res.redirect('/')
})

module.exports = router