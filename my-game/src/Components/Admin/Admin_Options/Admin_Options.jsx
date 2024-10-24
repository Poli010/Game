import './Admin_Options.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin_Options(){
    const [isOpen, setIsOpen] = useState(false);
    const [link1, setLink1] = useState("active-links");
    const [link2, setLink2] = useState();
    const [link3, setLink3] = useState();
    const navigate = useNavigate();

    function open_options(){
        setIsOpen(!isOpen);
    }

    function accounts(){
        setLink1("active-links");
        setLink2("");
        setLink3("");
        navigate("/Admin");
    }

    function trivia(){
        setLink1("");
        setLink2("active-links");
        setLink3("");
        navigate("/Admin_Trivia");
    }

    function guess(){
        setLink1("");
        setLink2("");
        setLink3("active-links");
        navigate("/Admin_Guess");
    }

    function logout(){
        navigate("/");
    }

    return(
        <>  
            <div className="nav bg-[#1E237D] h-10 flex items-center lg:hidden">
                <FontAwesomeIcon icon={faBars} className='text-white ml-1 text-xl' onClick={open_options}/>  
            </div>
           <div className={`fixed lg:flex flex-col w-42 lg:w-60 h-screen items-center bg-[#1E237D] text-white transition-all duration-500 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} lg:translate-x-0 lg:opacity-100 z-10`}>
                <div className="title mt-3">
                    <h1 className="font-bold text-center text-3xl">Admin</h1>
                </div>
                <div className="links flex flex-col  mt-[100px]">
                    <button className={`${link1} hover:bg-[#787566] h-[40px] hover:tracking-widest transition-all duration-[0.5s]`} onClick={accounts}>Accounts</button>
                    <button className={` ${link2} hover:bg-[#787566] hover:tracking-widest h-[40px] transition-all duration-[0.5s]`} onClick={trivia}>Trivia Game</button>
                    <button className={`${link3} hover:bg-[#787566] h-[40px] hover:tracking-widest transition-all duration-[0.5s]`} onClick={guess}>Guessing Game</button>
                </div>
                <div className="logout fixed left-14 bottom-16 lg:bottom-10 lg:left-[90px]">
                    <button className='hover:text-[#787566] transition duration-[0.5s]' onClick={logout}>Logout</button>
                </div>
           </div>
        </>
    );
}

export default Admin_Options