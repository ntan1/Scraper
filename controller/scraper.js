const request = require('request');
const cheerio = require('cheerio');
const funcs = require('../functions');

const customHeaderRequest = request.defaults({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }
});

//  Returns a Promise
//  Returns an array of objects, each containing: headline, summary(if exists), url
function nyTimesHeadlines() {
    return new Promise(resolve => {
        
        customHeaderRequest.get({
            url: `https://www.nytimes.com/section/world`,
            jar: true,
            followAllRedirects: true
        }, (error, response, body) => {3

            if (!error && response.statusCode == 200) {
                
                let $ = cheerio.load(body);
            
                let articles = [];

                $('article').each(function(i, elem) {
                    
                    let hlCheck = $('.headline', this).text().trim();
                    
                    let headline = hlCheck;
                    let url = $('a', this).attr('href');
                    let summary = $('.summary', this).text().trim();
                    let date = funcs.getDate();
                    
                    let article = new funcs.Article(headline, url, summary, date)

                    articles.push(article);
                });

                resolve(articles);
            }
        });
    })
}

//  Returns a Promise
//  Returns a string of the article
function nyTimesStory(articleObj) {
    return new Promise(resolve => {
        
        customHeaderRequest.get({
            url: articleObj.url,
            jar: true,
            followAllRedirects: true
        }, (error, response, body) => {

            if (!error && response.statusCode == 200) {
                
                let $ = cheerio.load(body);
                
                let story = [];

                $('.StoryBodyCompanionColumn').each(function(i, elem) {
                    
                    let paragraph = $('p', this).text().trim();
                    if(paragraph.length > 2) {
                        story.push(paragraph);
                    }

                });

                articleObj.story = story;

                resolve(articleObj);
            }
        });

    })

}

function nyTimesArticles() {
    return new Promise(resolve => {
        (async () => {
            console.log(`Begin Scrape 'New York Times'`);
            let articles = await nyTimesHeadlines();
            for(let i = 0; i < articles.length; i++ ) {
                console.log(`Scraping NYTimes article ${i}: '${articles[i].headline}'`);
                articles[i] = await nyTimesStory(articles[i])
            }
            resolve(articles);
        }) ();
    })
}

module.exports = {
    NyTimes: nyTimesArticles,
};