const express = require('express')
const router = express.Router()
const User = require('../../models/Users')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const crypto = require('../../static/js/crypto')
const secretOrKey = require('../../config/keys').secretOrKey

router.get('/test',(req,res)=>{
    res.json({msg:'this is users.js'})
})

// @route  POST api/users/register
// @desc   返回的请求的json数据
// @access public
router.post('/register', (req, res) => {
    // 查询数据库中是否拥有邮箱
    User.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json('用户名已被注册!');
        } else {
            // let md5 = crypto.createHash("md5");
            let username = req.body.username,
                email= req.body.email,
                password=req.body.password,
                identity= req.body.identity;

            password = crypto.encryptPwd(password)

            let newUser = new User({
                username,
                email,
                password,
                identity,
            });

            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));

        }
    });
});

// @route  POST api/users/login
// @desc   返回token jwt passport
// @access public
router.post('/login',(req,res)=>{

    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username:username}).then((user)=>{
        if(!user){
            return res.status(404).json({msg:'用户不存在！'})
        }else{

            crypto.comparePwd(password,user.password).then(value => {
                // res.json(value);
                // 密码对比后根据规则返回给此用户一个token
                const rule = {
                    id: user.id,
                    name: user.username,
                    identity: user.identity
                };
                jwt.sign(rule, secretOrKey, { expiresIn: '6h' }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });

            },error =>{
                res.status(400).json(error);
            })

        }

    })

})

// @route  GET api/users/current
// @desc   return current user
// @access Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // res.json(req.user)
        res.json({
            id: req.user.id,
            name: req.user.username,
            email: req.user.email,
            identity: req.user.identity
        });
    }
);

module.exports = router;