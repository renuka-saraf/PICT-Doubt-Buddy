const mongo = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const db_link = process.env.DATABASE;

mongoose.connect(db_link).then(() => {
    console.log('Database connection successful...');
}).catch((error) => {
    console.log(error);
})

const UserScehma = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

UserScehma.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
});

module.exports = mongoose.model('User',UserScehma);