document.getElementById("boton").addEventListener('click', getGames);
const div = document.querySelector("#result");
function getGames() {
    /* fetch("https://www.balldontlie.io/api/v1/games") */
    fetch("games.json")
        .then(response => response.json())
        //.then(data => div.textContent = JSON.stringify(data));
        //.then(jsonreal => console.log(jsonreal.data.length));
        .then(jsonreal => {
            console.log(jsonreal.data[0].visitor_team.full_name);
            console.log(jsonreal.data[0].visitor_team_score);
            console.log(jsonreal.data[0].home_team.full_name);
            console.log(jsonreal.data[0].home_team_score);
            
        });
}