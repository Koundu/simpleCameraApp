//Linking HTML Elements to JS
const cameraVideoStream = document.getElementById("camera-stream");
const shutterBtn = document.getElementById("shutter")
const canvas = document.getElementById('canvas')
const currentImageElement = document.getElementById("gallery-view");

//Connecting webcam to JS
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia({video:true})) {
    navigator.mediaDevices
        .getUserMedia({video:true})
        .then((stream)=>{
            cameraVideoStream.srcObject = stream
            cameraVideoStream.play()
        })
}

let width = window.innerWidth;
let height = 0
let streaming = false

cameraVideoStream.addEventListener('click',(event)=>{
    if(!streaming){
        height = cameraVideoStream.videoHeight/(cameraVideoStream.videoWidth/width);
        cameraVideoStream.setAttribute("width", width);
        cameraVideoStream.setAttribute("height", height);
        streaming=true
    }
},false)

//capture snapshots using HTML Canvas

function captureImage(){
    const canvasContext = canvas.getContext('2d')
    canvas.width = width;
    canvas.height = height;
    canvasContext.drawImage(cameraVideoStream,0,0,width,height);
    //Convert Capture data to Image(base64)
    const data = canvas.toDataURL('image/png')
    console.log(typeof(data));
    currentImageElement.img = data;
    console.log(currentImageElement.img);
}

//Adding Click Event Listener to Shutter Button to Capture Image
shutterBtn.addEventListener('click',()=>captureImage())