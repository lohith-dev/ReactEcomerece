const path=require('path');
const postMessage=require('../models/postMessage');

exports.getPosts=(req,res)=>{
  console.log("hello");
  postMessage.findAll().then(result=>{
  
    res.send(result);

    
    }).catch(err=>{

    })
}

exports.newpost=async (req,response)=>{
    const data=req.body.title;
    console.log("dddddddd"+data);
    const file= req.files.selectedFile;
    // console.log("dddddddd"+file);
 console.log(__dirname);
  const savepath=path.join(__dirname,'..','Uploads',file.name);
  await file.mv(savepath);
   
  postMessage.create({
    title:req.body.title,
    message:req.body.message,
    creator:req.body.creator,
    tags:req.body.tags,
    SelectedFile:file.name,
   }).then(result=>{
    
    // console.log(result);
    response.send(result);
   console.log("created a product")
  }).catch(err=>{

    console.log(err);
})

}

exports.updatePost=async (req,res)=>{
  console.log("heeeeeeeeeeeee")
 const {id}=req.params;
 console.log(id);
 const file= req.files.selectedFile;
 console.log(file);
 const savepath=path.join(__dirname,'..','Uploads',file.name);
 await file.mv(savepath);

 postMessage.update({
  title:req.body.title,
  message:req.body.message,
  creator:req.body.creator,
  tags:req.body.tags,
  SelectedFile:file.name,
  },
  {where:{ id:id }}
  ).then((result)=>{
    
    if(result){
   postMessage.findOne({where:{ id:id }})
      .then((result1)=>{
      res.send(result1);
      })
    }
  })
  
}

exports.deletePost=async (req,res)=>{
  const {id:_id}=req.params;

  postMessage.destroy({
    where: { id:_id },
  }).then((result) => {

    res.send({Message:'deleted'});
  });
}

exports.likePost=async (req,res)=>{
  const {id:_id}=req.params;
 const post = await postMessage.findOne({where:{ id:_id }})
  postMessage.update({
    like:post.like+1
  },
  {where:{id:_id}}
  ).then(result=>{
    if(result){
      postMessage.findOne({where:{ id:_id }})
         .then((result1)=>{
         res.send(result1);
         })
       }
  })
}