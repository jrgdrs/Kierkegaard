
        const words = [
            'dream', 'light', 'time', 'space', 'future', 'mind', 'truth', 'fire', 'stone', 'river', 'wind', 'shadow', 'echo', 'path', 'voice', 'heart', 'storm', 'memory', 'wave', 'field', 'Kierkegaard', 'typobold',
            'sky', 'seed', 'thought', 'ocean', 'spark', 'dreamer', 'moment', 'vision', 'silence', 'forest', 'sound', 'cloud', 'mountain', 'dust', 'feather', 'flame', 'story', 'dreams', 'hope', 'tactile', 'Kierkegaard', 
            'soul', 'energy', 'mirror', 'night', 'day', 'world', 'circle', 'magic', 'shape', 'flow', 'Kierkegaard'
        ];

        function gaussian(mean = 0, sd = 1) {
            let u = 0, v = 0, s = 0;
            if (typeof gaussian.spare !== 'undefined') { const val = gaussian.spare; delete gaussian.spare; return mean + sd * val; }
            do { u = Math.random() * 2 - 1; v = Math.random() * 2 - 1; s = u * u + v * v; } while (s === 0 || s >= 1);
            const mul = Math.sqrt(-2 * Math.log(s) / s); gaussian.spare = v * mul; return mean + sd * (u * mul);
        }

        const stage = document.getElementById('animationContainer');
        const fontVariants = ['Kierkegaard-Regular', 'Kierkegaard-Italic', 'Kierkegaard-SemiBold', 'Kierkegaard-SemiBoldItalic', 'Kierkegaard-ExtraBold', 'Kierkegaard-ExtraBoldItalic'];
        function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
        function randomTertiaryColor() {
            const hue = Math.floor(Math.random() * 360);
            const saturation = 30 + Math.random() * 60;
            const lightness = 45 + Math.random() * 40;
            return `hsl(${hue} ${saturation}% ${lightness}%)`;
        }

        // ===== Steuerung =====
        let animationRunning = true;
        let animationSpeed = 1.0;
        let fontSizeFactor = 1.0;
        let contourProbability = 0.33;

        document.getElementById('speedSlider').addEventListener('input', e => animationSpeed = parseFloat(e.target.value));
        document.getElementById('sizeSlider').addEventListener('input', e => fontSizeFactor = parseFloat(e.target.value));
        document.getElementById('contourSlider').addEventListener('input', e => contourProbability = parseFloat(e.target.value));

        // --- robuster Leertasten-Handler (ersetze vorherige Implementierung) ---
        /*
        const pauseOverlay = createPauseOverlay();

        window.addEventListener('keydown', (e) => {
            const isSpace = e.code === 'Space' || e.key === ' ';
            if (!isSpace) return;

            // Verhindere Scroll/Default-Aktionen; wir fangen das Event wirklich ab.
            // Mit capture:true & passive:false (siehe Listener-Option unten) ist preventDefault wirksam.
            e.preventDefault();

            // Ignoriere Wiederholungen beim gehaltenen Drücken
            if (e.repeat) return;

            animationRunning = !animationRunning;

            if (!animationRunning) {
                // beim Pausieren Overlay zeigen
                pauseOverlay.show();
            } else {
                // beim Fortsetzen Overlay kurz ausblenden und Zeitbasis neu setzen
                pauseOverlay.hide();
                lastTime = performance.now();
            }
        }, { capture: true, passive: false }); 
        */


        const maxVisible = 6;
        let visibleWords = []; let zIndex = 1;
        let addInterval = 900;
        let lastTime = 0;

        function createWordElement(text) {
            const el = document.createElement('div');
            el.className = 'word';
            el.textContent = text;
            el.style.fontFamily = pickRandom(fontVariants);

            // Schriftgröße skaliert
            el.style.fontSize = ((20 + Math.floor(Math.random() * (stage.clientWidth / 3.5))) * fontSizeFactor) + 'pt';

            // Konturwahrscheinlichkeit global steuerbar
            const transparentFill = Math.random() < contourProbability;
            if (transparentFill) {
                el.style.color = 'transparent';
                const strokeColor = randomTertiaryColor();
                const strokeWidth = (parseInt(el.style.fontSize) / 200).toFixed(1);
                el.style.webkitTextStroke = `${strokeWidth}px ${strokeColor}`;
                el.style.textStroke = `${strokeWidth}px ${strokeColor}`;
            } else {
                el.style.color = randomTertiaryColor();
                el.style.webkitTextStroke = '0px transparent';
            }

            const vw = stage.clientWidth, vh = stage.clientHeight;
            const centerX = vw / 2, centerY = vh / 2 + vh * 0.2;
            const sigmaX = vw * 0.45, sigmaY = vh * 0.3;
            let x = gaussian(centerX, sigmaX), y = gaussian(centerY, sigmaY);
            if (x < 0) x = -Math.random() * 50;
            if (y < 0) y = -Math.random() * 50;

            el.style.left = x + 'px';
            el.style.top = y + 'px';
            el.style.zIndex = (++zIndex).toString();
            el.dataset.targetOpacity = 0.3 + Math.random() * 0.5;
            el.dataset.startBlur = 8 + Math.floor(Math.random() * 24);
            el.style.opacity = '0';
            el.style.filter = `blur(${el.dataset.startBlur}px)`;
            stage.appendChild(el);

            const rect = el.getBoundingClientRect();
            const marginX = vw * 0.1, marginY = vh * 0.1;
            if (x - rect.width / 2 < -marginX) x = -marginX + rect.width / 2;
            if (x + rect.width / 2 > vw + marginX) x = vw + marginX - rect.width / 2;
            if (y - rect.height / 2 < -marginY) y = -marginY + rect.height / 2;
            if (y + rect.height / 2 > vh + marginY) y = vh + marginY - rect.height / 2;
            el.style.left = x + 'px';
            el.style.top = y + 'px';

            return el;
        }

        function showWord() {
            const el = createWordElement(pickRandom(words));
            visibleWords.push(el);
            requestAnimationFrame(() => {
                el.style.opacity = el.dataset.targetOpacity;
                el.style.filter = 'blur(0px)';
                el.style.transform = `translate(-50%,-50%) scale(${0.92 + Math.random() * 0.36})`;
            });
            if (visibleWords.length > maxVisible) { fadeOutAndRemove(visibleWords.shift()); }
        }

        function fadeOutAndRemove(el) {
            el.style.opacity = '0';
            el.style.filter = `blur(${el.dataset.startBlur}px)`;
            el.addEventListener('transitionend', () => { if (el.parentElement) el.parentElement.removeChild(el); });
        }

        // --- kleines Pause-Overlay (visuelles Feedback) ---
        function createPauseOverlay() {
            const o = document.createElement('div');
            o.style.position = 'absolute';
            o.style.left = '50%';
            o.style.top = '80%';
            o.style.transform = 'translate(-50%,-50%)';
            o.style.padding = '16px 24px';
            o.style.borderRadius = '9px';
            o.style.background = 'rgba(0,0,0,0.6)';
            o.style.color = '#ddd';
            o.style.fontSize = '16px';
            o.style.letterSpacing = '2px';
            o.style.zIndex = '9999';
            o.style.pointerEvents = 'none';
            o.style.opacity = '0';
            o.style.transition = 'opacity 220ms ease';
            o.textContent = '⏸ PAUSE';
            // nicht sofort anhängen — hängt an stage, damit position relativ funktioniert
            stage.appendChild(o);

            return {
                show: () => { o.style.opacity = '1'; },
                hide: () => { o.style.opacity = '0'; }
            };
        }

        // ===== Hauptloop mit Pausefunktion =====
        function loop(timestamp) {
            if (animationRunning && timestamp - lastTime > addInterval / animationSpeed) {
                showWord();
                lastTime = timestamp;
            }
            requestAnimationFrame(loop);
        }

        // Start
        showWord();
        requestAnimationFrame(loop);
        