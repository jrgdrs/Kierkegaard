function createFontTester(options) {
    const {
        container,
        fonts,
        initialFont,
        initialSize,
        initialLineHeight,
        features,
        initialFeatures,
        sampleText
    } = options;

    const wrapper = document.createElement('div');
    wrapper.className = 'font-tester';
    container.appendChild(wrapper);

    // ----- Header mit Toggle -----
    const header = document.createElement('div');
    header.className = 'header';
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '▾';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.fontSize = '18px';
    toggleBtn.style.color = 'white';
    toggleBtn.style.padding = '0px 6px';
    toggleBtn.style.border = 'none';
    toggleBtn.style.background = '#f00';
    toggleBtn.style.fontWeight = 'bold';
    header.appendChild(toggleBtn);

    const titleSpan = document.createElement('span');
    titleSpan.className = 'title';
    header.appendChild(titleSpan);

    const subtitleSpan = document.createElement('span');
    subtitleSpan.className = 'subtitle';
    header.appendChild(subtitleSpan);

    wrapper.appendChild(header);

    // ----- Controls -----
    const controls = document.createElement('div');
    controls.className = 'controls';
    wrapper.appendChild(controls);

    // Font Family
    const fontDiv = document.createElement('div');
    const fontLabel = document.createElement('label'); fontLabel.textContent='Font Family';
    fontDiv.appendChild(fontLabel);
    const fontSelect = document.createElement('select');
    fonts.forEach(f=>{const opt=document.createElement('option');opt.value=f;opt.textContent=f;fontSelect.appendChild(opt)});
    fontSelect.value = initialFont;
    fontDiv.appendChild(fontSelect);
    controls.appendChild(fontDiv);

    // Font Size
    const sizeDiv = document.createElement('div');
    const sizeLabel = document.createElement('label'); sizeLabel.innerHTML=`Font Size (<span>${initialSize}</span>px)`; const sizeSpan=sizeLabel.querySelector('span');
    sizeDiv.appendChild(sizeLabel);
    const sizeSlider = document.createElement('input'); sizeSlider.type='range'; sizeSlider.min=12; sizeSlider.max=144; sizeSlider.value=initialSize;
    sizeDiv.appendChild(sizeSlider);
    controls.appendChild(sizeDiv);

    // Line Height
    const lhDiv = document.createElement('div');
    const lhLabel = document.createElement('label'); lhLabel.innerHTML=`Line Height (<span>${initialLineHeight}</span>)`; const lhSpan=lhLabel.querySelector('span');
    lhDiv.appendChild(lhLabel);
    const lhSlider = document.createElement('input'); lhSlider.type='range'; lhSlider.min=.5; lhSlider.max=1.5; lhSlider.step=0.1; lhSlider.value=initialLineHeight;
    lhDiv.appendChild(lhSlider);
    controls.appendChild(lhDiv);

    // Features Checkboxes
    const featDiv = document.createElement('div');
    const featLabel = document.createElement('label'); featLabel.textContent='OpenType Features';
    featDiv.appendChild(featLabel);
    const featContainer = document.createElement('div'); featContainer.className='features';
    features.forEach(f=>{
        const lab=document.createElement('label');
        const cb=document.createElement('input'); cb.type='checkbox'; cb.value=f; if(initialFeatures.includes(f)) cb.checked=true;
        lab.appendChild(cb); lab.appendChild(document.createTextNode(f));
        featContainer.appendChild(lab);
        cb.addEventListener('change', updateFeatures);
    });
    featDiv.appendChild(featContainer);
    controls.appendChild(featDiv);

    // Editable Text
    const textDiv = document.createElement('div'); textDiv.className='font-edit-container'; textDiv.contentEditable=true; textDiv.spellcheck=false;  textDiv.textContent=sampleText;
    wrapper.appendChild(textDiv);

    // ----- Update Funktionen -----
    function updateFeatures(){
        const selected = Array.from(featContainer.querySelectorAll('input:checked')).map(cb=>`"${cb.value}" 1`);
        textDiv.style.fontFeatureSettings = selected.join(',') || 'normal';
        updateHeaderText();
    }
    function updateHeaderText(){
        const selectedFeatures = Array.from(featContainer.querySelectorAll('input:checked')).map(cb=>cb.value);
        titleSpan.textContent = fontSelect.value;
        subtitleSpan.textContent = `Size ${sizeSlider.value}px, Line ${lhSlider.value}` + (selectedFeatures.length>0 ? ` (${selectedFeatures.join(', ')})` : '');
    }

    fontSelect.addEventListener('change', ()=>{ textDiv.style.fontFamily=fontSelect.value; updateHeaderText(); });
    sizeSlider.addEventListener('input', ()=>{ textDiv.style.fontSize=sizeSlider.value+'px'; sizeSpan.textContent=sizeSlider.value; updateHeaderText(); });
    lhSlider.addEventListener('input', ()=>{ textDiv.style.lineHeight=lhSlider.value; lhSpan.textContent=lhSlider.value; updateHeaderText(); });

    // ----- Toggle Controls -----
    // let visible=true;  
    // toggleBtn.addEventListener('click', ()=>{
    //     visible=!visible;
    //     controls.classList.toggle('hidden',!visible);
    //     toggleBtn.textContent = visible ? '▾' : '▸';
    // });

    let visible = false; // Controls starten ausgeblendet
    controls.classList.add('hidden'); // verstecken
    toggleBtn.textContent = '▸'; // Pfeil für versteckt

    header.addEventListener('click', ()=>{
        visible = !visible;
        controls.classList.toggle('hidden', !visible);
        toggleBtn.textContent = visible ? '▾' : '▸';
    });

    // Initial
    textDiv.style.fontFamily=fontSelect.value;
    textDiv.style.fontSize=sizeSlider.value+'px';
    textDiv.style.lineHeight=lhSlider.value;
    updateFeatures();
}
