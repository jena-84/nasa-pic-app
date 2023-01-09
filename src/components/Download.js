import { upload } from "@testing-library/user-event/dist/upload";
import { useState } from "react"
export default function Download(){
   
    const [fileInput, setFileInput] = useState('');
    const [previewSource,setPreviewSource] = useState();
    const [selectedFiles, setSelectedFiles] = useState('');

    const handleFileInput =(e)=>{
         const file = e.target.files[0]//to grap one image when upload multi images
         console.log(file)
        // setFileInput(URL.createObjectURL(file)) ==>> another way (ignore) 
        previewFile(file)
    };
   
    const previewFile = (file)=>{
        const reader = new FileReader()// object
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
          e.preventDefault();
          if(!previewSource) return;
          uploadImage(previewSource);
      };
//converts any characters,binary data,and even images into a readable string
    const uploadImage = async(base64EncodedImage)=>{
        console.log(base64EncodedImage)
        try {
             await fetch('/download',{
                method:'POST',
                body: JSON.stringify({ data: base64EncodedImage}),
                headers: {'Content-Type':'application/json'},
               }) 
        } catch (error) {
            console.error(error)
        }
    }    

    

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
                 alt='uploaded Image'
                 style={{height:'200px'}}>
            </img>
        )}
       </div>
    )
}