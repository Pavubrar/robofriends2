import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox'
//import { robots } from '../components/Robots';
import Scroll from "./scroll";
import { setSearchField, requestRobots } from "./actions";

const mapStateToProps = state =>{
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error:state.requestRobots.error
    }
}
 const mapDispatchToProps =(dispatch) => {
     return{
         onSearchChange: (event) =>dispatch(setSearchField(event.target.value)),
        onRequestRobots:() => requestRobots(dispatch)
        }
           }
class App extends Component {
    // state = {
    //     robots:[]
    //     // searchfield: ""
    // }
    componentDidMount() {
        // console.log(this.props.store)
        // fetch('https://jsonplaceholder.typicode.com/users')
        // .then(Response => Response.json())
        // .then(users => this.setState({robots: users})
        // );
        this.props.onRequestRobots();
    }
    // onSearchChange=(event) =>{
    //     this.setState({searchfield: event.target.value})
        
    
    render(){
       // const {robots} = this.state;
        const {searchField, onSearchChange,robots, isPending} = this.props;
                const filteredRobots = robots.filter(robots =>{
                    return robots.name.toLowerCase().includes (searchField.toLowerCase())
                })
                return !robots.length ?
                    <h1>Loading....</h1> :
                ( 
                        <div className='tc'>
                <h1 >RoboFriends</h1>
                <SearchBox searchChange ={onSearchChange}/>
                <Scroll>
                <CardList robots={filteredRobots} />
                </Scroll>
                        </div>
                     );
                
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);