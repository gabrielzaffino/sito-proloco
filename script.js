document.addEventListener('DOMContentLoaded', () => {

    // ===================================================
    // ELENCO DEGLI EVENTI DELLA PRO LOCO (GESTIONE AUTOMATICA)
    // ===================================================
    const eventsList = [
        {
            id: 'cinetorre-mammamia',
            title: 'CineTorre',
            subtitle: 'Cinema & Comunità',
            dateStr: '2026-10-09', // Venerdì 9 Ottobre 2026
            dateDisplay: 'Venerdì 9 Ottobre 2026',
            time: 'Ore 21:00 (Ingresso Libero)',
            location: 'Centro Policulturale Località Paolello',
            audience: 'Aperto a tutti: giovani, famiglie e bambini',
            description: 'Inauguriamo la nuova stagione di eventi. Portiamo il cinema in sala per stare insieme, ridere ed emozionarci nel cuore del borgo.',
            posterImage: 'cinetorre.jpg',
            posterFallback: 'cinetorre.png'
        }
    ];

    // ===================================================
    // RENDER AUTOMATICO: EVENTI ATTIVI vs EVENTI PASSATI
    // ===================================================
    function renderEvents() {
        const spotlightContainer = document.getElementById('spotlight-container');
        const pastEventsWrap = document.getElementById('past-events-wrap');
        const pastEventsGrid = document.getElementById('past-events-grid');

        if (!spotlightContainer) return;

        const now = new Date();
        const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const upcomingEvents = [];
        const pastEvents = [];

        eventsList.forEach(event => {
            const [y, m, d] = event.dateStr.split('-').map(Number);
            const eventDate = new Date(y, m - 1, d);

            if (eventDate >= todayDateOnly) {
                upcomingEvents.push(event);
            } else {
                pastEvents.push(event);
            }
        });

        upcomingEvents.sort((a, b) => new Date(a.dateStr) - new Date(b.dateStr));
        pastEvents.sort((a, b) => new Date(b.dateStr) - new Date(a.dateStr));

        // 1. Riquadro In Evidenza
        if (upcomingEvents.length > 0) {
            const currentEvent = upcomingEvents[0];
            spotlightContainer.innerHTML = `
                <div class="spotlight-tag">
                    <i class="fa-solid fa-bullhorn"></i> In programma • ${currentEvent.dateDisplay}
                </div>
                <div class="spotlight-grid">
                    <div class="spotlight-image-col">
                        <div class="cinema-poster-frame">
                            <img src="${currentEvent.posterImage}" alt="${currentEvent.title}" class="poster-img" onerror="this.src='${currentEvent.posterFallback}'">
                        </div>
                    </div>
                    <div class="spotlight-content-col">
                        <span class="sub-heading">${currentEvent.subtitle}</span>
                        <h2 class="spotlight-title">${currentEvent.title}</h2>
                        <p class="spotlight-text">${currentEvent.description}</p>
                        <div class="event-details-grid">
                            <div class="detail-item">
                                <i class="fa-solid fa-clock"></i>
                                <div>
                                    <strong>Orario d'Inizio</strong>
                                    <span>${currentEvent.time}</span>
                                </div>
                            </div>
                            <div class="detail-item">
                                <i class="fa-solid fa-location-dot"></i>
                                <div>
                                    <strong>Luogo</strong>
                                    <span>${currentEvent.location}</span>
                                </div>
                            </div>
                            <div class="detail-item">
                                <i class="fa-solid fa-users"></i>
                                <div>
                                    <strong>Partecipazione</strong>
                                    <span>${currentEvent.audience}</span>
                                </div>
                            </div>
                        </div>
                        <div class="spotlight-actions">
                            <a href="#contatti" class="btn btn-primary"><i class="fa-solid fa-circle-info"></i> Maggiori Informazioni</a>
                            <a href="#" class="btn btn-outline-dark" id="share-event-btn"><i class="fa-solid fa-share-nodes"></i> Condividi Evento</a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            spotlightContainer.innerHTML = `
                <div class="spotlight-empty">
                    <i class="fa-solid fa-calendar-check empty-icon"></i>
                    <h3>Prossimi Eventi in Arrivo!</h3>
                    <p>Stiamo definendo il calendario delle prossime iniziative e feste nel borgo. Seguici sui canali social per non perdere le date!</p>
                    <div class="spotlight-actions" style="justify-content: center; gap: 12px;">
                        <a href="https://www.instagram.com/proloco_torrediruggiero/" target="_blank" rel="noopener noreferrer" class="btn btn-social-instagram">
                            <i class="fa-brands fa-instagram"></i> Aggiornamenti su Instagram
                        </a>
                        <a href="https://www.facebook.com/p/prolocotorrediruggiero-61594633873034/" target="_blank" rel="noopener noreferrer" class="btn btn-social-facebook">
                            <i class="fa-brands fa-facebook-f"></i> Aggiornamenti su Facebook
                        </a>
                        <a href="https://whatsapp.com/channel/0029Vb8dpYq5K3zN9giYi612" target="_blank" rel="noopener noreferrer" class="btn btn-social-whatsapp">
                            <i class="fa-brands fa-whatsapp"></i> Canale WhatsApp
                        </a>
                    </div>
                </div>
            `;
        }

        // 2. Archivio Eventi Precedenti
        if (pastEvents.length > 0 && pastEventsWrap && pastEventsGrid) {
            pastEventsWrap.style.display = 'block';
            pastEventsGrid.innerHTML = pastEvents.map(evt => `
                <div class="past-event-card">
                    <div class="past-event-thumb">
                        <span class="past-badge-closed"><i class="fa-solid fa-check"></i> Concluso</span>
                        <img src="${evt.posterImage}" alt="${evt.title}" onerror="this.src='${evt.posterFallback}'">
                    </div>
                    <div class="past-event-body">
                        <span class="past-event-date">${evt.dateDisplay}</span>
                        <h4>${evt.title}</h4>
                        <p>${evt.description}</p>
                    </div>
                </div>
            `).join('');
        } else if (pastEventsWrap) {
            pastEventsWrap.style.display = 'none';
        }

        const shareBtn = document.getElementById('share-event-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (navigator.share) {
                    navigator.share({
                        title: 'Evento Pro Loco Torre di Ruggiero',
                        text: 'Guarda il prossimo evento della Pro Loco di Torre di Ruggiero!',
                        url: window.location.href
                    }).catch(() => {});
                } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link evento copiato negli appunti!');
                }
            });
        }
    }

    renderEvents();

    // ===================================================
    // GESTIONE GALLERIA ALBUM FOTOGRAFICA & LIGHTBOX
    // ===================================================
    const galleryAlbums = [
        {
            id: 'cinetorre-prima-serata',
            title: 'CineTorre - Prima Serata',
            date: 'Ottobre 2026',
            desc: 'Gli scatti della prima serata di cinema e comunità al Centro Policulturale con la proiezione di Mamma Mia! Popcorn, divertimento e grande partecipazione.',
            cover: 'cinetorre.jpg',
            photos: [
                'cinetorre.jpg',
                'cinetorre-1.jpg',
                'cinetorre-2.jpg',
                'cinetorre-3.jpg',
                'cinetorre-4.jpg',
                'cinetorre-5.jpg',
                'cinetorre-6.jpg'
            ]
        }
    ];

    const galleryContainer = document.getElementById('gallery-albums-container');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxTitle = document.getElementById('lightbox-album-title');
    const lightboxDate = document.getElementById('lightbox-album-date');
    const lightboxImg = document.getElementById('lightbox-active-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxThumbs = document.getElementById('lightbox-thumbnails');
    const lightboxClose = document.getElementById('lightbox-close-btn');
    const lightboxPrev = document.getElementById('lightbox-prev-btn');
    const lightboxNext = document.getElementById('lightbox-next-btn');
    const touchArea = document.getElementById('lightbox-touch-area');

    let currentAlbumPhotos = [];
    let currentPhotoIndex = 0;

    function renderGallery() {
        if (!galleryContainer) return;

        galleryContainer.innerHTML = galleryAlbums.map(album => `
            <div class="gallery-album-card" data-album-id="${album.id}">
                <div class="album-cover-wrap">
                    <span class="album-folder-tag"><i class="fa-solid fa-folder"></i> Album</span>
                    <img src="${album.cover}" alt="${album.title}" class="album-cover-img" onerror="this.src='cinetorre.png'">
                    <span class="album-overlay-badge"><i class="fa-solid fa-camera"></i> ${album.photos.length} Foto</span>
                </div>
                <div class="album-details">
                    <span class="album-date">${album.date}</span>
                    <h3>${album.title}</h3>
                    <p>${album.desc}</p>
                    <div class="album-open-link">
                        <span>Sfoglia album</span> <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        `).join('');

        const albumCards = galleryContainer.querySelectorAll('.gallery-album-card');
        albumCards.forEach(card => {
            card.addEventListener('click', () => {
                const aId = card.getAttribute('data-album-id');
                const targetAlbum = galleryAlbums.find(a => a.id === aId);
                if (targetAlbum) openLightbox(targetAlbum);
            });
        });
    }

    renderGallery();

    function updateLightboxPhoto() {
        if (!currentAlbumPhotos.length || !lightboxImg) return;
        lightboxImg.src = currentAlbumPhotos[currentPhotoIndex];
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${currentAlbumPhotos.length}`;
        }

        const thumbs = lightboxThumbs.querySelectorAll('.lightbox-thumb');
        thumbs.forEach((th, idx) => {
            th.classList.toggle('active', idx === currentPhotoIndex);
        });

        if (currentAlbumPhotos.length <= 1) {
            if (lightboxPrev) lightboxPrev.style.display = 'none';
            if (lightboxNext) lightboxNext.style.display = 'none';
            if (lightboxThumbs) lightboxThumbs.style.display = 'none';
        } else {
            if (window.innerWidth > 576) {
                if (lightboxPrev) lightboxPrev.style.display = 'flex';
                if (lightboxNext) lightboxNext.style.display = 'flex';
            }
            if (lightboxThumbs) lightboxThumbs.style.display = 'flex';
        }
    }

    function openLightbox(album) {
        if (!lightbox) return;
        currentAlbumPhotos = album.photos;
        currentPhotoIndex = 0;

        if (lightboxTitle) lightboxTitle.textContent = album.title;
        if (lightboxDate) lightboxDate.textContent = album.date;

        if (lightboxThumbs) {
            lightboxThumbs.innerHTML = album.photos.map((src, i) => `
                <div class="lightbox-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
                    <img src="${src}" alt="miniatura" onerror="this.src='cinetorre.png'">
                </div>
            `).join('');

            lightboxThumbs.querySelectorAll('.lightbox-thumb').forEach(th => {
                th.addEventListener('click', () => {
                    currentPhotoIndex = parseInt(th.getAttribute('data-idx'));
                    updateLightboxPhoto();
                });
            });
        }

        updateLightboxPhoto();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex - 1 + currentAlbumPhotos.length) % currentAlbumPhotos.length;
            updateLightboxPhoto();
        });
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex + 1) % currentAlbumPhotos.length;
            updateLightboxPhoto();
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Touch Swipe mobile lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    if (touchArea) {
        touchArea.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        touchArea.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleTouchSwipe();
        }, { passive: true });
    }

    function handleTouchSwipe() {
        if (currentAlbumPhotos.length <= 1) return;
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance < -45) {
            currentPhotoIndex = (currentPhotoIndex + 1) % currentAlbumPhotos.length;
            updateLightboxPhoto();
        } else if (swipeDistance > 45) {
            currentPhotoIndex = (currentPhotoIndex - 1 + currentAlbumPhotos.length) % currentAlbumPhotos.length;
            updateLightboxPhoto();
        }
    }

    // ===================================================
    // EFFETTO A PIOGGIA GLOBALE (DESKTOP)
    // ===================================================
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 150);

    const rainTargets = document.querySelectorAll(
        '.spotlight-wrapper, .section-header, .about-card, .territory-card, .gallery-album-card, .cta-box, .sponsor-cta-box, .contact-info, .contact-form-wrap'
    );
    rainTargets.forEach(el => el.classList.add('rain-item'));

    const rainObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('drop-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    rainTargets.forEach(el => rainObserver.observe(el));

    // ===================================================
    // GESTIONE VOCI ATTIVE (GIALLO/ORO) E SEZIONI MOBILE
    // ===================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-item, .mobile-links .mobile-nav-item');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');

    function setActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
                link.classList.add('active');
            }
        });
    }

    function checkMobileMode() {
        const isMobile = window.innerWidth <= 992;
        if (isMobile) {
            document.body.classList.add('mobile-mode');
            const activeSec = document.querySelector('section.mobile-active-section');
            if (!activeSec) {
                const heroSec = document.getElementById('hero');
                if (heroSec) {
                    heroSec.classList.add('mobile-active-section');
                    setActiveLink('hero');
                }
            } else {
                setActiveLink(activeSec.getAttribute('id'));
            }
        } else {
            document.body.classList.remove('mobile-mode');
            sections.forEach(s => s.classList.remove('mobile-active-section'));
        }
    }

    checkMobileMode();
    window.addEventListener('resize', checkMobileMode);

    function switchMobileSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        // Chiudi il menù mobile
        if (hamburgerBtn && mobileDrawer) {
            hamburgerBtn.classList.remove('open');
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = 'auto';
        }

        // Togli la sezione attiva precedente
        sections.forEach(sec => sec.classList.remove('mobile-active-section'));

        // Riporta lo scroll in cima
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Attiva la nuova sezione facendo scattare l'effetto a cascata
        requestAnimationFrame(() => {
            targetSection.classList.add('mobile-active-section');
            setActiveLink(targetId);
        });
    }

    // Tasto "Torna alla Home" generato su mobile in cima a ogni sezione
    sections.forEach(sec => {
        if (sec.id !== 'hero') {
            const container = sec.querySelector('.container');
            if (container) {
                const backWrap = document.createElement('div');
                backWrap.className = 'mobile-back-btn-wrap';
                backWrap.innerHTML = `
                    <button type="button" class="btn-mobile-back">
                        <i class="fa-solid fa-arrow-left"></i> Torna alla Home
                    </button>
                `;
                backWrap.querySelector('button').addEventListener('click', () => {
                    switchMobileSection('hero');
                });
                container.prepend(backWrap);
            }
        }
    });

    // Intercetta i click sui link di navigazione
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const targetId = href.substring(1);
                if (window.innerWidth <= 992) {
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        switchMobileSection(targetId);
                    }
                } else {
                    setActiveLink(targetId);
                }
            }
        });
    });

    if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = hamburgerBtn.classList.toggle('open');
            mobileDrawer.classList.toggle('open');
            document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        });
    }

    // Scroll spy per PC
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.innerWidth > 992) {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 60) {
                setActiveLink('contatti');
                return;
            }

            const scrollPosition = window.scrollY + 160;
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveLink(sectionId);
                }
            });
        }
    }, { passive: true });

    // ===================================================
    // MODALI TESSERAMENTO, TERRITORIO & CONTATTI NATIVI
    // ===================================================
    const btnAdesione = document.getElementById('btn-adesione');
    const modalScadenza = document.getElementById('modal-scadenza');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalDismissBtn = document.getElementById('modal-dismiss-btn');
    const modalContactLink = document.getElementById('modal-contact-link');

    function openModal() {
        if (modalScadenza) {
            modalScadenza.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modalScadenza) {
            modalScadenza.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (btnAdesione) btnAdesione.addEventListener('click', openModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);
    if (modalContactLink) modalContactLink.addEventListener('click', closeModal);

    if (modalScadenza) {
        modalScadenza.addEventListener('click', (e) => {
            if (e.target === modalScadenza) closeModal();
        });
    }

    const territoryData = {
        'santuario': {
            badge: 'Fede, Storia & Miracoli',
            title: 'Il Santuario della Madonna delle Grazie',
            content: `
                <h4><i class="fa-solid fa-cross"></i> Le Origini e la Presenza Basiliana</h4>
                <p>Il <strong>Santuario della Madonna delle Grazie</strong> di Torre di Ruggiero affonda le sue radici in un luogo da sempre intriso di spiritualità, originariamente legato alla presenza operosa dei monaci basiliani sin dal IX secolo.</p>
                
                <h4><i class="fa-solid fa-star-of-life"></i> L'Apparizione ad Isabella Inzillo (1677)</h4>
                <p>La storia più celebre del santuario ha inizio nell'<strong>aprile del 1677</strong>, quando la valle era ormai coperta da fitti rovi e le antiche vestigia del culto erano andate quasi del tutto perdute. La tradizione narra che la Vergine apparve a una giovane contadina del posto, <em>Isabella Inzillo</em>, gravemente malata.</p>
                <div class="quote-block">
                    "La Madonna la guarì miracolosamente e le affidò un messaggio chiaro per la comunità: ripulire quel luogo sacro dalle spine e ricostruire una chiesa in suo onore, affinché diventasse fonte di conforto e grazie per tutti i devoti."
                </div>

                <h4><i class="fa-solid fa-person-walking"></i> Il Miracolo di Pascale Angiolini e i Pellegrinaggi</h4>
                <p>Poco tempo dopo, le apparizioni si rinnovarono a un altro popolano, <em>Pascale Angiolini</em>, e la voce dell'evento prodigioso si diffuse con tale rapidità da richiamare migliaia di pellegrini da ogni angolo della Calabria e dell'intero Mezzogiorno. Il parroco e le autorità locali diedero avvio ai lavori, trasformando quel vallone isolato nel cuore pulsante di una devozione radicata e profonda.</p>

                <h4><i class="fa-solid fa-church"></i> La Rinascita dopo il Sisma e la Basilica Minore</h4>
                <p>Nonostante il disastroso terremoto del 1783, che rase al suolo la prima costruzione, la fede dei fedeli non venne meno: il tempio fu ricostruito con instancabile dedizione e, nel corso del Novecento, elevato al rango di <strong>Basilica Minore</strong>.</p>
                <p>Ancora oggi, soprattutto nei primi giorni di settembre durante la festa patronale, il santuario continua a essere meta viva di cammini penitenziali, preghiera e raccoglimento spirituale.</p>
            `
        },
        'conte-ruggiero': {
            badge: 'Origine Normanna & Curiosità',
            title: "Il Conte Ruggero e l'Origine del Borgo",
            content: `
                <h4><i class="fa-solid fa-landmark"></i> Il Cambio di Nome in Onore del Normanno</h4>
                <p>Fino all'Ottocento il paese non si chiamava affatto così. Il nome originario era <strong>Torre di Spadola</strong>, poiché i primi nuclei di coloni che popolarono l'area provenivano in gran parte dal vicino centro di Spadola.</p>
                <p>Fu soltanto con un <strong>decreto regio dell'8 maggio 1864</strong> che il comune assunse ufficialmente la denominazione di <em>Torre di Ruggiero</em>, volendo rendere omaggio a <strong>Ruggero I d'Altavilla</strong>, Gran Conte di Calabria e di Sicilia.</p>

                <h4><i class="fa-solid fa-chess-rook"></i> La Fondazione Leggendaria</h4>
                <p>La tradizione locale attribuisce la nascita stessa dell'insediamento al Gran Conte. Durante le sue campagne militari per liberare e riorganizzare i territori calabresi nell'XI secolo, Ruggero avrebbe fatto erigere una <strong>torre di vedetta strategica</strong> per controllare la media valle dell'Ancinale, unificando i piccoli casali sparsi e dando vita all'agglomerato primigenio.</p>

                <h4><i class="fa-solid fa-mountain-sun"></i> Il Legame con le Serre e San Bruno</h4>
                <p>Il Gran Conte Ruggero scelse proprio le Serre calabre come uno dei suoi fulcri strategici e spirituali: fu lui a donare a San Bruno di Colonia le terre per la celebre <em>Certosa di Serra San Bruno</em> e a favorire il ripopolamento e la cristianizzazione latina di tutta la vallata.</p>

                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

                <h4><i class="fa-solid fa-gem"></i> Curiosità sul Borgo</h4>
                <p><strong>• La «Piccola Lourdes» calabrese:</strong> Per via del santuario, delle acque della valle e della forza dei pellegrinaggi mariani nati dalle apparizioni seicentesche, il paese è spesso soprannominato la Piccola Lourdes della Calabria.</p>
                <p><strong>• I maestri scalpellini e i portali in granito:</strong> Camminando per i vicoli storici del borgo (<em>'A Turri</em> in dialetto), si notano subito gli imponenti portali in granito locale dei palazzi gentilizi (come <em>Palazzo Donna Anna</em> e <em>Palazzo Ravaschieri</em>), scolpiti a mano dalle rinomate maestranze di scalpellini serresi tra il Settecento e l'Ottocento.</p>
                <p><strong>• Capitale della nocciola:</strong> Torre di Ruggiero è uno dei centri d'eccellenza della corilicoltura in Calabria e fa parte dell'Associazione Nazionale Città della Nocciola con la pregiata varietà autoctona <em>Tonda Calabrese</em>.</p>
                <p><strong>• L'antichissima Chiesa di Santa Domenica:</strong> Nel cuore del borgo sorge la Chiesa di Santa Domenica, le cui prime tracce risalgono all'epoca bizantino-normanna (X-XII secolo), testimone silenziosa di una comunità risorta dalle macerie del sisma del 1783.</p>
            `
        },
        'tradizioni': {
            badge: 'Sapori Tipici, Terra & Comunità',
            title: 'Tradizioni e Sapori di Torre di Ruggiero',
            content: `
                <p>La tavola di Torre di Ruggiero riflette appieno l'anima delle Serre calabresi: cucina contadina, ingredienti di terra, legumi, bosco e sapori decisi tramandati con orgoglio da generazioni.</p>

                <h4><i class="fa-solid fa-bowl-food"></i> La Regina d'Agosto: La Pasta e Fagioli</h4>
                <p>La pasta e fagioli qui non è solo una ricetta quotidiana, ma un vero rito comunitario celebrato ogni estate nel cuore del paese con una <strong>sagra storica</strong> che richiama persone da tutto il comprensorio:</p>
                <p><strong>• La cottura lenta:</strong> Come vuole l'antica usanza contadina, i fagioli venivano tradizionalmente cotti a fuoco dolcissimo nella <em>pignata di terracotta</em> vicino al camino o alla brace, arricchiti con aglio, alloro o un rametto di origano selvatico.</p>
                <p><strong>• Il condimento rustico:</strong> La minestra viene completata con un soffritto saporito di olio extravergine d'oliva locale, pomodoro appena accennato e l'immancabile peperoncino calabrese piccante. Spesso si aggiunge la cotenna di maiale (<em>'a scorza</em>) o pezzetti di guanciale per dare corpo e sapore.</p>
                <p><strong>• Il formato di pasta:</strong> A differenza delle versioni settentrionali più brodose, qui la consistenza è densa e cremosa (<em>azzeccata</em>), unita a pasta corta rigata o maltagliati fatti in casa.</p>

                <h4><i class="fa-solid fa-tree"></i> La Nocciola Tonda Calabrese: L’«Oro Tondo»</h4>
                <p>Le nocciole (<em>'e nzippi</em> o <em>nuciddi</em>) sono il simbolo identitario del territorio, tanto che il borgo ha legato a questo frutto la sua vocazione agricola d'eccellenza:</p>
                <p><strong>• In pasticceria:</strong> La Tonda Calabrese ha un aroma tostato intenso e una spiccata dolcezza naturale. Viene impiegata per dolci secchi tradizionali, croccanti al miele millefiori locale, cantucci rustici e torte da forno fatte in casa.</p>
                <p><strong>• Nei piatti salati:</strong> La granella tostata è usata come finitura croccante su primi ai funghi o secondi di carne e formaggi tipici.</p>
                <p><strong>• La raccolta autunnale:</strong> Settembre e ottobre sono i mesi in cui i noccioleti si animano, momento che un tempo riuniva intere famiglie nella raccolta manuale e nell'asciugatura al sole delle aie.</p>

                <h4><i class="fa-solid fa-plate-wheat"></i> Altri Capisaldi della Tradizione Locale</h4>
                <p><strong>• I sapori del bosco:</strong> Essendo ai piedi delle Serre, Torre vanta una ricca cultura di funghi porcini freschi, trifolati, fritti o conservati sott'olio, oltre alle immancabili castagne arrostite (<em>rusuliddre</em>) o bollite con finocchietto (<em>allesse</em>).</p>
                <p><strong>• Pasta fatta in casa:</strong> La pasta della domenica sono i <em>fileja</em> (maccheroni al ferretto), lavorati a mano attorno al filo di giunco (<em>'u fusu</em>) con ragù di maiale o capra a lenta cottura.</p>
                <p><strong>• I dolci delle feste:</strong> A Natale e Pasqua non mancano le zeppole (<em>cuddruriddri</em>), i <em>pittapie</em> (biscotti ripieni di marmellata d'uva, noci e spezie) e le paste secche all'anice.</p>
            `
        }
    };

    const historyModal = document.getElementById('history-modal');
    const historyModalHeader = document.getElementById('history-modal-header');
    const historyModalBody = document.getElementById('history-modal-body');
    const historyModalClose = document.getElementById('history-modal-close');
    const historyModalOkBtn = document.getElementById('history-modal-ok-btn');
    const territoryCards = document.querySelectorAll('.territory-card[data-history]');

    function openHistoryModal(key) {
        const data = territoryData[key];
        if (!data || !historyModal) return;

        historyModalHeader.innerHTML = `
            <span class="h-badge">${data.badge}</span>
            <h2>${data.title}</h2>
        `;
        historyModalBody.innerHTML = data.content;

        historyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeHistoryModal() {
        if (historyModal) {
            historyModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    territoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const historyKey = card.getAttribute('data-history');
            openHistoryModal(historyKey);
        });
    });

    if (historyModalClose) historyModalClose.addEventListener('click', closeHistoryModal);
    if (historyModalOkBtn) historyModalOkBtn.addEventListener('click', closeHistoryModal);

    if (historyModal) {
        historyModal.addEventListener('click', (e) => {
            if (e.target === historyModal) closeHistoryModal();
        });
    }

    // Invio Form Nativo
    const contactForm = document.getElementById('contact-form');
    const contactSuccessModal = document.getElementById('contact-success-modal');
    const contactSuccessCloseBtn = document.getElementById('contact-success-close-btn');
    const contactSuccessOkBtn = document.getElementById('contact-success-ok-btn');

    function openSuccessModal() {
        if (contactSuccessModal) {
            contactSuccessModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSuccessModal() {
        if (contactSuccessModal) {
            contactSuccessModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (contactSuccessCloseBtn) contactSuccessCloseBtn.addEventListener('click', closeSuccessModal);
    if (contactSuccessOkBtn) contactSuccessOkBtn.addEventListener('click', closeSuccessModal);

    if (contactSuccessModal) {
        contactSuccessModal.addEventListener('click', (e) => {
            if (e.target === contactSuccessModal) closeSuccessModal();
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const contact = document.getElementById('contact-input').value.trim();
            const message = document.getElementById('message').value.trim();

            const emailDestinatario = "proloco.torrediruggiero@gmail.com";
            const oggetto = encodeURIComponent(`Messaggio dal sito web da: ${name}`);
            const corpo = encodeURIComponent(
                `Nome / Ragione Sociale: ${name}\r\n` +
                `Recapito (Email o Telefono): ${contact}\r\n\r\n` +
                `Messaggio:\r\n${message}\r\n\r\n` +
                `---\r\nInviato dal sito ufficiale Pro Loco Torre di Ruggiero APS`
            );

            const mailtoLink = `mailto:${emailDestinatario}?subject=${oggetto}&body=${corpo}`;

            openSuccessModal();
            contactForm.reset();

            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 600);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeHistoryModal();
            closeLightbox();
            closeSuccessModal();
        } else if (e.key === 'ArrowLeft' && lightbox && lightbox.classList.contains('active')) {
            if (currentAlbumPhotos.length > 1) {
                currentPhotoIndex = (currentPhotoIndex - 1 + currentAlbumPhotos.length) % currentAlbumPhotos.length;
                updateLightboxPhoto();
            }
        } else if (e.key === 'ArrowRight' && lightbox && lightbox.classList.contains('active')) {
            if (currentAlbumPhotos.length > 1) {
                currentPhotoIndex = (currentPhotoIndex + 1) % currentAlbumPhotos.length;
                updateLightboxPhoto();
            }
        }
    });

});
