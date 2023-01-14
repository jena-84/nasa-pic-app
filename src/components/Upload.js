//import { upload } from "@testing-library/user-event/dist/upload";
import { useEffect,useState  } from "react";
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import {
    lazyload,
    responsive,
    placeholder
  } from "@cloudinary/react";

export default function Upload(){
   
    const [fileInput, setFileInput] = useState('');
    const [previewSource,setPreviewSource] = useState();
    const [imagePublicId, setImagePublicId] = useState();
    //const [successMsg, setSuccessMsg] = useState('');
    //const [errMsg, setErrMsg] = useState('');

    const handleFileInput =(e)=>{
         const file = e.target.files[0]//grap one image when upload multi images
         console.log(file)
        // setFileInput(URL.createObjectURL(file)) ==>> another way (ignore) 
        previewFile(file)
    };
   
    const previewFile = (file)=>{// to Review image before submit it
        const reader = new FileReader()// object to read the image
        console.log(reader)
        //console.log(reader.readAsDataURL(file))
        reader.readAsDataURL(file)// to convert image to URL
        // use property function to reading finished with either success or failure
        reader.onload =()=>{ //pass the source of image using result
            setPreviewSource(reader.result)
            console.log(reader.result)
        };
    };
    const handleSubmit =(e)=>{
        console.log("submitted")
          e.preventDefault();
          if(!previewSource) return;
           uploadImage(previewSource)
       };
//converts any characters,binary data,and even images into a readable string
    const uploadImage = async(base64EncodedImage)=>{
        console.log(base64EncodedImage)
        try {
             await fetch('/api/upload',{
                method:'POST',
                body: JSON.stringify({data:base64EncodedImage}),
                headers: {'Content-Type':'application/json'},
               }) 
               setFileInput('');
              setPreviewSource('');
             // setSuccessMsg('Image uploaded successfully');
        } catch (error) {
            console.error(error)
          //setErrMsg('Something went wrong!');
        };
    };  
    useEffect(()=>{
        const getLoadedImages = async()=> {
              try{
                const res = await fetch('/uploaded')
                const data = await res.json();
                //console.log(data)
                setImagePublicId(data)
                console.log(imagePublicId)
              }catch(error) {
                console.error("Images not recieved");
              }
            }
        getLoadedImages()
        },[]);

    const myCloud = new Cloudinary({
        cloud:{
            cloudName:process.env.REACT_APP_CLOUDINARY_NAME 
        }
    });
 return(
      <div className="flex flex-col items-center justify-center border border-solid border-blue-400 bg-yellow-50 w-9/12 h-full ml-60">
        <h1 className="m-5 font-bold text-black-500 text-center text-gray-600 tracking-wide text-3xl">Upload image and save</h1>
        
        <div className="cloud-container">
        {imagePublicId && 
        imagePublicId.map((imageId,key)=>{return <AdvancedImage
                                                 key={key}
                                                 cldImg={myCloud.image(imageId)}
                                                 style={{width: '300px' , height:'300px', borderRadius:'10px',boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
                                                 plugins={[lazyload(),responsive(), placeholder()]}
                                                 />  
                                               })} 
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center m-8">
           <input 
            type="file"
            onChange={handleFileInput} 
            value={fileInput} 
            name='image'/>
          <button type="submit" className='text-white text-base tracking-wide font-normal rounded-full bg-blue-400 w-1/3 p-2 m-5'>Upload</button>
         </form>
        {previewSource && (
            <img src={previewSource}
                 alt='uploaded'
                 style={{height:'250px'}}>
            </img>
         )}

    </div>
    )
}