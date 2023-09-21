const mongoose = require('mongoose');
const env = require('dotenv');

const db_link = process.env.DB;
mongoose.connect(db_link).then(()=>{
    console.log("Connected to the questions database...");
}).catch((error) => {
    console.log(error)
});


const QuestionSchema = new mongoose.Schema({
    email: String,
    question: String,
    category: String,
    status: String,
    answers: [{
        type: String
    }]
});

module.exports = mongoose.model('Questions', QuestionSchema); 