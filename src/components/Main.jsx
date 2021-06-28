import React, { useEffect } from 'react'
import { useState } from 'react';

import { Login } from './Login'
import { Signup } from './Signup';
import firebase from "../firebaseConfig";



import { Route, Switch, useHistory } from 'react-router-dom';
import { addToFireStore, getFromFireStore, setUserData,  } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from './Profile';


// import { Categories } from './Categories';
// import { Mobiles } from './Mobiles';
// import { Laptops } from './Laptops';
// import { Appliances } from './Appliances';




export const Main = () => {

    const history = useHistory();
    const { users } = useSelector(state => state)
    const dispatch = useDispatch();


    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);
    const [userName, setUserName] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");

    useEffect(() => {
        dispatch(getFromFireStore("users"))
        console.log("users", users)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleLogin = () => {
        clearErrors();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {

                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                    default:
                        break;
                }
            });
            
            
        if (user) {

            let userNameinDb = users.filter(item => item.email === email);

            console.log(userNameinDb,"fsdsfdhkjsdfjkshdf",email)
            dispatch(setUserData([userNameinDb[0].username, email]))
            history.push("/profile")
        }


    }


    const handleSignUp = () => {
        clearErrors();
        let error = false
        if (password !== confirmPassword) {
            error = true;
            setConfirmPasswordError("Passwords must match");
            return;
        }
        console.log("username", users)

        let userNameinDb = users.filter(item => item.username === userName);
        console.log("username", userNameinDb)
        if (userNameinDb.length) {

            error = true;
            setUsernameError("Username already exists");
            console.log(usernameError)
            return;

        }





        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        error = true;
                        console.log(error)
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        error = true
                        console.log(error)
                        break;
                    default:

                }
            }).finally(() => {
                if (user && !error) {
                    dispatch(addToFireStore("users",{username: userName, email}))
                    history.push("/")
                }
            })




    }


    // const handleLogout = () => {
    //     firebase.auth().signOut();
    //     console.log("i happened")
    //     history.push("/")

    // }

    const authListener = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                clearInput();
                setUser(user);




            } else {
                setUser("");
            }
        })
    }

    useEffect(() => {
        authListener();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);




    const clearInput = () => {
        setEmail("");
        setPassword("");
    }

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    }
    return (
        <div>
            <Switch>
                <Route exact path="/" render={(props) => (
                    <Login
                        {...props}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                        handleSignUp={handleSignUp}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        hasAccount={hasAccount}
                        setHasAccount={setHasAccount}
                        emailError={emailError}
                        passwordError={passwordError}
                    />
                )} />

                <Route exact path="/signup" render={(props) => (
                    <Signup
                        {...props}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                        handleSignUp={handleSignUp}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        hasAccount={hasAccount}
                        setHasAccount={setHasAccount}
                        emailError={emailError}
                        passwordError={passwordError}
                        userName={userName}
                        setUserName={setUserName}
                        confirmPasswordError={confirmPasswordError}
                        usernameError={usernameError}
                    />
                )} />

                <Route exact path="/profile" render={(props) => (
                    <Profile
                        {...props}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                        handleSignUp={handleSignUp}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        hasAccount={hasAccount}
                        setHasAccount={setHasAccount}
                        emailError={emailError}
                        passwordError={passwordError}
                        userName={userName}
                        setUserName={setUserName}
                        confirmPasswordError={confirmPasswordError}
                        usernameError={usernameError}
                    />
                )} />

                {/* <Route path="/categories" render={(props) => (
                    <Categories
                        {...props}

                        user={user.email}
                        handleLogout={handleLogout} />
                )} />

                <Route exact path="/mobiles" render={(props) => {
                    return <Mobiles
                        {...props}
                        user={user.email}

                        handleLogout={handleLogout} />

                }} />

                <Route exact path="/laptops" render={(props) => {
                    return <Laptops
                        {...props}
                        user={user.email}

                        handleLogout={handleLogout} />

                }} />

                <Route exact path="/appliances" render={(props) => {
                    return <Appliances
                        {...props}
                        user={user.email}

                        handleLogout={handleLogout} />

                }} /> */}

            </Switch>
        </div>
    )
}
