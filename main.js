var posts = [];
var postId = []
var idCounter = 0

function generateId() {
    idCounter++
    postId.push(idCounter);


}

function createPost() {
    var textPost = $('#post-name').val();
    generateId();
    var post = {
        text: textPost,
        id: postId.length,
        comments: {
            commentPoster: "",
            commentText: ""
        }
    }
    posts.push(post);
    renderPosts()
}




function renderPosts() {
    var commentForm = "<div class='form-group'><form class='comment-form'><input type= 'text'id='comment-user' class='form-control' placeholder='enter name here'><input type='text' id='comment-text' class='form-control' placeholder='enter text here'></form><button type='button' class='add-comment'>Post Comment</button></div>"
    $('#post-name').val('')
    $('.posts').find('p').remove();
    for (i = 0; i < posts.length; i++) {
        $('.posts').append("<p class= post data-id=" + posts[i].id + ">" + "<button type='button' class='remove'>REMOVE</button>" + posts[i].text + "</p>" + "<span class='comment'>" + posts[i].comments.commentPoster + "    " + posts[i].comments.commentText + "</span>")
    }
    $('.posts').find('p').append(commentForm)
}

// 


// click handler for posting
$('form').on('click', '.add-post', function () {
    createPost();
})

// click handler for deleting post
$('.posts').on('click', '.remove', function () {
    var postIndex = $(this).closest('p').data().id;
    var index = posts.map(function (e) {
        return e.id;
    }).indexOf(postIndex);
    posts.splice(index, 1)
    renderPosts();
})
// clicker for adding comments
