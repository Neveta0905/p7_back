const models = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utils')

exports.signup = (req,res) =>{
	bcrypt.hash(req.body.password,10)
	.then(hash => {
		models.User.create({
			email:req.body.email,
			password:hash,
			user_name: req.body.user_name,
			office: req.body.office
			}
		)
		.then(result => res.send(result))
		.catch(error => {
			let name = error.name
			if (name === 'SequelizeUniqueConstraintError')
				res.status(400).send({error:'Mail already registered'})
			else
				res.status(400).send(error)
		})
	})
	.catch((error) => res.status(500).json(error))
}

exports.login = (req,res) =>{
	models.User.findOne({
		attributes: ['id','password','role'],
		where: {email: req.body.email}
	})
	.then(user => {
		if(!user){
			return res.status(401).json({error:'Wrong Id'})
		}
		bcrypt.compare(req.body.password,user.password)
		.then(valid =>{
			if(!valid){
				return res.status(401).json({error:valid})
			}
			res.status(200).json({
				userId:user.id,
				token: jwt.sign( // User Id gardé cypté en front
					{ userId: user.id},
					'RANDOM_TOKEN_SECRET',
					{ expiresIn:'24h'}
				),
				role: user.role
			})
		})
		.catch(error => res.status(500).json(error))
	})
	.catch(error => res.status(500).json(error))
}

exports.userProfil = (req, res) => {
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'user_name','role','office'],
        where: { id: id},
        //include: Model.company // Left join // Faire une seule requete
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
};

exports.userProfilById = (req, res) => {
    let id = req.params.id
    models.User.findOne({
        attributes: ['id', 'email', 'user_name','role','office'],
        where: { id: id},
        //include: Model.company // Left join // Faire une seule requete
    })
    .then(user => user!=null ? res.status(200).json(user) : res.status(400).json({error:'User doesn\'t exist'}))
    .catch(error => res.status(500).json(error))
};

exports.test = (req,res) => {
	const { Op } = require('sequelize');
	models.User.findAll({
		attributes: ['id', 'user_name','role','password','office','bio'],
        /*where:{ [Op.or]:[
          	{ id: '1'},
          	{email:'efef@free.fr'}
        ]
       	}*/
	})
	.then( user => res.status(200).json(user))
	.catch(error => res.status(500).json(error))
}