const express = require("express");
const router = express.Router();
const scraper = require("../utilities/nyt-scraper.js");
const db = require("../models");

/* GET home page. */
router.get("/", (req, res, next) => {
  scraper().then((articles) => {
    return db.Comment.find({}).then(comments => {
      const commentsByArticle = {};
      comments.forEach(comment => {
        if (!commentsByArticle.hasOwnProperty(comment.articleTitle)) {
          commentsByArticle[comment.articleTitle] = [comment];
        } else {
          commentsByArticle[comment.articleTitle].push(comment);
        }
      });
      res.render("index", {
        title: "New York Times",
        articles,
        comments: commentsByArticle
      });
    });
  }).catch(next);
});

router.get("/comments/:articleTitle", (req, res, next) => {
  const articleTitle = decodeURIComponent(req.params.articleTitle);
  db.Comment.find({
    articleTitle
  }).then((comments) => {
    res.render("comments", {
      articleTitle,
      comments
    });
  }).catch(next);
});

router.post("/new-comment/:articleTitle", (req, res, next) => {
  const articleTitle = decodeURIComponent(req.params.articleTitle);

  const newComment = new db.Comment({
    name: req.body.author,
    body: req.body.commentBody,
    articleTitle
  });

  newComment.save()
    .then(() => res.redirect(`/comments/${encodeURIComponent(articleTitle)}`))
    .catch(next);
});

module.exports = router;
