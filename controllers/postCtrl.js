const models = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils')


exports.getAll = (req,res) => {
	models.Posts.findAll({
		include:[
			{
				model:models.User,
				attributes:['user_name']
			}
		]
	})
	.then(result => res.status(200).json(result))
	.catch(error => res.status(500).json(error))
}

exports.getOne = (req,res) => {
	let id = req.params.id
	models.Posts.findOne({
		where: {id:id},
		include:[
			{
				model:models.User,
				attributes:['user_name']
			}
		]
	})
	.then(result => res.status(200).json(result))
	.catch(error => res.status(500).json(error))
}

exports.create = (req,res) => {
	models.Posts.create({
        topic: req.body.topic,
        content: req.body.content,
        attachement: req.body.attachement,
        moderated: 0,
        likes: 0,
        creator_id: req.body.userId,
	})
	.then(post => {result=>res.status(200).json({message:'Post created'})})
	.catch(error => res.status(500).json(error))
}

exports.moderate = (req,res) => {
	let id = req.params.id
	models.Posts.update({
		topic:req.body.topic,
		content:req.body.content,
		attachement:req.body.attachment,
		moderated:req.body.moderated,
	},{
		where:{id:id}
	})
	.then(result => res.status(200).json({message:'Post modified'}))
	.catch(error => res.status(500).json(error))
}

exports.delete = (req,res) =>{
	let id = req.params.id
	models.Posts.destroy({
		where:{id:id}
	})
	.then(result => res.status(200).json({message:'Post destroyed'}))
	.catch(error => res.status(500).json(error))
}