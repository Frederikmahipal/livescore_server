import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: String,
  link: String,
  summary: String,
  image: String,
}, {
  timestamps: true
});

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  text: String,
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }, 
}, {
  timestamps: true
});
  

const Article = mongoose.model('Article', ArticleSchema);
const Comment = mongoose.model('Comment', CommentSchema);

export { Article, Comment };