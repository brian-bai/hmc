import React, { useEffect, useState } from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

import { DropdownButton } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import ReactDOM  from "react-dom";
import {ReactFlvPlayer} from "flv-player-react";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
 const [categories, setCategories] = useState([]);
 //const [cate, setCate] = useState("English");
 //const [cateDir, setCateDir] = useState("section1");

 
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
     console.log("start fetch playlist");
     const idstr = clickedcate + clickeddir.charAt(0).toUpperCase() + clickeddir.slice(1);
     console.log(idstr);
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
  return categories.map((category) => {
    return (
      <Category
        category={category}
        key={category._id}
      />
    );
  });
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
  const title = <h3>{play.title}</h3>;
  ReactDOM.render(element, document.getElementById("video"));
  ReactDOM.render(title, document.getElementById("videotitle"));
  
}
async function dirClick(cate, dir) {
 // setCateDir(dir);
 // setCate(cate);
  console.log(dir);
  const videodir = <h3>Title: {cate} : {dir}</h3>;
  ReactDOM.render(videodir, document.getElementById("videotitle"));

  const clickedplaylist = await getPlaylist(cate, dir);
  
  const listP = clickedplaylist.playlist.map((play) => {
    return (<li className="nav-item" key={play.title} onClick={()=>{playClick(play.path);}} >{play.title}</li>);
  }); 
  
  //TODO: update playlist
  const plays = <ul>{listP}</ul>;
  ReactDOM.render(plays, document.getElementById("playlist"));

  playClick(clickedplaylist.playlist[0]);

}
 // This method will map out the records on the table
 function dirList(category) {
   const cate = category.title;
  return category.dirs.map(dir => {
    return (
      <Dropdown.Item key={dir} onClick={ () => { dirClick(cate,dir);} }>{dir}</Dropdown.Item>
    );
  });
}

function cateClick(cate){
      //get directories
      const listItems = cate.dirs.map(dir => {
        return (<li className="nav-item" key={dir} onClick={()=>{dirClick(cate.title, dir);}} >{dir}</li>);
      });

      const catedirs = <ul>{listItems}</ul>;

      ReactDOM.render(catedirs, document.getElementById("directories"));

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