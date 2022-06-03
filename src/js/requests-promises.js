//Aramazena os jogos principais e os relacionados
const gamesListPrincipal = document.querySelector('#games-list-principal');
const gamesListRelationed = document.querySelector('#games-relationed');

//Função que nos retorna uma promise
const  getGamesByName = (name) => {  
    return new Promise((resolve, reject) => {
        fetch(`https://api.rawg.io/api/games?key=${chave_api}&search=${name}`)
        //Converte a resposta do servidor para JSON
        .then(res => res.json())
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        });
    });
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

 //Função que seta as informações do game numa div 
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

 //Função que inicia as outras funções
 const initGames = (gamename) => {
    setGameLoad(gamesListPrincipal);

    gamesListRelationed.innerHTML = '';

     getGamesByName(gamename).then(games => {
         gamesListPrincipal.innerHTML = '';

         games.results.forEach(game => {   
            let divGame = setGameHTML(game);

            //Evento que ao clicar em jogo, exibe os jogos relacionados
            divGame.addEventListener('click', e => {
                setGameLoad(gamesListRelationed);

                //adicionamos um ouvinte do evento clique em cada elemento de jogo criado
                let gameTag = e.currentTarget;

                //recuperar o nome do jogo que clicamos 
                let gamename = gameTag.dataset.gamename;

                getRelatedGamesByName(gamename).then(gamesRelationed => {

                    //remover o conteúdo da <div> que vai conter os novos jogos
                    gamesListRelationed.innerHTML = '';

                    //percorre os resultados da API e cria um HTML de cada jogo relacionado
                    gamesRelationed.results.forEach(game => {
                        let divGameRelationed = setGameHTML(game);

                        gamesListRelationed.append(divGameRelationed);
                    });
                });
            });
             gamesListPrincipal.append(divGame);
        });
     });
 };

 //Evento para após o usuário digitar o nome do jogo chamar a função
 document.querySelector('[type=text]').addEventListener('blur', e => {
     initGames(e.target.value);
 });

 //Buscando os dados dos jogos relacionados 
 function getRelatedGamesByName(name) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.rawg.io/api/games?key=${chave_api}&search=${name}/suggested`)
        .then(res => res.json())
        .then(data => {
            resolve(data);
        })
        .catch(err => {
            reject(err);
        })   
    });
};
