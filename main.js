const sportImages = document.querySelectorAll('.navitem');
const leagueListDiv = document.getElementById('league-list');


class AppManger {
    constructor() {
        this.Leagues = [];
    }

    addLeague(league) {
        this.Leagues.push(league);
    }

    displayLeagues() {
        const leagueListDiv = document.getElementById('league-list');
        leagueListDiv.innerHTML = ''; 

        this.Leagues.forEach(league => {
            const leagueItem = document.createElement('div');
            leagueItem.textContent = league.name;
            leagueItem.id = league.id; // Postavi ID lige kao atribut div-a
            leagueListDiv.appendChild(leagueItem);
        });
    }
}

class League {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.Clubs = [];
    }

    addClub(club) {
        this.Clubs.push(club);
    }
}

class Club {
    constructor(name, id, leagueId){
        this.name = name;
        this.id = id;
        this.leagueId = leagueId;
        this.Players = [];
    }

    addPlayer(player){
        this.Players.push(player);
    }
}

class Player {
    constructor(name, position){
        this.name = name;
        this.position = position;
    }
}

const appMenager = new AppManger();

// Funkcija koja poziva API i dodaje lige u menadžera (samo Engleska)
async function fetchLeaguesByCountry() {
    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=England`);
        const data = await response.json();

       

        data.forEach(leagueName => {
            const league = new League(leagueName);
            appMenager.addLeague(league);
        });
        
        appMenager.displayLeagues(); 
    } catch (error) {
        console.error('Error fetching leagues', error);
    }
}


document.getElementById('league-list').addEventListener('click', async function(event) {
    if (event.target.id) {
        const leagueId = event.target.id;

        try {
            
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=England`);
            const data = await response.json();

            console.log(data);

            const clubListDiv = document.getElementById('club-list');
            clubListDiv.innerHTML = ''; 

            data.teams
                .forEach(team => {
                    const clubItem = document.createElement('div');
                    clubItem.textContent = team.strTeam; // Ime kluba
                    clubListDiv.appendChild(clubItem);
                });

        } catch (error) {
            console.error('Error fetching clubs', error);
        }
    }
});


window.addEventListener('DOMContentLoaded', fetchLeaguesByCountry);







