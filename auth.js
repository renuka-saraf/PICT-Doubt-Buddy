const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../Database/db');
const Question = require('../Database/question_db');
router.get('/', function (req, res) {
    res.send('Router is working fine...');
});

const details = [];
var em = "";

var arr = [];

router.post('/signup', function (req, res) {

    const { email, password } = req.body;

    const cred = {
        email: email,
        password: password
    }
    details.push(cred);
    console.log(req.body);

    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "Email already exists..." });
            }

            const user = new User({ email, password });

            user.save().then(() => {
                res.status(201).json({ message: "User registered successfully..." });
            })
        }).catch(err => { console.log(err) })
});

router.get('/signup', function (req, res) {
    res.send(details);
});

router.post('/signin',function (req, res) {
    const { email, password } = req.body;
    User.findOne({ email: email, password: password })
        .then((data) => {
            if (data) {
                em = email;
                // console.log(data.password);
                return res.status(200).json({ message: "Login Succesful..." });
            }

            else {
                return res.status(404).json({ error: "Incorrect Credentials..." });
            }
        }).catch((err) => { console.log(err) })
});

router.get('/signin', function (req, res) {
    var e = { em };
    res.send(e);
    console.log(e);
})

router.post('/questions', function (req, res) {
    const { question, category, status, answer, v2value } = req.body;

    arr.push(answer);
    const ques = new Question({
        email: v2value,
        question: question,
        category: category,
        status: status,
        answer: arr
    })

    ques.save().then(() => {
        console.log("Question Posted successfully...");
        res.json({ posted: "Question Posted successfully..." });
    })
});

router.post("/qna", function (req, res) {
    const { category } = req.body;
    Question.find({ category: category }).then((data) => {
        if (data) {
            console.log(data);
            return res.json({ questiondata: data })
        }
        else {
            return res.json({ error: "There are currently no questions in this category..." })
        }
    }).catch((err) => console.log(err))
});

router.post("/answers", function (req, res) {
    const q = req.body.currentvalue;
    const ans = req.body.answer;
    console.log(q + "\n" + ans);
    // Question.findOne({question: q})
    // .then((data) => {
    //     if(data){
    //         data.answer.push(ans)
    //         Question.updateOne({$push: {answer: [ans]}})
    //         return res.json({msg: "Answer added into the database..."})
    //     }   
    // }).catch((err) => {
    //     console.log(err)
    // })

    // Question.findOne({question: q}).updateOne({$push: {answer: [ans]}})

    // Question.findOneAndUpdate({question: q}, {status:"Answered", {$push:{answer: [ans]}}).then((data) => {
    //     console.log(data)
    // }).catch((err) => {
    //     console.log(err)
    // })

    Question.findOneAndUpdate({ question: q }, { $push: { answers: ans } }).then((data) => {
        if (data) {
            console.log(data)
            return res.json({ msg: "Answer succesfully saved..." })
        }
    }).catch((err) => {
        console.log(err)
    })


});

router.post("/myquestions", function (req, res) {
    const email = req.body.v2value;
    Question.find({ email }).then((data) => {
        if (data) {
            console.log(data)
            return res.json({ response: data })
        }
    }).catch((err) => {
        console.log(err)
    })
});

router.post("/recentquestions", function (req, res) {
    const category = req.body.category;
    Question.find({ category }).then((data) => {
        if (data) {
            return res.json({ list: data })
        }
        else {
            return res.json({ message: "There are currently no questions in this category..." })
        }
    }).catch((err) => {
        console.log(err)
    })
});



module.exports = router;