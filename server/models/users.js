const User = mongoose.model(
  'User',
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
      unique: true
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    }
  })
)
