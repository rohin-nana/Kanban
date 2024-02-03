import { googleProvider, auth } from "../config/firebase";
import {
    // createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
// import { useState } from "react";
// import FormRowStandard from "../components/FormRowStandard";
import NavBar from "../components/NavBar"
import Button from "../components/Button";
import { GoogleButton } from "react-google-button";
import { useAppContext } from '../context/appContext.js';

function Login() {

    const { loginUser } = useAppContext();

    return (
    <div style={{ height: "100vh", backgroundColor: "rgb(43,44,54)" }}>
        <NavBar login={true} />
        <div className="mt-5">
            {/* <Button onClick={signInWithGoogle} bootstrap="w-25" text="Sign in With Google"/> */}
            <GoogleButton style={{ width: "25%", margin: "auto" }} onClick={loginUser}/>
            <br />
            <br />
            {/* <Button onClick={logout} bootstrap="w-25" text="Logout" /> */}
        </div>
    </div>
    );
}

export default Login;