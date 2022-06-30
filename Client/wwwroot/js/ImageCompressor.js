const MAX_WIDTH = 320;
const MAX_HEIGHT = 180;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.7;

let base64String = "";

function compressImage(ev, buf) {
    //const file = ev.target.files[0]; // get the file
    const file = ev;
    console.log(file);
    const blob = new Blob([buf]);
    const url = URL.createObjectURL(blob);
    
   
    const img = new Image();
    img.src = url;
    img.onload = function () {
        var reader = new FileReader();
        reader.onload = function () {

        }
        URL.revokeObjectURL(this.src);
        const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
            (blob) => {
                displayInfo('Original file', file);
                displayInfo('Compressed file', blob);
                var reader = new FileReader();
                reader.onload = () => {
                    base64String = reader.result;
                    console.log(base64String)
                    postData("https://localhost:7293/images", { base64string: base64String, filesize: readableBytes(blob.size), filename: file.name, contenttype: blob.type }).then((data) => {
                        console.log(data);
                    })
                }
                reader.readAsDataURL(blob);
                
                
            },
            MIME_TYPE,
            QUALITY
        );
    }
    
}


async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


      

function calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
        }
    }
    return [width, height];
}

// Utility functions for demo purpose

function displayInfo(label, file) {

    console.log(`${label} - ${readableBytes(file.size)}`);

}
function readableBytes(bytes) {
    const i = Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}