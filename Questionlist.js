import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Usercontext } from "../Context/Usercontext";
import { Link } from "react-router-dom";
import { Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AnswerBox from "./AnswerBox";

const Questionslist = (props) => {
    var cl = false;
    const [answer, setAnswer] = useState();
    const [question, setquestion] = useState();
    // props.context = useContext(Usercontext);
    const [currentvalue, setcurrentvalue] = props.context;
    const [v1value, setV1value] = props.lg;
    const history = useHistory();
    var flag = false;
    const q = props.data;
    const array = q.questiondata;
    const url = "http://localhost:5000/answers";
    console.log(array);
    var questions = [];
    var entry = [];
    if (array) {
        flag = true;
        for (var i = 0; i < Object.keys(array).length; i++) {
            entry.push(array[i].status);
            questions.push(array[i].question);
        }
        // console.log(questions);
    }

    const handleanswersubmit = (e) => {
        e.preventDefault();
        const query = { currentvalue, answer };
        if (v1value) {
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(query)
            }).then((res) => {
                return res.json()
            }).then((message) => {
                console.log(message)
                alert(message)
            }).catch((err) => {
                console.log(err)
            })
        }
        else{
            alert(`Login is required...`)
            history.push("/login")
        }

    }


    return (
        <div>
            <select className="questionselectbox" onChange={(e) => setcurrentvalue(e.target.value)}>
                {/* {questions.map((que, st) => <option className="question" value={que} key={st}>{que}</option>)} */}
                {questions.map((que, st) => <option className="question" value={que} key={st}>{que}</option>)}
            </select>

            <br></br><br></br>
            {currentvalue && <div>
                <div className="ques">{currentvalue}</div><br></br>
                <textarea placeholder="Write your answer here" className="textarea"
                    value={answer} onChange={(e) => setAnswer(e.target.value)}></textarea><br></br>
                <button className='answerbutton' onClick={handleanswersubmit}>Post</button>
            </div>



            }


            {/* {currentvalue && <div>
                {currentvalue} :
                <textarea className='text_area' placeholder="Write your answer here">
                    value={answer} onChange={(e) => setAnswer(e.target.value)}
                </textarea>
                <button className='post_button'>Post</button>
            </div>} */}
            {/* <div>{currentvalue}</div> */}
        </div>
    )

}

export default Questionslist;