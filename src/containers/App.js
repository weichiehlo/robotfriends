import React, {Component}from 'react'
import CardList from '../components/CardList.js'
import SearchBox from '../components/SearchBox'
import './App.css'
import Scroll from '../components/Scroll'
import Status from '../components/Status'
import ErrorBoundry from '../components/ErrorBoundry'

class App extends Component{

    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: '',
            robotremove: [],
            robothover:'Click on any robot to delete it'
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => {this.setState({robots:users})});

    }

    onSearchChange = (event) =>{
        this.setState({
            searchfield: event.target.value
        })
    }

    onCardHover = (event) =>{
        event.target.style.cursor = 'pointer';
        // event.target.classList.add('tooltiptext')
        this.setState({
            robothover: `You Are About To Delete : ${event.currentTarget.getAttribute('value')} !!!! `
        })
        
    }

    onCardExit = (event) =>{
        this.setState({
            robothover: "Click on any robot to delete it"
        })
    }

    onCardClick = (event) =>{
        const robotName = event.currentTarget.getAttribute('value');
        let deleteRobots = this.state.robotremove;
        deleteRobots.push(robotName);
        
        this.setState({
            robotremove:deleteRobots
        })
    }

    render(){
        const {robots, searchfield, robotremove, robothover} = this.state;
        const filteredRobots = robots.filter((robot) => {
            return (robot.name.toLowerCase().includes(searchfield.toLowerCase()) && !(robotremove.includes(robot.name)))
        })
       return !robots.length?
        <h1 className='f1'>LOADING</h1>:
        (
            <div className='tc'>
                <h1 className='f1'>Robofriends</h1>
                <Status text={robothover}/>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots = {filteredRobots} onClick={this.onCardClick} onHover={this.onCardHover} onExit={this.onCardExit}/>
                    </ErrorBoundry>
                    
                </Scroll>
                
            </div>
    
        );
        
        
        
    }
    
}
export default App;