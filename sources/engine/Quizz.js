"use strict";

/**
 * Import Phase class.
 */
const ImportPhase = require("./Phase");

/**
 * Import Player class.
 */
const ImportPlayer = require("./Player");

/**
 * Quizz class.
 * @class
 */
class Quizz {
    constructor(name) {
        this.name = name;
        this.phase = 0;
        this.players = {};
    }

    register(pseudo) {
        this.players[pseudo] = new ImportPlayer(pseudo);
    }

    //Juste pour tester la connexion
    reponse(pseudo) {
        this.players[pseudo].reponse();
    }

    //fonction permettant l'initialisation de la partie
    init() {}
    //fonction permettant d'afficher la question courante
    print_question() {
        //TODO
    }
    // permet de suivre le temps donné au joueur pour donner sa réponse
    compteur_de_temps() {
        //TODO
    }
    //elle gére l'ajout du joueur dans la partie
    add_player() {
        //TODO
    }
    /**
     * se charge de supprimer le joueur de la partie
     * @param {String} pseudo
     */
    remove_player(pseudo) {
        delete this.players[pseudo];
    }
    getPhase() {
        //TODO
    }
}

module.exports = Quizz;
