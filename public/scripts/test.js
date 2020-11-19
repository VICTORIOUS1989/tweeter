$(document).ready(() => {

 

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      let $Newtweet = createTweetElement(tweet);
    $('#tweets-container').append($Newtweet);

    }

  }
  const renderLastTweet = function(tweet) {
   //$('#tweets-container').empty();
   // for (let tweet of tweets) {
      let $Newtweet = createTweetElement(tweet);
    $('#tweets-container').append($Newtweet);

    //}

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

  const  loadtweets = ()=> {
    //$('#tweets-container').empty();
    $.ajax({
      url : "/tweets", 
      method :"GET"
    })
    .then (res => {renderTweets(res)});
   }

   const  addLastTweet = ()=> {
    $.ajax({
      url : "/tweets", 
      method :"GET"
    })
    .then (res => {renderLastTweet(Object.values(res).pop())});
   }

   loadtweets();

      $('form').on('submit', event => {
          event.preventDefault();
        //console.log($('form').serialize());
        const textArea = $('form').serialize();
        let nbcaracters = $('#tweet-text').val();
       //console.log(nbcaracters.length);
        if (nbcaracters.length > 140) {
          alert('Charater limit exceeded!');
        }
        if (nbcaracters === "" || nbcaracters=== null) {
          alert('write something');
        }

        if (nbcaracters.length > 0 && nbcaracters.length < 140){
          $.ajax({
            url : "/tweets/", 
            method :"POST",
            data : textArea
          })
            .then (res => {});
        }

        addLastTweet();

      });


     

     // let TweetsData = loadtweets();
      //console.log(TweetsData);
     //renderTweets(TweetsData);
    


});


