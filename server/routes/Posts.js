const express=require('express');
const router =express.Router();
const postcontrollers=require('../controllers/post')
const path=require('path');
const auth =require('../middleware/auth');

router.get('/',postcontrollers.getPosts);

router.post('/',auth,postcontrollers.newpost);

router.patch('/:id',auth,postcontrollers.updatePost)

router.delete('/:id',auth,postcontrollers.deletePost);

router.patch('/:id/likepost',auth,postcontrollers.likePost);

module.exports=router;