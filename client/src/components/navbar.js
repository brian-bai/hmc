import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { DropdownButton } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import ReactDOM  from "react-dom";
import {ReactFlvPlayer} from "flv-player-react";
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
 const [categories, setCategories] = useState([]);
 
 // This method fetches the categories from the database.
 useEffect(() => {
   async function getCategories() {
     const response = await fetch(`http://localhost:5000/category/`);
 
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
     const response = await fetch(`http://localhost:5000/playlist/${idstr}`);
 
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
  const element = <ReactFlvPlayer 
     url={play.path}
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
        default:
          console.log('other error');
      } 
     }} 
   />;
  
  ReactDOM.render(element, document.getElementById("video"));
  ReactDOM.render(
    <h3>{play.title}</h3>, 
    document.getElementById("videotitle")
  );
  
}
async function dirClick(cate, dir) {
  console.log("dirClick: " + dir);
  ReactDOM.render(
    <h3>Title: {cate} : {dir}</h3>,
    document.getElementById("videotitle")
  );

  const clickedplaylist = await getPlaylist(cate, dir);
  
  const listP = clickedplaylist.playlist.map((play, index) => 
    <li className="nav-item" key={index} onClick={()=>{playClick(play.path);}} >{play.title}</li>
  ); 
  
  //TODO: update playlist
  ReactDOM.render(
    <ul>{listP}</ul>,
    document.getElementById("playlist")
  );

  playClick(clickedplaylist.playlist[0]);

}
 // This method will map out the records on the table
 function dirList(category) {
   const cate = category.title;
  return category.dirs.map((dir,index) => 
      <Dropdown.Item key={index} onClick={ () => { dirClick(cate,dir);} }>{dir}</Dropdown.Item>
    );
}

function cateClick(cate){
      //get directories
      const listItems = cate.dirs.map((dir, index) => 
        <li className="nav-item" key={index} onClick={()=>{dirClick(cate.title, dir);}} >{dir}</li>
      );

      ReactDOM.render(
        <ul>{listItems}</ul>,  
        document.getElementById("directories")
      );

}

const Category = (props) => (
  <li className="nav-item" key="{props.category.title}" onClick={()=>{cateClick(props.category);}}>
    <DropdownButton align="end" title={props.category.title} id="dropdown-menu-align-end">
      {dirList(props.category)}
    </DropdownButton>
</li>
);
  
  
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
       <img style={{"width" : 25 + '%'}} alt="Home Media Center" src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
         {categoryList()}
         </ul>
       </div>
     </nav>
   </div>
 );
}