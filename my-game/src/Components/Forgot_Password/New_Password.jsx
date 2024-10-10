import { useLocation } from "react-router-dom";
import video from './../../assets/Loop Background .mp4';

function New_Password(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    return(
        <>
            <video src={video} loop autoPlay muted className='fixed bottom-0 top-0 min-h-[100%] min-w-[100%] object-cover'></video>
            
        </>
    );
}

export default New_Password