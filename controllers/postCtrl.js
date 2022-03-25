const models = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils')


exports.getAll = (req,res) => {
	models.Posts.findAll({
		include:[
			{
				model:models.User,
				include:[
					{model:models.Office,attributes:{exclude:['id']}},
					{model:models.Role,attributes:{exclude:['id']}}
				],
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
	.then(post => {
		let office_id
		req.body.office_id!=undefined ? office_id = req.body.office_id : office_id = 1

		models.Post_has_Office.create({
			offices_id:office_id,
			posts_id:post.id
		})
		.then(result=>res.status(200).json({message:'Post created'}))
		.catch(error => res.status(500).json(error))
	})
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