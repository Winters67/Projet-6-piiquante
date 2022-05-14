const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // plugins adresse email unique  

const userSchema = mongoose.Schema({
  email: { type: String,
   validate : [/.+@.+\..+/,],
     required:true,unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator, { message: 'Cet email est déjà utilisé sur ce site.' });
module.exports = mongoose.model('User', userSchema);