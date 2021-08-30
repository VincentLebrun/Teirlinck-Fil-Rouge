import jwt from "jsonwebtoken";

export function isLogin(token) {
    let isLogin = false;
    if (token) {
        jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY, (err) => {
            if (err) {
                    isLogin = false
            } else {
                    isLogin = true
                }
            }
        )
    }

    return isLogin
}