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
        <div>
          <form
            id="watson-form"
          onSubmit={this.watsonAjax}>
          <input
            type="textarea"
            placeholder='how are you feeling today?'
            value={this.state.userText}
            onChange={this.handleTextChange}
            className="user-input"
          />
          <button
            type='submit'
            className='watson-input'
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
      <div>
        <button
        value = {this.props.watsonState.most}
        onClick = {this.spotifyAjax}
        >
          {this.props.watsonState.most}
        </button>
        <button
          value = {this.props.watsonState.least}
          onClick = {this.spotifyAjax}
        >
          {this.props.watsonState.least}
        </button>
      </div>)
     }else{
      return( 
        <SpotifyPlayer 
          iframe = "iframe" 
          src = {this.props.spotifyState}
        />
     )}
    }
 })
var SpotifyPlayer = React.createClass({
  render: function(){
    console.log(this.props.src)
    var Iframe = this.props.iframe;
    return (
      <div>
        <Iframe src={this.props.src} width = "300" height = "380" frameBorder = "0" allowTransparency = "0"/>
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
      <h2> cat facts! </h2>
        <p>{catFact}</p>
      <button
        onClick = {this.getFact}
      > 
        get more cat facts! 
      </button>
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
      <h2> become inspired or something</h2>
        <p>"{quote.text}"</p>
        <p>-{quote.author}</p>
      <button
        onClick = {this.getQuote}
      > 
        get more inspiration! 
      </button>
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
      <h2>you get a gif! and YOU get a gif!!!</h2>
      <img src = {gif.data.image_url} />
      <br />
      <button
        onClick = {this.getGif}
      > 
        ANOTHER.
      </button>
      </div>)
    }
  }
})

ReactDOM.render(<App />, document.getElementById("main-container"));