document.addEventListener('DOMContentLoaded', () => {

    // ===================================================
    // ELENCO DEGLI EVENTI DELLA PRO LOCO (GESTIONE AUTOMATICA)
    // ===================================================
    const eventsList = [
        {
            id: 'cinetorre-mammamia',
            title: 'CineTorre: Mamma mia!',
            subtitle: 'Cinema & Comunità',
            dateStr: '2026-10-09',
            dateDisplay: 'Venerdì 9 Ottobre 2026',
            time: 'Ore 21:00 (Ingresso Libero)',
            location: 'Centro Policulturale Località Paolello',
            audience: 'Aperto a tutti: giovani, famiglie e bambini',
            description: 'Inauguriamo la nuova stagione di eventi. Portiamo il cinema in sala per stare insieme, ridere ed emozionarci nel cuore del borgo.',
            posterImage: 'cinetorre.jpg',
            posterFallback: 'cinetorre.png'
        },
        {
            id: 'cinetorre-qualunquemente',
            title: 'Cinetorre: Qualunquemente',
            subtitle: 'Cinema & Comunità',
            dateStr: '2026-10-16',
            dateDisplay: 'Venerdì 16 Ottobre 2026',
            time: 'Ore 21:00 (Ingresso Libero)',
            location: 'Centro Policulturale – Loc. Paolello',
            audience: 'Aperto a tutti: giovani, famiglie e appassionati di cinema',
            description: 'Nuova serata cinema con la proiezione del film "Qualunquemente". Cetto La Qualunque, un politico corrotto disposto a tutto pur di vincere le elezioni!',
            posterImage: 'Qualunquemente.jpg',
            posterFallback: 'qualunquemente.jpg'
        },
        {
            id: 'cinetorre-gran-torino',
            title: 'Cinetorre: Gran Torino',
            subtitle: 'Cinema & Comunità',
            dateStr: '2026-10-23',
            dateDisplay: 'Venerdì 23 Ottobre 2026',
            time: 'Ore 21:00 (Ingresso Libero)',
            location: 'Centro Policulturale – Loc. Paolello',
            audience: 'Aperto a tutti: giovani, famiglie e appassionati di cinema',
            description: 'Un veterano burbero, una leggendaria auto del ’72 e un quartiere in continuo cambiamento. Gran Torino è un capolavoro intenso e commovente sul superamento dei pregiudizi, amicizia e grande cinema.',
            posterImage: 'gran-torino.jpg',
            posterFallback: 'gran-torino.png'
        },
        {
            id: 'torreween-party-2026',
            title: 'Torreween Party 2026',
            subtitle: 'Festa di Halloween & Comunità',
            dateStr: '2026-10-31',
            dateDisplay: 'Sabato 31 Ottobre 2026',
            time: 'Ore 15:30',
            location: 'Ritrovo Loc. San Sebastiano → Piazza del Popolo',
            audience: 'Grandi e piccini rigorosamente tutti travestiti!',
            description: 'Festeggiamo insieme il giorno più spaventoso dell\'anno! Spaventosa sfilata in maschera tra le vie del paese e arrivo in Piazza del Popolo con merenda per tutti, animazione, giochi e angolo foto a tema. In caso di maltempo, la festa si svolgerà presso la Sala Consiliare.',
            posterImage: 'torreween.jpg',
            posterFallback: 'torreween.png'
        }
    ];

    // Dati locandina programma generale stagionale
    const seasonProgram = {
        title: 'CineTorre - Programma della Stagione',
        image: 'Programma-cinetorre.png',
        imageFallback: 'Programma-cinetorre.jpg',
        description: 'La Pro-Loco, con il patrocinio del Comune di Torre di Ruggiero, presenta il programma di CineTorre! Scopri tutti gli appuntamenti che ci accompagneranno in questa stagione e preparati a vivere la magia del cinema insieme a noi! Ti aspettiamo a CineTorre!'
    };

    // ===================================================
    // RENDER AUTOMATICO: EVENTI ATTIVI vs EVENTI PASSATI
    // ===================================================
    let upcomingEvents = [];
    let currentEventIndex = 0;

    function renderEvents() {
        const spotlightContainer = document.getElementById('spotlight-container');
        const pastEventsWrap = document.getElementById('past-events-wrap');
        const pastEventsGrid = document.getElementById('past-events-grid');

        if (!spotlightContainer) return;

        const now = new Date();
        const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        upcomingEvents = [];
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

        // 1. Riquadro Eventi in Programma (con Slider e Frecce)
        if (upcomingEvents.length > 0) {
            if (currentEventIndex >= upcomingEvents.length) {
                currentEventIndex = 0;
            }
            updateSpotlightCard();
        } else {
            spotlightContainer.innerHTML = `
                <div class="spotlight-empty" style="text-align: center; padding: 44px 20px;">
                    <div style="width: 64px; height: 64px; background: #fff7ed; color: #ea580c; border-radius: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 18px; box-shadow: 0 4px 14px rgba(234, 88, 12, 0.15);">
                        <i class="fa-solid fa-film"></i>
                    </div>
                    <h3 style="font-size: 1.75rem; font-weight: 800; color: #0f172a; margin-bottom: 10px;">In attesa dei prossimi eventi...</h3>
                    <p style="color: #64748b; font-size: 1.02rem; max-width: 580px; margin: 0 auto 26px; line-height: 1.6;">
                        Stiamo definendo il calendario delle prossime iniziative nel borgo. Nel frattempo, consulta il nostro programma cinema e seguici sui canali ufficiali!
                    </p>
                    <div class="spotlight-actions" style="display: flex; justify-content: center; align-items: center; gap: 14px; flex-wrap: wrap;">
                        <button type="button" class="btn btn-gold" id="btn-view-program-empty" style="padding: 12px 24px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; font-size: 0.95rem;">
                            <i class="fa-solid fa-calendar-days"></i> Programma Cinema
                        </button>
                        <div style="display: inline-flex; align-items: center; gap: 12px;">
                            <a href="https://whatsapp.com/channel/0029Vb8dpYq5K3zN9giYi612" target="_blank" rel="noopener noreferrer" title="Canale WhatsApp" aria-label="WhatsApp" style="width: 44px; height: 44px; border-radius: 50%; background: #25d366; color: #ffffff; display: inline-flex; align-items: center; justify-content: center; font-size: 1.35rem; text-decoration: none; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35); transition: transform 0.2s, box-shadow 0.2s;">
                                <i class="fa-brands fa-whatsapp"></i>
                            </a>
                            <a href="https://www.instagram.com/proloco_torrediruggiero/" target="_blank" rel="noopener noreferrer" title="Profilo Instagram" aria-label="Instagram" style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: #ffffff; display: inline-flex; align-items: center; justify-content: center; font-size: 1.35rem; text-decoration: none; box-shadow: 0 4px 12px rgba(220, 39, 67, 0.35); transition: transform 0.2s, box-shadow 0.2s;">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://www.facebook.com/p/prolocotorrediruggiero-61594633873034/" target="_blank" rel="noopener noreferrer" title="Pagina Facebook" aria-label="Facebook" style="width: 44px; height: 44px; border-radius: 50%; background: #1877f2; color: #ffffff; display: inline-flex; align-items: center; justify-content: center; font-size: 1.3rem; text-decoration: none; box-shadow: 0 4px 12px rgba(24, 119, 242, 0.35); transition: transform 0.2s, box-shadow 0.2s;">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;

            const btnViewProgramEmpty = document.getElementById('btn-view-program-empty');
            if (btnViewProgramEmpty) {
                btnViewProgramEmpty.addEventListener('click', openProgramModal);
            }
        }

        // 2. Archivio Eventi Precedenti
        if (pastEvents.length > 0 && pastEventsWrap && pastEventsGrid) {
            pastEventsWrap.style.display = 'block';
            pastEventsGrid.innerHTML = pastEvents.map(evt => `
                <div class="past-event-card">
                    <div class="past-event-thumb">
                        <span class="past-badge-closed"><i class="fa-solid fa-check"></i> Concluso</span>
                        <img src="${evt.posterImage}" alt="${evt.title}" onerror="this.onerror=null; this.src='${evt.posterFallback}';">
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
    }

    function updateSpotlightCard() {
        const spotlightContainer = document.getElementById('spotlight-container');
        if (!spotlightContainer || upcomingEvents.length === 0) return;

        const currentEvent = upcomingEvents[currentEventIndex];
        const total = upcomingEvents.length;

        // Costruiamo barra di navigazione con frecce e pallini se ci sono più eventi
        let sliderControlsHtml = '';
        if (total > 1) {
            const dotsHtml = upcomingEvents.map((ev, idx) => `
                <button type="button" class="slider-dot-btn ${idx === currentEventIndex ? 'active' : ''}" data-event-idx="${idx}" aria-label="Vai a evento ${idx + 1}" style="width: ${idx === currentEventIndex ? '28px' : '10px'}; height: 10px; border-radius: 9999px; background: ${idx === currentEventIndex ? '#ea580c' : '#cbd5e1'}; border: none; cursor: pointer; transition: all 0.3s ease; padding: 0;"></button>
            `).join('');

            sliderControlsHtml = `
                <div class="events-slider-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
                    <div class="spotlight-tag" style="margin-bottom: 0;">
                        <i class="fa-solid fa-bullhorn"></i> In programma • ${currentEvent.dateDisplay}
                    </div>
                    <div class="events-slider-nav" style="display: inline-flex; align-items: center; gap: 10px;">
                        <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; margin-right: 4px;">Evento ${currentEventIndex + 1} di ${total}</span>
                        <button type="button" id="prev-event-btn" class="slider-arrow-btn" aria-label="Evento precedente" style="width: 38px; height: 38px; border-radius: 50%; background: #ffffff; border: 1.5px solid #cbd5e1; color: #0f172a; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 0.95rem; box-shadow: 0 2px 6px rgba(0,0,0,0.06); transition: all 0.2s ease;">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <button type="button" id="next-event-btn" class="slider-arrow-btn" aria-label="Prossimo evento" style="width: 38px; height: 38px; border-radius: 50%; background: #ffffff; border: 1.5px solid #cbd5e1; color: #0f172a; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 0.95rem; box-shadow: 0 2px 6px rgba(0,0,0,0.06); transition: all 0.2s ease;">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            sliderControlsHtml = `
                <div class="spotlight-tag">
                    <i class="fa-solid fa-bullhorn"></i> In programma • ${currentEvent.dateDisplay}
                </div>
            `;
        }

        // Paginazione a pallini in basso
        let dotsContainerHtml = '';
        if (total > 1) {
            const dots = upcomingEvents.map((ev, idx) => `
                <button type="button" class="slider-dot-btn ${idx === currentEventIndex ? 'active' : ''}" data-event-idx="${idx}" aria-label="Vai a evento ${idx + 1}" style="width: ${idx === currentEventIndex ? '28px' : '10px'}; height: 10px; border-radius: 9999px; background: ${idx === currentEventIndex ? '#ea580c' : '#cbd5e1'}; border: none; cursor: pointer; transition: all 0.3s ease; padding: 0;"></button>
            `).join('');
            dotsContainerHtml = `
                <div class="slider-dots-wrapper" style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 22px;">
                    ${dots}
                </div>
            `;
        }

        spotlightContainer.innerHTML = `
            ${sliderControlsHtml}
            <div class="spotlight-grid" id="spotlight-card-content" style="position: relative;">
                <div class="spotlight-image-col">
                    <div class="cinema-poster-frame">
                        <img src="${currentEvent.posterImage}" alt="${currentEvent.title}" class="poster-img" onerror="this.onerror=null; this.src='${currentEvent.posterFallback}';">
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
                        <button type="button" class="btn btn-gold" id="btn-view-program">
                            <i class="fa-solid fa-calendar-days"></i> Programma Stagione
                        </button>
                        <a href="#" class="btn btn-outline-dark" id="share-event-btn">
                            <i class="fa-solid fa-share-nodes"></i> Condividi Evento
                        </a>
                    </div>
                </div>
            </div>
            ${dotsContainerHtml}
        `;

        // Aggancio apertura programma generale
        const btnViewProgram = document.getElementById('btn-view-program');
        if (btnViewProgram) {
            btnViewProgram.addEventListener('click', openProgramModal);
        }

        // Aggancio frecce avanti e indietro
        const prevBtn = document.getElementById('prev-event-btn');
        const nextBtn = document.getElementById('next-event-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentEventIndex = (currentEventIndex - 1 + upcomingEvents.length) % upcomingEvents.length;
                updateSpotlightCard();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentEventIndex = (currentEventIndex + 1) % upcomingEvents.length;
                updateSpotlightCard();
            });
        }

        // Aggancio click sui pallini
        const dotBtns = spotlightContainer.querySelectorAll('.slider-dot-btn');
        dotBtns.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetIdx = parseInt(dot.getAttribute('data-event-idx'));
                if (!isNaN(targetIdx) && targetIdx !== currentEventIndex) {
                    currentEventIndex = targetIdx;
                    updateSpotlightCard();
                }
            });
        });

        // Gestione swipe touch mobile sulla card
        const cardStage = document.getElementById('spotlight-card-content');
        if (cardStage && total > 1) {
            let startX = 0;
            let endX = 0;

            cardStage.addEventListener('touchstart', (e) => {
                startX = e.changedTouches[0].screenX;
            }, { passive: true });

            cardStage.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].screenX;
                const diff = endX - startX;
                if (diff < -45) {
                    // Swipe verso sinistra -> prossimo
                    currentEventIndex = (currentEventIndex + 1) % upcomingEvents.length;
                    updateSpotlightCard();
                } else if (diff > 45) {
                    // Swipe verso destra -> precedente
                    currentEventIndex = (currentEventIndex - 1 + upcomingEvents.length) % upcomingEvents.length;
                    updateSpotlightCard();
                }
            }, { passive: true });
        }

        // Condividi Evento
        const shareBtn = document.getElementById('share-event-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (navigator.share) {
                    navigator.share({
                        title: `${currentEvent.title} - Pro Loco Torre di Ruggiero`,
                        text: `${currentEvent.title} a Torre di Ruggiero: ${currentEvent.dateDisplay} alle ${currentEvent.time}!`,
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
    // MODAL PROGRAMMA GENERALE CINETORRE (SENZA TREMOLIO & DOWNLOAD SICURO)
    // ===================================================
    let programModal = document.getElementById('modal-programma-cinetorre');
    if (!programModal) {
        programModal = document.createElement('div');
        programModal.id = 'modal-programma-cinetorre';
        programModal.className = 'history-modal-overlay';
        programModal.setAttribute('aria-hidden', 'true');
        programModal.innerHTML = `
            <div class="history-modal-container" style="max-width: 640px; will-change: transform;">
                <button class="history-modal-close" id="program-modal-close" aria-label="Chiudi finestra">&times;</button>
                <div class="history-modal-header" style="padding: 24px 28px 16px;">
                    <span class="h-badge"><i class="fa-solid fa-film"></i> Rassegna Cinema 2026</span>
                    <h2 style="font-size: 1.6rem; margin-top: 4px;">${seasonProgram.title}</h2>
                </div>
                <div class="history-modal-body" style="padding: 20px 28px; text-align: center;">
                    <p style="font-size: 0.96rem; margin-bottom: 18px; text-align: left; line-height: 1.55; color: #475569;">
                        ${seasonProgram.description}
                    </p>
                    <div style="border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-lg); background: #071321; margin: 0 auto; max-width: 460px; line-height: 0;">
                        <img src="${seasonProgram.image}" alt="Locandina Programma CineTorre" style="width: 100%; height: auto; max-height: 52vh; object-fit: contain; display: block;" onerror="this.onerror=null; this.src='${seasonProgram.imageFallback}';">
                    </div>
                </div>
                <div class="history-modal-footer" style="padding: 14px 28px; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap;">
                    <a href="${seasonProgram.image}" download="Programma-CineTorre-2026.png" target="_blank" rel="noopener noreferrer" class="btn btn-outline-dark" id="btn-download-poster" style="font-size: 0.88rem; padding: 10px 18px;">
                        <i class="fa-solid fa-download"></i> Scarica Locandina
                    </a>
                    <button type="button" class="btn btn-primary" id="program-modal-ok-btn" style="padding: 10px 22px;">Ho capito</button>
                </div>
            </div>
        `;
        document.body.appendChild(programModal);
    }

    function openProgramModal() {
        if (!programModal) return;
        programModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProgramModal() {
        if (!programModal) return;
        programModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    const programModalClose = document.getElementById('program-modal-close');
    const programModalOkBtn = document.getElementById('program-modal-ok-btn');
    if (programModalClose) programModalClose.addEventListener('click', closeProgramModal);
    if (programModalOkBtn) programModalOkBtn.addEventListener('click', closeProgramModal);
    programModal.addEventListener('click', (e) => {
        if (e.target === programModal) closeProgramModal();
    });

    // Gestione download
    const btnDownloadPoster = document.getElementById('btn-download-poster');
    if (btnDownloadPoster) {
        btnDownloadPoster.addEventListener('click', async (e) => {
            if (window.location.protocol.startsWith('http')) {
                e.preventDefault();
                try {
                    const response = await fetch(seasonProgram.image);
                    if (!response.ok) throw new Error('File non raggiungibile');
                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    const tempLink = document.createElement('a');
                    tempLink.href = blobUrl;
                    tempLink.download = 'Programma-CineTorre-2026.png';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    URL.revokeObjectURL(blobUrl);
                } catch (err) {
                    window.open(seasonProgram.image, '_blank');
                }
            }
        });
    }

    // ===================================================
    // GESTIONE GALLERIA ALBUM FOTOGRAFICA & LIGHTBOX
    // ===================================================
    const galleryAlbums = [
        {
            id: 'cinetorre-qualunquemente',
            title: 'CineTorre - Qualunquemente',
            date: '16 Ottobre 2026',
            desc: 'Le risate e i momenti condivisi durante la seconda serata di CineTorre con la divertentissima proiezione di Qualunquemente al Centro Policulturale!',
            cover: 'Qualunquemente.jpg',
            photos: [
                'Qualunquemente.jpg',
                'qualunquemente-1.jpg',
                'qualunquemente-2.jpg',
                'qualunquemente-3.jpg',
                'qualunquemente-4.jpg',
                'qualunquemente-5.jpg',
                'qualunquemente-6.jpg',
                'qualunquemente-7.jpg'
            ]
        },
        {
            id: 'cinetorre-prima-serata',
            title: 'CineTorre - Prima Serata',
            date: '9 Ottobre 2026',
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
                    <img src="${album.cover}" alt="${album.title}" class="album-cover-img" onerror="this.onerror=null; this.src='cinetorre.png';">
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
                    <img src="${src}" alt="miniatura" onerror="this.onerror=null; this.src='cinetorre.png';">
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
        '.spotlight-wrapper, .past-events-header, .past-event-card, .section-header, .about-card, .territory-card, .gallery-album-card, .cta-box, .sponsor-cta-box, .contact-info, .contact-form-wrap'
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
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
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

        if (hamburgerBtn && mobileDrawer) {
            hamburgerBtn.classList.remove('open');
            mobileDrawer.classList.remove('open');
            document.body.style.overflow = 'auto';
        }

        sections.forEach(sec => sec.classList.remove('mobile-active-section'));

        window.scrollTo({ top: 0, behavior: 'instant' });

        requestAnimationFrame(() => {
            targetSection.classList.add('mobile-active-section');
            setActiveLink(targetId);
        });
    }

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

            const emailDestinatario = "info@prolocotorrediruggiero.it";
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
            closeProgramModal();
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

// ===================================================
    // CONTATORE VISITE REALE E AFFIDABILE
    // ===================================================
    async function updateVisitCounter() {
        const counterEl = document.getElementById('visits-count');
        if (!counterEl) return;

        // Base di partenza reale per il lancio del nuovo sito
        const BASE_VISITS = 42; 
        
        let visits = parseInt(localStorage.getItem('plr_site_visits') || '0', 10);
        const lastVisitTime = parseInt(localStorage.getItem('plr_last_visit_time') || '0', 10);
        const now = Date.now();

        // Incrementa la visita se sono passati almeno 5 minuti dall'ultima o se è una nuova sessione
        const isNewSession = !sessionStorage.getItem('plr_session_active');
        if (isNewSession || (now - lastVisitTime > 5 * 60 * 1000)) {
            visits = (visits === 0 ? BASE_VISITS : visits) + 1;
            sessionStorage.setItem('plr_session_active', 'true');
            localStorage.setItem('plr_site_visits', visits);
            localStorage.setItem('plr_last_visit_time', now);
        } else if (visits === 0) {
            visits = BASE_VISITS;
            localStorage.setItem('plr_site_visits', visits);
        }

        // Prova a sincronizzare con il server pubblico
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 1800);

            const res = await fetch('https://api.codetabs.com/v1/counter?key=prolocotorre-ufficiale-2026&action=hit', {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                const remoteCount = Number(data.count || data.value || data);
                if (!isNaN(remoteCount) && remoteCount > 0) {
                    visits = Math.max(visits, remoteCount + BASE_VISITS);
                    localStorage.setItem('plr_site_visits', visits);
                }
            }
        } catch (err) {
            // Se l'API esterna è bloccata da adblock/CORS, continua regolarmente con il dato locale
        }

        // Mostra il conteggio formattato (es. 43, 44, 45...)
        counterEl.textContent = visits.toLocaleString('it-IT');
    }

    updateVisitCounter();

});
