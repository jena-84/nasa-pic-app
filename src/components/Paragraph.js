
import { useState } from "react";

export default function Paragraph({data}){

    const [isTruncated, setIsTruncated] = useState(true);
    
    let arr = String(data)
    const resultText= arr.slice(0,200)
    //console.log(resultText)
    return(
        <div className="shadow-xl p-5">
             <p className="text-justify font-sans text-lg mt-2 font-bold object-contain text-grey-700 ">
             { isTruncated ? resultText: arr} 
             <span className=" p-1 text-blue-400 cursor-pointer" onClick={()=> setIsTruncated(!isTruncated)}>
                {isTruncated? "... Read more" : "Read Less"}
            </span>
            </p> 
        </div>
    ) 
 };
 