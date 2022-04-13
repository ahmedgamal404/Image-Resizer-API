import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
path.delimiter;

const imgStorePath: string = path.join(__dirname, "../src/images/");
const imageOutPath: string = path.join(__dirname, "../src/images/edited/");
let cashedImage: Buffer;
let result: {
    image: Buffer | null;
    status: boolean;
    comment: string;
};
// The main handler for my endpoint
const handler = (req: Request, res: Response): void => {
    // Getting the user inputs
    let name: string = "default.jpg";
    const width: string = req.query.width as string;
    const height: string = req.query.height as string;
    if (req.query.name && (req.query.name as string).length > 0) {
        name = req.query.name as string;
    }

    // Checkinig if we have an image or we need to create new one
    if (fs.existsSync(imageOutPath + `size-${width}×${height}-${name}`)) {
        cashedImage = fs.readFileSync(imageOutPath + `size-${width}×${height}-${name}`);
        console.log("Image exist!");
        res.contentType("image/jpeg");
        res.status(200).send(cashedImage);
    } else {
        resizeImg(name, width, height).then((result) => {
            // Cheking if it was a succesfull request
            if (result.status) {
                res.contentType("image/jpeg");
                res.status(200).send(result.image);
                console.log(result.comment);
            } else {
                res.status(404).send(result.comment);
            }
        });
    }
};

// The main method to resize the images
const resizeImg = async (name: string, width: string, height: string) => {
    try {
        if (name) {
            const img = await sharp(imgStorePath + name)
                .resize({
                    width: parseInt(width),
                    height: parseInt(height),
                })
                .toBuffer()
                .then((data) => {
                    sharp(data).toFile(imageOutPath + `size-${width}×${height}-${name}`);
                    return data;
                });
            console.log(name);
            result = {
                image: img,
                status: true,
                comment: "Image is resized and added succesfully",
            };
            return result;
        } else {
            // Get a default pic :palmtunnel
            const img = await sharp(imgStorePath + "default.jpg")
                .resize({
                    width: parseInt(width),
                    height: parseInt(height),
                })
                .toBuffer()
                .then((data) => {
                    sharp(data).toFile(imageOutPath + `size-${width}×${height}-default.jpg`);
                    return data;
                });
            result = {
                image: img,
                status: true,
                comment: "Image is resized and added succesfully",
            };
            return result;
        }
    } catch (err) {
        console.log("something is wrong!", err, imageOutPath + name);
        result = {
            image: null,
            status: false,
            comment: String(err),
        };
        return result;
    }
};

// Export modules to entry point
export { handler, resizeImg };
