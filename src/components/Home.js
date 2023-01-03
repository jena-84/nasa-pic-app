import '../App.css';
import { useEffect, useState} from "react";
import Paragraph from './Paragraph';
import Like from './Like';

export default function Home(){

    const [data, setDate] = useState("");
    //const [count, setCount] = useState(0);
    const [loadMore,setLoadMore] = useState(false);
    const [newImageData, setNewImageData]= useState('');
    const [countImage, setCountImage] = useState(1);
    
    useEffect(()=>{
        const displayImage = async()=>{
            try{
            const req= await fetch(`https://api.nasa.gov/planetary/apod?api_key=my7yWrckDk4jzhimEiJ06YOmoOXf9fEZbvyp2O75`);
            const res = await req.json();
            console.log(data)

            setDate(res)
            } catch (error){
                console.log(error)
            }
        }
        displayImage()    
    },[]);

     useEffect(()=>{
         const displayMoreImages = async()=>{
            try{
            const req= await fetch(`https://api.nasa.gov/planetary/apod?api_key=my7yWrckDk4jzhimEiJ06YOmoOXf9fEZbvyp2O75&count=${countImage}`);
           // console.log(req)
            const res = await req.json();
            //console.log(res)
            let result = res.splice(0,1)
            setNewImageData(pre=>[...pre,...result])
             console.log(newImageData)
            }catch(error){
                console.log(error)
            };
         };
        displayMoreImages()

    },[countImage]);
    

    function showMoreImage(){
        setLoadMore(true)
        setCountImage(countImage +1)
        console.log("count=" + countImage)
      // displayMoreImages()
    }
    
 return(
     
        <div className=" flex flex-col items-center justify-center border border-solid bg-yellow-50 w-6/12 p-10" style={{marginLeft:'25%'}}>
               <h1 className="p-2 font-bold text-black-500">Image of the day</h1>
               {data && 
                 <div className="max-w-2xl px-10 py-12">
                    <img src ={data.hdurl}alt={data.title} className='rounded object-cover w-full max-w-full h-96'></img>
                      <Like/>
                    <h2 className="m-0 pl-5 font-bold text-grey-700 font-sans text-lg ">Title: {data.title}</h2>
                    <h3 className="m-0 pl-5 font-bold text-grey-700 font-sans text-lg">Date: {data.date}</h3>
                    <Paragraph data={data.explanation}></Paragraph>
                 </div>
               }
            {loadMore && 
              newImageData.map((data,key)=>{
                return (
                <div className="max-w-2xl px-10 py-12" key={key}>
                    <img src ={data.hdurl}alt={data.title} className='rounded object-cover w-full max-w-full h-96'></img>
                       <Like/>
                    <h2 className="m-0 pl-5  font-bold text-grey-700 font-sans text-lg">Title: {data.title}</h2>
                    <h3 className="m-0 pl-5  font-bold text-grey-700 font-sans text-lg">Date: {data.date}</h3>
                    <Paragraph data={data.explanation}></Paragraph>
                </div> )
               })
            }
            <button className='text-white border border-solid border-blue-400 rounded-full bg-blue-400 w-1/4 p-2 mt-2 mb-10' 
              onClick={()=>showMoreImage()}>Load More</button>  
      </div>
    
        )
    }

           
          
         
    