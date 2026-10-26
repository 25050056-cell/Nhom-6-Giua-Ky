document.addEventListener('DOMContentLoaded', () => {
  const fills = document.querySelectorAll('.skills-grid .fill');
  setTimeout(() => {
    fills.forEach(fill => {
      const targetWidth = fill.getAttribute('data-progress');
      if (targetWidth) {
        fill.style.width = targetWidth;
      }
    });
  }, 200);
  const backBtn = document.getElementById('backBtn');
  
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      console.log('Đang quay trở về trang chủ...');
    });
  }
});