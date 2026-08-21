/**
 * SiCharge Main Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize Sub-Apps
  if (window.FinancialSimulator) window.FinancialSimulator.init();
  if (window.BMCApp) window.BMCApp.init();
  if (window.IndustryApp) window.IndustryApp.init();
  if (window.FlowchartApp) window.FlowchartApp.init();

  // Setup Comparison Toggle
  setupTechComparator();

  // Setup Mobile Nav Menu
  setupMobileMenu();

  // Setup Print / PDF Export
  setupExportButtons();

  // Setup Contact Form
  setupContactForm();
});

function setupTechComparator() {
  const toggleBtn = document.getElementById('btn-toggle-comparator');
  if (!toggleBtn) return;

  let mode = 'sic'; // 'sic' or 'si'

  toggleBtn.addEventListener('click', () => {
    mode = mode === 'sic' ? 'si' : 'sic';
    updateComparatorView(mode);
  });
}

function updateComparatorView(mode) {
  const isSiC = mode === 'sic';
  const label = document.getElementById('comparator-status-label');
  if (label) {
    label.innerText = isSiC ? "Displaying: SiCharge Silicon Carbide (SiC) MOSFET" : "Displaying: Conventional Silicon (Si) IGBT";
    label.className = isSiC ? "text-cyan-400 font-bold text-sm" : "text-amber-400 font-bold text-sm";
  }

  // Update specs values
  const specs = {
    bandgap: isSiC ? "3.26 eV (Wide Bandgap)" : "1.12 eV (Standard)",
    field: isSiC ? "3.0 MV/cm (10x Dielectric Strength)" : "0.3 MV/cm (Baseline)",
    thermal: isSiC ? "4.9 W/cm·K (3.3x Better Heat Conduction)" : "1.5 W/cm·K (Requires Heavy Heatsinks)",
    temp: isSiC ? "200°C+ Junction Temp" : "150°C Max Safe Temp",
    losses: isSiC ? "70% Reduction in Switching Losses" : "High Conduction & Switching Losses",
    charging: isSiC ? "800V - 1200V Native (10-min fast charge)" : "400V Typical (45-60 min charging)"
  };

  for (const [key, val] of Object.entries(specs)) {
    const el = document.getElementById(`spec-${key}`);
    if (el) {
      el.innerText = val;
      el.classList.add('text-cyan-300');
      setTimeout(() => el.classList.remove('text-cyan-300'), 400);
    }
  }
}

function setupMobileMenu() {
  const toggle = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

function setupExportButtons() {
  const printBtn = document.getElementById('btn-print-report');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function setupContactForm() {
  const form = document.getElementById('contact-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value || 'Guest';
    const email = document.getElementById('form-email')?.value || '';
    
    showToast(`Thank you, ${name}! Your inquiry has been sent to Dhairya, Aditya, Narendra & Dimple.`);
    form.reset();
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = "fixed bottom-6 right-6 z-50 bg-cyan-500 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 transition-all transform duration-300 translate-y-2 opacity-0";
  toast.innerHTML = `<i data-lucide="check" class="w-5 h-5"></i> <span>${message}</span>`;
  document.body.appendChild(toast);
  
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 50);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

window.showToast = showToast;
