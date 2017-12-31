var SpacebookApp = function () {
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }

    currentId += 1;

    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' +
        '<input type="text" class="comment-name">' +
        '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>' +
        '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var createComment = function (commentText, commentIndex) {
    var comment = {
      text: commentText
    };
    posts[commentIndex].comments.push(comment);
    console.log(posts)
  }

  var renderComments = function () {
    $('.comments-list').empty();
    for (var i = 0; i < posts.length; i++) {
      // the post we are working on
      var workingPost = $('.posts').find('.post').eq(i);
      // current post in the array
      var post = posts[i];

      // array for traversing comments
      for (var j = 0; j < post.comments.length; j++) {
        var comment = post.comments[j]
        workingPost.append("<div><li class = 'comment'>" + comment.text + "</li><button type='button' class='remove-comment'>REMOVE</button></div>")

      }
    }

  }

  var removeComment = function (chosenComment, commentIndex, postIndex) {
    posts[postIndex].comments.splice(commentIndex, 1);
    chosenComment.remove();

  }


  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    // TODO: Implement
    createComment: createComment,

    // TODO: Implement
    renderComments: renderComments,

    // TODO: Implement
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
  app.renderComments();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});


$('.posts').on('click', '.add-comment', function () {
  var commentText = $(this).siblings('.comment-name').val();
  var commentIndex = $(this).closest('.post').index();
  app.createComment(commentText, commentIndex)
  app.renderComments();



})

$('.posts').on('click', '.remove-comment', function () {
  var chosenComment = $(this).prev();
  var commentIndex = chosenComment.index();
  var postIndex = chosenComment.closest('.post').index();

  app.removeComment(chosenComment, commentIndex, postIndex);


})

