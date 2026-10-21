
(function(){
const header=document.querySelector('.header-actions');if(!header)return;
const toggle=document.createElement('button');toggle.type='button';toggle.className='theme-toggle';toggle.id='theme-toggle';
header.insertBefore(toggle,document.getElementById('menu-trigger'));
let theme='light';try{theme=localStorage.getItem('sf-theme')||'light'}catch(e){}
function applyTheme(){document.body.dataset.theme=theme;const es=document.documentElement.lang==='es'||document.querySelector('[data-lang="es"]')?.getAttribute('aria-pressed')==='true';toggle.textContent=theme==='dark'?(es?'☀ Modo claro':'☀ Light mode'):(es?'☾ Modo oscuro':'☾ Dark mode');toggle.setAttribute('aria-label',toggle.textContent);toggle.setAttribute('aria-pressed',String(theme==='dark'))}
toggle.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';try{localStorage.setItem('sf-theme',theme)}catch(e){}applyTheme()});
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{document.documentElement.lang=b.dataset.lang;requestAnimationFrame(applyTheme)}));applyTheme();
const menu=document.getElementById('menu-trigger'),panel=document.getElementById('menu-panel');
if(menu&&panel){menu.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();menu.click();panel.querySelector('button,a')?.focus()}});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){menu.click();menu.focus()}})}
const search=document.getElementById('searchinput');if(search&&!search.id.endsWith('label')){search.setAttribute('aria-label','Search city services / Buscar servicios municipales')}
const main=document.querySelector('#home .main');if(main&&!document.getElementById('skip-link')){const skip=document.createElement('a');skip.id='skip-link';skip.href='#home';skip.textContent='Skip to content / Ir al contenido';skip.style.cssText='position:absolute;left:12px;top:-100px;z-index:2000;background:#fff;color:#142e28;padding:12px';skip.addEventListener('focus',()=>skip.style.top='8px');skip.addEventListener('blur',()=>skip.style.top='-100px');document.body.prepend(skip)}
})();
