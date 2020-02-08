import React, {Component} from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
//import { robots } from '../components/Robots';
import Scroll from "./scroll";
class App extends Component {
    state = {
        robots:[],
        searchfield: ""
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(Response => Response.json())
        .then(users => this.setState({robots: users})
        );
    }
    onSearchChange=(event) =>{
        this.setState({searchfield: event.target.value})
        
    }
    render(){
        const {robots, searchfield} = this.state;
                const filteredRobots = robots.filter(robots =>{
                    return robots.name.toLowerCase().includes(searchfield.toLowerCase())
                })
                return !robots.length ?
                    <hi>Loading....</hi> :
                ( 
                        <div className='tc'>
                <h1 >RoboFriends</h1>
                <SearchBox searchChange ={this.onSearchChange}/>
                <Scroll>
                <CardList robots={filteredRobots} />
                </Scroll>
                        </div>
                     );
                
    }
}
 
export default App;