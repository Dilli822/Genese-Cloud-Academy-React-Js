
import React,  {useState, useEffect}  from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {Button} from "@material-ui/core";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useHistory, useParams } from "react-router-dom";

// Read the articles from medium.com  ----> Highly recommended !!!
// donot forget to installt he firebase package with npm

export default function FireBaseForm(){
    
    // declaring the histroy variable here
    let history = useHistory();

    // params declaration
    let params = useParams();

    // Here passsing name key to setState(setUserProfile)
    const [userProfile,setUserProfile] = useState({name: "", address:"", email:"", phone: "", text: ""});
    const [isSaving, setIsSaving] = useState(false);

    // calling effect if it isnot with param add 
    useEffect (()=> {
        if(params.id != 'add'){
            getDatabyId();
        }
    }, [true])


    
    // let's create a constant function that gives us id from firecollection of firestore firebase
    //  this is taken from docs url is: https://firebase.google.com/docs/firestore/query-data/get-data
    
    const getDatabyId = () => {
        const firestore = firebase.firestore();
  
        var docRef = firestore.collection("user-details").doc("/" + params.id);
  
        docRef.get().then(function(doc){
          if(doc.exists){
            //   then here comes the params.id if exists with path /add then here comes 
            // then docs will extract data from userProfile's name, address, email, text, phone
            // and finally form will be populated with specific with its's id param.id 
            // for eg: dillihangrae@gmail.com with id 0nHcFnt0uuFv074qXyI0 if comes then that person data will be extracted and populated
            // but if the url with 'add' comes then our form will be empty as our code will know why users are arriving at this route
            userProfile.name = doc.data().name;
            userProfile.address = doc.data().address;
            userProfile.email = doc.data().email;
            userProfile.phone = doc.data().phone;
            userProfile.text = doc.data().text;
            setUserProfile({...userProfile,userProfile});

            console.log("Document Data: ", doc.data());

          } else{
            //   if it is edit then our code works here
            console.log("No such Document is found !");
          }
        }).catch(function(error){
          console.log("Error getting document", error);
        })
      }
  
  


    // let's make a function 
    // function handleChange(event){
    //     console.log(event.target.value)
    //     setUserProfile({
    //         [event.target.id]: event.target.value
    //     })
    // }

    // handle Function for multiple name address email and other forms fields
    function handleChange(event) {
        userProfile[event.target.id] = event.target.value;
        // here .. is spread operator and it copies the arrays
        setUserProfile({...userProfile, userProfile});
        console.log(userProfile);
    }


    // storing the user types dynamic value with firebase db name here
    const handleSaveData = () =>{

        // setting the disabeld={isSaving true here}
        setIsSaving(true);
        const firestore = firebase.firestore();

    // applying condition here if path is '/add' then only update the user form
    if(params.id === 'add'){
        firestore.collection("user-details").add({
            name: userProfile.name,
            address: userProfile.address,
            email: userProfile.email,
            phone: userProfile.phone,
            text: userProfile.text
        }).then(function(response){
            alert("Form Submitted Successfully!");
            // window.location.reload();
            setIsSaving(false);

            console.log(response);

            // using the react router dom useHistory to route the user after saving the data to user-list
            history.push('/user-list');
            
        }).catch(function(error){
            alert("Error!Something Went Wrong!");
            setIsSaving(false);
            console.log(error);
        })
    }else{
        firestore.collection("user-details").doc(params.id).update({
            name: userProfile.name,
            address: userProfile.address,
            email: userProfile.email,
            phone: userProfile.phone,
            text: userProfile.text
        }).then(function(response){
            alert("Form Submitted Successfully!");
            // window.location.reload();
            setIsSaving(false);
            console.log(response);
            // using the react router dom useHistory to route the user after saving the data to user-list
            history.push('/user-list');        
        }).catch(function(error){
            alert("Error!Something Went Wrong!");
            setIsSaving(false);
            console.log(error);
       })
    }
}


    return (
        <div>
            <h4> This is Form to Collect User Information. This form is handled by firebase(as backend). </h4>
            <br />
            <Grid container spacing={2}>
                <Grid item xs="12" sm="4"  md="6">
                    <TextField 
                    id="name"
                    label="Enter Name"
                    variant = "outlined"
                    color = "secondary"
                    value={userProfile.name}
                    placeholder="Enter Valid  Name"
                    helperText="Please Enter Full Name"
                    error={false}
                    disabled={isSaving}
                    onChange={handleChange}
                    fullWidth={true}
                />
            </Grid>

                <Grid item xs="12" sm="4" md="6">
                    <TextField 
                    id="phone"
                    label="Enter Number"
                    variant = "outlined"
                    color = "secondary"
                    value={userProfile.phone}
                    placeholder="Enter Valid Phone Number"
                    helperText="Please Enter Phone Number"
                    error={false}
                    // if isSaving is true disable all the textField as we had set up setIsSaving false above
                    disabled={isSaving}
                    onChange={handleChange}
                    fullWidth={true}
                />
            </Grid>
            
            <Grid item xs="12" sm="4"  md="6">
                <TextField 
                    id="address"
                    label="Enter address"
                    variant = "outlined"
                    color = "secondary"
                    value={userProfile.address}
                    placeholder="Enter Valid Address"
                    helperText="Please Enter Address"
                    error={false}
                    disabled={isSaving}
                    onChange={handleChange}
                    fullWidth={true}
                />
            </Grid>
        
        <Grid item xs="12" sm="4"  md="6">
                <TextField 
                    id="email"
                    label="Enter Email"
                    variant = "outlined"
                    color = "secondary"
                    value={userProfile.email}
                    placeholder="Enter Valid Email"
                    helperText="Please Enter  Email"
                    error={false}
                    disabled={isSaving}
                    onChange={handleChange}
                    fullWidth={true}
                />

            </Grid>
                    
            <Grid item xs="12" sm="12">
                <TextField 
                    id="text"
                    label="Leave a Message"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    value={userProfile.text}
                    onChange={handleChange}
                    placeholder= "Type your message"
                    fullWidth={true}
                    color = "secondary"
                    variant = "outlined"
                    disabled = {isSaving}
                />
                </Grid>


            </Grid>

            <div style={{marginTop: 20}}>
            {isSaving ? <div> Loading.... </div>: ""}
            <Button onClick={handleSaveData}  variant="contained" color="secondary" disabled={isSaving}> Submit </Button> &nbsp;&nbsp;
            <Button onClick={handleChange}  variant="contained" color="primary"  disabled={isSaving}> Check Data on Console! </Button>
         
            </div>

            
        </div>
    )
}