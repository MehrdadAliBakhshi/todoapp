import { compare, hash } from "bcrypt"
import { sign, verify } from "jsonwebtoken"

const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword;
}
const verifyPassword = async (password, hashedPassword) => {
    const isValid = await compare(password, hashedPassword)
    return isValid;
}
const generateAccessToken = (data) => {
    const token = sign({ ...data }, process.env.AccessTokenSecretKey, {
        expiresIn: "1d",
    })
    return token;

}
const verifyToken = (token) => {
    try {
        const tokenPayload = verify(token, process.env.AccessTokenSecretKey)
        return tokenPayload;
    } catch (error) {
        console.log('verify token fun =>', error);
    }
}
const validateEmail = (email) => {
    const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
    return pattern.test(email)
}
const validatePassword = (password) => {
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
    return pattern.test(password)
}
const validateUsername = (username) => {
    const pattern = /^[a-z0-9_-]{3,15}$/g;
    return pattern.test(username)
}
const removeTags = (input) => {
    if ((input === null) || (str === ''))
        return false;
    else {
        input = input.toString();
    }
    return input.replace(/(<([^>]+)>)/ig, '');
}
export {
    hashPassword,
    verifyPassword,
    generateAccessToken,
    verifyToken,
    validateEmail,
    validatePassword,
    validateUsername,
    removeTags
}
