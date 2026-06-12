// AURA Jewelry Configurator — JS Controller

// ── State Management ──
const state = {
  metal: 'platinum',
  metalLabel: 'Platinum 950',
  metalCode: 'Pt950',
  style: 'solitaire',
  styleLabel: 'Solitaire',
  gem: 'diamond',
  gemLabel: 'Diamond',
  gemColor: '#ffffff',
  carat: 1.0,
  ringSize: 12,
  view: 'perspective',
  step: 1
};

// ── Density & Math Constants ──
const DENSITIES = {
  platinum: 1.0,
  yellowgold: 0.76, // 18K Yellow Gold is lighter than Platinum
  rosegold: 0.78    // 18K Rose Gold
};

const BASE_WEIGHTS = {
  solitaire: 5.5,
  halo: 6.8,
  'three-stone': 6.2,
  band: 7.5
};

// ── Partner Directory Data ──
const PRINTING_LABS = [
  {
    id: 'lab-jongno',
    name: '종로 캐스트 3D 랩 (Jongno Cast Lab)',
    location: '서울시 종로구 돈화문로 32 (종로3가역 10번 출구)',
    badges: ['초고해상도 수지', '당일 주조 가능'],
    contact: '02-744-1234'
  },
  {
    id: 'lab-gangnam',
    name: '강남 프리시전 프린트 (Gangnam Precision)',
    location: '서울시 강남구 테헤란로 104 (강남역 1번 출구)',
    badges: ['왁스 서포트', '주얼리 전용 DLP'],
    contact: '02-555-9876'
  },
  {
    id: 'lab-sinsadong',
    name: '스튜디오 H 다이렉트 (Studio H)',
    location: '서울시 종로구 서순라길 85 (권농동)',
    badges: ['금속 분말 3D 프린팅', '황동 시제품'],
    contact: '02-763-4321'
  }
];

const CRAFTSMEN = [
  {
    id: 'craft-kim',
    name: '김영희 대한민국 세공 명장',
    specialty: '알물림(Setting) & 핸드 인그레이빙 45년 경력',
    location: '종로 명장 스튜디오',
    badges: ['명장 제1호', '프롱 세팅 특화'],
    rating: '5.0'
  },
  {
    id: 'craft-park',
    name: '박성민 마이크로 파베 전문 명인',
    specialty: '현미경 미세 세팅 & 헤일로 세팅 전문',
    location: '종로 세공 협동조합',
    badges: ['파베 세팅 특화', '정밀 조각'],
    rating: '4.9'
  },
  {
    id: 'craft-lee',
    name: '이재혁 아뜰리에 폴리싱 대표',
    specialty: '고난도 경면 광택(Mirror Polish) & 호수 늘림/줄임',
    location: '청담 파인 아뜰리에',
    badges: ['백금 광택 전문', '당일 피팅'],
    rating: '4.8'
  }
];

// ── DOM Elements ──
const elements = {
  ringBaseGroup: document.getElementById('ring-base-group'),
  ringGemsGroup: document.getElementById('ring-gems-group'),
  ringBaseImage: document.getElementById('ring-base-image'),
  ringGemsImage: document.getElementById('ring-gems-image'),
  gemOverlaySvg: document.getElementById('gem-overlay-svg'),
  gemSolitaire: document.getElementById('gem-solitaire'),
  gemHalo: document.getElementById('gem-halo'),
  gemThreeStone: document.getElementById('gem-three-stone'),
  gem3sCenter: document.getElementById('gem-3s-center'),
  gem3sLeft: document.getElementById('gem-3s-left'),
  gem3sRight: document.getElementById('gem-3s-right'),
  gemBand: document.getElementById('gem-band'),
  
  // Mask Elements for Gems preservation
  maskSolitaire: document.getElementById('mask-solitaire'),
  maskHalo: document.getElementById('mask-halo'),
  maskThreeStone: document.getElementById('mask-three-stone'),
  mask3sCenter: document.getElementById('mask-3s-center'),
  mask3sLeft: document.getElementById('mask-3s-left'),
  mask3sRight: document.getElementById('mask-3s-right'),
  maskBand: document.getElementById('mask-band'),
  
  // Metal Mask Elements to prevent bleeding
  metalMaskSolitaire: document.getElementById('metal-mask-solitaire'),
  metalMaskHalo: document.getElementById('metal-mask-halo'),
  metalMaskThreeStone: document.getElementById('metal-mask-three-stone'),
  metalMask3sCenter: document.getElementById('metal-mask-3s-center'),
  metalMask3sLeft: document.getElementById('metal-mask-3s-left'),
  metalMask3sRight: document.getElementById('metal-mask-3s-right'),
  metalMaskBand: document.getElementById('metal-mask-band'),
  
  liveConfigSummary: document.getElementById('live-config-summary'),
  
  // Views
  btnView3d: document.getElementById('btn-view-3d'),
  btnViewOrtho: document.getElementById('btn-view-ortho'),
  btnResetDesign: document.getElementById('btn-reset-design'),
  
  // Tabs
  stepTabs: document.querySelectorAll('.step-tab'),
  stepSections: document.querySelectorAll('.step-section'),
  btnNavPrev: document.getElementById('btn-nav-prev'),
  btnNavNext: document.getElementById('btn-nav-next'),
  
  // Dimensional Slider controls
  lblCarat: document.getElementById('lbl-carat'),
  rangeCarat: document.getElementById('range-carat'),
  lblRingSize: document.getElementById('lbl-ring-size'),
  rangeRingSize: document.getElementById('range-ring-size'),
  
  // Spec Sheet fields
  specModelTitle: document.getElementById('spec-model-title'),
  specMetalType: document.getElementById('spec-metal-type'),
  specCalculatedWeight: document.getElementById('spec-calculated-weight'),
  specGemType: document.getElementById('spec-gem-type'),
  specGemDiameter: document.getElementById('spec-gem-diameter'),
  specRingInner: document.getElementById('spec-ring-inner'),
  specRingCircum: document.getElementById('spec-ring-circum'),
  specSettingStyle: document.getElementById('spec-setting-style'),
  specRenderAngle: document.getElementById('spec-render-angle'),
  specDate: document.getElementById('spec-date'),
  specSerialId: document.getElementById('spec-serial-id'),
  
  // Action Buttons
  btnSaveImage: document.getElementById('btn-save-image'),
  btnPrintSpec: document.getElementById('btn-print-spec'),
  
  // Directories
  printingLabsList: document.getElementById('printing-labs-list'),
  craftsmenList: document.getElementById('craftsmen-list'),
  
  // Modal
  bookingModal: document.getElementById('booking-modal'),
  btnCloseModal: document.getElementById('btn-close-modal'),
  modalHeading: document.getElementById('modal-heading'),
  modalSubheading: document.getElementById('modal-subheading'),
  formSerial: document.getElementById('form-serial'),
  formSpecialtyContainer: document.getElementById('form-specialty-container'),
  btnSubmitBooking: document.getElementById('btn-submit-booking'),
  bookingForm: document.getElementById('booking-form')
};

// ── Setup & Initialization ──
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderPartners();
  updateUI();
  updateDate();
});

// ── Event Listeners Binding ──
function setupEventListeners() {
  // Step Navigation Tabbing
  elements.stepTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const step = parseInt(tab.dataset.step);
      goToStep(step);
    });
  });

  // Prev / Next Buttons
  elements.btnNavPrev.addEventListener('click', () => {
    if (state.step > 1) goToStep(state.step - 1);
  });
  elements.btnNavNext.addEventListener('click', () => {
    if (state.step < 5) goToStep(state.step + 1);
  });

  // Metal Option Selection
  document.querySelectorAll('[data-metal]').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('[data-metal]').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.metal = card.dataset.metal;
      state.metalLabel = card.dataset.metalLabel;
      state.metalCode = card.dataset.metalCode;
      updateUI();
    });
  });

  // Setting Style Selection
  document.querySelectorAll('[data-style]').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('[data-style]').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.style = card.dataset.style;
      state.styleLabel = card.dataset.styleLabel;
      updateUI();
    });
  });

  // Gemstone Selection
  document.querySelectorAll('[data-gem]').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('[data-gem]').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.gem = card.dataset.gem;
      state.gemLabel = card.dataset.gemLabel;
      state.gemColor = card.dataset.gemColor;
      updateUI();
    });
  });

  // Dimension Sliders
  elements.rangeCarat.addEventListener('input', (e) => {
    state.carat = parseFloat(e.target.value);
    elements.lblCarat.textContent = state.carat.toFixed(2) + ' ct';
    updateUI();
  });

  elements.rangeRingSize.addEventListener('input', (e) => {
    state.ringSize = parseInt(e.target.value);
    elements.lblRingSize.textContent = state.ringSize + ' 호';
    updateUI();
  });

  // View Toggle Controls
  elements.btnView3d.addEventListener('click', () => {
    elements.btnView3d.classList.add('active');
    elements.btnViewOrtho.classList.remove('active');
    state.view = 'perspective';
    updateViewAngle();
    updateUI();
  });

  elements.btnViewOrtho.addEventListener('click', () => {
    elements.btnViewOrtho.classList.add('active');
    elements.btnView3d.classList.remove('active');
    state.view = 'ortho';
    updateViewAngle();
    updateUI();
  });

  // Action Buttons
  elements.btnResetDesign.addEventListener('click', resetDesign);
  elements.btnPrintSpec.addEventListener('click', () => window.print());
  elements.btnSaveImage.addEventListener('click', saveRenderImage);

  // Modal Dismiss
  elements.btnCloseModal.addEventListener('click', closeModal);
  elements.bookingModal.addEventListener('click', (e) => {
    if (e.target === elements.bookingModal) closeModal();
  });

  // Form Submit Handler
  elements.bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`[AURA] 예약 신청이 성공적으로 접수되었습니다!\n\n디자인 일련번호: ${state.serial}\n이름: ${document.getElementById('form-name').value}\n일정: ${document.getElementById('form-date').value}\n\n신청하신 정보는 출력소/세공사에 전달되었으며, 24시간 내에 연락드리겠습니다.`);
    closeModal();
  });
}

// ── Navigation Wizard controller ──
function goToStep(step) {
  state.step = step;
  
  // Update Tabs
  elements.stepTabs.forEach(tab => {
    const s = parseInt(tab.dataset.step);
    tab.classList.toggle('active', s === step);
    tab.setAttribute('aria-selected', s === step ? 'true' : 'false');
  });

  // Update Sections
  elements.stepSections.forEach(sec => {
    const id = parseInt(sec.id.split('-')[1]);
    sec.classList.toggle('active', id === step);
  });

  // Update Bottom Nav Buttons
  elements.btnNavPrev.disabled = (step === 1);
  if (step === 5) {
    elements.btnNavNext.innerHTML = 'Finish Config 🎉';
    elements.btnNavNext.style.backgroundColor = 'var(--accent)';
    elements.btnNavNext.style.color = '#000';
  } else {
    elements.btnNavNext.innerHTML = 'Next Step <span>→</span>';
    elements.btnNavNext.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
    elements.btnNavNext.style.color = 'var(--text)';
  }
}

// ── Rendering View Angle Simulator ──
function updateViewAngle() {
  const wrapper = document.getElementById('ring-preview-wrapper');
  if (state.view === 'ortho') {
    wrapper.style.transform = 'scale(1.05)';
    elements.specRenderAngle.textContent = 'Orthographic View (90° Front)';
  } else {
    wrapper.style.transform = 'none';
    elements.specRenderAngle.textContent = 'Perspective View (45° Diagonal)';
  }
}

// ── Gemstone and Mask Coordinates Sync Helper ──
function setGemCoords(view) {
  const isOrtho = (view === 'ortho');
  
  // Solitaire coordinates (Scanned values: perspective=249.0, 180.5, ortho=247.2, 146.1)
  const solCX = isOrtho ? 247.2 : 249;
  const solCY = isOrtho ? 146.1 : 180.5;
  elements.gemSolitaire.setAttribute('cx', solCX);
  elements.gemSolitaire.setAttribute('cy', solCY);
  elements.maskSolitaire.setAttribute('cx', solCX);
  elements.maskSolitaire.setAttribute('cy', solCY);
  elements.metalMaskSolitaire.setAttribute('cx', solCX);
  elements.metalMaskSolitaire.setAttribute('cy', solCY);
  
  // Halo coordinates (Scanned values: perspective=233.0, 215.1, ortho=248.8, 185.3)
  const haloCX = isOrtho ? 248.8 : 233.0;
  const haloCY = isOrtho ? 185.3 : 215.1;
  elements.gemHalo.setAttribute('cx', haloCX);
  elements.gemHalo.setAttribute('cy', haloCY);
  elements.maskHalo.setAttribute('cx', haloCX);
  elements.maskHalo.setAttribute('cy', haloCY);
  elements.metalMaskHalo.setAttribute('cx', haloCX);
  elements.metalMaskHalo.setAttribute('cy', haloCY);
  
  // Three-Stone coordinates (Scanned values: perspective center=271.8,217.6 left=184.3,177.9 right=346.8,235.3; ortho center=260.5,121.9 left=164.2,154.3 right=347.4,163.3)
  const tsCenterCX = isOrtho ? 260.5 : 271.8;
  const tsCenterCY = isOrtho ? 121.9 : 217.6;
  const tsLeftCX = isOrtho ? 164.2 : 184.3;
  const tsLeftCY = isOrtho ? 154.3 : 177.9;
  const tsRightCX = isOrtho ? 347.4 : 346.8;
  const tsRightCY = isOrtho ? 163.3 : 235.3;

  elements.gem3sCenter.setAttribute('cx', tsCenterCX);
  elements.gem3sCenter.setAttribute('cy', tsCenterCY);
  elements.mask3sCenter.setAttribute('cx', tsCenterCX);
  elements.mask3sCenter.setAttribute('cy', tsCenterCY);
  elements.metalMask3sCenter.setAttribute('cx', tsCenterCX);
  elements.metalMask3sCenter.setAttribute('cy', tsCenterCY);
  
  elements.gem3sLeft.setAttribute('cx', tsLeftCX);
  elements.gem3sLeft.setAttribute('cy', tsLeftCY);
  elements.mask3sLeft.setAttribute('cx', tsLeftCX);
  elements.mask3sLeft.setAttribute('cy', tsLeftCY);
  elements.metalMask3sLeft.setAttribute('cx', tsLeftCX);
  elements.metalMask3sLeft.setAttribute('cy', tsLeftCY);
  
  elements.gem3sRight.setAttribute('cx', tsRightCX);
  elements.gem3sRight.setAttribute('cy', tsRightCY);
  elements.mask3sRight.setAttribute('cx', tsRightCX);
  elements.mask3sRight.setAttribute('cy', tsRightCY);
  elements.metalMask3sRight.setAttribute('cx', tsRightCX);
  elements.metalMask3sRight.setAttribute('cy', tsRightCY);
  
  // Eternity Band path arch
  const bandD = isOrtho ? "M 62,249.5 A 188,188 0 0,1 438,249.5" : "M 91,248.5 A 161,175 0 0,1 412,248.5";
  elements.maskBand.setAttribute('d', bandD);
  elements.metalMaskBand.setAttribute('d', bandD);
  if (elements.gemBand) {
    elements.gemBand.setAttribute('d', bandD);
  }
}

// ── Configurator State & Spec Updater ──
function updateUI() {
  // 1. Swap Base Image based on Style and View Angle
  let baseSrc = 'solitaire_ring.png';
  if (state.view === 'ortho') {
    baseSrc = 'solitaire_ring_front.png';
    if (state.style === 'halo') baseSrc = 'halo_ring_front.png';
    else if (state.style === 'three-stone') baseSrc = 'three_stone_ring_front.png';
    else if (state.style === 'band') baseSrc = 'band_ring_front.png';
  } else {
    baseSrc = 'solitaire_ring.png';
    if (state.style === 'halo') baseSrc = 'halo_ring.png';
    else if (state.style === 'three-stone') baseSrc = 'three_stone_ring.png';
    else if (state.style === 'band') baseSrc = 'band_ring.png';
  }
  
  if (elements.ringBaseImage.getAttribute('href') !== baseSrc) {
    elements.ringBaseImage.setAttribute('href', baseSrc);
    elements.ringGemsImage.setAttribute('href', baseSrc);
  }

  // 2. Color tinting the metal based on style's default base image vs chosen metal
  let metalFilter = 'none';
  if (state.style === 'solitaire' || state.style === 'band') { // Platinum base
    if (state.metal === 'yellowgold') {
      metalFilter = 'sepia(0.85) hue-rotate(3deg) saturate(2.4) brightness(0.95) contrast(1.1)';
    } else if (state.metal === 'rosegold') {
      metalFilter = 'sepia(0.7) hue-rotate(330deg) saturate(1.8) brightness(0.9) contrast(1.1)';
    }
  } else if (state.style === 'halo') { // Yellow Gold base
    if (state.metal === 'platinum') {
      metalFilter = 'grayscale(1) brightness(1.22) contrast(1.05)';
    } else if (state.metal === 'rosegold') {
      metalFilter = 'hue-rotate(320deg) saturate(1.2) brightness(0.95)';
    }
  } else if (state.style === 'three-stone') { // Rose Gold base
    if (state.metal === 'platinum') {
      metalFilter = 'grayscale(1) brightness(1.22) contrast(1.05)';
    } else if (state.metal === 'yellowgold') {
      metalFilter = 'hue-rotate(40deg) saturate(1.6) brightness(1.05)';
    }
  }
  
  if (elements.ringBaseGroup) {
    elements.ringBaseGroup.style.filter = metalFilter;
  }

  // Dynamic gemstone grayscale preprocessing filter to normalize colored stones (Ruby, Amethyst) to white
  let gemFilter = 'none';
  if (state.style === 'halo') {
    gemFilter = 'grayscale(1) brightness(1.35) contrast(1.2)';
  } else if (state.style === 'three-stone') {
    gemFilter = 'grayscale(1) brightness(1.25) contrast(1.15)';
  } else {
    gemFilter = 'grayscale(1)';
  }
  if (elements.ringGemsImage) {
    elements.ringGemsImage.style.filter = gemFilter;
  }

  // Sync Coordinates for chosen View
  setGemCoords(state.view);

  // 3. Dynamic Gemstone SVG Positioning and Sizing & Masking
  elements.gemOverlaySvg.style.display = 'block';
  
  // Hide all overlays initially (by transparent fill/stroke)
  elements.gemSolitaire.setAttribute('fill', 'transparent');
  elements.gemHalo.setAttribute('fill', 'transparent');
  if (elements.gemThreeStone) elements.gemThreeStone.style.display = 'none';
  if (elements.gemBand) elements.gemBand.style.display = 'none';
  
  // Hide all masks by opacity="0" (ensures Chrome triggers redraw immediately)
  elements.maskSolitaire.setAttribute('opacity', '0');
  elements.maskHalo.setAttribute('opacity', '0');
  elements.maskThreeStone.setAttribute('opacity', '0');
  elements.maskBand.setAttribute('opacity', '0');
  elements.metalMaskSolitaire.setAttribute('opacity', '0');
  elements.metalMaskHalo.setAttribute('opacity', '0');
  elements.metalMaskThreeStone.setAttribute('opacity', '0');
  elements.metalMaskBand.setAttribute('opacity', '0');

  // Apply colors, diameters and masks matching current carat and style
  const isDiamond = (state.gem === 'diamond');
  const gemFill = isDiamond ? 'transparent' : state.gemColor;
  
  // Set opacity based on whether it is a diamond to fix the Chrome mix-blend-mode: multiply transparent-black bug
  const overlayOpacity = isDiamond ? '0' : '0.85';
  
  elements.gemSolitaire.style.opacity = overlayOpacity;
  elements.gemHalo.style.opacity = overlayOpacity;
  if (elements.gemThreeStone) {
    elements.gem3sCenter.style.opacity = overlayOpacity;
    elements.gem3sLeft.style.opacity = overlayOpacity;
    elements.gem3sRight.style.opacity = overlayOpacity;
  }
  if (elements.gemBand) {
    elements.gemBand.style.opacity = overlayOpacity;
  }

  if (state.style === 'solitaire') {
    const radius = 16 + (state.carat * 14);
    elements.gemSolitaire.setAttribute('r', radius);
    elements.gemSolitaire.setAttribute('fill', gemFill);
    
    // Update and show mask
    elements.maskSolitaire.setAttribute('r', radius);
    elements.maskSolitaire.setAttribute('opacity', '1');
    elements.metalMaskSolitaire.setAttribute('r', radius);
    elements.metalMaskSolitaire.setAttribute('opacity', '1');
  } else if (state.style === 'halo') {
    const radius = 22 + (state.carat * 12);
    elements.gemHalo.setAttribute('r', radius);
    elements.gemHalo.setAttribute('fill', gemFill);
    
    // Update and show mask
    elements.maskHalo.setAttribute('r', radius);
    elements.maskHalo.setAttribute('opacity', '1');
    elements.metalMaskHalo.setAttribute('r', radius);
    elements.metalMaskHalo.setAttribute('opacity', '1');
  } else if (state.style === 'three-stone') {
    elements.gemThreeStone.style.display = 'block';
    const radiusCenter = 14 + (state.carat * 10);
    const radiusSide = 10 + (state.carat * 6);
    
    elements.gem3sCenter.setAttribute('r', radiusCenter);
    elements.gem3sLeft.setAttribute('r', radiusSide);
    elements.gem3sRight.setAttribute('r', radiusSide);
    
    elements.gem3sCenter.setAttribute('fill', gemFill);
    elements.gem3sLeft.setAttribute('fill', gemFill);
    elements.gem3sRight.setAttribute('fill', gemFill);
    
    // Update and show mask
    elements.maskThreeStone.setAttribute('opacity', '1');
    elements.mask3sCenter.setAttribute('r', radiusCenter);
    elements.mask3sLeft.setAttribute('r', radiusSide);
    elements.mask3sRight.setAttribute('r', radiusSide);
    elements.metalMaskThreeStone.setAttribute('opacity', '1');
    elements.metalMask3sCenter.setAttribute('r', radiusCenter);
    elements.metalMask3sLeft.setAttribute('r', radiusSide);
    elements.metalMask3sRight.setAttribute('r', radiusSide);
  } else if (state.style === 'band') {
    if (elements.gemBand) {
      elements.gemBand.style.display = 'block';
      const strokeColor = isDiamond ? 'transparent' : state.gemColor;
      elements.gemBand.setAttribute('stroke', strokeColor);
    }
    
    // Show band mask
    elements.maskBand.setAttribute('opacity', '1');
    elements.metalMaskBand.setAttribute('opacity', '1');
  }

  // 4. Update Live configuration labels
  elements.liveConfigSummary.textContent = `${state.metalLabel} • ${state.carat.toFixed(2)}ct ${state.gemLabel}`;

  // 5. Calculate dimensions dynamically (Gemologist formulas)
  // Inner circumference: Size 1 = 44mm, Size 12 = 55mm, Size 30 = 73mm
  const circumference = 43 + state.ringSize;
  const innerDiameter = circumference / Math.PI;
  
  // Stone diameter: Carat weight standard formula
  const stoneDiameter = Math.pow(state.carat, 1/3) * 6.5;

  // Weight Calculation depending on density of metals
  // Pt950 has highest density, 18K is lighter
  const baseWeight = BASE_WEIGHTS[state.style];
  const metalWeightMultiplier = DENSITIES[state.metal];
  const scaleWeight = (baseWeight + (state.ringSize * 0.12) + (state.carat * 0.08)) * metalWeightMultiplier;

  // Serial Number Generator
  const sName = state.style === 'three-stone' ? '3S' : state.style.substring(0, 3).toUpperCase();
  const mName = state.metalCode.replace(' ', '');
  const gName = state.gemLabel.substring(0, 3).toUpperCase();
  const serial = `AU-${mName}-${sName}-${state.ringSize}-${gName}${Math.round(state.carat*100)}`;
  state.serial = serial;

  // Update CAD Spec Card Text Fields
  elements.specModelTitle.textContent = `${state.styleLabel} Custom Ring Design`;
  elements.specMetalType.textContent = `${state.metalLabel} (${state.metalCode})`;
  elements.specCalculatedWeight.textContent = `${scaleWeight.toFixed(2)} g`;
  elements.specGemType.textContent = `${state.carat.toFixed(2)} ct ${state.gemLabel} (Round Cut)`;
  elements.specGemDiameter.textContent = `${stoneDiameter.toFixed(2)} mm`;
  elements.specRingInner.textContent = `${innerDiameter.toFixed(1)} mm`;
  elements.specRingCircum.textContent = `${circumference.toFixed(1)} mm`;
  elements.specSettingStyle.textContent = `${state.styleLabel} Prong Setting`;
  elements.specSerialId.textContent = serial;
}

// ── Reset Handler ──
function resetDesign() {
  state.metal = 'platinum';
  state.metalLabel = 'Platinum 950';
  state.metalCode = 'Pt950';
  state.style = 'solitaire';
  state.styleLabel = 'Solitaire';
  state.gem = 'diamond';
  state.gemLabel = 'Diamond';
  state.gemColor = '#ffffff';
  state.carat = 1.0;
  state.ringSize = 12;
  state.view = 'perspective';
  
  // Sync sliders
  elements.rangeCarat.value = 1.0;
  elements.lblCarat.textContent = '1.00 ct';
  elements.rangeRingSize.value = 12;
  elements.lblRingSize.textContent = '12 호';
  
  // Sync View options active state
  elements.btnView3d.classList.add('active');
  elements.btnViewOrtho.classList.remove('active');
  
  // Reset grids UI
  document.querySelectorAll('[data-metal]').forEach(c => c.classList.toggle('active', c.dataset.metal === 'platinum'));
  document.querySelectorAll('[data-style]').forEach(c => c.classList.toggle('active', c.dataset.style === 'solitaire'));
  document.querySelectorAll('[data-gem]').forEach(c => c.classList.toggle('active', c.dataset.gem === 'diamond'));

  goToStep(1);
  updateViewAngle();
  updateUI();
}

// ── Partners Rendering ──
function renderPartners() {
  // Render labs
  elements.printingLabsList.innerHTML = PRINTING_LABS.map(lab => `
    <div class="partner-card">
      <div class="partner-info">
        <span class="partner-name">${lab.name}</span>
        <span class="partner-location">📍 ${lab.location}</span>
        <div class="partner-badge-group">
          ${lab.badges.map(b => `<span class="partner-badge">${b}</span>`).join('')}
        </div>
      </div>
      <button class="partner-action" onclick="openBookingModal('lab', '${lab.name}')">예약 신청</button>
    </div>
  `).join('');

  // Render craftsmen
  elements.craftsmenList.innerHTML = CRAFTSMEN.map(cf => `
    <div class="partner-card">
      <div class="partner-info">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <span class="partner-name">${cf.name}</span>
          <span style="color:#FFB800; font-size:0.8rem;">★ ${cf.rating}</span>
        </div>
        <span class="partner-location" style="color:var(--accent);">${cf.specialty}</span>
        <span class="partner-location">📍 ${cf.location}</span>
        <div class="partner-badge-group">
          ${cf.badges.map(b => `<span class="partner-badge">${b}</span>`).join('')}
        </div>
      </div>
      <button class="partner-action" onclick="openBookingModal('craftsman', '${cf.name}')">상담 연계</button>
    </div>
  `).join('');
}

// ── Modals & Booking controller ──
window.openBookingModal = function(type, partnerName) {
  elements.formSerial.value = state.serial;
  
  if (type === 'lab') {
    elements.modalHeading.textContent = '3D Print Lab Booking';
    elements.modalSubheading = `[${partnerName}] 프로토타입 주조용 고해상도 수지 출력을 신청합니다.`;
    elements.formSpecialtyContainer.style.display = 'none';
  } else {
    elements.modalHeading.textContent = 'Master Jeweler Consultation';
    elements.modalSubheading = `[${partnerName}] 1:1 커스텀 세공 및 피팅 상담을 신청합니다.`;
    elements.formSpecialtyContainer.style.display = 'block';
  }
  
  elements.bookingModal.classList.add('active');
};

function closeModal() {
  elements.bookingModal.classList.remove('active');
  elements.bookingForm.reset();
}

// ── Spec sheet timestamp ──
function updateDate() {
  const d = new Date();
  elements.specDate.textContent = `Date: ${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;
}

// ── Save/Download image ──
function saveRenderImage() {
  const link = document.createElement('a');
  link.href = elements.ringBaseImage.src;
  link.download = `${state.serial}_CAD_Render.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
