const models = require('../models');

exports.getAll = (req,res) => {
	models.Comment.findAll()
	.then(result => res.status(200).json({message:result}))
	.catch(error => res.status(400).json(eror))
}

exports.Count = (req,res) => {
	models.Comment.count()
	.then(result => res.status(200).json({message:result}))
	.catch(error => res.status(400).json(eror))
}

exports.getOne = (req,res) => {
	let id = req.params.id
	models.Comment.findOne({
		where:{id:id},
		include:{model:models.User,attributes:{exclude:['password']}}
	})
	.then(result => res.status(200).json({message:result}))
	.catch(error=>res.status(400).json(error))
}

exports.send = (req,res) => {
	models.Comment.create({
		content:req.body.content,
		posts_id: req.body.posts_id,
		users_id : req.body.user_id
	})
	.then(result => res.status(200).json({message:'Comment send'}))
	.catch(error => res.status(400).json(error))
}

exports.modify = (req,res) => {
	models.Comment.update({
		content:req.body.content,
		posts_id: req.body.posts_id,
		users_id : req.body.user_id
	},{
		where:{id:req.params.id}
	})
	.then(result => res.status(200).json({message:'Comment modified'}))
	.catch(error => res.status(400).json(error))
}

exports.delete = (req,res) => {
	models.Comment.destroy({
		where:{id:req.params.id}
	})
	.then(result => res.status(200).json({message:'Comment deleted'}))
	.catch(error => res.status(400).json(error))
}

exports.test = (req,res) => {
	models.Comment.findAll()
	.then(result => res.status(200).json({message:result}))
	.catch(error => res.status(400).json(eror))
}