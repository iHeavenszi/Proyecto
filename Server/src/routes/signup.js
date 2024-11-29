const { jsonResponse } = require("../../lib/jsonResponse");

const router = require("express").Router();

router.post("/",(req, res)=>{
    const {username, name, password} = req.body;

    if(!!!username || !!!name || !!!password){
        return res.status(400).json(jsonResponse(400,{
            error: "datos requeridos"
        }))
    }

    //crear usuario
    res.status(200).json(jsonResponse(200,{message: "usuario creado exitosamente"}))
    res.send("signout")
});

module.exports = router;