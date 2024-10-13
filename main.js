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

    addCountry(country) {
        this.countries.push(country);
    }

    displayCountries() {
        countryListDiv.innerHTML = ''; 

        this.countries.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.textContent = country.name;
            countryItem.className = 'country-item';
            countryListDiv.appendChild(countryItem);
        });
    }

    async fetchClubsForCountry(countryName) {
        try {
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=${countryName}`);
            const data = await response.json();

            const country = this.countries.find(c => c.name === countryName);

            if (data.teams) {
                data.teams.forEach(team => {
                    const club = new Club(team.strTeam, team.idTeam);
                    country.addClub(club);
                });
                this.displayClubs(country);
            } else {
                clubListDiv.innerHTML = '<p>No clubs found for this country.</p>';
            }
        } catch (error) {
            console.error('Error fetching clubs:', error);
            clubListDiv.innerHTML = '<p>Error fetching clubs. Please try again later.</p>';
        }
    }

    displayClubs(country) {
        clubListDiv.innerHTML = ''; 

        country.clubs.forEach(club => {
            const clubItem = document.createElement('div');
            clubItem.textContent = club.name;
            clubItem.dataset.teamId = club.id;
            clubItem.className = 'club-item';
            clubListDiv.appendChild(clubItem);
        });
    }

    async fetchPlayersForClub(clubId) {
        try {
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${clubId}`);
            const data = await response.json();

            const club = this.findClubById(clubId);

            if (data.player && data.player.length > 0) {
                data.player.forEach(p => {
                    const player = new Player(p.strPlayer, p.strPosition);
                    club.addPlayer(player);
                });
                this.displayPlayers(club);
            } else {
                playerListDiv.innerHTML = '<p>No players found for this club.</p>';
            }
        } catch (error) {
            console.error('Error fetching players:', error);
            playerListDiv.innerHTML = '<p>Error fetching players. Please try again later.</p>';
        }
    }

    displayPlayers(club) {
        playerListDiv.innerHTML = ''; 

        if (club.players.length === 0) {
            playerListDiv.innerHTML = '<p>No players available.</p>';
        } else {
            club.players.forEach(player => {
                const playerItem = document.createElement('div');
                playerItem.textContent = `${player.name} - ${player.position}`;
                playerListDiv.appendChild(playerItem);
            });
        }
    }

    findClubById(clubId) {
        for (const country of this.countries) {
            const club = country.clubs.find(c => c.id === clubId);
            if (club) return club;
        }
        return null;
    }
}


const countryListDiv = document.getElementById('country-list');
const clubListDiv = document.getElementById('club-list');
const playerListDiv = document.getElementById('player-list');
const appManager = new AppManager();


const countries = ['England', 'Spain', 'Germany'];
countries.forEach(countryName => {
    const country = new Country(countryName);
    appManager.addCountry(country);
});


window.addEventListener('DOMContentLoaded', () => {
    appManager.displayCountries();
});