import express from 'express';
import { crawlWebsite } from '../crawler.js';
import { Article, Comment } from '../models/articles.js';

const router = express.Router();

router.get('/Articles', async (req, res) => {
  try {
    const crawledArticles = await crawlWebsite('https://www.skysports.com/football');
    for (const article of crawledArticles) {
      const existingArticle = await Article.findOne({ link: article.link });
      if (!existingArticle) {
        await Article.create(article);
      }
    }
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while crawling the website' });
  }
});

router.get('/Articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the article' });
  }
});

router.post('/:id/comments', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    let comment = await Comment.create({
      user: req.body.user, 
      text: req.body.text,
      article: article._id,
    });
    
    comment = await Comment.populate(comment, {path: 'user'});

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the comment' });
  }
});

router.get('/:id/comments', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    const comments = await Comment.find({ article: article._id }).populate('user');
    console.log
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while getting the comments' });
  }
});

export default router;