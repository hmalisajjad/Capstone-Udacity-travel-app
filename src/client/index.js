import { handleSubmit } from './js/app'
import { checkForName } from './js/apidata'
import { tripDuration } from './js/apidata'

import './css/style.css'
document.getElementById("start-btn").addEventListener("click", handleSubmit);
//document.getElementById("remove-btn").addEventListener("click", performAction);

console.log(handleSubmit);

alert("Please enter your trip details")
console.log("CHANGE!!");

export{
    handleSubmit,
    checkForName,
    tripDuration
}