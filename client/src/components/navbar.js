import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM  from "react-dom";
import {ReactFlvPlayer} from "flv-player-react";
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// Here, we display our Navbar
export default function MyNavbar() {
 const [categories, setCategories] = useState([]);
 
 // This method fetches the categories from the database.
 useEffect(() => {
   async function getCategories() {
     const response = await fetch(`http://192.168.124.12:5000/category/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     const categories = await response.json();
     setCategories(categories);
   }
 
   getCategories();
 
   return;
 }, [categories.length]);
 
 // This method fetches the playlist from the database.
 async function getPlaylist(clickedcate, clickeddir) {
     const idstr = clickedcate + clickeddir.charAt(0).toUpperCase() + clickeddir.slice(1);
     console.log("getPlaylist:idstr"+idstr);
     const response = await fetch(`http://192.168.124.12:5000/playlist/${idstr}`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const plist = await response.json();
     return plist;
 }

 function categoryList() {
  return categories.map((category, index) => 
      <Category
        category={category}
        key={index}
      />
  );
}

function playClick(play){
  console.log(play);
  const element = 
   <div>
      <ReactFlvPlayer 
        url={play.path}
        key={play.path}
        handleError={(err) => {
          switch(err) {
            case 'NetWorkError':
              console.log('network error');
              break;
            case 'MediaError':
              console.log('MediaError');
              break;
            case 'TypeError':
              console.log('Type error');
              break;
            default:
              console.log('other error');
          } 
        }} 
      />
   </div>;
  
  ReactDOM.render(
    <h3>{play.title}</h3>, 
    document.getElementById("videotitle")
  );
  ReactDOM.render(element, document.getElementById("video"));

}
async function dirClick(cate, dir) {
  console.log("dirClick: " + dir);
  ReactDOM.render(
    <h3>Title: {cate} : {dir}</h3>,
    document.getElementById("videotitle")
  );

  const clickedplaylist = await getPlaylist(cate, dir);
  
  const listP = clickedplaylist.playlist.map((play, index) => 
    <ListGroup.Item key={index} action variant="info" href={`#${play.title}`} onClick={() => {playClick(play);}} >{play.title}</ListGroup.Item>
  ); 
  
  //TODO: update playlist
  ReactDOM.render(
    <ListGroup>{listP}</ListGroup>,
    document.getElementById("playlist")
  );

}


function cateClick(cate){
      //get directories
      const listItems = cate.dirs.map((dir, index) => 
        <ListGroup.Item key={index} action variant="success" href={`#${index}`} onClick={() => {dirClick(cate.title, dir);}} >{dir}</ListGroup.Item>
      );

      ReactDOM.render(
        <ListGroup>{listItems}</ListGroup>,  
        document.getElementById("directories")
      );

}

const Category = (props) => (
  <Nav.Link href={`#${props.category.title}`} key={`{#${props.category.title}}`} onClick={() => {cateClick(props.category);}} >{props.category.title}</Nav.Link> 
);
  
  
 return (
   <div>
    <Navbar bg="dark" variant="dark">
      <Nav className="me-auto">
        {categoryList()}
      </Nav>
    </Navbar>
   </div>
 );
}