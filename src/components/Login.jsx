import React from 'react'
import { useHistory } from 'react-router-dom';
import "./styles/LoginStyle.css"
export const Login = (props) => {
    const history = useHistory();

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError } = props;

    return (
        <div className="login">
            
            <div className="loginContainer">
                <h2 className ="welcome">Welcome To The Feedback Hub </h2>
                <label>Email</label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}


                />
                <p className="errorMsg">{emailError}</p>

                <label>Password</label>
                <input 
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <p className="passwordMsg">{passwordError}</p>

                <div className="btnContainer">
                    
                    
                            <button class = "button" onClick = {handleLogin}>Sign In</button>
                            <p>Don't have an account ? <span onClick = {() => {setHasAccount(!hasAccount); history.push("/signup")}} >Sign up</span></p>
                      
                      
                    
                </div>

            </div>

        </div>
    )
}
