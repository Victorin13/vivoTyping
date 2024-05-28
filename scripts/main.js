/*********************************************************************************
 * 
 * Point d'entrée, c'est lui qui intialise le jeu et lance la boucle de jeu. 
 * 
 *********************************************************************************/
/* const date3 = new Date(154673863683);
const date4 = new Date('13/07/1999');
const date = Date.parse('Fri, 13 July 2001 14:35:00 GMT+01:00');
console.log(date, date1, date3, date4); */
const date1 = new Date().getTime();
lancerJeu();
const date3 = new Date().getTime();
const date4 = date1 - date3;
console.log(date4);

/* setTimeout(function(){
    console.log('Boom!');
}, 10000);

const btnTimer = document.querySelector("footer button");
const timerID = setInterval(function(){
    console.log('Bada Boom!');
}, 5000);

btnTimer.addEventListener("click", () => {
    clearInterval(timerID);
    console.log('Timer stopped !');
}); */

