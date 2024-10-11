import { useLocation, useNavigate } from "react-router-dom";
import video from './../../assets/Loop Background .mp4';
import { useState, useRef } from "react";
import axios from 'axios';
import success_cat from './../../assets/success_create.gif';

function New_Password(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const popUp = useRef();
    const content = useRef();
    const blurbg = useRef();
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    
    function change_password(e){
        e.preventDefault();
        if(password !== rePassword){
            console.log("password not match");
        }
        else{
            axios.put(`http://127.0.0.1:8000/api/updatePassword/${email}`,{
                'password':password
            }).then(response => {
                if(response.data.message === "Password updated"){
                   account_successBtn();
                }
            })
        }
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
                navigate('/');
               
            }
            
        }, 30);
    }

    return(
        <>
            <video src={video} loop autoPlay muted className='fixed bottom-0 top-0 min-h-[100%] min-w-[100%] object-cover' ref={blurbg}></video>
            <div className="content fixed bg-[#00FFB2] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[340px] w-[300px] md:w-[350px] md:h-[370px] lg:h-[400px] lg:w-[400px] flex flex-col justify-center items-center rounded-[10px]" ref={content} >
                <h1 className="font-bold text-lg -mt-[5px]">Enter your new password</h1>
                <form className="flex flex-col items-center mt-3" onSubmit={change_password}>
                    <div className="newPassword flex flex-col">
                        <label htmlFor="" className="text-sm">New password:</label>
                        <input type="Password" className="outline-none border-black border-[1px] rounded-[5px] w-[200px] mb-3 h-8" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    {!passwordRegex.test(password) && <p className="text-red-700 text-sm w-[200px] ">Password must be at least 8 characters long, contain at least one uppercase letter and one number.</p>}
                    <div className="newPassword flex flex-col">
                        <label htmlFor="" className="text-sm">Re-enter password:</label>
                        <input type="Password" className="outline-none border-black border-[1px] rounded-[5px] w-[200px] mb-3 h-8" value={rePassword} onChange={(e) => setRePassword(e.target.value)} required/>
                    </div>
                    {password !== rePassword && <p className="mb-3 text-red-700">Password does not match!</p>}
                    <button className="text-white bg-[#EE5454] hover:bg-[#a23a3a] transition duration-[0.5s] w-28 rounded-[10px]">Submit</button>
                </form>
            </div>

            <div className="loading w-[300px] md:w-[400px] lg:w-[400px]" ref={popUp}>
                <h1 className='text-xl font-bold'>Password Updated!</h1>
                <img src={success_cat} width={180} alt="Loading cat" className="video" />
                <progress value={progress} max="100" className='progress-bar'>32%</progress>
                <p>You can now login</p>
            </div>
            <button onClick={account_successBtn} className='hidden'>open-popup</button>
        </>
    );
}

export default New_Password