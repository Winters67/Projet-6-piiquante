const Sauce = require('../models/Sauce')



exports.createSauce =  (req, res, next) => {
    const sauceObject = JSON.parse(req.body.Sauces);
    delete sauceObject._id;
    const Sauces = new sauces({
      ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
     });    
   Sauces.save()
     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
     .catch(error => res.status(400).json({ error }));
  };


exports.modifySauce = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
     .then(() => res.status(200).json({ message: 'Objet modifié !'}))
     .catch(error => res.status(400).json({ error }));
 };

 exports.deleteSauce = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  sauces.findOne({ _id: req.params.id})
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
 };

 exports.getAllSauce = (req, res, next) => {
  sauces.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
 };