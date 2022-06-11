import { fetchData } from "../modules/fetchData";

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
   
const dataGames = await fetchData('https://www.balldontlie.io/api/v1/games')

const thead = document.querySelector('thead');
const tr2 = document.createElement('tr');
addTitle('visitante', 'home', tr2);
addTitle('', 'score', tr2);
addTitle('', 'score', tr2);
addTitle('local', 'away', tr2);
thead.appendChild(tr2); 
const tbody = document.querySelector('tbody');

for (let game of dataGames){
    const tr = document.createElement('tr');
    addCell(game.visitor_team.full_name, 'home', tr);
    addCell(game.visitor_team_score, 'score', tr)
    addCell(game.home_team_score, 'score', tr)
    addCell(game.home_team.full_name, 'away', tr);
    tbody.appendChild(tr);
}
    