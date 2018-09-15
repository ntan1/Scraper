module.exports = {
    getDate: function() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1;
        mm = ((mm < 10) ? `0${mm}` : mm );
        let dd = d.getDate();
        dd = ((dd < 10) ? `0${dd}` : dd );
        let date = `${yyyy}-${mm}-${dd}`;
        return date;
    },

    //  Returns true if the date given matches todays date
    checkDate: function(date) {
        let today = module.exports.getDate();
        if (today === date) { 
            return true;
        } else {
            return false;
        }
    },

    Article: function(headline, url, summary, date) {
        this.headline = headline;
        this.url = url;
        if(summary.length > 1) {
            this.summary = summary;
        }
        this.story = [];
        this.comments = [];
        this.scrapeDate = date;
    }
}

