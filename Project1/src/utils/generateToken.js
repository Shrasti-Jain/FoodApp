let jwt=require('jsonwebtoken')

let generateAccessToken=(id)=>{
    let accessToken=jwt.sign({id}
        ,process.env.ACCESS_SECRET_KEY
        ,{expiresIn:'15m'})

    return accessToken
}


let generateRefreshToken=(id)=>{
    let refreshToken=jwt.sign({id},process.env.REFRESH_SECRET_KEY,{expiresIn:'1d'})

    return refreshToken
}

module.exports={
    generateAccessToken,
    generateRefreshToken
}