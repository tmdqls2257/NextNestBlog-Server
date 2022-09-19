"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createFolder = (folder) => {
    try {
        console.log('💾 Create a root uploads folder...');
        fs.mkdirSync(path.join(__dirname, '..', `uploads`));
    }
    catch (error) {
        console.log('The folder already exists...');
    }
    try {
        console.log(`💾 Create a ${folder} uploads folder...`);
        fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
    }
    catch (error) {
        console.log(`The ${folder} folder already exists...`);
    }
};
const storage = (folder) => {
    createFolder(folder);
    return multer.diskStorage({
        destination(req, file, cb) {
            const folderName = path.join(__dirname, '..', `uploads/${folder}`);
            cb(null, folderName);
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const fileName = `${path.basename(file.originalname, ext)}${Date.now()}${ext}`;
            cb(null, fileName);
        },
    });
};
const multerOptions = (folder) => {
    const result = {
        storage: storage(folder),
    };
    return result;
};
exports.multerOptions = multerOptions;
//# sourceMappingURL=multer.options.js.map