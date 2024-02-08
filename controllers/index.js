const { loginService, signupService } = require("../services");

// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailRegex = /^[^\d][a-zA-Z\d._-]*[a-zA-Z][a-zA-Z\d._-]*@([a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/;

        // Check email or password 
        if (!email || !password) {
            return res.send({
                status: 0,
                success: false,
                message: "Please enter email or password",
                result: {},
            });
        }

        else if (!emailRegex.test(email)) {
            return res.send({
                status: 0,
                sucess: false,
                message: "Email must contain atleast one letter, @ special character and it doesn't start with number.",
                result: {}
            })
        }

        else {
            const loginData = {email, password};
            const result = await loginService(loginData); 
            if (result && result.length == 0) {
                throw new Error("Wrong Email")
            }

            // for login
            else {
                res.send({
                    status: 1,
                    success: true,
                    message: "Successfully Login",
                    result,
                }); 
            }
        }
    } catch (error) {
        console.log(error);
        if (error.message == "Wrong Email")
        {
            return res.send({
                status: 0,
                success: false,
                message: "User doesn't exist!! Please Register",
                result: {},
            });
        }
        else if(error.message == "Wrong Password")
        {
            return res.send({
                status: 0,
                success: false,
                message: "Wrong Password",
                result: {},
            });
        }
        else{
        return res.send({
            status: 0,
            success: false,
            message: "Error in Login controller",
            result: {},
        });
    }
}
};

// Singup Controller
const signUpController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const emailRegex = /^[^\d][a-zA-Z\d._-]*[a-zA-Z][a-zA-Z\d._-]*@([a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]+$/;

        if (!name || !email || !password) {
            return res.send({
                status: 0,
                sucess: false,
                message: "Please enter name, email or password",
                result: {}
            })
        }

        else if (!emailRegex.test(email)) {
            return res.send({
                status: 0,
                sucess: false,
                message: "Email must contain atleast one letter, @ special character and it doesn't start with number.",
                result: {}
            })
        }

        else if (password.length < 6) {
            return res.send({
                status: 0,
                sucess: false,
                message: "Password length should be greater than 6.",
                result: {}
            })
        }

        else if (!passwordRegex.test(password)) {
            return res.send({
                status: 0,
                sucess: false,
                message: "Password must contain atleast one lowercase, one uppercase, one number and only @ special character is allowed",
                result: {}
            })
        }

        else {
            const signupData = { name, email, password };
            const result = await signupService(signupData); 
            if (result && result.length > 0) {
                return res.send({
                    status: 0,
                    success: false,
                    message: "User already exists! Please Login",
                    result: {},
                });
            }

            else {
                return res.send({
                    status: 1,
                    sucess: true,
                    message: "Successfully registered",
                    result
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.send({
            status: 0,
            success: false,
            message: "Error in Signup controller",
            result: {}
        })
    }
}

module.exports = { loginController, signUpController };