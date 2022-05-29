function getGamesByName (name, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.rawg.io/api/games?key=8f68b0ecd134487d938e65fe4f35c401&search=${name}`, true);
    //console.log(request);
    request.onload = () => {
        let response = JSON.parse(request.response);
        //console.log(response);
        if(typeof callback == 'function') callback(response);
    };
    request.send();
};