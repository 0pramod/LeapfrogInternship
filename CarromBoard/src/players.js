/** A class to define Playeres
 * @constructor -to create players
 * @param {number} id - identifer of the player
 * @param {string} id - Name for the Player
 * @param {number} carromId - identifier of the type of carrom assigned to the player
 * @param {boolean} active - to identify player active status
 * @param {boolean} isBot - to identify if player is a Bot or not
 */

class Player {
  constructor(id, playerName, carromId, carromColor, active, isBot) {
    this.id = id;
    this.playerName = playerName;
    this.carromId = carromId;
    this.carromColor = carromColor;
    this.active = active;
    this.score = 0;
    this.isBot = isBot;
  }
}

let player1 = new Player(1, "Pramod", 2, "black", true, false);
let player2 = new Player(2, "Max", 3, "white", false, false);
let bot = new Player(2, "The Bot", 3, "white", false, true);
