const { jsonResponse } = require("../../lib/jsonResponse");
const User = require("../../schema/user");


const router = require("express").Router();

router.post("/",(req, res)=>{
    
    const {username, password} = req.body;

    if(!!!username || !!!password){
        return res.status(400).json(jsonResponse(400,{
            error: "datos requeridos"
        }))
    }

    //autenticar usuario
    const accessToken = "access_token";
    const refreshToken = "refresh_token";
    const user = {
        id_cliente: '1',
        name: 'john Doe',
        username: 'XXXXX',
    };
    res.status(200).json(jsonResponse(200,{ user,accessToken,refreshToken}))
});

module.exports = router;