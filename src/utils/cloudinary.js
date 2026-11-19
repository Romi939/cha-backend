import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: 'dejf9zom', 
        api_key: '713535656565572', 
        api_secret: '-63fMywu6SEeT2QrRoPudkoujUs' // Click 'View API Keys' above to copy your API secret
    });


    const uploadOnCloudinary =async(localFilePath)=>{
        try{
            if(!localFilePath) return null
            const response= await cloudinary.uploader.upload
            (localFilePath,{
                resource_type:'auto',                   
            })
        console.log("file is uploaded on cloudinary",response.url)
        return response

        }catch(error){
            fs.unlinkSync(localFilePath)
            console.error("Error uploading file to Cloudinary:", error)
            return null;
        }
    }

    export {uploadOnCloudinary}