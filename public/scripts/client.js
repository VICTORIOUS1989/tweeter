
$(document).ready(() => {

 

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


     const  loadtweets = ()=> {
      $.ajax({
        url : "/tweets", 
        method :"GET"
      })
      .then (res => {renderTweets(res)});
     }


     // let TweetsData = loadtweets();
      //console.log(TweetsData);
     //renderTweets(TweetsData);
     loadtweets();
          


});


