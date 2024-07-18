import multer from 'multer';
import path from'node:path'

//** config multer
//* enables file upload 
const upload = multer({
    dest:path.resolve('./public/temp'),
    limits:5*1024*1024, // filesize in bytes
})

export {upload}