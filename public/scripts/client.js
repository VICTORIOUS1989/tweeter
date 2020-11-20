$(document).ready(() => {

 

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
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
          <p>${escape(tweet.content.text)}</p>
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
  //  $('#tweets-container').empty();
    $.ajax({
      url : "/tweets", 
      method :"GET"
    })
    .then (res => {renderTweets(res)});
   }

   



      $('form').on('submit', event => {
          event.preventDefault();
        //console.log($('form').serialize());

        const textArea = $('form').serialize();
        let nbcaracters = $('#tweet-text').val();
       //console.log(nbcaracters.length);
        if (nbcaracters.length > 140) {
        $(".container").prepend($("<div>").addClass("tweet-error").text("Slow down there, tweet away but keep it below 140").fadeIn(200).fadeOut(4500));
        return;
        }
        if (nbcaracters === "" || nbcaracters=== null) {
          $(".container").prepend($("<div>").addClass("tweet-error").text("I couldn't catch that, try again?").fadeIn(200).fadeOut(4500));
          return;        
        }

        if (nbcaracters.length > 0 && nbcaracters.length < 140){
          $.ajax({
            url : "/tweets/", 
            method :"POST",
            data : textArea
          })

            .then (res => {
              $('#tweet-text').val("");
              $("form").find('.counter').val(140);
              loadtweets();
            });
        }
        

      });


      loadtweets();


     // let TweetsData = loadtweets();
      //console.log(TweetsData);
     //renderTweets(TweetsData);
    


});


const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
