const Clarifai=require('clarifai');
const app = new Clarifai.App({
 apiKey: '853c717f24ad4cf990d37b7c5ab84d75'
});

const handle=(req,res,database)=>
{
	const {id}=req.body;
		database('users').where('id','=',id)
		.increment('entries',1)		//instead of update uing increment since not need to first get the entry then +1 then return
		.returning('entries')
		.then(entry=>
		{
			if(entry[0])
			{
				res.json(entry[0]);
			}
			else
				res.status(400).json('profile not found')
		})
		.catch(err=>res.status(400).json("error found"))
			
	}
const handleApiCall = (req, res) =>
 {
 	console.log('in')
  app.models.predict('72c523807f93e18b431676fb9a58e6ad', req.body.input)
    .then(data => {
    	console.log('inn')
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}
module.exports =
{
	handle:handle,
	handleApiCall:handleApiCall
}