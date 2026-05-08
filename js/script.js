/* ── Tab ── */
function switchTab(el) {
  el.closest('.tabs').querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
}



/* ── 地圖：拖移 + 縮放 ── */
(function(){
  const layer=document.getElementById('map-layer');
  const inner=document.getElementById('map-inner');
  let s=1,tx=0,ty=0,drag=false,sx,sy;
  const apply=()=>{ inner.style.transform=`translate(${tx}px,${ty}px) scale(${s})`; };

  layer.addEventListener('mousedown',e=>{ drag=true; sx=e.clientX-tx; sy=e.clientY-ty; layer.style.cursor='grabbing'; });
  window.addEventListener('mousemove',e=>{ if(!drag)return; tx=e.clientX-sx; ty=e.clientY-sy; apply(); });
  window.addEventListener('mouseup',()=>{ drag=false; layer.style.cursor='grab'; });

  layer.addEventListener('touchstart',e=>{ if(e.touches.length===1){drag=true;sx=e.touches[0].clientX-tx;sy=e.touches[0].clientY-ty;} });
  layer.addEventListener('touchmove',e=>{ if(!drag||e.touches.length!==1)return; tx=e.touches[0].clientX-sx; ty=e.touches[0].clientY-sy; apply(); e.preventDefault(); },{passive:false});
  layer.addEventListener('touchend',()=>{ drag=false; });

  layer.addEventListener('wheel',e=>{ e.preventDefault(); s=Math.min(4,Math.max(0.3,s*(e.deltaY>0?0.9:1.1))); apply(); },{passive:false});

  document.getElementById('btn-zi').onclick=()=>{ s=Math.min(4,s*1.2); apply(); };
  document.getElementById('btn-zo').onclick=()=>{ s=Math.max(0.3,s*0.83); apply(); };
  document.getElementById('btn-rs').onclick=()=>{ s=1;tx=0;ty=0; apply(); };
})();

/* ── Pin tooltip ── */
(function(){
  const tt=document.getElementById('map-tooltip');
  document.querySelectorAll('.pin').forEach(p=>{
    p.style.cursor='pointer';
    p.addEventListener('mouseenter',()=>{
      document.getElementById('tt-name').textContent=p.dataset.name;
      document.getElementById('tt-rate').textContent=p.dataset.rate;
      document.getElementById('tt-stores').textContent=p.dataset.stores+' 家';
      tt.style.display='block';
    });
    p.addEventListener('mousemove',e=>{ tt.style.left=(e.clientX+14)+'px'; tt.style.top=(e.clientY-10)+'px'; });
    p.addEventListener('mouseleave',()=>{ tt.style.display='none'; });
  });
})();