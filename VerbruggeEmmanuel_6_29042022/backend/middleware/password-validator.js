const passwordValidator = require('password-validator');

// Créer un schéma 
const passwordSchema = new passwordValidator();

// Ajoutez des propriétés au 
passwordSchema
    .is().min(4)                                     // Longueur minimale 8 
    .is().max(50)                                    // Longueur maximale 100 
    .has().uppercase()                              // Doit contenir des lettres majuscules
    .has().lowercase()                              // Doit contenir des lettres minuscules
    .has().digits(2)                                // Doit avoir au moins 2 chiffres
    .has().not().spaces()                           // Ne doit pas avoir d'espaces 
    .is().not().oneOf(['Passw0rd', 'Password123']); // Liste noire ces valeurs



// Comparaison avec le password envoyé
module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
      console.log("Le mot de passe est valide");
    next();
  } else {
    console.log(passwordSchema.validate(req.body.password, { list: true }));
    return res
      .status(400)
      .json({ error: `Le mot de passe n'est pas valide : ${passwordSchema.validate(req.body.password, { list: true })}` });
  }
};
