
const crypto = require('crypto');
// const md5 = crypto.createHash("md5");  // 这个东西不要放在外面，一个crypto实例只能调用digest一次，写在外面就重复调用它了，靠！
const cryptoPwd = {};
cryptoPwd.encryptPwd = function (pwd) {
    let solt = 'jksahdksaondjkabkdsandanxaiic';
    return crypto.createHash('md5').update(pwd).update(solt).digest('base64');
};
cryptoPwd.comparePwd = function(pwd,userPwd){
    return new Promise((resolve,reject)=>{
        this.encryptPwd(pwd) === userPwd ? resolve({msg:'登录成功！'}) : reject({msg:'密码不正确！'})
    })
}

module.exports = cryptoPwd;
