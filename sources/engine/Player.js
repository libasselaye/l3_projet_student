"use strict";
const helper = require("../Helper.js");
const Joker = helper.Joker;

/**
 * La classe Player permet de gérer un joueur
 * @class
 */
class Player {
    /**
     * Constructeur de la classe Player
     * @constructor
     * @param {String} id L'id attribué par le socket.io à la connexion du joueur
     * @param {String} pseudo Le pseudo du joueur
     * @example
     * var player = new Player(socket_id, 'toto'); // crée un objet de type Player
     */
    constructor(id, pseudo) {
        this._id = id;
        this._pseudo = pseudo;
        this._score = 0;
        this._jokers = new Map([
            [Joker.INCREASE_REWARD, 0],
            [Joker.PUBLIC_NOTICE, 0],
            [Joker.DELETE_ONE, 0],
        ]); // un joker non utilisé est 0 par défaut, une fois utilisé il est à -1, s'il
        // est en cours d'utilisation il est à 1
    }

    /**
     * Retourne le map jokers
     * @returns {Map} map
     */
    get jokers() {
        return this._jokers;
    }

    /**
     * Attribue une nouvelle valeur à jokers
     * @param {Map} value valeur à attribuer au Map jokers
     */
    set jokers(value) {
        this._jokers = value;
    }

    /**
     * Permet de retourner le score du joueur
     * @public
     * @example
     * player.score; // retourne le score du joueur
     * @returns {number} le score du joueur
     */
    get score() {
        return this._score;
    }

    /**
     * Permet de d'attribuer un score au joueur
     * @public
     * @example
     * player.score = 1; // attribue 1 comme score au joueur
     * @param {number} score le score du joueur
     */
    set score(score) {
        this._score = score;
    }

    /**
     * permet de retourner le pseudo du joueur
     * @public
     * @example
     * player.pseudo; // retourne le pseudo du joueur
     * @returns {String} le pseudo du joueur
     */
    get pseudo() {
        return this._pseudo;
    }

    /**
     * Permet de d'attribuer un pseudo au joueur
     * @public
     * @example
     * player.pseudo = "mon_pseudo"; // attribue un nouveau pseudo
     * @param {String} pseudo le pseudo du joueur
     */
    set pseudo(pseudo) {
        this._pseudo = pseudo;
    }

    /**
     * permet de retourner l'id fourni par
     * @public
     * @example
     * player.id; // retourne le id
     * @returns {String} l'id du joueur
     */
    get id() {
        return this._id;
    }

    /**
     * Permet de d'attribuer l'id au joueur
     * @public
     * @example
     * player.id = "mon_id"; // attribue un nouvel id
     * @param {String} id L'id du joueeur
     */
    set id(id) {
        this._id = id;
    }
}

module.exports = Player;
