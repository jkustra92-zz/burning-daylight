console.log("hello, friend. hello, friend? that's lame.");
//have to start every app off with this mr. robot reference. it's just my thing.


var App = React.createClass({
  getInitialState: function(){
    return {
      watson: undefined,
      spotify: undefined,
      facts: undefined,
      quotes: undefined
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
  render: function(){
    return(
      <div id = "other-container">
      <Watson 
        watsonState = {this.state.watson} 
        setState = {this.setWatsonState}
        spotifyState = {this.state.spotify}
        setSpotifyState = {this.setSpotifyState}
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
  spotifyAjax: function(){
     $.ajax({
      url: "/music",
      method: "GET",
      // data: {} whatever the value of the button is, i guess?
      success: function(data){
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
          value = {this.props.watsonState.most}
          onClick = {this.spotifyAjax}
        >
          {this.props.watsonState.least}
        </button>
      </div>)
     }else{
       <SpotifyPlayer 
          iframe = "iframe" 
          src = "https://embed.spotify.com/?uri=" + {this.props.spotifyState}
        />
     }
   }
 })
var SpotifyPlayer = React.createClass({
  render: function(){
    var Iframe = this.props.iframe;
    return (
      <div> womp </div>
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
    <h2> cat facts! </h2>
    if (this.props.factsState == undefined){
      return (<div><p>ya ain't got no cat facts</p></div>)
    }else{
      return (
      <div id = "catfact-container">
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
    <h2> become inspired or something</h2>
    if (this.props.quotesState == undefined){
      return (<div><p>not inspirational af. boo.</p></div>)
    }else{
      quote = this.props.quotesState;
      return (
      <div id = "quote-container">
        <p>{quote.text}</p>
        <p>{quote.author}</p>
      <button
        onClick = {this.getQuote}
      > 
        get more inspiration! 
      </button>
      </div>)
    }
  }
});

ReactDOM.render(<App />, document.getElementById("main-container"));