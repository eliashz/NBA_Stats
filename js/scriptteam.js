import { fetchData } from "../modules/fetchData.js";
import { inchesToCm, poundsToKg } from "../modules/weightHeight.js";

const teamID = localStorage.getItem('teamID');

const dataTeam = await fetchData(`https://www.balldontlie.io/api/v1/teams/${teamID}`);

const showTeamInfo = () => {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#template-team').content;

    const teamDiv = template.cloneNode(true);

    teamDiv.querySelector('img').src += `${teamID}.png`; //Insercion de la imagen del logo
    teamDiv.querySelector('img').alt = dataTeam.name;

    teamDiv.querySelector('#team').textContent = dataTeam.full_name;
    teamDiv.querySelector('.name').textContent = `${dataTeam.conference} Conference`; 
    teamDiv.querySelector('.position').textContent = `${dataTeam.division} Division`; 
    teamDiv.querySelector('.number').textContent = `City of ${dataTeam.city}`; 

    fragment.appendChild(teamDiv);

    const teamsDiv = document.querySelector('header');
    teamsDiv.appendChild(fragment);
}
showTeamInfo()

const allPlayers = await fetchData(`https://www.balldontlie.io/api/v1/players`);

const teamPlayers = allPlayers.data.filter(player => player.team.id == teamID);
console.log(teamPlayers)

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

