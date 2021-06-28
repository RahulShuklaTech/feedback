import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFromFireStore } from '../actions/userActions';
import "./styles/LoginStyle.css"
export const Signup = (props) => {
    // const {users} = useSelector(state => state) 
    const dispatch = useDispatch()
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignUp,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
        userName,
        setUserName,
        confirmPassword,
        setConfirmPassword,
        confirmPasswordError,
        usernameError
    } = props;

    
   

    return (
        <div className="login">
            
            <div className="loginContainer">
                <h2 className ="welcome">Welcome to The Feedback Hub</h2>
                <label>Email</label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}


                />
                <p className="errorMsg">{emailError}</p>


                <label>Username</label>
                <input
                    type="text"
                    required
                    value={userName}
                    onChange={e => setUserName(e.target.value)}


                />
                <p className="errorMsg">{usernameError}</p>

                <label>Password</label>
                <input 
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <p className="passwordMsg">{passwordError}</p>

                <label>Confirm Password</label>
                <input 
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <p className="passwordMsg">{confirmPasswordError}</p>

                <div className="btnContainer">
                    
                        
                        <>
                            <button class = "button" onClick = {handleSignUp}>Sign Up</button>
                        
                        </>
                    
                </div>

            </div>

        </div>
    )
}
