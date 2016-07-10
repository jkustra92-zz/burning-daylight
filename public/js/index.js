var App = React.createClass({
  getInitialState: function(){
    return {
      watson: null,
      spotify: null,
      facts: null,
      quotes: null
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
        <Facts 
          factsState = {this.state.facts}
          setState = {this.setFactsState}
        />
        <Quotes 
          quotesState = {this.state.quotes}
          setState = {this.setQuotesState}/>
      </div>
    )
  }
});

var Watson = React.createClass({
  getInitialState: function(){
    return{
      userText: null
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
   $.ajax({
      url: "/watson/",
      method: "GET",
      // data: whatever the form data is,
      success: function(data) {
        console.log(data)
      }.bind(this)
    })
  },
  render: function(){
    if (this.props.watsonState == null){
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
    }
  }
})

var Spotify = React.createClass({
  render: function(){
    return (<div><p>music af</p></div>)
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
        console.log(data);
        // console.log(this.props.setState);
        // console.log(this.props.factsState);
        this.props.setState(data)
      }.bind(this)
    })
  },
  render: function(){
    var catFact = this.props.factsState;
    <h2> cat facts! </h2>
    if (this.props.factsState == null){
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
        console.log(data);
        // console.log(this.props.setState);
        // console.log(this.props.factsState);
        this.props.setState(data)
      }.bind(this)
    })
  },
  render: function(){
    var quote = this.props.quoteState;
    <h2> become inspired or something</h2>
    if (this.props.quotesState == null){
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
})

ReactDOM.render(<App />, document.getElementById("main-container"));