"use strict";

/**
 *
 * @class
 */
class Phase {
    constructor(idPhase) {
        this.map = new Map();
        this.compteur = 5;
        this.question = " ";
    }
    //cette fonction va permettre d'avoir la question suivante
    next_question() {
        //TODO
        compteur--;
    }
    //cette question retourne la question en cours
    getQuestion_Courante() {
        //TODO
    }
    //fonction permettant de récuperer la réponse du joueur
    check_answer(reponse_du_joueur) {
        //TODO
    }
    //fonction permettant de calculer le score du joueur
    calcul_score() {
        //TODO
    }
}

module.exports = Phase;
