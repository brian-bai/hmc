import React from "react";
import {ReactFlvPlayer} from 'flv-player-react'
import ReactDOM from 'react-dom';

const VideoRecord = (props) => (
 <tr>
   <td>{props.name}</td>
   <td>
     <button className="btn btn-link"
       onClick={() => {
         const element = <ReactFlvPlayer 
            url={props.link}
         />;
         ReactDOM.render(element, document.getElementById('video'));
         const title = <h3>{props.name}</h3>;
         ReactDOM.render(title, document.getElementById('videotitle'));
       }}
     >
       Play
     </button>
   </td>
 </tr>
);


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