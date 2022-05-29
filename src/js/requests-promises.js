function getGamesByName (name, callback) {  
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.rawg.io/api/games?key=${CHAVE_API}&search=${name}`, true);
    //console.log(request);
    request.onload = () => {
        let response = JSON.parse(request.response);
        //console.log(response);
        if(typeof callback == 'function') callback(response);
    };
    request.send();
};