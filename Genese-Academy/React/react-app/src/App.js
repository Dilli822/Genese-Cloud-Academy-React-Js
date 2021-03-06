import React, {Component} from 'react';
import './App.css';
import Routes from "./routes";
import {theme} from "./theme";
import {ThemeProvider} from '@material-ui/core/styles';

// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            initializing: true
        }
    }

    initFireBase=()=>{
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyDq2FCeFEpjDg7q4cfMFI1fXjuxLJtXtdI",
            authDomain: "user-details-9d8ad.firebaseapp.com",
            projectId: "user-details-9d8ad",
            storageBucket: "user-details-9d8ad.appspot.com",
            messagingSenderId: "616054048327",
            appId: "1:616054048327:web:ea4561b49667c6016e9362",
            measurementId: "G-1G2P278JGJ"
        };
        const fireApp = firebase.initializeApp(firebaseConfig);
        this.setState({
            initializing: false
        })

    };

    componentDidMount() {
        this.initFireBase();
    }

    render() {
        return (
            <div>
                {this.state.initializing ? 'Please Wait' : 
                    <ThemeProvider theme={theme}>
                        <Routes/>
                    </ThemeProvider>
                }
            </div>
        );
    }
}

export default App;
