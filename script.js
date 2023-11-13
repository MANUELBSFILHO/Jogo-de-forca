const words = ['javascript', 'html', 'css', 'python', 'java', 'react', 'angular', 'nodejs'];
let selectedWord = '';
let guessedWord = [];
let incorrectLetters = [];
let chances = 6;

document.addEventListener('DOMContentLoaded', setupGame);

function setupGame() {
    // Selecionar uma palavra aleatória
    selectedWord = words[Math.floor(Math.random() * words.length)];

    // Inicializar guessedWord com underscores
    guessedWord = Array(selectedWord.length).fill('_');

    // Exibir a palavra inicialmente
    displayWord();

    // Exibir as chances iniciais
    displayChances();

    // Limpar letras incorretas
    incorrectLetters = [];

    // Limpar o resultado
    document.getElementById('result').textContent = '';

    // Limpar a entrada do usuário
    document.getElementById('guess-input').value = '';
}

function displayWord() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = guessedWord.join(' ');
}

function displayChances() {
    document.getElementById('chances-count').textContent = chances;
}

function makeGuess() {
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toLowerCase();

    if (guess.match(/[a-z]/) && guess.length === 1) {
        if (selectedWord.includes(guess)) {
            // Atualizar guessedWord com a letra correta
            for (let i = 0; i < selectedWord.length; i++) {
                if (selectedWord[i] === guess) {
                    guessedWord[i] = guess;
                }
            }

            // Verificar se o jogador ganhou
            if (!guessedWord.includes('_')) {
                document.getElementById('result').textContent = 'Parabéns! Você ganhou!';
            }
        } else {
            // Reduzir as chances e adicionar a letra incorreta
            chances--;
            incorrectLetters.push(guess);

            // Verificar se o jogador perdeu
            if (chances === 0) {
                document.getElementById('result').textContent = `Game Over! A palavra era: ${selectedWord}`;
            }
        }

        // Exibir a palavra e as chances atualizadas
        displayWord();
        displayChances();

        // Exibir letras incorretas
        document.getElementById('incorrect-letters').textContent = `Letras Erradas: ${incorrectLetters.join(', ')}`;

        // Limpar a entrada do usuário
        guessInput.value = '';
    }
}

function resetGame() {
    // Restaurar as chances
    chances = 6;

    // Configurar um novo jogo
    setupGame();
}
