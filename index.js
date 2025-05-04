import express from "express";

import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;
const API_URL = "http://localhost:4000";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/Create",(req,res)=>{
    res.render("Create.ejs");
});

app.post("/newBlog",async(req,res)=>{
   try {
    const result = await axios.post(`${API_URL}/posts`,req.body);
    console.log(result.data);
    res.redirect("/View");

   } catch (error) {
    res.status(500).json({message:"error creating the Blog"})
    
   }


});

app.get("/View",async(req,res)=>{
   try {
    const result = await axios.get(`${API_URL}/posts`);
    console.log(result.data);
    res.render("View.ejs",{posts: result.data});
   } catch (error) {
    res.status(500).json({message:"error fetching post"});
   }
});
app.get("/edit/:id",async(req,res)=>{
    try {
        const result = await axios.get(`${API_URL}/posts/${req.params.id}`)
    res.render("Create.ejs",{post: result.data })
 
    } catch (error) {
        res.status(500).json({message:"Error fetching the post"});
    }
})
app.post("/edit/:id",async(req,res)=>{
    try {
        const result = await axios.patch(`${API_URL}/posts/${req.params.id}`,req.body);
        console.log(result.data);
        res.redirect("/View");
 
    } catch (error) {
        res.status(500).json({message:"Error updating the Data"});
    }
})
app.get("/delete/:id",async(req,res)=>{
    try {
         await axios.delete(`${API_URL}/posts/${req.params.id}`);
        
        res.redirect("/View");
    } catch (error) {
        res.status(500).json({message: "Error deleting the post"})
    }

})

app.get("/Contact",(req,res)=>{
    res.render("contact.ejs");
});

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});