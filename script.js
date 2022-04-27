document.getElementById("boton").addEventListener('click', getGames);
const div = document.querySelector("#result");

function addCell(textContent, css, tr){
    const td = document.createElement('td');
    td.textContent = textContent;
    td.classList.add(css);
    tr.appendChild(td);
}

function addTitle(textContent, css, tr){ //TODO optimizar funcion
    const th = document.createElement('th')
    th.textContent = textContent;
    th.classList.add(css);
    tr.appendChild(th);
}
function getGames() {
    
    
    /* fetch("https://www.balldontlie.io/api/v1/games") */
    fetch("games.json")
        .then(response => response.json())
        //.then(data => div.textContent = JSON.stringify(data));
        //.then(jsonreal => console.log(jsonreal.data.length));
        .then(jsonreal => {
/*          console.log(jsonreal.data[0].visitor_team.full_name);
            console.log(jsonreal.data[0].visitor_team_score);
            console.log(jsonreal.data[0].home_team.full_name);
            console.log(jsonreal.data[0].home_team_score); */
            const thead = document.querySelector('thead');
            const tr2 = document.createElement('tr');
            addTitle('visitante', 'home', tr2);
            addTitle('', 'score', tr2);
            addTitle('', 'score', tr2);
            addTitle('local', 'away', tr2);
            thead.appendChild(tr2); 
            const tbody = document.querySelector('tbody');
            
            for (let games of jsonreal.data){
                const tr = document.createElement('tr');
                addCell(games.visitor_team.full_name, 'home', tr);
                addCell(games.visitor_team_score, 'score', tr)
                addCell(games.home_team_score, 'score', tr)
                addCell(games.home_team.full_name, 'away', tr);
                tbody.appendChild(tr);
            }
        });
}