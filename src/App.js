import './App.css';
import { Component } from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      dramalist:[]
    }
  }

API_URL="http://localhost:5038/";

componentDidMount(){
  this.refreshWatchlist();
}

async refreshWatchlist(){
  fetch(this.API_URL+"api/watchlist/getwatchlist").then(response=>response.json()).then(data=>{
    this.setState({dramalist:data});
  })
}

render(){
  const{dramalist}=this.state;
  return (
    <div className="App">
    <h2>Watchlist App</h2>

    <input id="newDrama" />&nbsp;
    <button onClick={()=>this.addClick()}>Add Drama</button>
      
    {dramalist.map(drama=>
      <p>
        <ul>
          <li key="id">
          <b>{drama.title}</b><br/>
          Year: {drama.year}<br/>
          Type: {drama.type}<br/>
          Season: {drama.season}<br/>
          Episodes: {drama.episodes}<br/>
          Status: {drama.status}<br/>
          Rating: {drama.rating}<br/>
          </li>
        </ul>
       
        
    
      </p>
    )}
    </div>
  );
}
}

export default App;
