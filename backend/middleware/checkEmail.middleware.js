const { UserModel } = require("../model/user.model");




const checkEmail = async(req,res,next) => {
    const {email} = req.body;
    try{
        const data = await UserModel.find({email});
        if(data.length>=1){
            res.status(404).send({
                'msg':'Email-id already registered!'
            })
        }else{
            next();
        }
    }catch(err){
        res.status(404).send({
            'msg':'Something Went Wrong!'
        })
    }
}