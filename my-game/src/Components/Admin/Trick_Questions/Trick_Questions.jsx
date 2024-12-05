import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import './Trick_Questions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


function Trick_Questions(){
    const [questions, setQuestions] = useState([]);
    const add_questions = useRef();
    const [answer, setAnswer] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [errorQuestion, setErrorQuestion] = useState("");
    const [question_value, setQuestionValue] = useState("");
    const [questionTaken, setQuestionTaken] = useState("");
    const editQuestion = useRef();
    const [edit_question, setEdit_Question] = useState("");
    const [edit_answer, setEdit_Answer] = useState("");
    const [edit_difficulty, setEdit_Difficulty] = useState("");
    const [id, setId] = useState("");
    const deleteQuestion = useRef();
    const [question_ID, setQuestion_ID] = useState("");
    const [language, setLanguage] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState(""); 
    const [languageFilter, setLanguageFilter] = useState("");

    //FETCH DATA
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/fetch_question').then(response => {
            setQuestions(response.data.result);
        });
    
    }, [])
    
    //ADD QUESTION POPUP
    function addQuestions(){
        add_questions.current.classList.toggle('add_questions-open');
        editQuestion.current.classList.remove("edit-open");
    }
    //CLOSE ADD QUESTION POPUP
    function cancel_addQuestions(){
        add_questions.current.classList.remove('add_questions-open');
    }
    
    //CREATE QUESTIONS
    function createQuestions(e){
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/add_questions', {
            'questions': question_value,
            'answer': answer,
            'difficulty': difficulty,
            'language': language
        }).then(response => {
            if(response.data.message === "Question Added Successfully"){
                window.location.reload();
            }
            else if(response.data.message === "Question is already inserted"){
                setErrorQuestion("Question is already inserted");
            }
        })
            
    }
  
      
      

    //EDIT QUESTION POPUP
    const openEditQuestion = (id) => {
        editQuestion.current.classList.toggle("edit-open");
        setId(id);
        add_questions.current.classList.remove('add_questions-open');
    }
    //CLOSE EDIT POPUP
    function cancel_EditQuestion(){
        editQuestion.current.classList.remove("edit-open");
        setEdit_Question("");
        setEdit_Answer("");
        setEdit_Difficulty("");
        setQuestionTaken("");
    }

    //EDIT FUNCTION
    function update_question(e){
        e.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/updateQuestion/${id}`,{
            "questions":edit_question,
            "answer":edit_answer,
            "difficulty":edit_difficulty
        }).then(response => {
            if(response.data.message === "edit success"){
                window.location.reload();
            }
            else if(response.data.message === "This question is already exist"){
                setQuestionTaken("This question is already exist");
            }
           
            
        })
    }


    //OPEN DELETE QUESTION POP UP
    const openDeleteQuestion = (question_id) =>{
        deleteQuestion.current.classList.toggle("delete-open");
        setQuestion_ID(question_id);
    }
    //CLOSE DELETE QUESTION POPUP
    function no(){
        deleteQuestion.current.classList.remove("delete-open");
    }
    //DELETE QUESTION FUNCTION
    function yes(){
        axios.delete(`http://127.0.0.1:8000/api/deleteQuestion/${question_ID}`).then(response => {
            if(response.data.message === "delete success"){
                window.location.reload();
            }
        })
    }

    //FILTER ROW
    function handleDifficultyDropdownChange(e) {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        if (selectedOptions.includes("")) {
          setDifficultyFilter([]);
        } else {
          setDifficultyFilter(selectedOptions);
        }
    }

    function handleLanguageDropDown(e){
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        if (selectedOptions.includes("")) {
            setLanguageFilter([]);
          } else {
            setLanguageFilter(selectedOptions);
          }
    }
        
    let filteredQuestions;
    if(difficultyFilter.length > 0 && languageFilter.length > 0){
        filteredQuestions = questions.filter((question) => difficultyFilter.includes(question.difficulty) && languageFilter.includes(question.language));
    }
    else if(difficultyFilter.length > 0) {
        filteredQuestions = questions.filter((question) => difficultyFilter.includes(question.difficulty));
    } 
    else if(languageFilter.length > 0){
        filteredQuestions = questions.filter((question) => languageFilter.includes(question.language));
    }
    else {
        filteredQuestions = questions;
    }


    
      

    return(
        <>
            <div className="container fixed left-44 lg:left-60  w-screen h-screen ">
            <h1 className='fixed font-bold text-2xl left-[55%] translate-x-[-55%] mt-3'>Trick Questions and Answer</h1>
                <div>
                    <button className="fixed right-3 lg:right-16 top-12 lg:top-8 bg-[#A52A2A] w-36 h-7 lg:h-8  text-sm  rounded-[10px] text-white hover:bg-[#351010] transition duration-500" onClick={addQuestions}>Add Trick Questions</button>
                </div>
                <div className="table top-20 fixed ml-2 left-0 lg:left-[232px] border-2 border-black w-[97%] lg:w-[77%] lg:ml-10">
                    <table className="w-full">
                        <th className=''>
                            <div className="head flex justify-evenly border-b-[1px] border-black h-10 items-center bg-gray-400">
                                <td className="w-[50px] lg:w-[50px] font-bold ">#</td>
                                <td className="w-[200px] lg:w-[300px] font-bold">Questions</td>
                                <td className="w-[100px] lg:w-[300px] font-bold">Answer</td>
                                <td className="w-[100px] lg:w-[100px] font-bold">Diffuclty</td>
                                <td className="w-[100px] lg:w-[100px] font-bold">Language</td>
                                <td className="w-[150px] lg:w-[200px] font-bold">Question_ID</td>
                                <td className="w-[150px] lg:w-[200px] font-bold">Action</td>
                            </div>
                        </th>
                        <tr className=' overflow-scroll'>
                            <div className="row h-[500px] overflow-y-scroll">
                                {filteredQuestions.map((question, index) => (
                                    <div className="row flex justify-evenly  text-center h-20 items-center border-b-[1px]  border-black">
                                        <td className="w-[50px] lg:w-[50px]">{index + 1}</td>
                                        <td className="w-[200px] lg:w-[300px]">{question.questions}</td>
                                        <td className="w-[100px] lg:w-[300px]">{question.answer}</td>
                                        <td className="w-[100px] lg:w-[100px]">{question.difficulty}</td>
                                        <td className="w-[100px] lg:w-[100px]">{question.language}</td>
                                        <td className="w-[150px] lg:w-[200px]">{question.question_id}</td>
                                        <td className="w-[150px] lg:w-[190px]">
                                            <button className="bg-[#2319E1] text-white w-[60px] lg:w-[90px] mr-1 rounded-[5px] hover:bg-[#221f61] transition duration-500" onClick={() => openEditQuestion(question.id)}>Edit</button>
                                            <button className="bg-[#FF0000] text-white w-[60px] lg:w-[90px] rounded-[5px] hover:bg-[#792424] transition duration-500" onClick={() => openDeleteQuestion(question.question_id)}>Delete</button>
                                        </td>
                                    </div>
                                ))}
                            </div>
                        </tr>
                    </table>
                </div>

                <div className="filter fixed top-[90%]">
                    <div className="content flex">
                    <h1 className='ml-5'>Filter<FontAwesomeIcon icon={faFilter} />:</h1>

                        <label htmlFor="" className='ml-3'>
                            Difficulty: 
                            <select name="" id="" className='border-[1px] border-black cursor-pointer w-40 rounded-[5px] ml-1' value={difficultyFilter} onChange={(e) => handleDifficultyDropdownChange(e)}>
                                <option value=""></option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                                <option value="Extreme">Extreme</option>
                            </select>
                        </label>
                        <label htmlFor="" className='ml-3'>
                            Language:
                            <select name="" id="" className='border-[1px] border-black cursor-pointer w-40 rounded-[5px] ml-1' value={languageFilter} onChange={(e) => handleLanguageDropDown(e)}>
                                <option value=""></option>
                                <option value="English">English</option>
                                <option value="Tagalog">Tagalog</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>
            {/* ADD QUESTIONS */}
            
            <div className="add_questions" ref={add_questions}>
                <h1 className='font-bold text-xl text-center mt-2'>Add Questions</h1>
                <form className='flex flex-col items-center' onSubmit={createQuestions}>
                    <div className="email flex flex-col mt-2">
                        <label htmlFor="">Question:</label>
                        <textarea className='border-black border-[1px] w-56 rounded-[5px]' value={question_value} onChange={(e) => setQuestionValue(e.target.value)} required/>
                    </div>
                    {errorQuestion && <p className="text-red-700 text-sm w-[250px] ml-7">This question is already inserted.</p>}
                    <div className="username flex flex-col mt-3">
                        <label htmlFor="">Answer:</label>
                        <textarea className='border-black border-[1px] w-56 rounded-[5px]' value={answer} onChange={(e) => setAnswer(e.target.value)}  required/>
                    </div>
                    <div className="diffuclty flex flex-col mt-3">
                        <label htmlFor="#">Difficulty:</label>
                        <select name="" id="" className='border-black border-[1px] w-56 rounded-[5px] cursor-pointer' value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required>
                            <option value=""></option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Extreme">Extreme</option>
                        </select>
                    </div>
                    <div className="diffuclty flex flex-col mt-3">
                        <label htmlFor="#">Language:</label>
                        <select name="" id="" className='border-black border-[1px] w-56 rounded-[5px] cursor-pointer' value={language} onChange={(e) => setLanguage(e.target.value)} required>
                            <option value=""></option>
                            <option value="English">English</option>
                            <option value="Tagalog">Tagalog</option>
                        </select>
                    </div>
                    <div className="btn flex mt-5 w-52 justify-between">
                        <button className='bg-blue-600 text-white w-24 rounded-[5px] hover:bg-blue-900 transition duration-500'>Add</button>
                        <button type="button" className='bg-red-600 text-white w-24 rounded-[5px] hover:bg-red-900 transition duration-500' onClick={cancel_addQuestions}>Cancel</button>
                    </div>
                </form>
            </div>   
            
            {/* EDIT QUESTION  */}
            <div className="edit" ref={editQuestion}>
                <h1 className='font-bold text-xl text-center mt-2'>Edit Account</h1>
                <form className='flex flex-col items-center' onSubmit={update_question}>
                    <div className="id flex flex-col mt-5">
                        <label htmlFor="">Question:</label>
                        <input type="text" className='border-black border-[1px]  w-56 rounded-[5px]' value={edit_question} onChange={(e) => setEdit_Question(e.target.value)} required/>
                    </div>
                    {questionTaken && <p className="text-red-700 text-sm w-[250px] ml-7">This question is already exist.</p>}
                    <div className="username flex flex-col mt-5">
                        <label htmlFor="">Answer:</label>
                        <input type="text" className='border-black border-[1px]  w-56 rounded-[5px]' value={edit_answer} onChange={(e) => setEdit_Answer(e.target.value)} required/>
                    </div>
                    <div className="account_type flex flex-col mt-5">
                        <label htmlFor="">DIfficulty:</label>
                        <select className='border-black border-[1px] cursor-pointer w-56 rounded-[5px]' value={edit_difficulty} onChange={(e) => setEdit_Difficulty(e.target.value)} required>
                            <option value=""></option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                            <option value="Extreme">Extreme</option>
                        </select>
                    </div>
                    <div className="btn flex mt-5 w-52 justify-between">
                        <button className='bg-blue-600 text-white w-24 rounded-[5px] hover:bg-blue-900 transition duration-500'>Edit</button>
                        <button type="button" className='bg-red-600 text-white w-24 rounded-[5px] hover:bg-red-900 transition duration-500' onClick={cancel_EditQuestion}>Cancel</button>
                    </div>
                </form>
            </div> 
            
            {/* DELETE QUESTION */}
            <div className="delete" ref={deleteQuestion}>
                <div className="content flex flex-col items-center h-56">
                    <h1 className='font-bold text-2xl mt-5'>Are you sure?</h1>
                    <p className='text-center w-[350px] mt-3'>Are you sure you want to delete this question? this question cannot be restored.</p>
                    <div className="btn flex justify-between w-[230px] mt-10">
                        <button className='bg-red-500 w-[100px] text-white rounded-[5px] hover:bg-red-900 transition duration-[0.5s]' onClick={yes}>Yes</button>
                        <button className='bg-blue-500 w-[100px] text-white rounded-[5px] hover:bg-blue-900 transition duration-[0.5s]' onClick={no}>No</button>
                    </div>
                </div>
            </div>     

        </>
    );
}

export default Trick_Questions