import '../App.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function Gallery(){
    const [resources , setResources]= useState([]);
    const [isError, setIsError] = useState(false);

    const [imageIndex,setImageIndex] = useState(0);
    const [openModel, setOpenModel]= useState(false);

    const [loadMore, setLoadMore] = useState(9);

    useEffect(() => {
        const getDataFromDb = async()=>{
            setIsError(false);
            try{
              const data= await fetch('/images');
              const json = await data.json();
              const result = json.payload
              setResources(result) 
              }catch(error){
              //console.log(error)
              setIsError(true)
            }
          }
        getDataFromDb();
    },[]);
    
    const loadMoreImges =()=>{
        setLoadMore(prev=> prev +9)
    }
    const handleImage =(key)=>{
        setImageIndex(key)
        setOpenModel(true)
    }
     const closeModel =()=>{
        setOpenModel(false)
     }

    return (
       <div className='flex flex-col items-center justify-center'>
         {isError && <div style={{fontWeight:600, fontSize:'40px', color:'white'}}> Something went wrong </div>}
         {openModel && 
            <div className='largeImageContainer' >
               <FontAwesomeIcon icon={faCircleXmark} className='closeBtn' onClick={()=>closeModel()}/>
               <div className='fullScreenImage'>
                <img src={resources[imageIndex].hdurl} className='rounded object-cover w-3/4 h-3/4 max-w-full max-h-full'></img>
               </div>
            </div>}
            <div className='container'>
                {resources.slice(0,loadMore).map((resource, key)=>{return(
                  <div className='flex flex-col items-center justify-center p-0 cursor-pointer' key={key} onClick={()=>handleImage(key)}>
                  <img src ={resource.hdurl} alt={resource.title} className='item-a rounded object-cover w-80 max-w-full max-h-full h-80 '></img>
                   <div className='p-2 text-white text-base text-center font-semibold mb-14'>{resource.title}</div>
                </div>
                )})}
            </div>
           <button className='btn text-white text-lg border border-solid border-blue-400 rounded-full bg-blue-400 w-1/4 p-2 mt-2 mb-10' 
            onClick={loadMoreImges}>Load More</button> 
      </div>
    )
}