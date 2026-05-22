const circles = document.querySelectorAll('.circle');

circles.forEach(elem => {
  const dots    = parseInt(elem.getAttribute('data-dots'));
  const marked  = parseInt(elem.getAttribute('data-percent'));
  const percent = Math.floor(dots * marked / 100);
  const rotate  = 360 / dots;

  // 建立所有圓點（插入在 .text 之前，避免蓋住文字）
  const textNode = elem.querySelector('.text');
  for (let i = 0; i < dots; i++) {
    const pt = document.createElement('div');
    pt.className = 'points';
    pt.style.cssText = `--i:${i}; --rot:${rotate}deg`;
    elem.insertBefore(pt, textNode);
  }

  // 標記達成的圓點
  const allPoints = elem.querySelectorAll('.points');
  for (let i = 0; i < percent; i++) {
    allPoints[i].classList.add('marked');
  }
});