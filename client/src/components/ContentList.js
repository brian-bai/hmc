import React from "react";

export default function ContentList() {
 
 return (
   <div>
     <div id="videotitle">Welcome to home media center.</div>
     <div id="video"><img src="family.png" /></div>
     <div class="container">
       <div class="row">
         <div class="col-6 col-sm-3" id="directories"></div>
         <div class="col-6 col-sm-3" id="playlist"></div>
       </div>
     </div>
   </div>
 );
}