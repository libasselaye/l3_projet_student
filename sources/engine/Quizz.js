"use strict";
const Phase = require("./Phase.js");
const player = require("./Player.js");
const Helper = require("../Helper.js");
const Player = player.Player;
const Joker = player.Joker;

/**
 * La classe représentant une partie de jeu
 * @class
 * @requires Phase
 * @requires Player
 */
class Quizz {
    /**
     * Constructeur de la classe Quizz
     */
    constructor() {
      //  this._currentPhase = Phase(Helper.QUESTION_TYPE_PROPOSAL);
        this._counterPhase = 1;
        this._players = new Map();
        this._playersResponse = {};
        this._timer = null;
        this._step = 0;
    }

    get step() {
        return this._step;
    }

    set step(value) {
        this._step = value;
    }

    get timer() {
        return this._timer;
    }

    set timer(value) {
        this._timer = value;
    }

    /**
     * Retourne le nombre de phase déjà passé
     * @returns {number}
     */
    get counterPhase() {
        return this._counterPhase;
    }

    /**
     * @param {number} value Valeur
     */
    set counterPhase(value) {
        this._counterPhase = value;
    }

    /**
     * Retourne la valeur du tableau contenant les joueurs ayant repondu à la question
     * @returns {Array} le tableau des joueurs ayant déjà repondus à la question
     */
    get playersResponse() {
        return this._playersResponse;
    }

    /**
     * Attribue une valeur au tableau PlayersResponse
     * @param {Array} value
     */
    set playersResponse(value) {
        this._playersResponse = value;
    }

    /**
     * Retourne la phase en cours
     * @public
     * @returns {Phase} Retourne la phase de jeu en cours
     */
    get currentPhase() {
        return this._currentPhase;
    }

    /**
     * Attribue une nouvelle valeur à l'objet phase
     * @public
     * @param {Phase} value La phase en cours
     */
    set currentPhase(value) {
        this._currentPhase = value;
    }

    /**
     * Retourne le Map des joueurs en cours
     * @public
     * @returns {Map} Retourne le Map des joueurs du jeu en cours
     */
    get players() {
        return this._players;
    }

    /**
     * Attribue une nouvelle valeur au Map players
     * @private
     * @param {Map} value Nouvelle Map
     */
    set players(value) {
        this._players = value;
    }

    /**
     * Ajout d'un nouveau joueur au Map
     *
     * @param {String} id L'identifiant attribué par le socket
     * @param {String} pseudo Le pseudo du joueur
     * @returns {boolean} 'true' si l'ajout a été fait, 'false' sinon
     */
    register(id, pseudo) {
        if (this.players.size < 4) {
            let player = new Player(id, pseudo);
            this.players.set(id, player);
            return true;
        }
        return false;
    }

    /**
     * Activer un joker pour un joueur donné
     *
     * @param {String} playerId
     * @param {number} joker 0 pour le Joker x2, 1 pour joker avis public et 2 pour joker question -1
     */
    activeJoker(playerId, joker) {
        if (this.players.has(playerId)) {
            let p = this.players.get(playerId);
            p.jokers.set(joker, 1);
        }
    }

    /**
     * Désactiver un joker pour un joueur donné
     *
     * @param {String} playerId
     * @param {number} joker 0 pour le Joker x2, 1 pour joker avis public et 2 pour joker question -1
     */
    deactiveJoker(playerId, joker) {
        if (this.players.has(playerId)) {
            let p = this.players.get(playerId);
            p.jokers.set(joker, -1);
        }
    }

    /**
     * Vérifie si la réponse du joueur est correcte
     *
     * @param {String} playerId Id socket id attribué au joueur
     * @param {String} response Reponse du joueur
     * @returns {number} Renvoi le nouveau score du joueur si la reponse est correcte sinon 0
     */
    checkResponse(playerId, response) {
        // Vérifier s'il y a toujours du temps pour répondre
        // mettre à jour le nombre de joueurs ayant repondu correctement à cette question
        let order = updatePlayersResponse(playerId);
        if (order == this.players.size) {
            // Renvoyer la reponse à la quetion au moniteur car tous les joueurs ont déjà repondu
            this.displayCorrectResponse();
        }
        if (order != -1) {
            // vérifier si la reponse est vraie
            let question = this.currentPhase.currentQuestion;
            if (question.answer == response) {
                // calculer le score du joueur
                // Score à renvoyer vers le moniteur
                return computePlayerScore(playerId, playerResponseOrder);
            }
        }

        return 0;
    }

    /**
     * Fait un appel au socket pour envoyer la réponse au moniteur durant quelque temps
     * puis fait appel à play
     */
    displayCorrectResponse() {
        // envoyer la reponse au moniteur
    }

    /**
     * Méthode start appelée par le socket pour démarrer une nouvelle partie
     */
    start() {
        if (this.players.size >= 2 && this.players.size <= 4) {
            this.play();
        } else {
            return "La partie ne peut pas démarrer car on n'a pas le nombre de joueurs requis (2 à 4)";
        }
    }

    play() {
        let quizzEnd = true;
        if (!this.currentPhase.isEndOfPhase()) {
            quizzEnd = false;
        } else {
            quizzEnd = false;
            switch (this.counterPhase) {
                case 1:
                    this.currentPhase = new Phase(
                        Helper.QUESTION_TYPE_TRUE_FALSE
                    );
                    this.counterPhase++;
                    break;
                case 2:
                    this.currentPhase = new Phase(Helper.QUESTION_TYPE_NUMBER);
                    this.counterPhase++;
                    break;
            }
        }
        if (quizzEnd) {
            // envoyer un signal au client pour signaler la fin du jeu
        } else {
            this.currentPhase.nextQuestion();
            this.printQuestion();
            this.printResponse();
            this.step = 0;
            this.timer = setInterval(function () {
                if (this.step < 100) {
                    this.step += 5;
                    // envoyer le step au moniteur pour le progressbar
                } else {
                    this.step = 0;
                    // envoyer au moniteur que le delai est dépassé
                    this.playersResponse = {};
                    displayCorrectResponseResponse();
                }
            }, 1200);
        }
    }

    /**
     * Calculer le score d'un joueur après une bonne reponse à une question
     *
     * @param {String} playerId
     * @param {number} playerResponseOrder Ordre de reponse du joueur
     * @returns {number} score du joueur
     */
    computePlayerScore(playerId, playerResponseOrder) {
        newScore = 0;
        switch (playerResponseOrder) {
            case 1:
                newScore += 5;
                break;
            case 2:
                newScore += 3;
                break;
            case 3:
                newScore += 2;
                break;
            case 4:
                newScore += 1;
                break;
        }
        // vérifier si le joker x2 est activé
        let p = this.players.get(playerId);
        if (p.jokers.get(Joker.INCREASE_REWARD) == 1) {
            newScore *= 2;
            this.deactiveJoker(playerId, Joker.INCREASE_REWARD);
        }
        p.score += newScore;
        return p.score;
    }

    /**
     * Mise à jour du tableau des joueurs ayant déjà repondus
     * @param {String} playerId
     * @returns {number} -1 si le joueur a déjà repondu, valeur>0 si pas encore repondu à la question
     * (cette valeur correspond à l'ordre de reponse des joueurs)
     */
    updatePlayersResponse(playerId) {
        if (this.playersResponse.includes(playerId)) {
            return -1; // car le joueur a déjà repondu à cette question
        }
        this.playersResponse.push(playerId);
        let playerResponseOrder = playersResponse.length;
        return playerResponseOrder;
    }

    //fonction permettant d'afficher la question courante
    printQuestion() {
        return this.currentPhase.currentQuestion.question_subject;
    }

    printResponse() {
        return this.currentPhase.currentQuestion.proposals;
    }

    // permet de suivre le temps donné au joueur pour donner sa réponse
    timeCounter() {
        //TODO
    }

    /**
     * se charge de supprimer le joueur de la partie
     * @param {String} pseudo
     */
    remove_player(pseudo) {
        delete this.players[pseudo];
    }
}

module.exports = Quizz;
