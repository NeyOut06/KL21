document.addEventListener("DOMContentLoaded", function () {

    /* ===================================================== */
    /* MÚSICA DE FONDO                                       */
    /* ===================================================== */

    const musica =
        document.getElementById("musicaFondo");

    const botonMusica =
        document.getElementById("botonMusica");


    if (musica && botonMusica) {

        /*
         * Volumen inicial.
         *
         * 0.25 = 25%
         *
         * Lo dejo bajo para que la música
         * acompañe la página sin molestar.
         */

        musica.volume = 0.25;


        /*
         * Intentamos reproducir automáticamente.
         *
         * Algunos navegadores bloquean el audio
         * automático si el usuario todavía no
         * ha interactuado con la página.
         */

        musica.play()
            .then(function () {

                botonMusica.classList.add(
                    "reproduciendo"
                );

                botonMusica.textContent =
                    "♫";

            })
            .catch(function () {

                /*
                 * Si el navegador bloquea
                 * el autoplay, esperamos
                 * a que el usuario interactúe.
                 */

                botonMusica.textContent =
                    "♫";

            });


        /*
         * Botón de música.
         */

        botonMusica.addEventListener(
            "click",
            function () {

                if (musica.paused) {

                    musica.play()
                        .then(function () {

                            botonMusica.classList.add(
                                "reproduciendo"
                            );

                            botonMusica.textContent =
                                "♫";

                        })
                        .catch(function () {});

                } else {

                    musica.pause();

                    botonMusica.classList.remove(
                        "reproduciendo"
                    );

                    botonMusica.textContent =
                        "♩";

                }

            }
        );


        /*
         * Primera interacción con la página.
         *
         * Esto permite iniciar la música en
         * navegadores que bloqueen autoplay.
         */

        const iniciarMusica =
            function () {

                if (
                    musica.paused
                ) {

                    musica.play()
                        .then(function () {

                            botonMusica.classList.add(
                                "reproduciendo"
                            );

                            botonMusica.textContent =
                                "♫";

                        })
                        .catch(function () {});

                }


                document.removeEventListener(
                    "click",
                    iniciarMusica
                );

                document.removeEventListener(
                    "touchstart",
                    iniciarMusica
                );

            };


        document.addEventListener(
            "click",
            iniciarMusica,
            {
                once: true
            }
        );


        document.addEventListener(
            "touchstart",
            iniciarMusica,
            {
                once: true
            }
        );

    }
    /* ===================================================== */
    /* BOTÓN DE LA PORTADA                                   */
    /* ===================================================== */

    const boton =
        document.getElementById("btnRevelar");

    const mensaje =
        document.getElementById("mensajeSecreto");


    if (boton && mensaje) {

        boton.addEventListener("click", function () {

            mensaje.classList.add("visible");

            setTimeout(function () {

                mensaje.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 100);

        });

    }



    /* ===================================================== */
    /* LLUVIA DE CORAZONES EN TODA LA PÁGINA                 */
    /* ===================================================== */

    const heartsContainer =
        document.querySelector(".hearts-container");


    function crearCorazon() {

        if (!heartsContainer) {
            return;
        }


        const heart =
            document.createElement("div");


        heart.classList.add("heart");


        const tipos = [
            "♡",
            "♥",
            "♡",
            "✦"
        ];


        heart.textContent =
            tipos[
                Math.floor(
                    Math.random() * tipos.length
                )
            ];


        heart.style.left =
            Math.random() * 100 + "vw";


        heart.style.fontSize =
            (Math.random() * 17 + 12) + "px";


        heart.style.animationDuration =
            (Math.random() * 5 + 8) + "s";


        heart.style.opacity =
            (
                Math.random() * .45 + .25
            ).toFixed(2);


        heartsContainer.appendChild(
            heart
        );


        setTimeout(function () {

            if (heart.parentNode) {
                heart.remove();
            }

        }, 14000);

    }


    /*
       Corazones iniciales.
    */

    for (
        let i = 0;
        i < 15;
        i++
    ) {

        setTimeout(
            crearCorazon,
            i * 180
        );

    }


    /*
       Corazones durante toda la página.
    */

    setInterval(
        crearCorazon,
        450
    );



    /* ===================================================== */
    /* ANIMACIÓN DE LOS MESES                                */
    /* ===================================================== */

    /*
       IMPORTANTE:
       Los meses YA SON VISIBLES DESDE CSS.

       Este observer solamente añade una clase
       decorativa. Si falla, los meses siguen
       apareciendo.
    */

    const meses =
        document.querySelectorAll(
            ".month-section"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.08
                }

            );


        meses.forEach(
            function (mes) {

                observer.observe(mes);

            }
        );

    } else {

        /*
           Navegadores que no tengan
           IntersectionObserver.
        */

        meses.forEach(
            function (mes) {

                mes.classList.add(
                    "visible"
                );

            }
        );

    }



    /* ===================================================== */
    /* ANIMACIÓN DE LA CARTA                                 */
    /* ===================================================== */

    if (
        mensaje &&
        "IntersectionObserver"
        in window
    ) {

        const mensajeObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                mensajeObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.25
                }

            );


        mensajeObserver.observe(
            mensaje
        );

    }



    /* ===================================================== */
    /* VIDEOS                                                 */
    /* ===================================================== */

    /*
       IMPORTANTE:
       Antes solamente buscábamos:

       .video-card video

       Eso NO encontraba el video de septiembre,
       porque está dentro de:

       .memory-photo video

       Ahora buscamos TODOS los videos.
    */

    const videos =
        document.querySelectorAll(
            "video"
        );


    videos.forEach(
        function (video) {

            /*
             * Reproducción automática silenciosa.
             */

            video.muted = true;

            video.loop = true;

            video.playsInline = true;


            video.setAttribute(
                "muted",
                ""
            );


            video.setAttribute(
                "loop",
                ""
            );


            video.setAttribute(
                "playsinline",
                ""
            );


            video.setAttribute(
                "preload",
                "metadata"
            );


            /*
             * Cursor para indicar
             * que se puede abrir.
             */

            video.style.cursor =
                "pointer";


            /*
             * Click = video grande.
             */

            video.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    abrirVideoGrande(
                        video
                    );

                }
            );

        }
    );



    /* ===================================================== */
    /* AUTOPLAY DE VIDEOS AL HACER SCROLL                    */
    /* ===================================================== */

    if (
        videos.length > 0 &&
        "IntersectionObserver"
        in window
    ) {

        const videoObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            const video =
                                entry.target;


                            if (
                                entry.isIntersecting &&
                                entry.intersectionRatio >= 0.30
                            ) {

                                /*
                                 * Siempre silencioso
                                 * en la vista normal.
                                 */

                                video.muted = true;


                                video.play()
                                    .catch(
                                        function () {
                                            /*
                                             * Algunos
                                             * navegadores
                                             * pueden bloquear
                                             * autoplay.
                                             */
                                        }
                                    );

                            } else {

                                video.pause();

                            }

                        }
                    );

                },

                {
                    threshold: [
                        0,
                        0.30,
                        0.60
                    ]
                }

            );


        videos.forEach(
            function (video) {

                videoObserver.observe(
                    video
                );

            }
        );

    }



    /* ===================================================== */
    /* VIDEO LIGHTBOX                                        */
    /* ===================================================== */

    let videoLightbox = null;

    let videoLightboxVideo = null;

    let videoOriginal = null;



    function crearVideoLightbox() {

        if (videoLightbox) {
            return;
        }


        /* ------------------------------------------------- */
        /* CONTENEDOR                                        */
        /* ------------------------------------------------- */

        videoLightbox =
            document.createElement("div");


        videoLightbox.id =
            "videoLightbox";


        Object.assign(
            videoLightbox.style,
            {

                position: "fixed",

                inset: "0",

                width: "100vw",

                height: "100vh",

                display: "none",

                alignItems: "center",

                justifyContent: "center",

                flexDirection: "column",

                padding: "20px",

                boxSizing: "border-box",

                background:
                    "rgba(20, 10, 15, .96)",

                backdropFilter:
                    "blur(8px)",

                zIndex: "10000"

            }
        );



        /* ------------------------------------------------- */
        /* BOTÓN CERRAR                                      */
        /* ------------------------------------------------- */

        const cerrar =
            document.createElement("button");


        cerrar.innerHTML =
            "×";


        Object.assign(
            cerrar.style,
            {

                position: "absolute",

                top: "18px",

                right: "22px",

                width: "48px",

                height: "48px",

                borderRadius: "50%",

                border:
                    "1px solid rgba(255,255,255,.45)",

                background:
                    "rgba(255,255,255,.12)",

                color: "#fff",

                fontSize: "30px",

                lineHeight: "1",

                cursor: "pointer",

                zIndex: "10002"

            }
        );


        cerrar.addEventListener(
            "click",
            cerrarVideoGrande
        );


        videoLightbox.appendChild(
            cerrar
        );



        /* ------------------------------------------------- */
        /* VIDEO GRANDE                                      */
        /* ------------------------------------------------- */

        const wrapper =
            document.createElement("div");


        Object.assign(
            wrapper.style,
            {

                width:
                    "min(94vw, 1200px)",

                maxHeight:
                    "85vh",

                display:
                    "flex",

                justifyContent:
                    "center",

                alignItems:
                    "center",

                background:
                    "#000",

                borderRadius:
                    "10px",

                overflow:
                    "hidden",

                boxShadow:
                    "0 25px 90px rgba(0,0,0,.6)"

            }
        );


        videoLightboxVideo =
            document.createElement("video");


        videoLightboxVideo.controls =
            true;


        videoLightboxVideo.loop =
            true;


        videoLightboxVideo.playsInline =
            true;


        /*
         * AQUÍ SÍ permitimos audio.
         */

        videoLightboxVideo.muted =
            false;


        videoLightboxVideo.volume =
            1;


        videoLightboxVideo.setAttribute(
            "controls",
            ""
        );


        videoLightboxVideo.setAttribute(
            "playsinline",
            ""
        );


        videoLightboxVideo.setAttribute(
            "loop",
            ""
        );


        Object.assign(
            videoLightboxVideo.style,
            {

                width:
                    "100%",

                maxWidth:
                    "100%",

                maxHeight:
                    "85vh",

                display:
                    "block",

                objectFit:
                    "contain",

                background:
                    "#000"

            }
        );


        wrapper.appendChild(
            videoLightboxVideo
        );


        videoLightbox.appendChild(
            wrapper
        );



        /* ------------------------------------------------- */
        /* TEXTO                                             */
        /* ------------------------------------------------- */

        const texto =
            document.createElement("div");


        texto.textContent =
            "Activa el sonido desde los controles mi niña :3· ⛶ Pantalla completa";


        Object.assign(
            texto.style,
            {

                marginTop:
                    "14px",

                color:
                    "rgba(255,255,255,.75)",

                fontFamily:
                    "'Poppins', sans-serif",

                fontSize:
                    "12px",

                letterSpacing:
                    "1px",

                textAlign:
                    "center"

            }
        );


        videoLightbox.appendChild(
            texto
        );



        /* ------------------------------------------------- */
        /* CLICK FUERA                                       */
        /* ------------------------------------------------- */

        videoLightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    videoLightbox
                ) {

                    cerrarVideoGrande();

                }

            }
        );


        document.body.appendChild(
            videoLightbox
        );

    }



    /* ===================================================== */
    /* ABRIR VIDEO GRANDE                                    */
    /* ===================================================== */

    function abrirVideoGrande(video) {

        if (!video) {
            return;
        }


        crearVideoLightbox();


        if (
            !videoLightbox ||
            !videoLightboxVideo
        ) {

            return;

        }


        videoOriginal =
            video;


        const source =
            video.currentSrc ||
            video.src ||
            (
                video.querySelector(
                    "source"
                )?.src
            );


        if (!source) {
            return;
        }


        const tiempo =
            Number.isFinite(
                video.currentTime
            )
                ? video.currentTime
                : 0;


        /*
         * Pausar video pequeño.
         */

        video.pause();


        /*
         * Cargar video grande.
         */

        videoLightboxVideo.pause();


        videoLightboxVideo.src =
            source;


        videoLightboxVideo.load();


        /*
         * IMPORTANTE:
         *
         * Esperamos a que el navegador
         * cargue los metadatos antes de
         * cambiar currentTime.
         */

        videoLightboxVideo.onloadedmetadata =
            function () {

                try {

                    videoLightboxVideo.currentTime =
                        tiempo;

                } catch (error) {

                    /*
                     * Si el navegador no permite
                     * cambiar el tiempo todavía,
                     * simplemente empieza desde el inicio.
                     */

                    videoLightboxVideo.currentTime =
                        0;

                }


                videoLightboxVideo.muted =
                    false;


                videoLightboxVideo.volume =
                    1;


                videoLightboxVideo.play()
                    .catch(
                        function () {
                            /*
                             * Los controles quedan
                             * disponibles para que
                             * el usuario pulse play.
                             */
                        }
                    );

            };


        /*
         * Mostrar.
         */

        videoLightbox.style.display =
            "flex";


        document.body.style.overflow =
            "hidden";

    }



    /* ===================================================== */
    /* CERRAR VIDEO GRANDE                                   */
    /* ===================================================== */

    function cerrarVideoGrande() {

        if (
            !videoLightbox ||
            !videoLightboxVideo
        ) {

            return;

        }


        const tiempo =
            Number.isFinite(
                videoLightboxVideo.currentTime
            )
                ? videoLightboxVideo.currentTime
                : 0;


        /*
         * Pausar visor.
         */

        videoLightboxVideo.pause();


        /*
         * Ocultar.
         */

        videoLightbox.style.display =
            "none";


        document.body.style.overflow =
            "";


        /*
         * Continuar el video original
         * desde donde quedó.
         */

        if (videoOriginal) {

            try {

                videoOriginal.currentTime =
                    tiempo;

            } catch (error) {
                /*
                 * No hacemos nada.
                 */
            }


            /*
             * Vista normal = siempre sin audio.
             */

            videoOriginal.muted =
                true;


            /*
             * Si todavía está visible,
             * continúa reproduciéndose.
             */

            const rect =
                videoOriginal.getBoundingClientRect();


            const visible =
                rect.top <
                    window.innerHeight * 0.7 &&
                rect.bottom >
                    window.innerHeight * 0.3;


            if (visible) {

                videoOriginal.play()
                    .catch(
                        function () {}
                    );

            }

        }


        /*
         * Limpiamos el visor después.
         */

        videoLightboxVideo.removeAttribute(
            "src"
        );


        videoLightboxVideo.load();


        videoOriginal =
            null;

    }



    /* ===================================================== */
    /* LIGHTBOX DE FOTOS                                    */
    /* ===================================================== */

    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    const lightboxCaption =
        document.getElementById(
            "lightboxCaption"
        );


    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    const fotos =
        document.querySelectorAll(
            ".memory-photo img, .polaroid-image img"
        );


    fotos.forEach(
        function (foto) {

            foto.addEventListener(
                "click",
                function () {

                    if (
                        !lightbox ||
                        !lightboxImage
                    ) {

                        return;

                    }


                    lightboxImage.src =
                        foto.currentSrc ||
                        foto.src;


                    lightboxImage.alt =
                        foto.alt ||
                        "Foto ampliada";


                    if (lightboxCaption) {

                        lightboxCaption.textContent =
                            foto.alt || "";

                    }


                    lightbox.classList.add(
                        "active"
                    );


                    document.body.style.overflow =
                        "hidden";

                }
            );

        }
    );



    /* ===================================================== */
    /* CERRAR LIGHTBOX DE FOTOS                             */
    /* ===================================================== */

    function cerrarLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            cerrarLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    lightbox
                ) {

                    cerrarLightbox();

                }

            }
        );

    }



    /* ===================================================== */
    /* FECHA AUTOMÁTICA DESDE EL NOMBRE                      */
    /* ===================================================== */

    const fotosConFecha =
        document.querySelectorAll(
            ".memory-photo img"
        );


    fotosConFecha.forEach(
        function (img) {

            const ruta =
                img.getAttribute("src");


            if (!ruta) {
                return;
            }


            const fecha =
                ruta.match(
                    /(\d{4})-(\d{2})-(\d{2})/
                );


            if (!fecha) {
                return;
            }


            const año =
                fecha[1];


            const mes =
                fecha[2];


            const dia =
                fecha[3];


            const elementoFecha =
                img.parentElement.querySelector(
                    ".photo-date"
                );


            if (elementoFecha) {

                elementoFecha.textContent =
                    `${año} · ${mes} · ${dia}`;

            }

        }
    );



    /* ===================================================== */
    /* PARALLAX DE LA PORTADA                                */
    /* ===================================================== */

    const hero =
        document.querySelector(
            ".hero"
        );


    if (hero) {

        window.addEventListener(
            "scroll",
            function () {

                const scroll =
                    window.scrollY;


                if (
                    scroll <
                    window.innerHeight
                ) {

                    hero.style.setProperty(
                        "--hero-parallax-y",
                        (scroll * 0.08) + "px"
                    );

                }

            },
            {
                passive: true
            }
        );

    }



    /* ===================================================== */
    /* ERROR DE IMÁGENES                                    */
    /* ===================================================== */

    const imagenes =
        document.querySelectorAll(
            "img"
        );


    imagenes.forEach(
        function (img) {

            img.addEventListener(
                "error",
                function () {

                    img.style.display =
                        "none";


                    const contenedor =
                        img.parentElement;


                    if (
                        contenedor &&
                        contenedor.classList.contains(
                            "memory-photo"
                        )
                    ) {

                        contenedor.classList.add(
                            "empty-photo"
                        );

                    }

                }
            );

        }
    );



    /* ===================================================== */
    /* ESC PARA CERRAR TODO                                  */
    /* ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            if (
                videoLightbox &&
                videoLightbox.style.display ===
                "flex"
            ) {

                cerrarVideoGrande();

                return;

            }


            cerrarLightbox();

        }
    );

});