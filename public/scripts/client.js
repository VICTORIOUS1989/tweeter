
$(document).ready(() => {

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1261113959088
    }
  ]

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $Newtweet = createTweetElement(tweet);
    $('#tweets-container').append($Newtweet);

    }

  }

  const createTweetElement = function(tweet) {

        const date = `${Math.round((Date.now() - Number(tweet.created_at))/(1000*3600*24))} days ago`;
        let  $tweet= (`<article class="tweet">

        <header class='tweetsHeader'>
          <div class='RightHeader'>
            <img class='avatar' src="https://i.imgur.com/nlhLi3I.png" >
            <div id="userName">${tweet.user.name}</div>
          </div>
          <div id="handler">${tweet.user.handle}</div>
        </header>

        <div class='tweet-content'>
          <p>${tweet.content.text}</p>
        </div>

        <footer>
          <p>${date}</p>
          <div class='tweet-icons'>   
          </div>
        </footer>
        </article> `);

        return $tweet;

  }

  renderTweets(tweetData);


      $('form').on('submit', event => {
        event.preventDefault();
      //console.log($('form').serialize());
      $.ajax({
        url : "/tweets/", 
        method :"POST",
        data : $('form').serialize()
      })
        .then (res => console.log(res));

  });


          


});


