const models = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils')

exports.showAll = (req,res) =>{
	models.Office.findAll({
		attributes: ['id','name','moderated']
	})
	.then(result => res.status(200).json(result))
	.catch(error => res.status(500).json(error))
}

exports.create = (req,res) =>{
	models.Office.create({
		name:req.body.name,
		moderated:0
	})
	.then(result => res.status(200).json({message:'Office created'}))
	.catch(error => res.status(500).json(error))
}

exports.moderate = (req,res) =>{
	models.Office.update({
		name:req.body.name,
		moderated:req.body.moderated
	},
	{where:{id:req.params.id}}
	)
	.then(result => res.status(200).json({message:'Office modified'}))
	.catch(error => res.status(500).json(error))
}
exports.suppress = (req,res) =>{
	models.Office.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(result => {res.status(200).send({message:'Office deleted'})})
	.catch(error => res.status(500).json(error))

}