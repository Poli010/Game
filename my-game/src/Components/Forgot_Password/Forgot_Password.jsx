
import video from './../../assets/Loop Background .mp4';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function Forgot_Password(){
    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState("");
    const [button, setButton] = useState("mt-5 text-white bg-[#EE5454] hover:bg-[#a23a3a] transition duration-[0.5s] w-28 rounded-[10px]")
    const [sending, setSending] = useState("hidden");
    const navigate = useNavigate();
    function submit(e){
        e.preventDefault();
           setButton("hidden");
           setSending("block");
        
        
        axios.post(`http://127.0.0.1:8000/api/forgot_password/${email}`).then(response => {
            if(response.data.message === "verification code sent successfully"){
                const interval = setInterval(() => {
                    navigate(`/Forgot_Verification?email=${email}`);
                    clearInterval(interval);
                }, 3000);
                
            }
            else if(response.data.message === "the email you entered is not registered to our system"){
                setErrorEmail("the email you entered is not registered to our system");
                setButton("mt-5 text-white bg-[#EE5454] hover:bg-[#a23a3a] transition duration-[0.5s] w-28 rounded-[10px]");
                setSending("hidden");
      
            }
        })
    }

    return(
        <>
            <video src={video} loop autoPlay muted className='fixed bottom-0 top-0 min-h-[100%] min-w-[100%] object-cover'></video>
            <h1 className='fixed top-[20%] left-[50%] translate-x-[-50%] translate-y-[-20%] text-white text-[30px] w-[300px] lg:w-[400px] text-center md:text-[30px] lg:text-[40px] font-bold'>Forgot password?</h1>
            <div className="content fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#00FFB2] h-[250px] w-[300px] rounded-[10px] md:w-[400px] lg:h-[250px] lg:w-[450px] overflow-hidden">
                <form className="info flex flex-col justify-center items-center h-[200px] w-[300px] md:w-[400px] lg:w-[450px] lg:h-[200px]" onSubmit={submit}>
                    <p className='mt-8 font-bold lg:text-lg'>Please enter your email😒</p>
                    <input type="text" className='border-black border-[1px] rounded-[10px] w-[270px] mt-5 outline-none' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    {errorEmail && <p className="text-red-700 text-sm mt-2 w-[300px] md:w-[400px] text-center">The email you entered is not registered to our system!</p>}
                    <button className={button}>Submit</button>
                    <p className={sending}>Sending...</p>
                    <p className='mt-2 text-md'>Remember your password? <Link to="/"><span className='underline hover:text-blue-600 transition duration-[0.5s]'>Login here</span></Link></p>
                </form>
             
            </div>

        </>
    );
}

export default Forgot_Password