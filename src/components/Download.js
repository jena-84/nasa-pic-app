//import { upload } from "@testing-library/user-event/dist/upload";
import { useEffect,useState  } from "react";
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
export default function Download(){
   
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
      <div className="flex flex-col items-center justify-center border border-solid border-blue-400 bg-yellow-50 w-6/12 p-20 h-full" style={{marginLeft:'25%'}}>
        <h1>Upload the image you like to save</h1>
         <form onSubmit={handleSubmit} className="max-w-2xl px-10 py-12 h-full  border border-solid border-blue-400 ">
           <input 
            type="file"
            onChange={handleFileInput} 
            value={fileInput} 
            name='image'/>
          <button type="submit" className='text-white border border-solid border-blue-400 rounded-full bg-blue-400 w-1/4 p-2 mt-2 mb-10'>Submit</button>
         </form>
        {previewSource && (
            <img src={previewSource}
                 alt='uploaded'
                 style={{height:'200px'}}>
            </img>
         )}
        {imagePublicId && 

        imagePublicId.map((imageId,key)=>{return <AdvancedImage
                                                 key={key}
                                                 cldImg={myCloud.image(imageId)}
                                                 />  
                                                })} 
    
        
    </div>
    )
}