var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/node_blog', { useNewUrlParser: true, useUnifiedTopology: true })

var Schema = mongoose.Schema

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_time: {
        type: Date,
        // do not use Date.now()
        default: Date.now
    },
    last_modify_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-max-img.ong'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date,
    },
    status: {
        type: Number,
        // 0 无限制
        // 1 不可以评论
        // 2 不可以登录使用
        enum: [0, 1, 2],
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)