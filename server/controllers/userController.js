const user = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {

    try {

        const { password, username, email } = req.body;

        const usernameCheck = await user.findOne({ username });
        const emailCheck = await user.findOne({ email });

        if (usernameCheck) {
            return res.json({ message: "Username already taken.", status: false });
        };

        if (emailCheck) {
            return res.json({ message: "Email already taken. Please Login", status: false });
        };



        const hashedPassword = await bcrypt.hash(password, 5);
        const userDbResponse = await user.create({
            email, username, password: hashedPassword
        });



        delete userDbResponse.password;
        return res.json({ status: true, userDbResponse });

    } catch (error) {
        res.json({ error })
    }

};


module.exports.login = async (req, res, next) => {

    try {

        const { password, username } = req.body;

        const usernameCheck = await user.findOne({ username });

        if (!usernameCheck) {
            return res.json({ message: "Incorrect Username", status: false });
        };

        const isPasswordValid = await bcrypt.compare(password, usernameCheck.password);


        if (!isPasswordValid) {
            return res.json({ message: "Wrong Password", status: false });
        }


        delete usernameCheck.password;
        return res.json({ status: true, usernameCheck });

    } catch (error) {
        res.json({ error })
    }

};