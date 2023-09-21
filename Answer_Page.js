
import React, { useState } from "react";
import Navbar from "./Navbar";
import Questionlist from "./Questionlist";
import { Usercontext } from "../Context/Usercontext";
import { useContext } from "react";

const Answer_Page = () => {
    const [category, setCategory] = useState();
    const [questionList, setquestionList] = useState({});
    const [answer, setAnswer] = useState();
    const [dropdownclick, setdropdownclick] = useState(false);
    const [click, setclick] = useState(false);

    const { v1, v2, v3 } = useContext(Usercontext);
    const [v1value, setV1value] = v1;
    const [v2value, setV2value] = v2;
    const url = 'http://localhost:5000/qna';

    const handleClick = (e) => {
        e.preventDefault();
        if (!click) {
            setclick(true);
        }
        else {
            setclick(false);
        }
        const data = { category };
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json()
        }).then((questions) => {
            console.log(typeof (questions))
            setquestionList(questions)
        }).catch((err) => {
            console.log(err)
        });

    }

    function handledropdownclick() {
        if (!dropdownclick) {
            setdropdownclick(true);
        }
        else {
            setdropdownclick(false);
        }
    }

    return (
        <div>
            <Navbar loginstate={v1value} email={v2value} /><br></br><br></br><br></br>
            <div className="answer-background">
                <div className="selection-box">
                    <br></br><div style={{ marginLeft: "30px", fontWeight: "600", fontSize: "20px"}}>Select the category of questions that you want to answer:</div>
                    <button className="dropdown-button" onClick={handledropdownclick}>Categories&ensp;<span className="fas fa-angle-down"></span></button>
                    {dropdownclick &&
                        <div className="link-container">
                            <a className="dropdown-link" onClick={(e) => setCategory("technical")}>Technical</a>
                            <a className="dropdown-link" onClick={(e) => setCategory("non-technical")}>Non-Technical</a>
                            <a className="dropdown-link" onClick={(e) => setCategory("events")}>Event</a>
                        </div>
                    }

                    <br></br>

                    {/* {category && <button className="showquestions" onClick={handleClick}>View Questions</button>} */}

                    {(category === "events" || category === "technical" || category === "non-technical") && dropdownclick &&
                        <button className="showquestions" onClick={handleClick}>View <span>{category}</span> Questions</button>}


                    {click && questionList &&

                        <div>
                            {<Questionlist category={category} lg={v1} data={questionList} context={v3} />}
                        </div>


                    }





                    {/* {eventsClick && questionList.map(question => <div className="question" key={question} onClick={answerbox}>
                        {question}
                    </div>)}

                    {technicalClick && questionList.map(question => <div key={question}>
                        {question}
                    </div>)}

                    {nontechnicalClick && questionList.map(question => <div key={question}>
                        {question}
                    </div>)} */}
                </div>
            </div>
        </div>
    );
}

export default Answer_Page;