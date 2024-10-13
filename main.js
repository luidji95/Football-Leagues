class Country {
    constructor(name) {
        this.name = name;
        this.clubs = [];
    }

    addClub(club) {
        this.clubs.push(club);
    }
}

class Club {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }
}

class Player {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
}

class AppManager {
    constructor() {
        this.countries = [];
    }