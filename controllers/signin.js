const handle=(req,res,bcrypt,database)=>
{
	if(!req.body.email ||!req.body.password)
	{
		res.status(400).json('wrong credentials')	
	}
	else
	{
	database.select('email','hash').from('login')
		.where('email','=',req.body.email)
		.then(data=>{
			const validity=bcrypt.compareSync(req.body.password,data[0].hash);
			if(validity)
			{
				return database.select('*').from('users')
				.where('email','=',req.body.email)
				.then(user=>
				{
					res.json(user[0])
				})
				.catch(err=>res.status(400).json('unable to get user'))
			}
			else
				res.status(400).json('wrong credentials')

		})
		.catch(err=>res.status(400).json('unable to signin'))
	}
}
module.exports =
{
	handle:handle
}