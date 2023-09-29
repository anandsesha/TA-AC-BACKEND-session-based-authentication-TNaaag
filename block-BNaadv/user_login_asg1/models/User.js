var mongoose = require('mongoose');
const { use } = require('../routes');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 5, maxlength: 10 },
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    console.log(this, `inside pre-save hook`);
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      console.log(hashed);
      this.password = hashed; // put the hashed passwd into existing string passwrod '123456'
      return next();
    });
  } else {
    next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
