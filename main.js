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

// Partnership Form Handling
const partnershipForm = document.getElementById('partnershipForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

async function handleFormSubmit(e) {
  e.preventDefault();

  // Disable submit button
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>전송 중...</span>';

  // Hide previous status messages
  formStatus.style.display = 'none';
  formStatus.className = 'form-status';

  try {
    const formData = new FormData(partnershipForm);

    const response = await fetch(partnershipForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Success
      formStatus.textContent = '✅ 문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.';
      formStatus.className = 'form-status success';
      partnershipForm.reset();
    } else {
      // Error
      const data = await response.json();
      if (data.errors) {
        formStatus.textContent = '❌ 오류가 발생했습니다: ' + data.errors.map(error => error.message).join(', ');
      } else {
        formStatus.textContent = '❌ 문의 전송에 실패했습니다. 다시 시도해주세요.';
      }
      formStatus.className = 'form-status error';
    }
  } catch (error) {
    // Network error
    formStatus.textContent = '❌ 네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
    formStatus.className = 'form-status error';
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>문의하기</span>';
  }
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
generateBtn.addEventListener('click', handleGenerate);
partnershipForm.addEventListener('submit', handleFormSubmit);

// Initialize
initTheme();