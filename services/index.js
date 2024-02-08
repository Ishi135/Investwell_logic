const { loginUser, checkForExistingUser, signupUser }  = require("../repositories")
const crypto = require("crypto")


const loginService = async (loginData) => {
    const {email, password} = loginData
    // For login
    const result = await loginUser(loginData);
    if(result.length > 0)
    {
        const salt = result[0].salt;
        const databasePass = result[0].password;

        const hash = crypto.createHash('sha256');
        hash.update(salt + password)
        const hashPassword = hash.digest('hex')

        if(databasePass != hashPassword)
        {
            throw new Error("Wrong Password");
        }
        else return result;
    }
    else return result;
};

const signupService = async(signupData) => {
    // Check if a user exits
    const result = await checkForExistingUser ( signupData );

    if(result.length > 0)
    {
        return result;
    } else {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.createHash('sha256');
        hash.update(salt + signupData.password)

        const hashPassword = hash.digest('hex')

        signupData.password = hashPassword;
        signupData.salt = salt;

        // Inserts a new user
        const insert = await signupUser( signupData );
        return insert;
    }
}

module.exports = { loginService, signupService };