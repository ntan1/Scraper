// const data = require('../data/data.json');
const funcs = require('../functions');
const scraper = require('./scraper');
const crud = require('./crud');

const routes = (app) => {

    app.get('/', (req, res) => {
        
        ( async () => {
            
            //  Should return the last update date
            let lastUpdate = await crud.checkLastUpdate('nyTimes');
            console.log(`Last Update: ${lastUpdate}`);
            
            //  Checks to see if the last update was today
            if(funcs.getDate() == lastUpdate) {
                let articles = await crud.getArticles(funcs.getDate());
                res.render('index', { articles: articles });
            } else {
                let uploadArticles = await scraper.NyTimes();
                await crud.bulkInsertArticles(uploadArticles);
                await crud.updateLastScrape();
                let articles = await crud.getArticles(funcs.getDate());
                res.render('index', { articles: articles });
            }
        }) ();
    });

    app.post('/api/get_story/', (req, res) => {
        let storyId = req.body.storyId;
        console.log(`POST Request recieved for Story Id: ${storyId}`);
        crud.findArticle(storyId).then(article => {
            res.send(article);
        })
    });

    app.put('/api/add_comment/', (req, res) => {
        let storyId = req.body.storyId;
        let newComment = req.body.comment;
        console.log(`PUT request: Add comment '${newComment}' to story id: ${storyId}`);

        crud.addComment(storyId, newComment).then(article => {
            res.send(article);
        })
    });
}

module.exports = routes;