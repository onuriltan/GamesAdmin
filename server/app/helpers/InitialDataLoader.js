const User = require('../models/User');

const loadData = async () => {
    let AdminUser = new User({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
    });
    const existingUser = await User.findOne({ "email":AdminUser.email});
    if(!existingUser) {
        AdminUser.save()
        console.log("Admin saved to repositories")
    }
};


module.exports.loadData = loadData;
