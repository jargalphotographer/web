  // Canvas авах
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // --- Wave class ---
  class Wave {
    constructor(amplitude, wavelength, speed, color, offsetY) {
      this.amplitude = amplitude;
      this.wavelength = wavelength;
      this.speed = speed;
      this.color = color;
      this.offset = 0;
      this.offsetY = offsetY;
    }
    update(deltaSec) {
      this.offset += this.speed * deltaSec;
    }
    draw() {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        let y = Math.sin((x / this.wavelength) + this.offset) * this.amplitude + this.offsetY;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // --- Star class ---
  class Star {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height * 0.5;
      this.radius = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random();
    }
    update(deltaSec) {
      this.opacity += (Math.random() - 0.5) * 0.02;
      if (this.opacity < 0) this.opacity = 0;
      if (this.opacity > 1) this.opacity = 1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  // --- Waves ---
  let waves = [
    new Wave(30, 200, 0.2, "rgba(0,150,255,0.6)", canvas.height * 0.7),
    new Wave(20, 150, 0.15, "rgba(0,100,255,0.5)", canvas.height * 0.75),
    new Wave(15, 100, 0.1, "rgba(0,50,200,0.5)", canvas.height * 0.8)
  ];

  // --- Sun ---
  let sun = {
    radius: canvas.width < 600 ? 50 : 100,
    speed: 0.01,
    progress: 0
  };

  // --- Stars ---
  let stars = [];
  for (let i = 0; i < 50; i++) stars.push(new Star());

  let lastTime = 0;

  function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaSec = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sky
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#001f4d");
    gradient.addColorStop(1, "#87CEEB");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars
    stars.forEach(star => {
      star.update(deltaSec);
      star.draw();
    });

    // Sun
    sun.progress += sun.speed * deltaSec;
    if (sun.progress > 1) sun.progress = 0;
    let sunX = sun.progress * canvas.width;
    let sunY = canvas.height * 0.75 - Math.sin(sun.progress * Math.PI) * (canvas.height * 0.4);

    ctx.save();
    ctx.filter = "blur(10px)";
    ctx.beginPath();
    ctx.arc(sunX, sunY, sun.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,200,0,0.9)";
    ctx.fill();
    ctx.restore();

    // Waves
    waves.forEach(wave => {
      wave.update(deltaSec);
      wave.draw();
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});



// Dropdown Portfolio
const portfolioBtn = document.getElementById('portfolio-btn');
const portfolioMenu = document.getElementById('portfolio-menu');
const dropdown = portfolioBtn.closest('.dropdown');

portfolioBtn.addEventListener('click', (e) => {
  e.preventDefault();
  portfolioMenu.classList.toggle('active');
  dropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    portfolioMenu.classList.remove('active');
    dropdown.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, n) => slide.classList.toggle('active', n === i));
    dots.forEach((dot, n) => dot.classList.toggle('active', n === i));
    index = i;
  }

  function nextSlide() {
    showSlide((index + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((index - 1 + slides.length) % slides.length);
  }

  // Автоматаар 5 секунд тутам солигдох
  setInterval(nextSlide, 5000);

  // Dots дээр дарвал тухайн slide руу шилжих
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

  // Prev / Next товч дээр дарахад ажиллах
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});


// Формаа барих
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault(); // Формыг бодитоор илгээхгүй зогсооно
  alert("Таны мэйл илгээгдлээ!");
  this.reset(); // Формын талбаруудыг хоослоно
});



function GalleryLightbox() {
  const gallery = document.getElementById('gallery');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const imageInfo = document.getElementById('imageInfo');

  let isOpen = false;
  let currentIndex = -1;
  const thumbs = Array.from(document.querySelectorAll('.thumb'));

  // Open lightbox
  gallery.addEventListener('click', (e) => {
    const thumb = e.target.closest('.thumb');
    if (!thumb) return;
    e.preventDefault();
    currentIndex = thumbs.indexOf(thumb);
    showImage(currentIndex);
  });

  function showImage(index){
    if(index < 0 || index >= thumbs.length) return;
    const thumb = thumbs[index];
    const src = thumb.getAttribute('data-full') || thumb.querySelector('img').src;
    const caption = thumb.querySelector('.caption')?.textContent || '';

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    isOpen = true;

    lightboxImg.src = src;
    lightboxImg.alt = caption;
    imageInfo.textContent = caption;   // тайлбар зөвхөн энд харагдана
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    isOpen = false;
    lightboxImg.src='';
  }

  // Navigation
  function showNext(){ 
    currentIndex = (currentIndex + 1) % thumbs.length; 
    showImage(currentIndex); 
  }
  function showPrev(){ 
    currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length; 
    showImage(currentIndex); 
  }

  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Swipe support
  let startX=0;
  lightbox.addEventListener('touchstart', (e)=>{ startX=e.touches[0].clientX; });
  lightbox.addEventListener('touchend', (e)=>{
    let dx=e.changedTouches[0].clientX-startX;
    if(dx>50) showPrev();
    else if(dx<-50) showNext();
  });

  // Keyboard support
  document.addEventListener('keydown', (e)=>{
    if(!isOpen) return;
    if(e.key==='Escape') closeLightbox();
    if(e.key==='ArrowRight') showNext();
    if(e.key==='ArrowLeft') showPrev();
  });

  closeBtn.addEventListener('click', closeLightbox);

  // Click background to close
  lightbox.addEventListener('click', (e)=>{
    if(e.target===lightbox) closeLightbox();
  });
}






