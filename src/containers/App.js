import React, {Component}from 'react'
import CardList from '../components/CardList.js'
import SearchBox from '../components/SearchBox'
import './App.css'
import Scroll from '../components/Scroll'
import Status from '../components/Status'
import ErrorBoundry from '../components/ErrorBoundry'

import { setSearchField, requestRobots } from '../actions';
import { connect } from 'react-redux'

const mapStateToProps = state =>{
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error

    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component{

    constructor(){
        super();
        this.state = {
            robotremove: [],
            robothover:'Click on any robot to delete it'
        }
    }

    componentDidMount(){
        this.props.onRequestRobots();
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
        const {robotremove, robothover} = this.state;
        const { searchField, onSearchChange, robots, isPending } = this.props;
        
        let filteredRobots
        Array.isArray(robots) ?
            filteredRobots = robots.filter((robot) => {
                return (robot.name.toLowerCase().includes(searchField.toLowerCase()) && !(robotremove.includes(robot.name)))
            })
            :
            filteredRobots = []
       return isPending?
        <h1 className='f1'>LOADING</h1>:
        (
            <div className='tc'>
                <h1 className='f1'>Robofriends</h1>
                <Status text={robothover}/>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots = {filteredRobots} onClick={this.onCardClick} onHover={this.onCardHover} onExit={this.onCardExit}/>
                    </ErrorBoundry>
                    
                </Scroll>
                
            </div>
    
        );
        
        
        
    }
    
}
export default connect(mapStateToProps, mapDispatchToProps)(App);