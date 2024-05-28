/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction formate et affiche le score de l'utilisateur dans la zone appropriee !
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span");
    // Formatage du texte du score
    let affichageScore = `${score} / ${nbMotsProposes}`;
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore;
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition");
    zoneProposition.innerText = proposition;
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email du destinataire
 * @param {string} score : le score du joueur à l'issue du jeu
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score vivoTyping&body=Salut, 
    je suis ${nom} et je viens de réaliser le score ${score} sur le site vivoTyping !`;
    location.href = mailto;
}

/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format,
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @throws {Error}
 */
function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court !");
    }
    
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @throws {Error}
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide.");
    }
    
}

/**
 * Cette fonction affiche le message d'erreur passé en paramètre. 
 * Si le span existe déjà, alors il est réutilisé pour ne pas multiplier
 * les messages d'erreurs. 
 * @param {string} message 
 */
function afficherMessageErreur(message) {
    
    // On recupère la zone d'affichage d'erreurs
    let spanErreurMessage = document.getElementById("erreurMessage");
    // Si le span n'existe pas encore, on le cree 
    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup");
        spanErreurMessage = document.createElement("span");
        spanErreurMessage.id = "erreurMessage";
        
        popup.append(spanErreurMessage);
    }
    
    spanErreurMessage.innerText = message;
}

/**
 * Cette fonction permet de récupérer les informations dans le formulaire
 * de la popup de partage et d'appeler l'affichage de l'email avec les bons paramètres.
 * @param {string} scoreEmail 
 */
function gererFormulaire(scoreEmail) {
    try {
        let baliseNom = document.getElementById("nom");
        let nom = baliseNom.value;
        validerNom(nom);
    
        let baliseEmail = document.getElementById("email");
        let email = baliseEmail.value;
        validerEmail(email);
        afficherMessageErreur("");
        afficherEmail(nom, email, scoreEmail);

    } catch(erreur) {
        afficherMessageErreur(erreur.message);
    }
    
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup();
    let score = 0;
    let i = 0;
    let listeProposition = listeMots;

    let btnValiderMot = document.getElementById("btnValiderMot");
    let listeBtnRadio = document.querySelectorAll(".optionSource input");
    let inputEcriture = document.getElementById("inputEcriture");
    // let zoneSaisie = document.querySelector(".zoneSaisie");

    /** Cette fonction traite la validation de l'input. */
    function validerInput (){
        if (inputEcriture.value === listeProposition[i]) {
            score++;
        }
        i++;
        afficherResultat(score, i);
        inputEcriture.value = '';
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est terminé !");
            // On désactive le bouton valider et le champ input
            btnValiderMot.disabled = true;
            inputEcriture.disabled = true;
            // On désactive les boutons radios
            for (let indexBtnRadio = 0; indexBtnRadio < listeBtnRadio.length; indexBtnRadio++) {
                listeBtnRadio[indexBtnRadio].disabled = true;
            }

        } else {
            afficherProposition(listeProposition[i]);
        }
    }


    afficherProposition(listeProposition[i]);
    let timerID;
    inputEcriture.addEventListener("focus", () => {
        timerID = setTimeout(function (){
            console.log('Temps ecoule !');
        }, 15000);

    });
    
    // Gestion de l'événement keypress sur la zone de saisie zoneSaisie
    inputEcriture.addEventListener("keypress", (event) => {
        if (event.key === 'Enter') {
            clearTimeout(timerID);
            validerInput();
        }
    });

    // Gestion de l'événement click sur le bouton "valider"
    btnValiderMot.addEventListener("click", () => {
        clearTimeout(timerID);
        validerInput();
    });


    // Gestion de l'événement change sur les boutons radios. 
    
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if (event.target.value === "1") {
                listeProposition = listeMots;
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases;
            }
            // Et on modifie l'affichage en direct. 
            afficherProposition(listeProposition[i]);
        });
    }

    // Gestion de l'événement submit sur le formulaire de partage. 
    let form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let scoreEmail = `${score} / ${i}`;
        gererFormulaire(scoreEmail);
    });

    afficherResultat(score, i);
}