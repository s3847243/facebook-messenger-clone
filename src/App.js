import React,{ useState,useEffect} from 'react';
import './App.css';
import{ Button} from '@material-ui/core';
import { FormControl ,InputLabel,Input} from '@material-ui/core';
import Message from "./Message"
import { db } from './firebase';
import firebase from 'firebase';
import 'firebase/firestore';
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from '@material-ui/core'


function App() {
  const[input,setInput]=useState('');
  const[messages,setMessages]=useState([]);
  const[username,setUsername]=useState('');


  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {

      setMessages(snapshot.docs.map(doc => ({id:doc.id,message:doc.data()})))
    });
  },[]) 

  useEffect(() => {
    setUsername(prompt('Please enter your name'))
  }, [])


  const sendMessage = event =>{
    event.preventDefault();
    db.collection('messages').add({
      message:input,username:username,timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    //setMessages([...messages,{username:username,text:input}]);
    setInput('');
  }
  return (
    <div className="App">
      <img className = "facebook-image" src="https://pyxis.nymag.com/v1/imgs/11d/582/c7b0487c6e26db4f5be6eb679e3620d2ce-facebook.rsquare.w1200.jpg"/>
      <h1>Hello Boys</h1>
      <h2> Welcome {username}</h2>
      <form className="app__form">
      <FormControl className="app__formControl">
        
        <Input className="app__input" placeholder = "Enter a message" value={input} onChange={event => setInput(event.target.value)}  />
        <IconButton className="app__IconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
        <SendIcon />
        </IconButton> 

      </FormControl>  
      </form>
      <FlipMove>
      {
        messages.map(({id,message}) => (
          
          <Message key={id} username={username} message={message} />
        ))
      }
      </FlipMove>
      
    </div>
  );
}

export default App;
