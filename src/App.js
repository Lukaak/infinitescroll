import react, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowPeople from './Components/ShowPeople'
import './App.css'
const App = () =>{

    const [people, setPeople] = useState([])
    const [person, setPerson] = useState()
    const [pageCount,setPageCount] = useState(1)
    const [friendsPageCount, setFriendsPageCount] = useState(1)
    const [currentUser, setCurrentUser] = useState([])
    const [friends,setFriends] = useState([])
    const [highlightedUser,setHighlightedUser] = useState(0)
    const [renderFriends, setRenderFriends] = useState({})
    const [changeFriends, setChangeFriends] = useState(0)

    useEffect(()=>{
        getData()
    },[pageCount])

    useEffect(()=>{
        if(highlightedUser === 0){
            return
        }else{
            getFriends(highlightedUser.id)
        }
    },[friendsPageCount])

    useEffect(()=>{
        console.log('done')
    },[friends])
    


    function showContent() {
        return (
            <ShowPeople people={people} pageCount={pageCount} setPageCount={setPageCount} getSingleUser={getSingleUser} highlightedUser={highlightedUser} setHighlightedUser={setHighlightedUser} getFriends={getFriends} friendsPageCount={friendsPageCount} setFriendsPageCount={setFriendsPageCount} friends={friends} setFriends={setFriends} changeFriends={changeFriends} setChangeFriends={setChangeFriends} renderFriends={renderFriends} setRenderFriends={setRenderFriends} getNewFriends={getNewFriends}/>
        )
    }
    
    const getData = () => {
        
        axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageCount.toString()}/20`,{
            headers: {
                'accept': 'application/json'
            }
            
        }).then((response)=>{
            setPeople([...people, ...response.data.list])
        })
    }

    const getSingleUser = (userId) => {
        axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId.toString()}`,{
            headers: {
                'accept': 'application/json'
            }
            
        }).then((response)=>{
            setCurrentUser(response.data)
            
        })
    }

    const getFriends = (userId) => {
        
        axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId.toString()}/friends/${friendsPageCount.toString()}/20 `,{
            headers: {
                'accept': 'application/json'
            }
            
        }).then((response)=>{
            setFriends([...friends, ...response.data.list])
            
        })
    }

    const getNewFriends = (userId) => {
        
        axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId.toString()}/friends/${friendsPageCount.toString()}/20 `,{
            headers: {
                'accept': 'application/json'
            }
            
        }).then((response)=>{
            setFriends(response.data.list)
            console.log(friends)
            
        })
    }

    return(
            <div className='main-container'>
                {showContent()}
            </div>
    )
}

export default App
