import multer from "multer"
import { v4 as uuidv4 } from 'uuid';

const mimeTypes = {
    "image/png" : "png",
    "image/jpg" : "jpg",
    "image/jpeg" : "jpeg",
    "image/gif" : "gif",
}

//  traitement des fichiers images
const fileStore = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null, 'public/images')
    },
    filename: (req ,file , cb) => {
        // @ts-ignore
        const imageExt = mimeTypes[file.mimetype]
        cb(null ,`${uuidv4()}.${imageExt}`)
    }
})


export default multer({ storage  : fileStore }).single("image")