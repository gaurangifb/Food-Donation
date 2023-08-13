import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] //Bearer
        const decodedToken = jwt.verify(token, jwt-secret-key)
        req.userData = decodedToken
        console.log("done middleware")
        next()
    } catch(err) {
        console.error(err)
        return res.status(401).json({  //401=unauthorized
                'message': "Invalid or expired token provided",
                'error': err
        })  
    }
}

export default checkAuth