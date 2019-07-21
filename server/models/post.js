const Post = mongoose.model(
  'Post',
  new mongoose.Schema({
    author: String,
    image: String,
    likes: Number,
    body: String,
    comments: [{ author: String, body: String, date: Date }],
    date: { type: Date, default: Date.now }
  })
)
