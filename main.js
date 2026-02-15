// Lottery Number Generator with Dark/Light Mode

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const generateBtn = document.getElementById('generateBtn');
const lotteryDisplay = document.getElementById('lotteryDisplay');

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('.icon');
  icon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Lottery Number Generation
function generateLotteryNumbers() {
  const numbers = new Set();

  // Generate 6 unique numbers between 1 and 45
  while (numbers.size < 6) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNum);
  }

  // Convert to array and sort
  return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
  // Clear previous display
  lotteryDisplay.innerHTML = '';

  // Create numbers container
  const numbersContainer = document.createElement('div');
  numbersContainer.className = 'lottery-numbers';

  // Create number elements
  numbers.forEach(num => {
    const numberElement = document.createElement('div');
    numberElement.className = 'lottery-number';
    numberElement.textContent = num;
    numbersContainer.appendChild(numberElement);
  });

  lotteryDisplay.appendChild(numbersContainer);
}

function handleGenerate() {
  // Disable button during animation
  generateBtn.disabled = true;

  // Generate and display numbers
  const numbers = generateLotteryNumbers();
  displayNumbers(numbers);

  // Re-enable button after animation completes
  setTimeout(() => {
    generateBtn.disabled = false;
  }, 1000);
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
generateBtn.addEventListener('click', handleGenerate);

// Initialize
initTheme();