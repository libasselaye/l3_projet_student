"use strict";
const Phase = require("../../sources/engine/Phase.js");
const player = require("../../sources/engine/Player.js");
const Player = player.Player;
const Joker = player.Joker;

// Test de Phase
describe("Test method of Phase", () => {
    test("Test Phase constructor", () => {
        var phase = new Phase("number");
        expect(phase.counter).toBe(5);
    });

    test("Test Phase nextQuestion", () => {
        var phase = new Phase("number");
        var question = phase.nextQuestion();
        expect(question).not.toBeNull();
        expect(phase.counter).toBe(4);
    });

    test("Test Phase isEndOfPhase", () => {
        var phase = new Phase("number");
        phase.nextQuestion();
        phase.nextQuestion();
        expect(phase.isEndOfPhase()).toBeFalsy();
        phase.nextQuestion();
        phase.nextQuestion();
        phase.nextQuestion();
        expect(phase.isEndOfPhase()).toBeTruthy();
    });
});

// Test de Player
describe("Test method of Player", () => {
    test("Test Player constructeur", () => {
        // simulons l'id du socket.io
        var player = new Player("mon_id", "toto");
        expect(player.score).toBe(0);
    });

    test("Test Player score", () => {
        // simulons l'id du socket.io
        var player = new Player("mon_id", "toto");
        player.score = 15;
        expect(player.score).toBe(15);
    });

    test("Test Player pseudo", () => {
        // simulons l'id du socket.io
        var player = new Player("mon_id", "toto");
        player.pseudo = "tata";
        expect(player.pseudo).toBe("tata");
    });
});
