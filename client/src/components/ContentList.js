import React from "react";

export default function ContentList() {
 
 return (
   <div>
     <div id="videotitle">VideoDir</div>
     <div id="video">
       Video
         {/* <ReactFlvPlayer
                url={"homeserver/neilgaiman/P1._01_Introduction.flv"}
                isMuted
                handleError={(err) => {
                switch (err) {
                    case 'NetworkError':
                    // todo
                    console.log('network error');
                    break;
                    case 'MediaError':
                    console.log('network error');
                    break;
                    default:
                    console.log('other error');
                }
                }}
            /> */}
     </div>
     <div id="directories">Directories</div>
     <div id="playlist">PlayList</div>
   </div>
 );
}