import './style.css'

const sportImages = document.querySelectorAll('.navitem');
const leagueListDiv = document.getElementById('league-list');


class AppManger{
    constructor(){
        this.Leagues = [];
        this.filteredLeagues = [];
    }

    addLeagues(leagues){
        this.Leagues.push(leagues);
    }

    displayLeagues(sportType) {
        
        leagueListDiv.innerHTML = ''; 
    
        this.filteredLeagues = this.Leagues.filter(league => league.sportType === sportType);
    
        this.filteredLeagues.slice(0, 10).forEach(league => {
            const leagueItem = document.createElement('div');
            leagueItem.textContent = league.name; 
            leagueItem.setAttribute('id', league.id); 
            
            
    
            
            if (sportType === 'Soccer') {
                leagueItem.classList.add('football-league');
            } else if (sportType === 'Basketball') {
                leagueItem.classList.add('basket-league');
            } else if (sportType === 'Motorsport') {
                leagueItem.classList.add('motor-league'); // Dodaj klasu za moto lige ako imaš
            }
    
            leagueListDiv.appendChild(leagueItem);
        });
    }
}
    


class League {
    constructor (name, id, sportType){
        this.name = name;
        this.id = id;
        this.Clubs = [];
        this.sportType = sportType;
    }

    addClub(club){
        this.Clubs.push(club);
    }
}

class Club {
    constructor(name, id, leagueId){
        this.name = name;
        this. id = id;
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


async function fetchData(url, sportType) {
    try{
        let response = await fetch(url);
        let data = await response.json();

        console.log(data);

        appMenager.Leagues = [];

        data.leagues.forEach(leagueData => {
            const league = new League(leagueData.strLeague, leagueData.idLeague, leagueData.strSport);
            appMenager.addLeagues(league);
            
        });

        console.log(appMenager.Leagues);

        appMenager.displayLeagues(sportType);
        
    } catch (error){
        console.log('Greska prilikom ucitavanja! ', error);
    }
}


sportImages.forEach(image => {
    image.addEventListener('click', function() {
        sportImages.forEach(img => img.classList.remove('active'));

        this.classList.add('active');

        if (image.classList.contains('football-picture')) {
            fetchData('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php', 'Soccer'); 
        } else if (image.classList.contains('basketball-picture')) {
            fetchData('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php', 'Basketball'); 
        } else if (image.classList.contains('motor-picture')) {
            fetchData('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php', 'Motorsport'); 
        }
    });
});

leagueListDiv.addEventListener('click', async function(event) {
    if (event.target.id) {

        const leagueId = event.target.id; 

        try {
           
            const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Basketball&c=United States`);
            const data = await response.json();

            console.log(data.teams); 

            
            const selectedLeague = appMenager.Leagues.find(league => league.id === leagueId);

            if (selectedLeague) {
                selectedLeague.Clubs = []; 

                data.teams.forEach(team => {
                    const club = new Club(team.strTeam, team.idTeam); 
                    selectedLeague.addClub(club); 
                });

                
                const clubListDiv = document.getElementById('club-list'); 
                clubListDiv.innerHTML = ''; 

                selectedLeague.Clubs.forEach(club => {
                    const clubItem = document.createElement('div');
                    clubItem.textContent = club.name; 
                    clubListDiv.appendChild(clubItem);
                });
            } else {
                console.error('Liga nije pronađena');
            }

        } catch (error) {
            console.error('Error fetching clubs', error);
        }
    }
});







