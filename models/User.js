const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    unique: true,
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  authored: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry',
  }],
});

userSchema.pre('save', function(next) {
  let user = this;
  bcrypt.hash(user.password, 11, (err, hashed) => {
      if(err) throw new Error(err);

      user.password = hashed;
      next();
  });
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
