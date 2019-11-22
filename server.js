const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const keys = require('./config/keys')
const users = require('./router/api/users')
const profiles = require('./router/api/profiles')
const app = express()
const port = process.env.PORT || 5000
const dbLink = keys.mongoUrl


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// passport.js用来验证登录
app.use(passport.initialize());
require("./config/passport")(passport);//把passport传过去


// 注册登录以及登录状态判断的接口
app.use('/api/users',users)
// 数据的增删改查接口
app.use('/api/profiles',profiles)


app.get('/',(req,res)=>{
    res.send('Hello!')
})



mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},(err)=>{
    if(err){
        console.log("链接失败")
    }else{
        console.log("链接成功");
        let server = app.listen(port,()=>{console.log(`server is running on port ${port}`)})
    }
});


