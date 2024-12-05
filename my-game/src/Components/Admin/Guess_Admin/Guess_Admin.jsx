import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import './Guess_Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';


function Guess_Admin(){
    const [questions, setQuestions] = useState([]);
    const add_questions = useRef();
    const [answer, setAnswer] = useState("");
    const editQuestion = useRef();
    const [edit_answer, setEdit_Answer] = useState("");
    const deleteQuestion = useRef();
    const [question_ID, setQuestion_ID] = useState("");
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const [currentEditImage, setcurrentEditImage] = useState("")
    const [newEditImage, setnewEditImage] = useState(null)
    const [newEditImageName, setnewEditImageName] = useState("");

    //FETCH DATA
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/fetch_guessLogo').then(response => {
            setQuestions(response.data.result);
        });
    
    }, [])
    
    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);

    }

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
        const formData = new FormData();
        formData.append('image', image);
        formData.append('answer', answer);
        axios.post('http://127.0.0.1:8000/api/addGuessQuestion', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        }).then(response => {
            if(response.data.message === "insert success"){
                window.location.reload();
            }
        }).catch(error => {
            console.error('Error uploading image:', error);
        });
            
    }


    const handleEditImage = (e) => {
        setnewEditImage(e.target.files[0]);
        setnewEditImageName(e.target.files[0].name);
    }
    

    //EDIT QUESTION POPUP
    const openEditQuestion = (id, image) => {
        editQuestion.current.classList.toggle("edit-open");
        setQuestion_ID(id);
        setcurrentEditImage(image);
        add_questions.current.classList.remove('add_questions-open');
    }
    //CLOSE EDIT POPUP
    function cancel_EditQuestion(){
        editQuestion.current.classList.remove("edit-open");
        setEdit_Answer("");
        setEdit_Difficulty("");

    }

    //EDIT FUNCTION
    function update_question(e){
        e.preventDefault();
        const EditForm = new FormData;
        EditForm.append('image', newEditImage);
        EditForm.append('answer', edit_answer);
        axios.post(`http://127.0.0.1:8000/api/editGuessQuestion/${question_ID}`, EditForm,{
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        }).then(response => {
            if(response.data.message === "edit success"){
                window.location.reload();
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
        axios.delete(`http://127.0.0.1:8000/api/deleteGuessQuestion/${question_ID}`).then(response => {
            if(response.data.message === "delete success"){
                window.location.reload();
            }
        })
    }
    return(
        <>
            <div className="container fixed left-44 lg:left-60  w-screen h-screen ">
            <h1 className='fixed font-bold text-2xl left-[55%] translate-x-[-55%] mt-3'>Guess the logo Questions and Answer</h1>
                <div>
                    <button className="fixed right-3 lg:right-16 top-12 lg:top-8 bg-[#A52A2A] w-36 h-7 lg:h-8  text-sm  rounded-[10px] text-white hover:bg-[#351010] transition duration-500" onClick={addQuestions}>Add Guess Questions</button>
                </div>
                <div className="table top-20 fixed ml-2 left-0 lg:left-[232px] border-2 border-black w-[97%] lg:w-[77%] lg:ml-10">
                    <table className="w-full">
                        <th className=''>
                            <div className="head flex justify-evenly border-b-[1px] border-black h-10 items-center bg-gray-400">
                                <td className="w-[50px] lg:w-[50px] font-bold ">#</td>
                                <td className="w-[200px] lg:w-[200px] font-bold">Image</td>
                                <td className="w-[100px] lg:w-[300px] font-bold">Answer</td>
                                <td className="w-[150px] lg:w-[200px] font-bold">Question_ID</td>
                                <td className="w-[150px] lg:w-[200px] font-bold">Action</td>
                            </div>
                        </th>
                        <tr className=' overflow-scroll'>
                            <div className="row h-[500px] overflow-y-scroll">
                                {questions.map((question, index) => (
                                    <div className="row flex justify-evenly  text-center h-40 items-center border-b-[1px]  border-black">
                                        <td className="w-[50px] lg:w-[50px]">{index + 1}</td>
                                        <td className="w-[200px] lg:w-[200px] flex justify-center h-[160px] "><img src={question.image} alt="" className="object-fill border-black border-[1px] w-[200px]"/></td>
                                        <td className="w-[100px] lg:w-[300px]">{question.answer}</td>
                                        <td className="w-[150px] lg:w-[200px]">{question.question_id}</td>
                                        <td className="w-[150px] lg:w-[190px]">
                                            <button className="bg-[#2319E1] text-white w-[60px] lg:w-[90px] mr-1 rounded-[5px] hover:bg-[#221f61] transition duration-500" onClick={() => openEditQuestion(question.question_id, question.image)}>Edit</button>
                                            <button className="bg-[#FF0000] text-white w-[60px] lg:w-[90px] rounded-[5px] hover:bg-[#792424] transition duration-500" onClick={() => openDeleteQuestion(question.question_id)}>Delete</button>
                                        </td>
                                    </div>
                                ))}
                            </div>
                        </tr>
                    </table>
                </div>
            </div>
            {/* ADD QUESTIONS */}
            
            <div className="guess_question" ref={add_questions}>
                <h1 className='font-bold text-xl text-center mt-2'>Add Questions</h1>
                <form className='flex flex-col items-center' onSubmit={createQuestions}>
                    <div className="email flex flex-col mt-5">
                        <label htmlFor="image" className='uploadBtn'>Upload Image <FontAwesomeIcon icon={faCloudArrowUp} /></label>
                        <input id='image' type="file" accept="image/jpeg, image/jpg, image/png, image/gif" className='hidden'  onChange={handleImage} />
                        <p className='overflow-hidden w-[180px] mt-2 text-center'>{imageName}</p>
                    </div>
                    <div className="username flex flex-col mt-3">
                        <label htmlFor="">Answer:</label>
                        <textarea className='border-black border-[1px] w-56 rounded-[5px]' value={answer} onChange={(e) => setAnswer(e.target.value)}  required/>
                    </div>
                    <div className="btn flex mt-5 w-52 justify-between">
                        <button className='bg-blue-600 text-white w-24 rounded-[5px] hover:bg-blue-900 transition duration-500'>Add</button>
                        <button type="button" className='bg-red-600 text-white w-24 rounded-[5px] hover:bg-red-900 transition duration-500' onClick={cancel_addQuestions}>Cancel</button>
                    </div>
                </form>
            </div>   
            
            {/* EDIT QUESTION  */}
            <div className="editGuess" ref={editQuestion}>
                <h1 className='font-bold text-xl text-center mt-2'>Edit Account</h1>
                <form className='flex flex-col items-center' onSubmit={update_question}>
                    <div className="id flex justify-center items-center flex-col mt-5">
                        <label htmlFor="">Current Image:</label>
                        <img src={currentEditImage} width={100} alt="asd" title='image' />
                        <input type="file" id='edit_image' accept="image/jpeg, image/jpg, image/png, image/gif" onChange={handleEditImage} className='hidden' />
                        <label htmlFor="edit_image" className='uploadBtn mt-2'>Change Image <FontAwesomeIcon icon={faCloudArrowUp} /></label>
                        <p className='overflow-hidden w-[180px] mt-2 text-center'>{newEditImageName}</p>
                    </div>
                    
                    <div className="username flex flex-col mt-1">
                        <label htmlFor="">Answer:</label>
                        <input type="text" className='border-black border-[1px]  w-56 rounded-[5px]' value={edit_answer} onChange={(e) => setEdit_Answer(e.target.value)} required/>
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

export default Guess_Admin