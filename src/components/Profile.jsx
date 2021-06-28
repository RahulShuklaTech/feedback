import React from 'react'
import { useSelector } from 'react-redux'
import "../index.css"

export const Profile = () => {
    
    const {user} = useSelector(state => state)
    console.log(user)
    return (
        <div>
            <div className ="user">
                <img src="avatar.png" className = "image" alt = "user"/>
                <h3>hello {user[0]}</h3>
                <h4>{user[1]}</h4>
            </div>
        </div>
    )
}
