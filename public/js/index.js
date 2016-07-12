console.log("hello, friend. hello, friend? that's lame.");
//have to start every app off with this mr. robot reference. it's just my thing.


var App = React.createClass({
  getInitialState: function(){
    return {
      watson: undefined,
      spotify: undefined,
      facts: undefined,
      quotes: undefined,
      gif: undefined
    }
  },
  resetWatsonState: function(){
    this.setState({watson: undefined, spotify: undefined})
  },
  setWatsonState: function (data){
    this.setState({watson: data})
  },
  setSpotifyState: function(data){
    this.setState({spotify: data})
  },
  setFactsState: function(data){
    this.setState({facts: data})
  },
  setQuotesState: function(data){
    this.setState({quotes: data})
  },
  setGiphyState: function(data){
    this.setState({gif: data})
  },
  render: function(){
    return(
      <div id = "other-container">
      <Watson 
        watsonState = {this.state.watson} 
        setState = {this.setWatsonState}
        spotifyState = {this.state.spotify}
        setSpotifyState = {this.setSpotifyState}
        reset = {this.resetWatsonState}
      />
      <Facts 
        factsState = {this.state.facts}
        setState = {this.setFactsState}
      />
      <Quotes 
        quotesState = {this.state.quotes}
        setState = {this.setQuotesState}
      />
      <Gifs 
        gifState = {this.state.gif}
        setState = {this.setGiphyState}
      />
     </div>
    )
  }
});

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
        <Iframe id = "spotify-player" src={this.props.src} width = "300" height = "380" frameBorder = "0" allowTransparency = "0"/>
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


var Facts = React.createClass({
  componentDidMount: function(){
    this.getFact()
  },
  getFact: function(){
    $.ajax({
      url: "/facts",
      method: "GET",
      success: function(data){
        // console.log(data);
        // console.log(this.props.setState);
        // console.log(this.props.factsState);
        this.props.setState(data)
      }.bind(this)
    })
  },
  render: function(){
    var catFact = this.props.factsState;
    if (this.props.factsState == undefined){
      return (<div><p>ya ain't got no cat facts</p></div>)
    }else{
      return (
      <div id = "catfact-container">
      <h2 id = "cat-title"> cat facts! </h2>
      <button
        id = "cat-button"
        onClick = {this.getFact}
      > 
        A
      </button>
      <p id = "catfact">{catFact}</p>
      </div>)
    }
  }
})

var Quotes = React.createClass({
  componentDidMount: function(){
    this.getQuote()
  },
  getQuote: function(){
    $.ajax({
      url: "/quotes",
      method: "GET",
      success: function(data){
        // console.log(data);
        // console.log(this.props.setState);
        // console.log(this.props.factsState);
        this.props.setState(data)
      }.bind(this)
    })
  },
  render: function(){
    var quote = this.props.quoteState;
    
    if (this.props.quotesState == undefined){
      return (<div><p>not inspirational af. boo.</p></div>)
    }else{
      quote = this.props.quotesState;
      return (
      <div id = "quote-container">
        <h2 id = "quote-title"> become inspired</h2>
        <button
          id = "quote-button"
          onClick = {this.getQuote}
        > 
          B C
        </button>
        <p id = "quote-text">"{quote.text}"</p>
        <p id = "quote-author">-{quote.author}</p>
      </div>)
    }
  }
});

var Gifs = React.createClass({
  componentDidMount: function(){
    this.getGif()
  },
  getGif: function(){
    $.ajax({
      url: "/giphy",
      method: "GET",
      success: function(data){
        this.props.setState(data)
      }.bind(this)
    })
  },
  render: function(){
    if (this.props.gifState == undefined) {
      return(<div><p>no gifs. none.</p></div>)
    }else{
      var gif = this.props.gifState;
      return (
      <div id = "gif-container">
      <h2 id = "gif-title">emergency animal gifs!</h2>
      <button
        id = "gif-button"
        onClick = {this.getGif}
        > 
        E
      </button>
      <img src = {gif.data.image_url} />
      <br />
      
      </div>)
    }
  }
})

ReactDOM.render(<App />, document.getElementById("main-container"));