const connectDb = require("./connectDb");
const util = require("util");

connectDb.connect();

const query = util.promisify(connectDb.query).bind(connectDb);

// For login
const loginUser = async(loginData) => {
    const {email, password} = loginData;
    const result = await query(`SELECT * FROM userdata WHERE email = ?`, [email]);
    console.log(result);

    return result;
}

// Checks if user already exits
const checkForExistingUser = async (signupData) => {
    const { email,password } = signupData;
    const result = await query(`SELECT * FROM userdata WHERE email = ?`, [email]);

    console.log(result);
    return result;
}

const signupUser = async (signupData) => {
    const { name, email, password ,salt} = signupData;
    const result = await query(`INSERT INTO userdata ( name, email, password ,salt) VALUES ( ?, ?, ?,? )`, [name, email, password,salt]);

    console.log(result);
    return result;

}

module.exports = { loginUser, checkForExistingUser, signupUser };