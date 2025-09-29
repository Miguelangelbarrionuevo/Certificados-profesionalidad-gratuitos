// Año footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// On-scroll reveal (IntersectionObserver)
const revealables = document.querySelectorAll('[data-animate]');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
},{threshold:0.15});
revealables.forEach(el=>io.observe(el));

// Franjas animadas con scroll (parallax suave)
const bands = document.querySelectorAll('.band');
const onScrollBands = ()=>{
  const y = window.scrollY || window.pageYOffset;
  bands.forEach((b,i)=>{
    const speed = (i+1)*0.15;
    b.style.transform = `translate3d(${y*speed}px,0,0) rotate(-2deg)`;
  });
};
window.addEventListener('scroll', onScrollBands, {passive:true});
onScrollBands();

// INTRO: logo centrado (desaparece por tiempo o interacción)
(function(){
  const intro = document.getElementById('intro-header');
  if (!intro) return;

  const toStickyCentered = () => {
    intro.classList.add('shrink','centered'); // ⬅️ queda fijo y centrado
  };

  // auto a los 2s
  const timer = setTimeout(toStickyCentered, 2000);

  // o antes si hay interacción
  const onFirstInteract = () => { clearTimeout(timer); toStickyCentered(); cleanup(); };
  const cleanup = () => {
    window.removeEventListener('scroll', onFirstInteract);
    window.removeEventListener('click', onFirstInteract);
    window.removeEventListener('keydown', onFirstInteract);
    window.removeEventListener('touchstart', onFirstInteract);
  };

  window.addEventListener('scroll', onFirstInteract, { passive:true });
  window.addEventListener('click', onFirstInteract);
  window.addEventListener('keydown', onFirstInteract);
  window.addEventListener('touchstart', onFirstInteract, { passive:true });
})();



// Switch Trabajadores / Desempleados
const switchBtns = document.querySelectorAll('.switch-btn');
const gridTrab = document.getElementById('grid-trabajadores');
const gridDes = document.getElementById('grid-desempleados');
switchBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    switchBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.target;
    if(target === 'trabajadores'){
      gridTrab?.classList.add('show');
      gridDes?.classList.remove('show');
    }else{
      gridDes?.classList.add('show');
      gridTrab?.classList.remove('show');
    }
  });
});

// Modales: Infórmate / Matricúlate
const modalInfo = document.getElementById('modal-info');
const modalForm = document.getElementById('modal-form');
const infoTitle = document.getElementById('modal-info-title');
const infoContent = document.getElementById('modal-info-content');
const selectedCert = document.getElementById('selected-cert');

document.addEventListener('click',(e)=>{
  const t = e.target;
  if(!(t instanceof HTMLElement)) return;

  // Abrir INFO
  if(t.dataset.open === 'modal-info'){
    const title = t.dataset.title || 'Información';
    const selector = t.dataset.content;
    if (infoTitle) infoTitle.textContent = title;
    if (infoContent) infoContent.innerHTML = selector ? (document.querySelector(selector)?.innerHTML || '') : '';
    modalInfo?.showModal();
  }

  // Abrir FORM
  if(t.dataset.open === 'modal-form'){
    const cert = t.dataset.cert || '—';
    if (selectedCert) selectedCert.textContent = `Certificado: ${cert}`;
    modalForm?.showModal();
  }

  // Cerrar con botón ✕
  if(t.classList.contains('modal-close')){
    t.closest('dialog')?.close();
  }
});

// Envío form (placeholder)
const enrollForm = document.getElementById('enroll-form');
enrollForm?.addEventListener('submit',(e)=>{
  e.preventDefault();
  alert('Solicitud enviada. ¡Gracias! Nos pondremos en contacto contigo.');
  modalForm?.close();
});
