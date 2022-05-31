//Constantes que aramazenará os jogos principais e os relacionados
const gamesListPrincipal = document.querySelector('#games-list-principal');
const gamesListRelationed = document.querySelector('#games-relationed');

const  getGamesByName = (name, callback) => {  
    let request = new XMLHttpRequest();
    request.open('GET', `https://api.rawg.io/api/games?key=${chaveapi}&search=${name}`, true);
    console.log(request);

    request.onload = () => {
        let response = JSON.parse(request.response);
        console.log(response);
        if(typeof callback == 'function') callback(response);
    };
    request.send();
};

 //Função que adiciona um elemento de loading antes de exibir os dados da API
 const setGameLoad = (gameEl) => {
     gameEl.innerHTML = `
         <div class="preloader-wrapper active" style="position: absolute; left: 50%; margin-top: 30px">
             <div class="spinner-layer spinner-blue-only">
                 <div class="circle-clipper left">
                     <div class="circle"></div>
                 </div>
                 <div class="gap-patch">
                     <div class="circle"></div>
                 </div>
                 <div class="circle-clipper right">
                     <div class="circle"></div>
                 </div>
             </div>
         </div>
     `;
 };

 const setGameHTML = (game) => {
     let div = document.createElement('div');
     div.dataset.gamename = game.slug;
     div.className = 'item';
     div.innerHTML = `
         <div class="card">
             <div class="card-image">
                 <img src="${game.background_image}" />
             </div>
             <div class="card-content">
                 <p>
                     <h5>${game.name}</h5> (${game.released})
                 </p>
             </div>
         </div>
     `;
     return div;
 };

 const initGames = (gamename) => {
     setGameLoad(gamesListPrincipal);
     getGamesByName(gamename, (games) => {
         gamesListPrincipal.innerHTML = '';
         games.results.forEach(game => {
             let divGame = setGameHTML(game);
             gamesListPrincipal.append(divGame);
         }) ;
     });
 };

 //Evento para após o usuário digitar o nome do jogo chamar a função
 document.querySelector('[type=text]').addEventListener('blur', e => {
     initGames(e.target.value);
 });