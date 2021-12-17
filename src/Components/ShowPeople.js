import react from 'react'
import { render } from 'react-dom'
import './showPeople.css'
const showPeople = ({people,setPageCount,pageCount,setProfileShow,  highlightedUser,setHighlightedUser,getFriends, friendsPageCount,setFriendsPageCount, friends, setFriends, changeFriends,setChangeFriends,renderFriends,setRenderFriends,getNewFriends}) =>{

    const handleScroll = (event) =>{
        const {scrollTop,clientHeight,scrollHeight} = event.currentTarget
        if(scrollHeight - scrollTop === clientHeight){
            setPageCount(pageCount + 1) 
        }
    }  
    const handleFriendsScroll = (event) =>{
        const {scrollTop,clientHeight,scrollHeight} = event.currentTarget
        if(scrollHeight - scrollTop === clientHeight){
            console.log('works')
            setFriendsPageCount(friendsPageCount + 1) 
            console.log(friendsPageCount)
        }
    }  

    const handleClick = (person) =>{
        
        setHighlightedUser(person)
        console.log(highlightedUser)
        getFriends(person.id)
        
        
    }
    const handleFriendsClick = (person) =>{
        
        setHighlightedUser(person)
        getNewFriends(person.id)
    }

    const Content = () =>{
        if(highlightedUser === 0){
            return(
                <div onScroll={handleScroll} className='container'>
                {people.map((person)=>{
                    
                        return(
                            <div className='person' key={person.id} onClick={()=>{handleClick(person)}}>
                                <div className='image'>
                                    <img className='imgsize' src={person.imageUrl + `?v=${person.id}`} alt='Loading' />
                                    
                                </div>
                                <div className='name'>
                                    {person.prefix} {person.name} {person.lastName}
                                    <br/>
                                    {person.title}
                                </div>
                            </div>
                        )
                    })}
        </div>
            )
        }else{
            
            return(
                <div className='second-main-container'>
                    <div className='profile-container'>
                        <div className='image'>
                                <img className='imgsize' src={highlightedUser.imageUrl + `?v=${highlightedUser.id}`} alt='Loading' />
                        </div>
                        <div className='content-here'>
                                <p>{highlightedUser.prefix} {highlightedUser.name} {highlightedUser.lastName}</p>
                                <p>{highlightedUser.title}</p>
                        </div>
                        <div className='adress'>

                        </div>
                    </div>
                    <div onScroll={handleFriendsScroll}  className='friends-container'>
                    {friends.map((friend)=>{  
                        return(
                            <div className='person'  onClick={()=>{handleFriendsClick(friend)}}>
                            <div className='image'>
                                <img className='imgsize' src={friend.imageUrl + `?v=${friend.id}`} alt='Loading' />
                                
                            </div>
                            <div className='name'>
                                {friend.prefix} {friend.name} {friend.lastName}
                                <br/>
                                {friend.title}
                            </div>
                        </div>
                        )
                    })
                        
                    }
                    </div>
                </div>
            )
        }
    }


    return(
        <div>
            {Content()}
        </div>
    )
}

export default showPeople