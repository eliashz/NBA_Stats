import { fetchData } from "../modules/fetchData.js";
import { inchesToCm, poundsToKg } from "../modules/weightHeight.js";

const teamID = localStorage.getItem('teamID');

/* const dataTeam = await fetchData(`https://www.balldontlie.io/api/v1/teams/`);

const team = dataTeam.data.filter(team => team.id == teamID); */

const showTeamInfo = () => {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#template-team').content;

    const teamDiv = template.cloneNode(true);

    teamDiv.querySelector('img').src += `${teamID}.png`; //Insercion de la imagen del logo
    teamDiv.querySelector('img').alt = team[0].name;

    teamDiv.querySelector('#team').textContent = team[0].full_name;
    teamDiv.querySelector('.name').textContent = `${team[0].conference} Conference`; 
    teamDiv.querySelector('.position').textContent = `${team[0].division} Division`; 
    teamDiv.querySelector('.number').textContent = `City of ${team[0].city}`; 

    fragment.appendChild(teamDiv);

    const teamsDiv = document.querySelector('header');
    teamsDiv.appendChild(fragment);
}
//showTeamInfo()

const allPlayers = await fetchData(`https://www.balldontlie.io/api/v1/players`);

const teamPlayers = allPlayers.filter(player => player.team.id == teamID);

const tbody = document.querySelector('tbody');

let print=true; 
const showPlayerInfo = (content, tr) => {
    const td = document.createElement('td');
    td.textContent = content;
    if (print===false) tr.classList.add('colorTable')
    tr.appendChild(td);
    tbody.appendChild(tr);
}

teamPlayers.map(teamPlayer => {
    const tr = document.createElement('tr');
    showPlayerInfo(teamPlayer.first_name + ' ' + teamPlayer.last_name, tr);
    showPlayerInfo(teamPlayer.position, tr);
    showPlayerInfo(inchesToCm(teamPlayer.height_feet, teamPlayer.height_inches), tr)
    showPlayerInfo(poundsToKg(teamPlayer.weight_pounds), tr)
    print = !print;
})

