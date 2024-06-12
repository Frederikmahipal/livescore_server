import axios from 'axios';
import cheerio from 'cheerio';

export async function crawlWebsite(url) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
  
      const articles = [];
  
      $('.news-list__item').each((index, element) => {
        const title = $(element).find('.news-list__headline').text().trim();
        const link = $(element).find('.news-list__headline a').attr('href');
        const summary = $(element).find('.news-list__snippet').text().trim();
        let image = $(element).find('.news-list__image').attr('data-src');
  
        articles.push({ title, link, summary, image });
      });
  
      return articles;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while crawling the website');
    }
  }
  
  crawlWebsite('https://www.skysports.com/football')
    .then(articles => console.log(articles))
    .catch(error => console.error(error));

    