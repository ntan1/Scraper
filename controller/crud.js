const models = require('../models/models');
const funcs = require('../functions');

function checkLastUpdate(newsOutlet) {
    return new Promise(resolve => {
        models.Meta.findOne( { data: 'lastScrape' } ).exec( (err, data) => {
            if(err) return handleError(err);
            let lastUpdate = data[newsOutlet];
            resolve(lastUpdate);
        })
    })
}

function getArticles(date) {
    return new Promise(resolve => {
        models.ArticleNyTimes.find({ scrapeDate: date }).exec( (err, data) => {
            if(err) return handleError(err);
            console.log('Articles retrieved from MongoDB')
            resolve(data);
        })
    })
}

function updateLastScrape() {
    return new Promise(resolve => {
        models.Meta.updateOne({ data: 'lastScrape'}, { nyTimes : funcs.getDate() }, (err, res) => {
            if(err) return handleError(err);
            console.log('Last Scrape for nyTimes updates to today!');
            resolve(true);
        })
    })
}

function bulkInsertArticles(articles) {
    return new Promise(resolve => {
        models.ArticleNyTimes.insertMany( articles, (err, res) => {
            console.log(err);
            console.log('Bulk insert of articles complete!')
            resolve(true);
        })
    })
}

function findArticle(id) {
    return new Promise(resolve => {
        models.ArticleNyTimes.findById(id, (err, res) => {
            if(err) return handleError(err);
            console.log(`Found Article: ${id}`);
            resolve(res);
        })
    })
}

function addComment(id, comment) {
    return new Promise(resolve => {
        
        models.ArticleNyTimes.updateOne({ _id: id }, { $push: {comments : comment} }, (err, res) => {
            if(err) return handleError(err);
            console.log(`Comment added to article id: ${id}`);
            findArticle(id).then(article => {
                resolve(article)
            })
        })

    })
}


module.exports = {
    checkLastUpdate: checkLastUpdate,
    getArticles: getArticles,
    updateLastScrape: updateLastScrape,
    bulkInsertArticles: bulkInsertArticles,
    findArticle: findArticle,
    addComment: addComment,
};