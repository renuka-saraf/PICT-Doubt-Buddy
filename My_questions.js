import React, { useState, useContext } from 'react';
import Navbar from './Navbar';
import { Usercontext } from '../Context/Usercontext';
import { useHistory } from 'react-router-dom';


const My_questions = () => {
    const [questions, setquestions] = useState();
    const [clicked, setclicked] = useState(false);
    const [array,setarray] = useState();
    const [r,setr] = useState();
    const { v1, v2 } = useContext(Usercontext);
    const [v1value, setV1value] = v1;
    const [v2value, setV2value] = v2;
    const history = useHistory();
    const url = 'http://localhost:5000/myquestions';
    var q = [];
    var a = [];
    const quefunc = (e) => {
        e.preventDefault();
        if (v1value) {
            setclicked(true)
            console.log(v2value);
            const credential = { v2value };
            // console.log(credential);
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credential)
            }).then((res) => {
                return res.json()
            }).then((data => {
                // console.log(data.req_questions)

                if(data){
                    console.log("data found")
                    setquestions(data)
                    if(questions){
                        console.log(questions.response[0].answers)
                        for(var i=0; i< Object.keys(questions.response).length;i++){
                            q.push(questions.response[i].question)
                            for(var j=0; j<Object.keys(questions.response[i].answers).length;j++){
                                q.push(questions.response[i].answers[j])
                            }   
                        }

                        if(q){
                            setarray(q)
                            console.log(array)
                        }
                    }
                }

            })).catch((err) => {
                console.log(err)
            })
        } else {
            alert(`Login is required...`)
            history.push("/login")
        }
    }

    return (
        <div>
            <Navbar loginstate={v1value} email={v2value} /> <br></br><br></br><br></br>
            <div className='myquestion-background'>
                <button className='questionview' onClick={quefunc}>See your questions</button><br></br><br></br>
                <div className='question-container'>
                    {/* {array && array.map((ques) => <div className='q'>{ques}</div>)} */}
                    {array && array.map((ques) => <div className='q'>{ques}
                    </div>)}
                </div>
            </div>

        </div>
    );
}

export default My_questions;