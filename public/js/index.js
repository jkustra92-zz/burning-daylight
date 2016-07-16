console.log("hello, friend. hello, friend? that's lame.");
//have to start every app off with this mr. robot reference. it's just my thing.

var App = React.createClass({
  getInitialState: function(){
    return {
      watson: undefined,
      spotify: undefined,
      quotes: undefined,
      drawing: undefined,
      gif: undefined
    }
  },
  resetWatsonState: function(){
    this.setState({watson: undefined, spotify: undefined})
  },
  resetOtherStates: function(){
    this.setState({quotes: undefined, drawing: undefined, gif: undefined})
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
  setQuotesState: function(data){
    $.ajax({
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
  render: function(){
    if (this.state.quotes != undefined){
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
    }else if (this.state.drawing != undefined){
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
    }else{
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

var BackButton = React.createClass({
  render: function(){
    return(<button
      onClick = {this.props.reset}
      className = "back-button"
    >
      E
    </button>)
    
  }
})

var Menu = React.createClass({
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

var Watson = React.createClass({
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
  watsonAjax: function(e){
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
    if (this.props.watsonState == undefined){
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
    }else{
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
    if (this.props.spotifyState == undefined){
       return (
      <div id = "button-holder">
        <h2 id = "watson-title"> music for your mood </h2>
        <p id = "watson-description"> below is how you feel and the opposite of that! 
        what kind of music would you like to hear? </p>
        <button
        className = "watson-button"
        value = {this.props.watsonState.most}
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
      return( 
        <SpotifyPlayer 
          iframe = "iframe" 
          src = {this.props.spotifyState}
          reset = {this.props.reset}
        />
     )}
    }
 })
var SpotifyPlayer = React.createClass({
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
          className = "watson-button"
          onClick = {this.handleClick}
        >
        try again?
        </button>
      </div>
    )
  }
}) 

var Quotes = React.createClass({
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