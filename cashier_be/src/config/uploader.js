const multer = require('multer');
const fs = require('fs');

module.exports = {
    uploader: (directory, filePrefix) => {
        let defaultDir = './src/public';
        //multer configuration
        const storageUploader = multer.diskStorage({
            destination: (req, file, cb) => {
                // menentukan lokasi penyimapanan
                const pathDir = directory ? defaultDir + directory: defaultDir;
                //check directory location
                if(fs.existsSync(pathDir)){
                    //if exist then multer will run cb
                    console.log(`directory ${pathDir} exist`)
                    cb(null, pathDir);
                }else{
                    //if not exist
                    fs.mkdir(pathDir, {recursive: true}, err =>{
                        if(err){
                            console.log(`Error making directory`);
                        }else{
                            console.log("Success making directory");
                            cb(null, pathDir);
                        }
                    });
                }
            },
            filename: (req, file, cb) => {
                // Membaca extention
                let ext = file.originalname.split('.');
                console.log(ext)
                let newName = filePrefix + Date.now() +'.' + ext[ext.length -1];
                console.log(filePrefix)
                cb(null, newName)
            }
        });
        return multer({storage: storageUploader, fileFilter: (req, file, cb) => {
            const extFilter = /\.(jpg|png|webp|doc|pdf|jpeg)/;
            let check = file.originalname.toLowerCase().match(extFilter);
            if(check){
                cb(null, true);
            }else{
                cb(new Error('Your file ext denied', false))
            }
        }});
    }
}