import React, {useState, useEffect} from "react"; 
import "../styles/Event.css";
//import firestore from "../firebase";
//import {collection} from "firebase/firestore/lite";

function Event(props) {
    // create states for all event info 
    const [title, setTitle] = useState(props.title); 
    const [content, setContent] = useState(props.content);
    const [source, setSource] = useState(props.source);
    const [date, setDate] = useState(props.date); 
    const [tags, setTags] = useState(props.tags);
    const [sourceText, setSourceText] = useState(props.sourceText);
    const [timeline, setTimeline] = useState(props.timeline);
    // make tags into an array and then create bubble for each one  
    const allTags = tags.split(', ')

    return (
        <div className = "eventBox">
            <div className = "genInfo">
            <span className = "eventTitle">{props.title}</span>
            <span className = "eventDate">{props.date}</span>
            </div>
            <div className = "allInfo">
            <div className = "innerBox">
                <div className = "contDiv">
            <span className = "eventContent">{props.content}</span>
            </div>
            <div className = "bottomInfo">
            <a href={props.source} className = "eventSource">{props.sourceText}</a>
         <div>  {allTags.map((x, i) => 
        <span key={i} className = "eventTags">{x}</span>)}</div> 
            </div>
            </div></div>
        </div>
    ); 
}

export default Event; 