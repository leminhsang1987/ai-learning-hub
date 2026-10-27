(()=>{
const $=s=>document.querySelector(s),S=[...document.querySelectorAll('.s')];
let i=0,k=0;
const M=S.map(s=>+s.dataset.m||0),T=M.reduce((a,b)=>a+b,0),St=M.map((_,j)=>M.slice(0,j).reduce((a,b)=>a+b,0));
const hud=document.createElement('div');hud.id='hud';
hud.innerHTML=`<a href="${document.body.dataset.home||'../../index.html'}">Trung tâm</a><span id="inf"></span><span class="sp"></span><button id="bn" title="Phím N">Ghi chú</button><button id="bf" title="Phím F">Toàn màn hình</button><button id="bp">Trước</button><span id="no"></span><button id="bx">Sau</button>`;
document.body.append(hud);
const bar=document.createElement('div');bar.id='bar';document.body.append(bar);
const np=document.createElement('div');np.id='np';document.body.append(np);
const fr=()=>[...S[i].querySelectorAll('.f')];
function fit(){$('.deck').style.transform=`translate(-50%,-50%) scale(${Math.min(innerWidth/1280,(innerHeight-44)/720)})`}
function go(n,all){
  n=Math.max(0,Math.min(S.length-1,n));S[i].classList.remove('on');i=n;S[i].classList.add('on');
  const f=fr();f.forEach(e=>e.classList.toggle('on',!!all));k=all?f.length:0;
  const d=S[i].dataset;
  $('#inf').textContent=`${d.p||''} · phút ${St[i]}–${St[i]+M[i]}/${T}`;
  $('#no').textContent=`${i+1}/${S.length}`;
  bar.style.width=(i+1)/S.length*100+'%';
  $('#bp').disabled=!i;$('#bx').disabled=i==S.length-1&&k>=f.length;
  const a=S[i].querySelector('aside');np.innerHTML=a?a.innerHTML:'(Chưa có ghi chú cho slide này)';
  history.replaceState(null,'','#'+(i+1));
}
const next=()=>{const f=fr();k<f.length?f[k++].classList.add('on'):go(i+1);if(k>=f.length&&i==S.length-1)$('#bx').disabled=true};
const prev=()=>{k>0?fr()[--k].classList.remove('on'):go(i-1,true)};
$('#bx').onclick=next;$('#bp').onclick=prev;
$('#bn').onclick=()=>document.body.classList.toggle('notes');
const fs=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();
$('#bf').onclick=fs;
addEventListener('keydown',e=>{
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  const c=e.key;
  if(c=='ArrowRight'||c=='PageDown'||c==' '||c=='Enter'){e.preventDefault();next()}
  else if(c=='ArrowLeft'||c=='PageUp'){e.preventDefault();prev()}
  else if(c=='Home')go(0);else if(c=='End')go(S.length-1,true);
  else if(c=='n'||c=='N')$('#bn').click();else if(c=='f'||c=='F')fs();
});
let x0=null;
addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
addEventListener('touchend',e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(d)>60)d<0?next():prev()},{passive:true});
document.addEventListener('click',e=>{const r=e.target.closest('.rv');if(r)r.classList.toggle('sh')});
document.querySelectorAll('[data-timer]').forEach(b=>{
  let s=+b.dataset.timer,t=0;const v=b.querySelector('.tm'),h=b.querySelector('small');
  const draw=()=>{v.textContent=s>0?String(s/60|0).padStart(2,'0')+':'+String(s%60).padStart(2,'0'):'Hết giờ'};draw();
  b.onclick=()=>{
    if(t){clearInterval(t);t=0;b.classList.remove('run');h.textContent='Đã dừng. Bấm để chạy tiếp'}
    else if(s>0){b.classList.add('run');h.textContent='Đang chạy. Bấm để dừng';
      t=setInterval(()=>{s--;draw();if(s<=0){clearInterval(t);t=0;b.classList.remove('run');b.classList.add('end');h.textContent=''}},1000)}
  };
});
addEventListener('resize',fit);fit();
const n0=parseInt(location.hash.slice(1));go(n0>0?n0-1:0);
})();
