import React from "react";
 
// We use Route in order to define the different routes of our application
// We import all the components we need in our app
import MyNavbar from "./components/navbar";
import ContentList from "./components/ContentList";

 
const App = () => {
 return (
   <div>
     <MyNavbar />
     <ContentList />
   </div>
 );
};
 
export default App;