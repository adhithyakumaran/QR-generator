import express from "express";
import qrcode from "qrcode";

const app = express();
const port = 3000;

/*----------------determining the path for the file-------------*/
import { dirname } from "path";
import { fileURLToPath } from "url";
import { error } from "console";
const _dirname = dirname(fileURLToPath(import.meta.url));

console.log(_dirname);

app.use(express.static("public"));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

/*------------------setting up the server------------------*/

app.use((req,res,next)=>{
    res.locals.error = null;
    res.locals.qrCode = null;
    next()
})

app.set('view engine','ejs')

app.listen(port,()=>{
    console.log("server is running in the port 3000");
});

//getting the home page 
app.get("/",(req,res)=>{
    res.sendFile( _dirname+"/public/index.html");
})
app.post("/create",(req,res)=>{
    res.render("index.ejs");
});

app.post("/generate",async(req,res)=>{
    const{ text,color,size}=req.body;
    try{
        const qrCode = await qrcode.toDataURL(text,{color:{dark:color},width:size})
        res.render('index',{qrCode,text,color,size});
    }
    catch(error){
        res.render('index',{error:'error in gennerating qrcode'})
    }
})





