const axios = require("axios");
const cheerio = require("cheerio");

// Scrape articles from the New York Times and return them.
module.exports = () => {
  return axios.get("https://www.nytimes.com")
    .then((response) => {
      const $ = cheerio.load(response.data);
      const articles = [];

      $("article").each(function () {
        const $article = $(this);
        articles.push({
          title: $article.find("h2").text(),
          summary: $article.find("p").text(),
          url: `https://www.nytimes.com${$article.find("a").attr("href")}`
        });
      });

      return articles;
    });
};
