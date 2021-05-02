// ref: https://knowledge.udacity.com/questions/559288


//import {getData,getPixabay,getWeatherbit,infoweatheradd} from ""
import { checkForName} from "./apidata";
async function handleSubmit(event) {
    event.preventDefault();
    console.log("Yes it's working!");
    // check what text was put into the form field
    //let formText = document.getElementById('destinationcity, tripbegins, tripend').value
    console.log("::: Form Submitted :::")
    let destination = document.getElementById('destinationcity').value;
    let tripbegins = document.getElementById('tripbegins').value;
    let tripend = document.getElementById('tripend').value;
    let formText = document.getElementsByClassName("tripInputs");
    checkForName(formText)
    console.log("Form inputs collection: ", formText);
    console.log("Form inputs collection: ", formText);
    console.log("First index: ", formText[0].value);
    console.log("Second index: ", formText[1].value);
    console.log("Third index: ", formText[2].value);
    //add data
    //await postData('/infoweatheradd', {date: tripbegins+tripend, userinput: destination})      
    await postData('http://localhost:3000/infoweatheradd', {date: tripbegins+tripend, userinput: destination})
    await callingServer('http://localhost:3000/getWeatherbit');
    await callingServer('http://localhost:3000/getPixabay');
    
    const gatherData = await callingServer('http://localhost:3000/getData');
    console.log(gatherData);
    updateUI();  
    then(function(response) {
        return response.json();
    })
}
async function postData(url = '', data = {}){
    const response = await fetch(url,{
        method: 'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        //body data type should match Content-Type
        body: JSON.stringify(data),
    });
}

const callingServer = async (url) => {
    const paramitorasync = {
        method: "GET",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
    }
}
    //const response = await fetch("http://localhost:3000/getData");// absolute link
    const res = await fetch(url , paramitorasync);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
        //approximately handle the error
    }
};

const updateUI = async () => {
    const response = await fetch('http://localhost:3000/getData')
    try{
        const allData = await response.json()
       // console.log(allData);
        document.getElementById('date').innerHTML = allData.startdate+enddate;
        document.getElementById('langitude').innerHTML = allData.langitude;
        document.getElementById('latitude').innerHTML = allData.langitude;
        document.getElementById('country').innerHTML = allData.userinput;
        document.getElementById('temperature').innerHTML = allData.temperature;
    }
    catch(error){
        console.log("error", error)
    }
}

export { handleSubmit, updateUI , checkForName, callingServer,}
