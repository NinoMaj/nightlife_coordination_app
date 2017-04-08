const mongoose = require('mongoose');

// define the WhoIsComing model schema
const ComingSchema = new mongoose.Schema({
  barId: String,
  coming: [String]
});

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
// UserSchema.methods.comparePassword = function comparePassword(password, callback) {
//   bcrypt.compare(password, this.password, callback);
// };

/**
 * The pre-save hook method.
 */
// UserSchema.pre('save', function saveHook(next) {
//   const user = this;

//   return bcrypt.genSalt((saltError, salt) => {
//     if (saltError) {
//       return next(saltError);
//     }

//     return bcrypt.hash(user.password, salt, (hashError, hash) => {
//       if (hashError) {
//         return next(hashError);
//       }

//       // replace a password sting with hash value
//       user.password = hash;

//       return next();
//     });
//   });
// });

module.exports = mongoose.model('Coming', ComingSchema);