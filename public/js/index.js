var App = React.createClass({
  getInitialState: function(){
    return {
      watson: null,
      spotify: null,
      facts: null,
      quotes: null
    }
  },
  render: function(){
    return(
      <div>
        <Facts factsState = {this.state.facts}/>
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
        this.props.factsState.setState({facts: data})
        // console.log(this.props.factsState)
      }.bind(this)
    })
  },
  render: function(){
    if (this.props.factsState == null){
      return (<div><p>cat facts af</p></div>)
    }else{
      return (<div><p>there's a cat fact here</p></div>)
    }
  }
})

var Quotes = React.createClass({
  render: function(){
    return (<div><p>inspirational af</p></div>)
  }
})

ReactDOM.render(<App />, document.getElementById("main-container"));