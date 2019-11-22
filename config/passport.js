
// 验证token
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/Users');
const keys = require("./keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload);
        User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null,user);
                }
                return done(null,false);
            })
            .catch(err => console.log(err));
    }));
}


//  console.log(jwt_payload);  根据生成token时自定义的rule解析，里面有时间戳可以看token有没有过期
// { id: '5dd750c4a46a5959dc42aeca',
//     name: 'zouhaodong',
//     identity: 'admin',
//     iat: 1574392537,
//     exp: 1574414137 }

