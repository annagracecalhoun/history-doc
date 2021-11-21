import React, {useState, useEffect} from "react"; 
import Event from "./Event.js";
import "../styles/Timeline.css";
import firestore from "../firebase.js";
import {addDoc, getDocs, collection} from "firebase/firestore/lite";


function Timeline(props) {

    // set state for all elements of timeline
    const [eventArr, seteventArr] = useState([]); 
    const [title, setTitle] = useState(props.title);
    const [showNew, setshowNew] = useState(false);

    // new event fields 
    const [newTitle, setNewTitle] = useState(""); 
    const [newContent, setNewContent] = useState("");
    const [newSource, setNewSource] = useState("");
    const [newDate, setNewDate] = useState(""); 
    const [newTags, setNewTags] = useState("");
    const [newSourceText, setNewSourceText] = useState("");
    const [newTimeline, setNewTimeline] = useState("");

    const changeTitle = (e) => {
        setNewTitle(e.target.value); 
    }; 

    const changeTags = (e) => {
        setNewTags(e.target.value); 
    }; 

    const changeDate = (e) => {
        setNewDate(e.target.value); 
    }; 

    const changeSourceText = (e) => {
        setNewSourceText(e.target.value); 
    }; 

    const changeSource = (e) => {
        setNewSource(e.target.value); 
    }; 

    const changeContent = (e) => {
        setNewContent(e.target.value); 
    }; 

    // fetch all event data items 
    // pass timeline ID in from timeline component 
    useEffect(() => {
        let allEvents = collection(firestore, "events"); 
            getDocs(allEvents).then(snapshot => {       // snapshot is array of all documents
                let tempEvents = []; 
                snapshot.forEach(document => {
                    if (document.data().timeline === props.timeId){ 
                    tempEvents.push(document.data())} 
                }); 
    
            seteventArr(tempEvents.sort(sortByDate))        // set initial state of eventArr
            // eventArr.sort(sortByDate);
            }); 
        }, []); 


    const createEvent = () => {
        if (newTitle.length > 0 && newContent.length >0) {
            console.log(eventArr)
            const newArr2 = ([...eventArr, {title: newTitle, content: newContent, source: newSource, sourceText: newSourceText, date: newDate, tags: newTags}])
            seteventArr(newArr2.sort(sortByDate)); 
            console.log(eventArr)
            const docRef = addDoc(collection(firestore, "events"), {
                title: newTitle, content: newContent, 
                source: newSource, sourceText: newSourceText, 
                date: newDate, tags: newTags, timeline: props.timeId
            })
            setNewTimeline(docRef.id);
            setshowNew(false); 
            setNewTitle(""); 
            setNewContent(""); 
            setNewDate(""); 
            setNewSource(""); 
            setNewSourceText(""); 
            setNewTags(""); 
        }
    }; 

    const sortByDate = (a, b) => {
        var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const a1 = a.date.split(' ');
        const b1 = b.date.split(' '); 
        if (parseInt(a1[a1.length-1]) > parseInt(b1[b1.length-1])) {
            return -1; 
        }
        if (parseInt(a1[a1.length-1]) < parseInt(b1[b1.length-1])) {
            return 1; 
        }
        if (a1.length === 3 && b1.length === 3 &&  a1[0] === b1[0] && parseInt(a1[1].replace(',', '')) > parseInt(b1[1].replace(',', ''))) {
            return -1; 
        }
        if (a1.length === 3 && b1.length === 3 &&  a1[0] === b1[0] && parseInt(a1[1].replace(',', '')) < parseInt(b1[1].replace(',', ''))) {
            return 1; 
        }
        if (a1[0] === b1[0]) {
            return -1; 
        }
        else {
            return months.indexOf(b1[0]) - months.indexOf(a1[0]);
        }
    }

    return (
        <div className = "timelineBox">
            <div className = "genInfo2">
                <div className='timeTitles'>
        <span className = "timelineTitle">{props.title}</span>
        <span className ="timeSubtitle">{props.subtitle}</span>
        </div>
        <button onClick={() => setshowNew(!showNew)} className = 'createBut'>Add an event</button>
        </div>
        {
            showNew ?<div className = "floatCen"> <div className = "newEvent">
            <div className = "inputSec">
                 <input className= "eventInput" placeholder = "event name" type="text" value={newTitle} onChange={changeTitle}/>
                 <input className= "eventInput" placeholder = "event date" type="text" value={newDate} onChange={changeDate}/> </div> 
                 <div className = "inputSec">
                 <input className= "eventInput" placeholder = "source link" type="text" value={newSource} onChange={changeSource}/>
                 <input className= "eventInput" placeholder = "source name" type="text" value={newSourceText} onChange={changeSourceText}/>
                 </div> <div className = "inputSec">
                 <input className= "eventInput" placeholder = "tags (comma separated)" type="text" value={newTags} onChange={changeTags}/>
                 <input className= "eventInput" placeholder = "event content" type="text" value={newContent} onChange={changeContent}/> </div>
                 <div className = "inputSec">
                     <button onClick={createEvent} className = "createBut2">Create New Event</button>
                 </div>
            </div></div> : null
        }
        <div className = "eventBar">
       {eventArr.map((x, i) => 
        <Event key={i} title = {x.title} content ={x.content} source={x.source} sourceText={x.sourceText} date={x.date} tags={x.tags}></Event>)}
     </div>
        </div>
    ); 
}

export default Timeline; 