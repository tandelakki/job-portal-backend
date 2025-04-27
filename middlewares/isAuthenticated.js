// import jwt from 'jsonwebtoken';

// const isAuthenticated = (req, res, next) => {
//     console.log('Authorization Header:', req.headers.authorization);

//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         console.log('No token provided');
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         req.user = decoded;
//         req.id = decoded.id; // Ensure userId is set in the request object
//         next();
//     } catch (error) {
//         console.error('JWT verification error:', error);
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

// export default isAuthenticated;

import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
    



        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }

        
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error)
        return "error"
    }

}

export default isAuthenticated;

