"use strict";

/**
 * La classe Player regroupe les méthodes permettant de gérer un joueur
 * @class
 */
class Player {
    /**
     * Constructeur de la classe Player
     * @constructor
     * @param {String} pseudo Le pseudo du joueur
     */
    constructor(pseudo) {
        this.pseudo = pseudo;
        this.score = 0;
    }

    /**
     * fonction permettant de retourner le score du joueur
     * @public
     * @returns {number} le score du joueur
     */
    getScore() {
        //TODO
    }

    /**
     * fonction permettant de retourner le pseudo du joueur
     * @public
     * @returns {String} le pseudo du joueur
     */
    getpseudo() {
        //TODO
    }

    /**
     * retourne la reponse du player
     *
     * @public
     * @returns {String} reponse du joueur
     */
    reponse() {
        //TODO
        console.log("Yes ! ça marche je recois la réponse");
    }
}

module.exports = Player;
