function loadStory(story_id) {
    //  POST request
    $.ajax({
        type: "POST",
        url: '/api/get_story/',
        data: {
            storyId: story_id,
        },
        success: (article) => {
            // console.log('POST response successfully recieved!');
            // console.log(article);

            updateFrontEnd(article);
            $(".comments-section").show();
        }
    });
}

function submitComment() {

    let newCommentAuthor = $('#new-comment-author').val().trim().toLowerCase();
    let newComment = $('#new-comment-content').val().trim();
    let storyId = $(".comments").data("id");

    console.log(newComment);
    console.log(newCommentAuthor);

    if(newComment.length > 2 && newCommentAuthor.length > 2) {
        //  PUT request
        $.ajax({
            type: "PUT",
            url: '/api/add_comment/',
            data: {
                storyId: storyId,
                comment: {
                    author: newCommentAuthor,
                    content: newComment,
                },
            },
            success: (article) => {
                updateFrontEnd(article);
                $('#new-comment-author').val('');
                $('#new-comment-content').val('');
            }
        });
    }
}


function updateFrontEnd(article) {
                
    console.log(article);

    let headline = article.headline;
    let story = article.story;
    let comments = article.comments;
    let storyId = article['_id'];
    
    $(".story-heading").text(headline);
    $(".comments").data("id", storyId);

    $('.story-content').empty();
    for(let i=0; i < story.length; i++) {
        let para = $('<p>').text(story[i]);
        $('.story-content').append(para);
    }

    $('.comments-content').empty();
    for(let i=0; i < comments.length; i++) {
        let comment = $('<p>').html(`<span class="comment-author">${comments[i].author}</span> | ${comments[i].content}`);
        $('.comments-content').append(comment);
    }

}