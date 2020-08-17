const handle=(req,res,bcrypt,database) =>
{
		const {name,email,password} = req.body;
		if (!name || !email || !password)
		{
			res.status(400).json('wrong credentials')
		}
		else{
		const hash=bcrypt.hashSync(password);//getting hashed password
		database.transaction(trx=>//intializing transaction
		{
			trx.insert({ //inserting via transaction
				hash:hash,
				email:email
			})
			.into('login') //into table name
			.returning('email')//getting the email column
			.then(loginemail=>//using the returned email fr users
			{
				return trx('users') 
				.returning('*')
				.insert({
					email: loginemail[0],//response will be array so
					name: name,
					joined:new Date()
					})
				.then(user=>{
					if(user){
					res.json(user[0])
				}
				})
			})
			.then(trx.commit)//if no error then commit changes to original
			.catch(trx.rollback)//if error occured then undo operation
		})
		.catch(err=>res.status(400).json('unable to register'))

	}
}

module.exports =
{
	handle:handle
};