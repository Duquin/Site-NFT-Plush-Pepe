// Таймер обратного отсчета
function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  let time = 24 * 60 * 60; // 24 часа в секундах

  function updateCountdown() {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    countdownElement.textContent =
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (time > 0) {
      time--;
    } else {
      time = 24 * 60 * 60; // Сброс на 24 часа
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Модальное окно
function setupModal() {
  const modal = document.getElementById('purchaseModal');
  const buyButton = document.getElementById('buyButton');
  const closeButton = document.getElementById('closeModal');
  const connectButton = document.querySelector('.connect-wallet-button');

  buyButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  connectButton.addEventListener('click', () => {
    alert('Функционал подключения кошелька будет реализован в будущем');
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// Анимация появления элементов при скролле
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  document.querySelectorAll('.feature-card, .about-text').forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// Эффект параллакс для изображения NFT
function setupParallax() {
  const nftImage = document.getElementById('nftImage');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    nftImage.style.transform = `translateY(${rate}px) scale(1.02)`;
  });
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  setupModal();
  setupScrollAnimations();
  setupParallax();

  // Добавляем золотые частицы на фон
  createParticles();
});

// Создание анимированных частиц золота на фоне
function createParticles() {
  const colors = ['#FFD700', '#DAA520', '#B8860B', '#FFEC8B'];

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = Math.random() * 5 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';

    document.body.appendChild(particle);

    // Анимация движения частиц
    animateParticle(particle);
  }
}

function animateParticle(particle) {
  let x = parseFloat(particle.style.left);
  let y = parseFloat(particle.style.top);
  let xSpeed = (Math.random() - 0.5) * 0.5;
  let ySpeed = (Math.random() - 0.5) * 0.5;

  function move() {
    x += xSpeed;
    y += ySpeed;

    if (x < 0 || x > 100) xSpeed *= -1;
    if (y < 0 || y > 100) ySpeed *= -1;

    particle.style.left = x + 'vw';
    particle.style.top = y + 'vh';

    requestAnimationFrame(move);
  }

  move();
}
