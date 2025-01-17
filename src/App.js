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

async addClick(){
  var newDrama=document.getElementById("title").value;
  const data=new FormData();
  data.append("newDrama",newDrama);

  fetch(this.API_URL+"api/watchlist/AddDrama",{
    method:"POST",
    body:data
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshWatchlist();
  })
}

async deleteClick(id){
  fetch(this.API_URL+"api/watchlist/DeleteDrama?id="+id,{
    method:"DELETE",
  }).then(res=>res.json())
  .then((result)=>{
    alert(result);
    this.refreshWatchlist();
  })
}


render(){
  const{dramalist}=this.state;
  return (
    <>
    <div className="App">
    <h2>Watchlist App</h2>

    {/* <form id="newDrama">
      Title: <input id="title" />
      Year: <input id="year" />
      Type: <input id="type" />
      Season: <input id="season" />
      Episodes: <input id="episodes" />
      Status: <input id="status" />
      Rating: <input id="rating" />
      <button onClick={()=>this.addClick()}>Add Drama</button>
      </form> */}

    <input id="title" />
    <button onClick={()=>this.addClick()}>Add Drama</button>
      
    {dramalist.map(drama=>
      <section>
        <ul>
          <li key={drama.id}>
          <b>{drama.title}</b><br/>
          Year: {drama.year}<br/>
          Type: {drama.type}<br/>
          Season: {drama.season}<br/>
          Episodes: {drama.episodes}<br/>
          Status: {drama.status}<br/>
          Rating: {drama.rating}<br/>
          </li>
        </ul>
       <button onClick={()=>this.deleteClick(drama.id)}>Delete Drama</button>
      </section>
    )}
    </div>
    </>
  );
}
}

export default App;
