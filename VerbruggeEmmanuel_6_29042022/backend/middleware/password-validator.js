const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

// prettier-ignore
passwordSchema
    .is().min(4)                                    // Minimum length 8
    .is().max(50)                                   // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
// prettier-ignore

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
