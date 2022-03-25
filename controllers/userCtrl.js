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
			role_id:1,
			office_id:1
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
		attributes: ['id','password','role_id'],
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
				role: user.role_id
			})
		})
		.catch(error => res.status(500).json(error))
	})
	.catch(error => res.status(500).json(error))
}

exports.userProfil = (req, res) => {
    let id = utils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'user_name','bio'],
        where: { id: id},
        include: [models.Office,models.Role] // Left join // Faire une seule requete
    })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
};

exports.userProfilById = (req, res) => {
    let id = req.params.id
    models.User.findOne({
        attributes: ['id', 'email', 'user_name','bio','office_id'],
        where: { id: id},
        //include: Model.company // Left join // Faire une seule requete
    })
    .then(user => user!=null ? res.status(200).json(user) : res.status(400).json({error:'User doesn\'t exist'}))
    .catch(error => res.status(500).json(error))
};

exports.userModif = async (req,res) => {
	let id = utils.getUserId(req.headers.authorization)
	let new_password
	if(req.body.password){
		new_password = await bcrypt.hash(req.body.password,10)
	}

	models.User.update(
		{
			email:req.body.email,
			password:new_password,
			user_name:req.body.user_name,
			bio:req.body.bio,
			office_id:req.body.office_id
		},
        {where:{id:id}}
	)
	.then( user => res.status(200).json('Auto modification complete'))
	.catch(error => res.status(500).json(error))
}

exports.moderate = (req,res) =>{
	models.User.update(
	{
		moderated: req.body.moderated,
		user_name:req.body.user_name,
		bio:req.body.bio,
		role_id:req.body.role_id,
		office_id:req.body.office_id
	},
	{
		where:{id:req.params.id}
	}
	)
	.then(result => {res.status(200).send('User modified')})
	.catch(error => res.status(500).json(error))
}

exports.delete = (req,res) =>{
	models.User.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(result => {res.status(200).send('User deleted')})
	.catch(error => res.status(500).json(error))
}

exports.selfDelete = (req,res) => {
	models.User.destroy({
		where:{
			id: utils.getUserId(req.headers.authorization)
		}
	})
	.then(result => res.status(200).json({message:'Account destroyed'}))
	.catch(error => res.status(500).json(error))
}

// OP or and or
/*models.User.findAll({
attributes: ['id', 'user_name','role','password','office','bio'],
where:{ [Op.or]:[
  	{ id: '1'},
  	{email:'efef@free.fr'}
]
	}*/