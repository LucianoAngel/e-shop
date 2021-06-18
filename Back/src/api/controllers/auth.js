
async function authTaller(req, res, next){
    try{
        if(req.session.user) {
            return next();
        }else{
            res.status(400).send('inicia sesion para acceder al taller')
        }
    }
    catch{
        return res.status(404).send('not found')
    }
  };

  module.exports= {authTaller};