import React, {useEffect, useState} from "react"; 
import Timeline from "./Timeline";
import Event from "./Event.js";
import "../styles/MainBod.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"; 
import firestore from "../firebase.js";
import {addDoc, getDocs, collection} from "firebase/firestore/lite";

function MainBod() {
    const [newTimeTitle, setNewTimeTitle] = useState(""); 
    const [newTimeSubtitle, setNewTimeSubtitle] = useState(""); 
    const [showNewTime, setshowNewTime] = useState(false);
    const [timeArr, settimeArr] = useState([]); 
    const [searchVal, setsearchVal] = useState(""); 
    const [searchRes, setsearchRes] = useState([]); 

    const changesearchVal = (e) => {
        setsearchVal(e.target.value); 
    }; 
    
    const changeNewTimeTitle = (e) => {
        setNewTimeTitle(e.target.value); 
    }; 

    const changeNewTimeSubtitle = (e) => {
        setNewTimeSubtitle(e.target.value); 
    }; 

    useEffect(() => {
        let allTimes = collection(firestore, "timelines"); 
            getDocs(allTimes).then(snapshot => {       // snapshot is array of all documents
                let tempTimelines = []; 
                snapshot.forEach(document => {
                    tempTimelines.push({...document.data(), id: document.id})
                }); 
    
            settimeArr(tempTimelines)        // set initial state of timeArr
            }); 
        }, []); 

        const createTime= () => {
        if (newTimeTitle.length > 0 && newTimeSubtitle.length >0) {
            const docRef = addDoc(collection(firestore, "timelines"), {
                title: newTimeTitle, subtitle: newTimeSubtitle})
            settimeArr([{id: docRef.id, title: newTimeTitle, subtitle: newTimeSubtitle}, ...timeArr])
            setNewTimeSubtitle(""); 
            setNewTimeTitle(""); 
            setshowNewTime(false); 
            }
    }; 

    const getSearchRes = () => {   // reroute to new page on click 
        if (searchVal === "") {
            return; 
        }
        let allEvents = collection(firestore, "events"); 
        getDocs(allEvents).then(snapshot => {       // snapshot is array of all documents
                let tempEvents = []; 
                snapshot.forEach(document => {
                    if (document.data().content.toLowerCase().includes(searchVal.toLowerCase()) || document.data().title.toLowerCase().includes(searchVal.toLowerCase())) { 
                        tempEvents.push(document.data()) 
                        } 
                });
                setsearchRes(tempEvents.sort(sortByDate)); 
     });
    }

    const goBack = () => {
        setsearchVal(""); 
    }

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
        <div>
            <Router>
            <div className="mainHead">
            <div className="pageTitle">Mr.Worldwide</div>
            <div className="subDiv">
            <span className="subtitle">Global Events Tracking.</span>
            <span className="explain">Keep track of foreign affairs by building timelines of events. View events organized in sequential order and search for keywords to find trends across different timelines.</span>
            </div>
            <div className="searchBar">
            <input placeholder="search for a keyword" type="text" value={searchVal} onChange={changesearchVal}></input>
            <button className="searchButton" onClick={getSearchRes}><Link to="/searchRes">Search</Link></button>
            </div>
            </div>
            <Switch>
                <Route exact path="/searchRes">
                    <div className="back">
                    <button className="searchButton2" onClick={goBack}><Link to="/">Go Back to Timelines</Link></button>
                    </div>
                    <div className="searchTitle">Search Results for: {searchVal}</div>
                    <div className="searchEvents"> 
                    {searchRes.map((x, i) => 
        <Event key={i} title = {x.title} content ={x.content} source={x.source} sourceText={x.sourceText} date={x.date} tags={x.tags}></Event>)}
        </div>
                    </Route> 
            <Route exact path="/">
            <div className="timelinesHead">
        <span className="thTitle">Your Timelines</span>
        <button onClick={() => setshowNewTime(!showNewTime)} className = "addTime">Create Timeline</button>
            </div>
    
            {  showNewTime ?<div className = "inpTime"> 
                <ul className="inputList"> <li>Create a new timeline</li> 
                <li>Add events</li>
                </ul>
                <input placeholder = "timeline title" type="text" value={newTimeTitle} onChange={changeNewTimeTitle}></input>
                <input placeholder = "timeline subtitle" type="text" value={newTimeSubtitle} onChange={changeNewTimeSubtitle}></input>
                <button onClick={createTime} className= "addTline">Add Timeline</button>
            </div> : null} 
            <div className = "pageCenter">
            <div className ="timelineBox">
        <div className="tLines">
            {timeArr.map((x, i) => 
              <Timeline key={i} timeId = {x.id} title = {x.title} subtitle={x.subtitle}></Timeline>)}
              </div>
            </div> <div className = "podBox">
                <div className= "podTitle">Get Caught Up</div>
                <div className ="podSub">Podcasts</div>
                <ul className="podList"><li><a href="https://www.bbc.co.uk/programmes/p02nq0gn/episodes/downloads">BBC Global News</a></li>
                <li><a href="https://medialab.virginia.edu/democracyindanger">Democracy in Danger</a></li>
                <li><a href="https://www.powercorruptspodcast.com/">Power Corrupts</a></li>
                <li><a href="https://www.american.edu/sis/big-world/">Big World Podcast</a></li>
                <li><a href="https://www.dancarlin.com/hardcore-history-series/">Hardcore History</a></li>
                <li><a href="https://www.mei.edu/podcast">Middle East Focus</a></li>
                <li><a href="https://podcasts.apple.com/us/podcast/middle-east-analysis/id454157967">Middle East Analysis</a></li>
                </ul>
            </div>
            </div>
            </Route>
            </Switch> 
            </Router>
        </div>
    ); 
}

export default MainBod; 
