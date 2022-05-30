import { fetchData } from "../modules/fetchData.js";
const shieldsEast = ['7.png', '8.png', '10.png', '11.png', '13.png', '14.png', '15.png', '18.png', '19.png', '21.png', '24.png', '25.png', '26.png', '27.png', '29.png',];
const shieldsWest = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '9.png', '12.png', '16.png', '17.png', '20.png', '22.png', '23.png', '28.png', '30.png',];

//const teams = await fetchData('https://www.balldontlie.io/api/v1/teams');

//console.log(teams.data)



const addShields = (shields, classShields) => {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#template-shields').content;

    for (const shield of shields) {
        const shieldDiv = template.cloneNode(true);

        shieldDiv.querySelector('img').src += shield;
        shieldDiv.querySelector('img').alt = shield;

        fragment.appendChild(shieldDiv);
    }

    const shieldsDiv = document.querySelector(classShields);
    shieldsDiv.appendChild(fragment);
}

addShields(shieldsEast, '.shield-east');
addShields(shieldsWest, '.shield-west');