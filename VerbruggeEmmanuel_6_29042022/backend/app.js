const express = require('express');
const mongoose = require('mongoose');
const sauces = require('./models/Sauce');
const userRoutes = require('./routes/user');
const app = express();



app.use(express.json());

mongoose.connect('mongodb+srv://Winters:E290380l@cluster0.9vp7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
  
  app.use(( req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  

 app.post('/api/sauces', (req, res, next) => {
   delete req.body._id;
   const Sauces = new sauces({
     ...req.body
    });    
  Sauces.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
 });



app.get('/api/sauces', (req, res, next) => {
  const sauces = [
    {
      userId: '',
      name: 'Ketchup',
      manufacturer:'Amora' ,
      description: 'condiment à base de tomate',
      mainPepper: 'tomate',
      imageUrl: 'https://www.action.com/globalassets/cmsarticleimages/88/92/2552952_8715700110202-111_01.png',
      heat: '2',
      likes: '10',
      dislikes: '2',
      
    }
  ]
  res.status(200).json(sauces);
});





app.use ('/api/auth' , userRoutes);


module.exports = app;

