"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeImg = exports.handler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
path_1.default.delimiter;
const imgStorePath = path_1.default.join(__dirname, "../src/images/");
const imageOutPath = path_1.default.join(__dirname, "../src/images/edited/");
let cashedImage;
let result;
// The main handler for my endpoint
const handler = (req, res) => {
    // Getting the user inputs
    let name = "default.jpg";
    const width = req.query.width;
    const height = req.query.height;
    if (req.query.name && req.query.name.length > 0) {
        name = req.query.name;
    }
    // Checkinig if we have an image or we need to create new one
    if (fs_1.default.existsSync(imageOutPath + `size-${width}×${height}-${name}`)) {
        cashedImage = fs_1.default.readFileSync(imageOutPath + `size-${width}×${height}-${name}`);
        console.log("Image exist!");
        res.contentType("image/jpeg");
        res.status(200).send(cashedImage);
    }
    else {
        resizeImg(name, width, height).then((result) => {
            // Cheking if it was a succesfull request
            if (result.status) {
                res.contentType("image/jpeg");
                res.status(200).send(result.image);
                console.log(result.comment);
            }
            else {
                res.status(404).send(result.comment);
            }
        });
    }
};
exports.handler = handler;
// The main method to resize the images
const resizeImg = (name, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (name) {
            const img = yield (0, sharp_1.default)(imgStorePath + name)
                .resize({
                width: parseInt(width),
                height: parseInt(height),
            })
                .toBuffer()
                .then((data) => {
                (0, sharp_1.default)(data).toFile(imageOutPath + `size-${width}×${height}-${name}`);
                return data;
            });
            console.log(name);
            result = {
                image: img,
                status: true,
                comment: "Image is resized and added succesfully",
            };
            return result;
        }
        else {
            // Get a default pic :palmtunnel
            const img = yield (0, sharp_1.default)(imgStorePath + "default.jpg")
                .resize({
                width: parseInt(width),
                height: parseInt(height),
            })
                .toBuffer()
                .then((data) => {
                (0, sharp_1.default)(data).toFile(imageOutPath + `size-${width}×${height}-default.jpg`);
                return data;
            });
            result = {
                image: img,
                status: true,
                comment: "Image is resized and added succesfully",
            };
            return result;
        }
    }
    catch (err) {
        console.log("something is wrong!", err, imageOutPath + name);
        result = {
            image: null,
            status: false,
            comment: String(err),
        };
        return result;
    }
});
exports.resizeImg = resizeImg;
