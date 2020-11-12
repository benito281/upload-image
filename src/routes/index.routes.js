const router=require('express').Router();
const Image = require('../models/image');
const path= require('path');
const {unlink} =require('fs-extra');

router.get('/', async(req,res)=>{
	const images = await Image.find().lean();

	res.render('index',{images})
})


router.get('/upload',(req, res)=>{
	res.render('upload')
})

router.post('/upload', async (req, res)=>{
	const image= new Image();
	image.title=req.body.title;
	image.description=req.body.description;
	image.filename=req.file.filename;
	image.path= '/img/uploads/' + req.file.filename;
	image.originalname= req.file.originalname;
	image.mimetype= req.file.mimetype
	image.size = req.file.size;
	//console.log(image)
	const insertImage = await image.save();
	console.log(insertImage);
	res.redirect('/');
})

router.get('/image/:id', async(req, res)=>{
	const{id}=req.params; 
	 const searchforID= await Image.findById(id);
	 
	/* Image.findById(req.params.id) Segunda Forma */
	res.render('image-profile/profile',searchforID)
	console.log(searchforID);
})

router.delete('/image/:id/delete',async (req, res)=>{
	const {id}=req.params;
	const deleteforID=await Image.findByIdAndDelete(id)
	await unlink(path.resolve('./src/public/'+ deleteforID.path));
	res.redirect('/')
	
})

module.exports=router;

