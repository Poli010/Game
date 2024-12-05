import trickImage from '../../../assets/trickBg.jpg';
import guessImage from '../../../assets/guessBG.jpeg';
import familyImage from '../../../assets/familyBG.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Choose_Game(){
    return(
        <>
            <div className="container bg-choose_gameBG fixed bottom-0 top-0 min-h-[100%] min-w-[100%] bg-cover">
                <div className="game_details">
                    <Link to="/"><p className='text-white fixed right-3 top-2 lg:text-[1.2rem] cursor-pointer hover:text-violet-800 transition duration-[0.5s]'>Logout <FontAwesomeIcon icon={faRightFromBracket} /></p></Link>
                    <h1 className="text-white text-center mt-8 text-[2rem] lg:text-[2.3rem]">Choose Game</h1>
                    <div className="details">
                        <div className="trickQuestion flex flex-col items-center mt-5 cursor-pointer lg:flex-row lg:h-[500px] lg:justify-evenly">
                            <div className="trickdetails transition-all duration-[0.5s] rounded-[5px] group">
                                <img src={trickImage} alt="" className='w-[230px] rounded-[5px] transition-transform duration-[0.5s] group-hover:scale-110 lg:w-[320px]'/>
                                <p className='text-white text-center mt-3 transition-all duration-[0.5s] group-hover:tracking-[5px] group-hover:font-bold lg:text-[1.3rem]'>Trick Question</p>
                            </div>
                            <div className="guessdetails transition-all duration-[0.5s] rounded-[5px] group mt-3">
                                <img src={guessImage} alt="" className='w-[230px] rounded-[5px] transition-transform duration-[0.5s] group-hover:scale-110 lg:w-[320px]'/>
                                <p className='text-white text-center mt-3 transition-all duration-[0.5s] group-hover:tracking-[5px] group-hover:font-bold lg:text-[1.3rem]'>Guess the logo</p>
                            </div>
                            <div className="guessdetails transition-all duration-[0.5s] rounded-[5px] group mt-3">
                                <img src={familyImage} alt="" className='w-[230px] rounded-[5px] transition-transform duration-[0.5s] group-hover:scale-110 lg:w-[320px]'/>
                                <p className='text-white text-center mt-3 transition-all duration-[0.5s] group-hover:tracking-[5px] group-hover:font-bold lg:text-[1.3rem]'>Family Fued</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Choose_Game