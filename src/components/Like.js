import {AiOutlineLike, AiTwotoneLike} from 'react-icons/ai';
import { useState } from 'react';

export default function Like(){

    const [numOfLikes ,setNumOfLikes] = useState(0);
    const [isBlue, setIsBlue] = useState(<AiOutlineLike className="text-xl ml-2 text-blue-900"/>);
    const [liked,setLiked] = useState(true);

    const handleclick=()=>{
        if(liked) {
            setIsBlue(<AiTwotoneLike className="text-lg ml-2 text-blue-900"/>) 
            setNumOfLikes(numOfLikes +1);
            setLiked(false)}
        else {
            setIsBlue(<AiOutlineLike className="text-lg ml-2 text-blue-900"/>)
            setNumOfLikes(numOfLikes-1);
            setLiked(true)
        };  
    };
    return (
        <span className="flex flex-row p-2 text-blue-900">
        <span onClick={handleclick} className="text-lg">{isBlue} </span> {numOfLikes} Likes</span> 
    )
}
