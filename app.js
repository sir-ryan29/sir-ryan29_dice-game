/*
RÈGLES DU JEU :

- Le jeu a 2 joueurs, jouant à tour de rôle.
- À chaque tour, un joueur lance un dé autant de fois qu'il le souhaite. Chaque résultat est ajouté à son score de ROUND.
- MAIS, si le joueur obtient un 1, tout son score de ROUND est perdu. Après cela, c'est le tour de l'autre joueur.
- Le joueur peut choisir de 'Garder', ce qui signifie que son score de ROUND est ajouté à son score GLOBAL. Après cela, c'est le tour de l'autre joueur.
- Le premier joueur à atteindre 100 points sur le score GLOBAL gagne la partie.
*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Nombre aléatoire
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Afficher le résultat
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Mettre à jour le score de round SI le nombre obtenu n'est PAS un 1
        if (dice !== 1) {
            // Ajouter le score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Joueur suivant
            nextPlayer();
        }
    }    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Ajouter le score ACTUEL au score GLOBAL
        scores[activePlayer] += roundScore;

        // Mettre à jour l'interface utilisateur
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Vérifier si le joueur a gagné la partie
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Gagnant !';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Joueur suivant
            nextPlayer();
        }
    }
});

function nextPlayer() {
    // Joueur suivant
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Joueur 1';
    document.getElementById('name-1').textContent = 'Joueur 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;
