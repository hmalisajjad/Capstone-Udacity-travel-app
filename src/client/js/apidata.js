function checkForName(formText) {
    console.log("::: Running checkForName :::", formText);
    let destination = (
        "Munich",
        "Chemnitz",
        "Ingolstad",
        "Nuremberg",
        "Berlin",
        "Dresden",
        "Leipzig",
        "Dehli",
        "London"
    )
    if(destination.includes(formText)) {
        alert("Have a nice Trip")
        return true;
    }
    else{
        return false;
    }
}

function tripDuration(formText) {
    var res = formText.match(mm/dd/yyyy);
    if(res == formText){
        return true;
    }else{
        return false;
    }
}

export { checkForName }
export { tripDuration }