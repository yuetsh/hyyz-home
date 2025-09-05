// 标题飘动动画，边缘碰撞
window.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('floating-title');
  if (!title) return;

  let x = 50, y = 50;   
  let vx = 1.2, vy = 0.8;
  let ax = 0, ay = 0;
  let lastChange = Date.now();

  function randomizeVelocity() {
    // 每隔一段时间随机微调速度，模拟自然漂浮
    if (Date.now() - lastChange > 1200) {
      vx += (Math.random() - 0.5) * 0.6;
      vy += (Math.random() - 0.5) * 0.6;
      // 限制最大速度，避免太快
      vx = Math.max(-2, Math.min(2, vx));
      vy = Math.max(-1.5, Math.min(1.5, vy));
      lastChange = Date.now();
    }
  }

  const updatePosition = () => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const rect = title.getBoundingClientRect();

    randomizeVelocity();

    // 缓动效果
    x += vx;
    y += vy;

    // 边缘碰撞检测，带一点弹性和缓冲
    if (x <= 0) {
      x = 0;
      vx = Math.abs(vx) * (0.7 + Math.random() * 0.3);
    }
    if (x + rect.width >= ww) {
      x = ww - rect.width;
      vx = -Math.abs(vx) * (0.7 + Math.random() * 0.3);
    }
    if (y <= 0) {
      y = 0;
      vy = Math.abs(vy) * (0.7 + Math.random() * 0.3);
    }
    if (y + rect.height >= wh) {
      y = wh - rect.height;
      vy = -Math.abs(vy) * (0.7 + Math.random() * 0.3);
    }

    title.style.left = x + 'px';
    title.style.top = y + 'px';
    requestAnimationFrame(updatePosition);
  };
  updatePosition();
});
