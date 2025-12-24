const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;
const IMAGE_DURATION = 5000; // 5 segundos para cada imagem

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
    currentItem.play();
    currentItem.onended = () => {
      nextItem();
    };
  }
}

function nextItem() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  showItem(currentIndex);
}

// Start the carousel
showItem(currentIndex);
