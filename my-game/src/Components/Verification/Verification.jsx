import video from './../../assets/Loop Background .mp4';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Verification.css';
import success_cat from './../../assets/success_create.gif';

function Verification(){
    const numberOnly = new RegExp(/^\d*$/);;
    const [input, setInput] = useState("");
    const [timer, setTimer] = useState("20");
    const [hidden, setHidden] = useState("hidden");
    const [block, setBlock] = useState("block");
    const [send, setSend] = useState("hidden");
    const [error, setError] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const [progress, setProgress] = useState(0);
    const popUp = useRef();
    const content = useRef();
    const blurbg = useRef();
    const navigate = useNavigate();

    function handleNumber(e){
        const value = e.target.value;
        if(numberOnly.test(value)){
            setInput(value);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(interval);
                    setBlock("hidden");
                    setHidden("block mt-2 hover:text-blue-600 transition duration-[0.5s]")
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [])
    
    function updateVerification(e){
        e.preventDefault();
        
        const url = `http://127.0.0.1:8000/api/updateVerification/${email}`;
        const formData = new FormData();
        formData.append('verification_complete', input)
        axios.post(url, formData).then(response =>{
            if(response.data.message === "insert success"){
                account_successBtn();
            }
            else if(response.data.message === "Wrong verification code"){
                setError("Wrong verification code");
            }
            else{
                console.log("connection lost");
            }
        }).catch(error => alert(error));

    }

    function account_successBtn(){
        blurbg.current.classList.add("video_background-open");
        content.current.classList.add("content-open");
        popUp.current.classList.add("loading-open");
        let currentProgress = progress;
        const interval = setInterval(() => {
            if(currentProgress < 100){
                currentProgress +=1;
                setProgress(currentProgress);
            }
            else{
                clearInterval(interval);
                navigate(`/`)
               
            }
            
        }, 30);
    }

    function resend(){
        setSend("block");
        setHidden("hidden");
        axios.put(`http://127.0.0.1:8000/api/resendCode/${email}`).then(response => {
            if(response.data.message === "resend code success"){
                window.location.reload();
            }
        })
    }
    return(
        <>
            <video src={video} loop autoPlay muted className='fixed bottom-0 top-0 min-h-[100%] min-w-[100%] object-cover' ref={blurbg}></video>

            <div className="content fixed bg-[#00FFB2] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[300px] w-[300px] md:w-[400px] lg:h-[250px] lg:w-[500px] flex flex-col justify-center items-center rounded-[10px]" ref={content}>
                <h1 className='font-bold text-xl'>Verification code sent!</h1>
                <p className='text-center'>Please enter the verification code that we sent to your email: {email}.</p>
                <form className='flex flex-col justify-center items-center mt-5' onSubmit={updateVerification}>
                    <input type="text" className='border-black outline-none border-[1px] w-[250px] text-center rounded-[5px] h-8'  maxLength="6" value={input} onChange={handleNumber} required/>
                    {error && <p className="text-red-700 text-sm text-center mt-3 w-[250px]">Wrong verification code.</p>}
                    <button className='text-white bg-[#EE5454] hover:bg-[#a23a3a] transition duration-[0.5s] w-28 rounded-[10px] mt-5'>Submit</button>
                    <p className={block}>{timer}s</p>
                </form>
                <button className={hidden} onClick={resend}>Resend code?</button>
                <p className={send}>Sending...</p>
            </div>

            <div className="loading w-[300px] md:w-[400px] lg:w-[400px]" ref={popUp}>
                <h1 className='text-xl font-bold'>Account Successfully Created!</h1>
                <img src={success_cat} width={180} alt="Loading cat" className="video" />
                <progress value={progress} max="100" className='progress-bar'>32%</progress>
                <p>Redirecting in login page...</p>
            </div>
            <button onClick={account_successBtn} className='hidden'>open-popup</button>
        </>
    );
}

export default Verification