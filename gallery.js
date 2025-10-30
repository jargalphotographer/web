



  (function(){
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

  })();


  