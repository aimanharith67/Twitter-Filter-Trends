import React,{useState,useEffect} from "react";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaTwitter} from "@react-icons/all-files/fa/FaTwitter";
import{ Navbar,Container} from 'react-bootstrap';
import Dropdown from './components/dropdown';
import axios from 'axios';



export default function App() { 
  const [trends,setTrends] = useState([])
  // const [world,setWorld] = useState('')
  const [woeid,setWoeid]= useState('1')

  useEffect(() =>{
  getAPI()

  },[woeid])


  const findLocation = () =>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        position => {
          axios.get('http://localhost:5000/near-me',{
            params:{
              lat: position.coords.latitude,
              long: position.coords.longitude
            }
          })
          .then(response => {
            console.log(response.data[0].woeid)
            setWoeid(response.data[0].woeid)
          })
        }
      )
    }
  }


  const getAPI = () => { 
    axios.get('http://localhost:5000/trends',{
      params:{
        woeid: woeid
      }, 
    }).then(response => {
      // console.log(response.data)
      setTrends(response.data[0].trends)
    })
    .catch(error => console.log(error.message))
  }

 

 const trending =() => {
   return(
    <ul>
     {
      trends.map((res,index) => {
        return(
          <li key={index}>
          <a href={res.url}>{res.name}</a>
          {res.tweet_volume && (
            <span className='tweet_volume'>{res.tweet_volume}</span>
          )}             
        </li>
        ) 
      })
     }
     </ul>
   )
 }

  return (
    <div>
      <header>
      <Navbar bg="dark" variant="dark">
    <Container style={{justifyContent:'center'}}>
      <Navbar.Brand href="#home">
        <FaTwitter/>
        {' '}
      Twitter API
      </Navbar.Brand>
    </Container>
  </Navbar>
      </header>
    <Dropdown
    setWoeid={setWoeid}
    findLocation={findLocation}
    />
    <div className='content'>{trending()}</div>
    </div>
  );
}
