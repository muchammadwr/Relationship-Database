const mongoose = require("mongoose");

// connect to mongodb

mongoose
  .connect("mongodb://127.0.0.1/relation_db")
  .then((result) => {
    console.log("connect to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
});

const tweetSchema = new mongoose.Schema({
  text: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweet = async () => {
  const user = await User.findOne({
    username: "John Doe",
  });

  const tweet = new Tweet({
    text: " Hallo World War 2",
    likes: 0,
  });
  tweet.user = user;
  tweet.save();
};

// makeTweet();

const showTweets = async () => {
  const tweets = await Tweet.findById("661fa20d50dca547456ba94c").populate(
    "user"
  );
  console.log(tweets);
};

showTweets();
