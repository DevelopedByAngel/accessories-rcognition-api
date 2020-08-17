const handle=(req,res,database) =>
{
		const {id}=req.params;
		database.select('*').from('users')
		.where({id:id})
		.then(user=>
			{
				if(user.length){
				res.json(user[0])
			}
				else
					res.status(400).json('profile not found')
			
			})
		.catch(err=>res.status(400).json("error"))
		
	}
	module.exports =
	{
		handle:handle
	}