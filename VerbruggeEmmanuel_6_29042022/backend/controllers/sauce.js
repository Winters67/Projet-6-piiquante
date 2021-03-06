const Sauce = require('../models/Sauce')
// donne accès aux fonctions qui nous permettent de modifier le système de fichiers
const fs = require('fs');

//------------------ Création d'une sauce -----------------------//

exports.createSauce =  (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
     });    
   sauce.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
  };

//----------------- Modification de la sauce ----------------------//

exports.modifySauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
  
};

//----------------- Suppression  de la sauce ----------------------//

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};


//----------------- Renvoie une  sauce ---------------------------//

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
  .then((sauce) => res.status(200).json(sauce))
  .catch(error => res.status(400).json({ error }));
};

//----------------- Renvoie un tableau des  sauces-----------------//


 exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
 };

 
 
 
// ----------------------- LikeDislike d'une sauce ----------------------- //


exports.addLikeToSauce = (req, res, next) => {

  
  
  Sauce.findById(req.params.id).then(sauce => {
      switch (req.body.like) {
          case 1:// si un utilisateur like une sauce
              sauce.usersLiked.push(req.body.userId);
              // màj sauce: on incrémente de 1 le nombre de likes et on ajoute l'userId au tableau usersLiked
              sauce.likes += 1;            
              break;
          case -1: //si un utilisateur dislike une sauce
              sauce.usersDisliked.push(req.body.userId);
            
              sauce.dislikes += 1;
              break;
          case 0:  //si un utilisateur annule son like ou son dislike
              let index = sauce.usersLiked.indexOf(req.body.userId);
              if (index !== -1) {
                  sauce.usersLiked.splice(index, 1);
                 
                  sauce.likes += -1;
              } else {
                  index = sauce.usersDisliked.indexOf(req.body.userId);
                  sauce.usersDisliked.splice(index, 1);
                 
                  sauce.dislikes += -1;
              }
              break;
      }

     
      Sauce.findByIdAndUpdate(req.params.id, { ...sauce })
          .then(() => res.status(201).json({ message: 'Votre vote a bien été enregistré !' }))
          .catch(error => res.status(400).json({ error }));
  })
      .catch(error => res.status(500).json({ error }));


};