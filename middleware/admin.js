import jwt from "jsonwebtoken";

export function admin(token) {
    let isAdmin = false;
    if (token) {
        jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY, (err, decode) => {
            if (err) {
                    isAdmin = false
            } else {
                if (!decode.userAdmin) {
                    isAdmin = false
                } else {
                    isAdmin = true
                }
            }
        }
        )
    }

    return isAdmin
}
