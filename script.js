// Movie Genres
const movieGenres = {
    action: [
        { title: 'inception', hint: 'Dream in your Dream' },
        { title: 'johnwick', hint: 'You better not mess with his dog' },
        { title: 'matrix', hint: 'Red Pill or Blue Pill' },
        { title: 'avengers', hint: 'Superhero Team' }
    ],
    comedy: [
        { title: 'hangover', hint: 'Three friends on a trip' },
        { title: 'johnnyenglish', hint: 'Luckiest unlucky Agent' },
        { title: 'dictator', hint: 'Best Country Head' },
        { title: 'borat', hint: 'Kazakhstan Guy' }
    ],
    drama: [
        { title: 'shawshankredemption', hint: 'Prison Escape' },
        { title: 'forrestgump', hint: 'Life is like a box of chocolates' },
        { title: 'thegodfather', hint: 'Corleone Family' },
        { title: 'titanic', hint: 'Jack and Rose' }
    ],
    sciFi: [
        { title: 'starwars', hint: 'May The Force be with you.' },
        { title: 'bladerunner', hint: 'Replicants' },
        { title: 'interstellar', hint: 'Wormholes and Black Holes' },
        { title: 'passengers', hint: 'Futuristic Adventure' }
    ]
};

// Game class
class Hangman {
    constructor() {
        this.selectedGenre = '';
        this.selectedMovie = {};
        this.guessedWord = [];
        this.wrongLetters = [];
        this.hangmanImageIndex = 0;
        this.maxWrongGuesses = 5;
    }

    startGame() {
        this.selectedGenre = document.getElementById('genre-select').value;
        this.selectedMovie = this.getRandomMovie();
        this.guessedWord = Array(this.selectedMovie.title.length).fill('_');
        this.wrongLetters = [];
        this.hangmanImageIndex = 0;

        document.getElementById('hint').textContent = `Hint: ${this.selectedMovie.hint}`;
        this.updateDisplay();
    }

    getRandomMovie() {
        const movies = movieGenres[this.selectedGenre];
        return movies[Math.floor(Math.random() * movies.length)];
    }

    updateDisplay() {
        document.getElementById('word-container').textContent = this.guessedWord.join(' ');
        document.getElementById('wrong-letters-container').textContent = `Wrong Letters: ${this.wrongLetters.join(', ')}`;
    }

    checkLetter(letter) {
        if (this.wrongLetters.length >= this.maxWrongGuesses) {
            // Stop accepting guesses if the maximum allowed incorrect guesses have been reached
            return;
        }

        if (this.selectedMovie.title.includes(letter)) {
            for (let i = 0; i < this.selectedMovie.title.length; i++) {
                if (this.selectedMovie.title[i] === letter) {
                    this.guessedWord[i] = letter;
                }
            }
        } else {
            this.wrongLetters.push(letter);
            this.hangmanImageIndex++;
        }

        this.updateDisplay();
        this.checkWin();
        updateWrongLettersDisplay(); // Add this line to update the wrong letters display
        this.checkWin();
    }


    checkWin() {
        if (this.guessedWord.join('') === this.selectedMovie.title) {
            document.getElementById('message').textContent = `You win! The movie was from the ${this.selectedGenre} genre.`;
        } else if (this.hangmanImageIndex === 6 || this.wrongLetters.length === this.maxWrongGuesses) {
            document.getElementById('message').textContent = `Game over. You lose! The movie was ${this.selectedMovie.title}.`;
        }
    }

    restartGame() {
        document.getElementById('hint').textContent = '';
        document.getElementById('message').textContent = '';
        this.startGame();
        this.updateDisplay();
    }
}

// UI Class
class HangmanUI {
    constructor() {}

    drawWord(word, guesses) {
        // Display revealed letters
        document.getElementById('word-container').textContent = guesses.join(' ');
    }

    drawHangman(numWrong) {
        // Draw hangman image
        document.getElementById('hangman-image').style.backgroundImage = `url('https://image-url.com/hangman-image-${numWrong}.png')`;
    }

    drawMessage(msg) {
        // Show message
        document.getElementById('message').textContent = msg;
    }
}

// Game instantiation & event handlers
const ui = new HangmanUI();
const game = new Hangman();

// On key press
document.addEventListener('keydown', (e) => {
    const letter = e.key.toLowerCase();
    game.checkLetter(letter);
});

function updateWrongLettersDisplay() {
    const wrongLettersContainer = document.getElementById('wrong-letters-container');
    wrongLettersContainer.innerHTML = ''; // Clear previous content

    game.wrongLetters.forEach((letter) => {
        const wrongLetterDiv = document.createElement('div');
        wrongLetterDiv.textContent = letter;
        wrongLettersContainer.appendChild(wrongLetterDiv);
    });
}