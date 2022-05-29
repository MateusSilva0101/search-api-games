const  getGamesByName = (name, callback) => {  
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.rawg.io/api/games?key=${chaveapi}&search=${name}`, true);
    request.onload = () => {
        let response = JSON.parse(request.response);
        if(typeof callback == 'function') callback(response);
    };
    request.send();
};