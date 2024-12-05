
import video from './../../assets/Loop Background .mp4';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login(){
    const [email_username, setEmail_username] = useState("");
    const [password, setPasword] = useState("");
    const [errorEmail, setError_Email] = useState("");
    const [alertVerified, setAlertVerified] = useState("");
    const [wrongEmail, setWrongEmail] = useState("text-red-700 text-sm w-[250px]")
    const navigate = useNavigate();
    const [loginAnimation, setLoginAnimation] = useState("hidden");
    const [loginBtn, setLoginBtn] = useState("text-white bg-[#EE5454] hover:bg-[#a23a3a] transition duration-[0.5s] w-28 rounded-[10px] h-7 mt-2")

 
    
    function login(e){
        e.preventDefault();
        setLoginAnimation("text-center text-lg font-medium inline-block animate-[fade_1.5s_ease-in-out_infinite] delay-[0]");
        setLoginBtn("hidden");
        axios.post('http://127.0.0.1:8000/api/loginPage',{
            'email': email_username,
            'username': email_username,
            'password': password
        }).then(response => {
            if(response.data.message === "wrong password"){
                setError_Email("Wrong email or password");
                setLoginBtn("text-white bg-[#EE5454] hover:bg-[#a23a3a] transition duration-[0.5s] w-28 rounded-[10px] h-7 mt-2");
                setLoginAnimation("hidden");
            }
            else if(response.data.message === "wrong email/username address"){
                setError_Email("Wrong email or password");
                setLoginBtn("text-white bg-[#EE5454] hover:bg-[#a23a3a] transition duration-[0.5s] w-28 rounded-[10px] h-7 mt-2");
                setLoginAnimation("hidden");
            }
            else if(response.data.message === "your account is not verified"){
                setAlertVerified("your account is not verified");
                setWrongEmail("hidden");
                setLoginBtn("text-white bg-[#EE5454] hover:bg-[#a23a3a] transition duration-[0.5s] w-28 rounded-[10px] h-7 mt-2");
                setLoginAnimation("hidden");
            }
            else if(response.data.message === "going to end user page"){
                navigate('/Choose_Game');
            }
            else if(response.data.message === "going to admin page"){
                navigate('/Admin');
            }
        }).catch(error => alert(error));
    }

    return(
        <>
            <video src={video} loop autoPlay muted className='fixed bottom-0 top-0 min-h-[100%] min-w-[100%] object-cover'></video>

            <div className="content fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[300px] md:w-[400px] lg:h-[700px] lg:w-[500px] flex flex-col justify-center items-center">
                <h1 className='text-white text-[25px] md:text-[30px] lg:text-[40px] font-bold'>Welcome to Poli's Game</h1>
                <div className="container h-[300px] bg-[#00FFB2] mt-20 rounded-[10px] flex flex-col justify-center items-center">
                    <form onSubmit={login}>
                        <div className="email flex flex-col">
                            <label htmlFor="">Username/Email:</label>
                            <input type="text" className='w-[250px] border-black outline-none border-[1px] rounded-[5px]' value={email_username} onChange={(e) => setEmail_username(e.target.value)} required/>
                        </div>
                        <div className="password flex flex-col mt-3">
                            <label htmlFor="">Password:</label>
                            <input type="password" className='ml-13 border-black outline-none border-[1px] rounded-[5px]' value={password} onChange={(e) => setPasword(e.target.value)} required/>
                        </div>
                        {errorEmail && <p className={wrongEmail}>Wrong email/username or password!</p>}
                        {alertVerified && <p className="text-red-700 text-sm w-[250px]">The account you enter is not verified, to verify your account please go to <span className='font-bold'>"forgot password?"</span></p>}
                        <div className='flex flex-col justify-center items-center'>
                            <Link to="/Forgot_Password">
                                <a href="#" className='ml-32 text-sm underline mt-2 hover:text-blue-600 transition duration-[0.5s]'>Forgot Password?</a>
                            </Link>
                            <button className={loginBtn}>Login</button>
                            <p className={loginAnimation}>Logging in...</p>

                            <p className='mt-3 text-sm'>Don't have account? <Link to="/SignUp"><span><a href="#" className='underline hover:text-blue-600 transition duration-[0.5s]'>Sign up here</a></span></Link></p>
                        </div>
                    </form>
                   
            
                </div>
                <h1 className='text-white text-sm md:text-[1rem] lg:text-lg mb-16 mt-5'>Please login first to continue in the game</h1>
            </div>
        </>
    );

}

export default Login