# Image API Project

## Table of Contents

project title
Table of content
Description
Features
Used Language
History
Licence
Footer

## Description

This project is an API to resize images to be used as a placeholder in frontend prototyping,
and it also seve the edited images in the storage as caching to be faster.

## Features

The API has many features:

1. Dynamically generated images with any size the user want
2. Caches the edited images in the storage

## Files

This project containes:

1. src folder
    1. app.ts as entry point of API 
    2. router.ts as the file contains the main functionality
2. Images folder that contains the images and the edited ones
3. tests folder
    1. the spec-tests files that used in test the project but it's not working!
    2. helpers.ts as a config dile for jasmine working
4. build folder
    1. contains the build scripts of the API
  

## Used Languages

1. TypeScript
2. JavaScript

## Using API 

    You can simply use this API by running the server and open the browser on the server with the 
    specific port defined before, and input the following queries in the endpoit as following:
    
    http://localhost:3000/api?name=fjord.jpg&width=800&height=600

    note: that name is optional, and if ignored the default image will be used.

## History

Version 1.0.0 (24/1/2021)

## Licence

GNU General Public License version 3

## Acknowledgments

1. Udacity
2. MDN
3. Google Fonts
4. GitHub
5. sharp
6. Node.js
