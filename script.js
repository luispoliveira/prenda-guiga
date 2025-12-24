const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
const IMAGE_DURATION = 3000; // 3 segundos para cada imagem
let carouselStarted = false;

function showItem(index) {
  // Remove active class from all items
  carouselItems.forEach((item) => {
    item.classList.remove('active');
    if (item.tagName === 'VIDEO') {
      item.pause();
      item.currentTime = 0;
    }
  });

  // Add active class to current item
  const currentItem = carouselItems[index];
  currentItem.classList.add('active');

  // Handle based on item type
  if (currentItem.dataset.type === 'image') {
    setTimeout(() => {
      nextItem();
    }, IMAGE_DURATION);
  } else if (currentItem.dataset.type === 'video') {
    // Ativar som e reproduzir
    currentItem.muted = false;
    const playPromise = currentItem.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log('Autoplay falhou:', error);
        // Se falhar, tentar com muted
        currentItem.muted = true;
        currentItem.play();
      });
    }

    currentItem.onended = () => {
      nextItem();
    };
  }
}

function nextItem() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  showItem(currentIndex);
}

// Botão de start para ativar áudio no mobile
const startButton = document.getElementById('startButton');
const startOverlay = document.getElementById('startOverlay');

startButton.addEventListener('click', () => {
  startOverlay.style.display = 'none';
  carouselStarted = true;

  // Preparar todos os vídeos para tocar com som
  carouselItems.forEach((item) => {
    if (item.tagName === 'VIDEO') {
      item.muted = false;
    }
  });

  showItem(currentIndex);
});
