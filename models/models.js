const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* ----------------------------------------------------------
    SCHEMAS
---------------------------------------------------------- */

//  Meta Data Schema
const meta = {
    data: {
        type: 'string',
    },
    nyTimes: {
        type: 'string'
    },
};

//  News Article Schema - Identical for all News Outlets
const articleSchema = {
    headline: {
        type: 'string',
    },
    url: {
        type: 'string',
    },
    summary: {
        type: 'string',
    },
    comments: {
        type: 'array',
        default: [],
    },
    story: {
        type: 'array',
    },
    scrapeDate: {
        type: 'string',
    },
};


/* ----------------------------------------------------------
    SCHEMAS & MODEL CONSTRUCTION
---------------------------------------------------------- */


//  Schema Constructors
const metaSchema = new Schema(meta, { collection: 'meta' });
const nyTimesSchema = new Schema(articleSchema, { collection: 'nyTimes' });

//  Model Constructors
const Meta = mongoose.model('Meta', metaSchema);
const ArticleNyTimes = mongoose.model('Article', nyTimesSchema);


module.exports = {
    Meta: Meta,
    ArticleNyTimes: ArticleNyTimes,
};