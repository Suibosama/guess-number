let targetNumber;
let guesses = [];
const maxTries = 10;

function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    guesses = [];
    updateMessage('');
    updateHistory();
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').focus();
}

function updateMessage(text, isSuccess = false) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.style.color = isSuccess ? '#27ae60' : '#e74c3c';
}

function updateHistory() {
    const historyEl = document.getElementById('history');
    if (guesses.length === 0) {
        historyEl.textContent = '';
        return;
    }
    historyEl.textContent = `已猜次数: ${guesses.length} | 历史记录: ${guesses.join(', ')}`;
}

function handleGuess() {
    const input = document.getElementById('guessInput');
    const guess = parseInt(input.value);
    
    if (isNaN(guess) || guess < 1 || guess > 100) {
        updateMessage('请输入1到100之间的数字！');
        return;
    }

    guesses.push(guess);
    input.value = '';
    input.focus();

    if (guess === targetNumber) {
        updateMessage(`恭喜你！用了${guesses.length}次猜对了！`, true);
        input.disabled = true;
        document.getElementById('guessBtn').disabled = true;
    } else if (guesses.length >= maxTries) {
        updateMessage(`游戏结束！正确答案是 ${targetNumber}。`);
        input.disabled = true;
        document.getElementById('guessBtn').disabled = true;
    } else if (guess < targetNumber) {
        updateMessage('太小了！再大一点');
    } else {
        updateMessage('太大了！再小一点');
    }

    updateHistory();
}

// 事件监听
document.getElementById('guessBtn').addEventListener('click', handleGuess);
document.getElementById('resetBtn').addEventListener('click', initGame);
document.getElementById('guessInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

// 游戏初始化
initGame();
