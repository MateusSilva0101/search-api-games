//Get all games
const  getGamesByName = async (name) => {
    try {
        let result = await fetch(`https://api.rawg.io/api/games?key=${chave-api}&search=${name}`);
        
        result = await result.json();
        
        return result;

    } catch (error) {
        console.error(err);
    };
};

 //Get related games 
 const getRelatedGamesByName = async (name)  => {
    try {
        let result = await fetch(`https://api.rawg.io/api/games?key=${chave-api}&search=${name}/suggested`);
        
        result = await result.json();

        return result;

    } catch (error) {
        console.log(err);
    };
};





