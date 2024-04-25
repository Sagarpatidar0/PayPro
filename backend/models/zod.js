const z = require('zod');

const zodFn = z.string();
const zodLn = z.string();
const zodEmail = z.string().email();
const zodPass = z.string().min(6);

const zodSignup = z.object({
    firstName: zodFn,
    lastName: zodLn,
    email: zodEmail,
    password: zodPass
})
const zodLogin = z.object({
    email: zodEmail,
    password: zodPass
})
const zodUpdate = z.object({
    password: zodPass.optional(),
    firstName: zodFn.optional(),
    lastName: zodLn.optional()
})
module.exports = {
    zodSignup,
    zodLogin,
    zodUpdate
}