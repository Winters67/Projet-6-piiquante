const Sauce = require('../models/Sauce')


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


exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
     .catch(error => res.status(400).json({ error }));
 };

 exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
 };

 exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
 };

 ///post/:id/like
exports.addLikeToSauce = (req, res, next) => {

  
  
  Sauce.findById(req.params.id).then(sauce => {
      switch (req.body.like) {
          case 1:
              sauce.usersLiked.push(req.body.userId);
              
              sauce.likes += 1;
              break;
          case -1:
              sauce.usersDisliked.push(req.body.userId);
            
              sauce.dislikes += 1;
              break;
          case 0:
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