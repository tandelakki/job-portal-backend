import jwt from "jsonwebtoken";

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  try {
    // 1. Read token from cookies
    const token = req.cookies.token;
    console.log("Auth Middleware - Token:", token);

    // 2. If no token, reject request
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated. Token missing.",
      });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Auth Middleware - Decoded:", decoded);

    // 4. Attach user ID to request
    req.id = decoded.userId;
    req.user = decoded; // (optional) for full payload access

    // 5. Pass control to next middleware/route
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default isAuthenticated;
