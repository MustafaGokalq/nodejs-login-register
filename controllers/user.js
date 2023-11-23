const { sign } = require("jsonwebtoken");
const {User, validateRegister, validateLogin} = require("../models/user");
const bcrypt = require("bcrypt")

module.exports.get_Register = async (req, res) => {
    try {
        const user = await User.find();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({hata: error});
    }
}

module.exports.get_id_Register = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({hata: error});
    }
}

module.exports.post_Register = async (req, res) => {
    const { error } = validateRegister(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });

    if(user) {
        return res.status(400).send("bu mail adresiyle zaten bir kullanıcı mevcut.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    await user.save();

    const token = user.createAuthToken();

    res.header("x-auth-token",token).send(user);
};

module.exports.put_Register = async (req, res) => {
    const id = req.params.id;

    const {error} = validateRegister(req.body);

    if(error) {
        return res.status(400).json(error.details[0].message);
    }
    try {
        const user = await User.findByIdAndUpdate(id, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }, {new: true});

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({hata: error});
    }
}

module.exports.delete_Register = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({hata: error});
    }
}

module.exports.post_login = async (req,res)=>{
    const { error } = validateLogin(req.body);

    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if(!user) {
        return res.status(400).send("hatalı email ya da parola");
    }

    const isSuccess = await bcrypt.compare(req.body.password, user.password);
    if(!isSuccess) {
        return res.status(400).send("hatalı email ya da parola");
    }
    const token = user.createAuthToken();
    res.send(token);

}