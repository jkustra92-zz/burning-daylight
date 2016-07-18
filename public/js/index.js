console.log("hello, friend. hello, friend? that's lame.");
//have to start every app off with this mr. robot reference. it's just my thing.

var App = React.createClass({
  getInitialState: function(){                      //so as of now, nothing in my app has state. they are stateless components, hiding behind buttons.
    return {
      watson: undefined,
      spotify: undefined,
      quotes: undefined,
      drawing: undefined,
      gif: undefined
    }
  },
  resetWatsonState: function(){
    this.setState({watson: undefined, spotify: undefined})        //eventually, to let the watson component have resuability, both it and spotify need to reset.
  },
  resetOtherStates: function(){
    this.setState({quotes: undefined, drawing: undefined, gif: undefined})    //this helps with the buttons on the menu. when the back button is clicked, reset ALL of the states.
  },
  setWatsonState: function (data){
    this.setState({watson: data})
  },
  setSpotifyState: function(data){
    this.setState({spotify: data})
  },
  setDrawState: function(data){
    this.setState({drawing: true})
  },
  setQuotesState: function(data){                                       //did something different here compared to my other react app. have all my states and api calls in the main component
    $.ajax({                                                            //and passing them down as they're needed. that seemed like such a strange concept to me at first, but i get it now.
      url: "/quotes",
      method: "GET",
      success: function(data){
        console.log(data);
        this.setState({quotes: data})
      }.bind(this)
    })
  },
  setGiphyState: function(data){
      $.ajax({
      url: "/giphy",
      method: "GET",
      success: function(data){
        console.log(data)
        this.setState({gif: data})
      }.bind(this)
    })
  },
  render: function(){                                                     //so this is my way of creating toggle functionality. only show the one that currently has state. there was a different
    if (this.state.quotes != undefined){                                  //way of going about this, but when i decided to implement this feature, i would have had to refactor the whole app. so no.
      return(<div id = "big-container">
        <div id = "container-left">   
          <Watson 
            watsonState = {this.state.watson} 
            setState = {this.setWatsonState}
            spotifyState = {this.state.spotify}
            setSpotifyState = {this.setSpotifyState}
            reset = {this.resetWatsonState}
          />
          </div>
          <div id = "container-right"> 
            <Quotes 
              getQuote = {this.setQuotesState}
              quotesState = {this.state.quotes}
              reset = {this.resetOtherStates}
            />
         </div>
      </div>)
    }else if (this.state.gif != undefined){
      return(<div id = "big-container">
        <div id = "container-left">   
          <Watson 
            watsonState = {this.state.watson} 
            setState = {this.setWatsonState}
            spotifyState = {this.state.spotify}
            setSpotifyState = {this.setSpotifyState}
            reset = {this.resetWatsonState}
          />
          </div>
          <div id = "container-right">
            <Gifs
              getGif = {this.setGiphyState}
              gifState = {this.state.gif}
              reset = {this.resetOtherStates}
              />
         </div>
      </div>) 
    }else if (this.state.drawing != undefined){                               //so when the drawing button is clicked, it sets the state to true (which i mean is TECHNICALLY not undefined) and that renders A R T.
      return(<div id = "big-container">                                      
        <div id = "container-left">   
          <Watson 
            watsonState = {this.state.watson} 
            setState = {this.setWatsonState}
            spotifyState = {this.state.spotify}
            setSpotifyState = {this.setSpotifyState}
            reset = {this.resetWatsonState}
          />
          </div>
          <div id = "container-right">
            <BackButton reset = {this.resetOtherStates} /> 
            <LC.LiterallyCanvasReactComponent imageURLPrefix="../img" />       
         </div>
      </div>)
    }else{                                                                      //so then if none of them have state, show the menu off to the right. the watson container is a constant.
      return(<div id = "big-container">
        <div id = "container-left">   
          <Watson 
            watsonState = {this.state.watson} 
            setState = {this.setWatsonState}
            spotifyState = {this.state.spotify}
            setSpotifyState = {this.setSpotifyState}
            reset = {this.resetWatsonState}
          />
          </div>
          <div id = "container-right"> 
            <Menu 
              selectQuote = {this.setQuotesState}
              selectGif = {this.setGiphyState}
              selectDraw = {this.setDrawState}
            />
         </div>
      </div>)  
    }
  }
});

var BackButton = React.createClass({                                                  //this awesome little component resets the states of the three menu items, so the user can go back.
  render: function(){
    return(<button
      onClick = {this.props.reset}
      className = "back-button"
    >
      E
    </button>)
    
  }
})

var Menu = React.createClass({                                                        //the menu!! it has buttons with onClick listeners attached that make ajax calls to their respective topics
  getInitialState: function(){
    return ({clicked: false})
  },
  render: function(){
    return(
      <div>
        <h2 id = "quote-title"> become inspired</h2>
        <br />
        <button
          className = "menu-button"
          onClick = {this.props.selectQuote}
        >
          B C
        </button>
        <br />
        <h2 id = "gif-title">emergency animal gifs!</h2>
        <br />
        <button 
          className = "menu-button"
          onClick = {this.props.selectGif}
        >
          A
        </button>
        <br />
        <h2 id = "draw-title"> get creative </h2>
        <br />
        <button 
          className = "menu-button"
          onClick = {this.props.selectDraw}
        >
          F
        </button>
      </div>
  )}
})

var Watson = React.createClass({                                                      //this is the only other component that has state (honestly, this could have been thrown up with the rest of them too. but eh.)
  getInitialState: function(){
    return{
      userText: undefined
    }
  },
  handleTextChange: function(e) {
    console.log(e.target.value);
    this.setState({
      userText: e.target.value
    });
  },
  watsonAjax: function(e){                                                              //sends an ajax call to the watson server route (which later connects to API) with the user's input as the data to be analyzed.
    this.setState({userText: undefined})
    e.preventDefault();
    var textData = {text: this.state.userText}
    console.log(textData)
   $.ajax({
      url: "/watson/",
      method: "GET",
      data: textData,
      success: function(data) {
        this.props.setState(data);
      }.bind(this)
    })
  },
  render: function(){
    if (this.props.watsonState == undefined){                                             //if watson's state is undefined, then render the form and submit button, buuuuut....
      return (
        <div id = "watson-container">
          <h2 id = "watson-title"> music for your mood </h2>
          <form
            id="watson-form"
          onSubmit={this.watsonAjax}>
          <textarea
            placeholder = "type your thoughts here!"
            value={this.state.userText}
            onChange={this.handleTextChange}
            className="user-input"
          />
          <br />
          <button
            type='submit'
            className='watson-button'
          >
            Submit
          </button>
        </form> 
      </div>
      )
    }else{                                                                          //if watson DOES have state, render the spotify component and all the cool stuff that comes with it!
      return(
        <Spotify
          watsonState = {this.props.watsonState}
          spotifyState = {this.props.spotifyState}
          setState = {this.props.setSpotifyState}
          reset = {this.props.reset}
        />
      )
    }
  }
})

var Spotify = React.createClass({
  spotifyAjax: function(e){
     console.log(e.target.value)
     $.ajax({
      url: "/music",
      method: "GET",
      data: {keyword: e.target.value},
      success: function(data){
        console.log(data)
        this.props.setState(data)
      }.bind(this)
    })
  },
  render: function(){
    if (this.props.spotifyState == undefined){                                          //so this will take the result of the API request (watson's state) and render buttons with the highest and lowest emotions.
       return (
      <div id = "button-holder">
        <h2 id = "watson-title"> music for your mood </h2>
        <p id = "watson-description"> below is how you feel and the opposite of that! 
        what kind of music would you like to hear? </p>
        <button
        className = "watson-button"
        value = {this.props.watsonState.most}                                           //whatever button a user clicks on will send an ajax call to the spotify route/API and get a playlist based on that value
        onClick = {this.spotifyAjax}
        >
          {this.props.watsonState.most}
        </button>
        <button
          className = "watson-button"
          value = {this.props.watsonState.least}
          onClick = {this.spotifyAjax}
        >
          {this.props.watsonState.least}
        </button>
        <br />
        <span id = "music-note">D</span>
      </div>)
     }else{
      return(                                                                             //after the API call is made, Spotify component now has state and can render this cool embedded player!! :D
        <SpotifyPlayer 
          iframe = "iframe" 
          src = {this.props.spotifyState}
          reset = {this.props.reset}
        />
     )}
    }
 })
var SpotifyPlayer = React.createClass({                                                   //this being the cool embedded player.
  handleClick: function(){
    this.props.reset();
  },
  render: function(){
    console.log(this.props.src)
    var Iframe = this.props.iframe;
    return (
      <div id = "spotify-component">
        <h2 id = "watson-title"> music for your mood </h2>
        <Iframe id = "spotify-player" src={this.props.src} width = "300" height = "375" frameBorder = "0" allowTransparency = "0"/>
        <br />
        <button
          className = "watson-button"                                                       //the handy dandy "try again" buttons gives the app more reusability (so if you think your playlist result sucks, fear not! second chances and all that.)
          onClick = {this.handleClick}
        >
        try again?
        </button>
      </div>
    )
  }
}) 
                                                                                            // these last two components are pretty similar in structure, so i'll just say it all here. they have render functions with show the back button, the data returned
var Quotes = React.createClass({                                                            // from an ajax request, and a button that lets the user keep making ajax requests to get new content to render in the component. weeeeeeeeeee.
  render: function(){
    var quote = this.props.quotesState;
      return (
      <div id = "quote-container">
        <button
            onClick = {this.props.reset}
            className = "back-button"
        >
          E
        </button>
        <br />
        <button
          id = "quote-button"
          onClick = {this.props.getQuote}
        > 
          B C
        </button>
        <p id = "quote-text">"{quote.text}"</p>
        <p id = "quote-author">-{quote.author}</p>
      </div>
      )
    }
});

var Gifs = React.createClass({
  render: function(){
    var gif = this.props.gifState;
    return (
      <div id = "gif-container">
        <button
            onClick = {this.props.reset}
            className = "back-button"
        >
          E
        </button>
        <br />
        <img src = {gif.data.image_url} />
        <br /> 
        <button
          id = "gif-button"
          onClick = {this.props.getGif}
          > 
          A
        </button>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById("main-container"));