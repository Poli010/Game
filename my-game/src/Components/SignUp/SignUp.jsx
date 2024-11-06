import video from './../../assets/Loop Background .mp4';
import cat from './../../assets/cat_loading.gif';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SignUp.css';

function SignUp(){
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [account_type, setAccountType] = useState('end_user');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const [progress, setProgress] = useState(0);
    const [errorUsername, setErrorUsername] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const blurbg = useRef();
    const content_bg = useRef();
    const loading = useRef();
    const navigate = useNavigate();
    
    

    function handleSubmit(e){
        e.preventDefault();
     
        if(password !== confirmPassword){
            console.log("password does not match");
        }
        else if(!passwordRegex.test(password)){
            console.log("Password must be at least 8 characters long, contain at least one uppercase letter and one number.");
        }
        axios.get(`http://127.0.0.1:8000/api/user/${email}/${username}`).then(response => {
            if(response.data.message === "Username is already taken"){
                setErrorUsername("Username is already taken");
                setErrorEmail("");
            }
            else if(response.data.message === "Email is already taken"){
                setErrorEmail("Email is already taken");
                setErrorUsername("");
            }
            else if(response.data.message === "Email and Username is already taken"){
                setErrorUsername("Username is already taken");
                setErrorEmail("Email is already taken");
            }
            else{
                open_popup();
                const url = 'http://127.0.0.1:8000/api/signUp';
                const formData = new FormData();
                formData.append("email", email);
                formData.append("username", username);
                formData.append("password", password);
                formData.append("account_type", account_type);
    
                axios.post(url, formData).then(response => {
                    if(response.data.message === "Sign Up Successful"){
                        console.log("success");
                        
                    }
                    else{
                        alert("Response Error");
                    }
                }).catch(error => alert(error));
            }
        });
    }

    function open_popup(){
        blurbg.current.classList.add("video_background-open");
        content_bg.current.classList.add("content-open");
        loading.current.classList.add("loading-open");
        let currentProgress = progress;
        const interval = setInterval(() => {
            if(currentProgress < 100){
                currentProgress +=1;
                setProgress(currentProgress);
            }
            else{
                clearInterval(interval);
                navigate(`/Verification?email=${email}`)
               
            }
            
        }, 30);
    }


    return(
        <>
            <video src={video} loop autoPlay muted className='video_background fixed bottom-0 top-0 min-h-[100%] min-w-[100%] object-cover' ref={blurbg}></video>

            <div className="content fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-40%] w-[300px] md:w-[400px] lg:h-[550px] lg:w-[500px] flex flex-col justify-center items-center" ref={content_bg}>
                <h1 className='text-white text-[25px] md:text-[30px] lg:text-[40px] font-bold'>Sign up here</h1>
                <div className="container h-[500px] bg-[#00FFB2] mt-10 rounded-[10px] flex flex-col justify-center items-center overflow-hidden">
                    <form onSubmit={handleSubmit} className=' w-[500px] h-[350px] flex flex-col justify-center items-center'>
                        <div className="email flex flex-col">
                            <label htmlFor="">Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-[250px] border-black outline-none border-[1px] rounded-[5px]' required autoComplete='off'/>
                        </div>
                        {errorEmail  && <p className="text-red-700 text-sm w-[250px]">Email is already registered.</p>}
                        <div className="email mt-3 flex flex-col">
                            <label htmlFor="">Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='w-[250px] border-black outline-none border-[1px] rounded-[5px]' required autoComplete='off'/>
                        </div>
                        {errorUsername  && <p className="text-red-700 text-sm w-[250px]">Username is already taken.</p>}
                        <div className="password flex flex-col mt-3">
                            <label htmlFor="">Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='ml-13 w-[250px]  border-black outline-none border-[1px] rounded-[5px]' required autoComplete='off'/>
                        </div>
                        {!passwordRegex.test(password) && <p className="text-red-700 text-sm w-[250px]">Password must be at least 8 characters long, contain at least one uppercase letter and one number.</p>}
                        <div className="password flex flex-col mt-3">
                            <label htmlFor="">Re-enter password:</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='ml-13 w-[250px] border-black outline-none border-[1px] rounded-[5px]' required autoComplete='off'/>
                            {password != confirmPassword && <p className="text-red-700">Password does not match!</p>}
                        </div>
                        <div className="button flex flex-col items-center">
                            <button className='text-white bg-[#EE5454] hover:bg-[#a23a3a] transition duration-[0.5s] w-28 rounded-[10px] h-7 mt-2'>Sign Up</button>
                        </div>
                        <p className='mt-3 text-sm'>Already have account? <Link to="/"><span><a href="#" className='underline hover:text-blue-600 transition duration-[0.5s]'>Login here</a></span></Link></p>
                        <input type="text" className='hidden' value={account_type} onChange={(e) => setAccountType(e.target.value)} />
                    </form>
                </div>
            </div>
            <div className="loading w-[300px] md:w-[400px] lg:w-[400px]" ref={loading}>
                <h1 className='text-xl font-bold'>Sending verification code...</h1>
                <img src={cat} width={180} alt="Loading cat" className="video" />
                <progress value={progress} max="100" className='progress-bar'>32%</progress>
            </div>
            <button onClick={open_popup} className='hidden'>open-popup</button>
        </>
    );
}

export default SignUp