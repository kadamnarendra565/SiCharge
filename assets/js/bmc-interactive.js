/**
 * SiCharge - Interactive Business Model Canvas (BMC)
 * Supports dynamic sector filtering, interactive building block inspection, and detailed modal views.
 */

const BMCData = {
  keyPartners: {
    title: "Key Partnerships",
    icon: "users",
    color: "border-blue-500",
    bgAccent: "bg-blue-500/10",
    textAccent: "text-blue-400",
    question: "Who are your key partners?",
    bullets: [
      "SiC substrate & wafer suppliers (Cree/Wolfspeed, Rohm, Coherent)",
      "Foundry / fab capacity partners (outsourced chip fabrication)",
      "OEM design-in partners (Aerospace, Rail, EV, Medical)",
      "Universities & materials research labs (IISc, IITs, National Labs)",
      "Standards & certification bodies (AEC-Q101, UL, ISO 26262)"
    ],
    badges: [
      { text: "Tier-1 aerospace primes", color: "bg-blue-600/30 text-blue-300 border-blue-500/40" },
      { text: "National labs (materials R&D)", color: "bg-yellow-600/30 text-yellow-300 border-yellow-500/40" }
    ],
    deepDive: "SiCharge utilizes a fabless / module-packaging integration business model. Because a single 200mm SiC wafer fab costs over $1B+ to construct, SiCharge partners with established foundries for wafer fabrication, allowing high capital efficiency and agile design iterations for custom OEM battery modules."
  },
  keyActivities: {
    title: "Key Activities",
    icon: "activity",
    color: "border-indigo-500",
    bgAccent: "bg-indigo-500/10",
    textAccent: "text-indigo-400",
    question: "What activities are essential?",
    bullets: [
      "R&D for new-industry SiC module topologies and high-temp gate drivers",
      "Wafer fab qualification & thermal stress simulations",
      "Industry-specific certifications (Aero DO-160, Medical, Automotive AEC-Q101)",
      "Co-development & rapid prototyping with OEM engineering teams",
      "Continuous reliability & accelerated life stress testing (HASS / HALT)"
    ],
    badges: [
      { text: "Rapid Co-Engineering", color: "bg-indigo-600/30 text-indigo-300 border-indigo-500/40" },
      { text: "Accelerated Stress Testing", color: "bg-purple-600/30 text-purple-300 border-purple-500/40" }
    ],
    deepDive: "Core focus lies in high-voltage module packaging, thermal management architecture (direct liquid cooling baseplates), and gate-driver tuning to prevent EMI while operating at ultra-high switching frequencies (up to 100kHz+)."
  },
  valueProp: {
    title: "Value Proposition",
    icon: "zap",
    color: "border-cyan-500",
    bgAccent: "bg-cyan-500/10",
    textAccent: "text-cyan-400",
    question: "What value do you deliver?",
    bullets: [
      "Higher electrical efficiency (>98.5%) and 50% smaller/lighter power modules",
      "Handles 3x higher breakdown voltage (800V - 1200V+) & higher junction temperatures (175°C - 200°C)",
      "Up to 70% lower switching & conduction losses across system lifecycle",
      "Ultra-fast charging capability with significantly reduced thermal cooling overhead"
    ],
    badges: [
      { text: "Aerospace: weight & heat savings", color: "bg-cyan-600/30 text-cyan-300 border-cyan-500/40" },
      { text: "Data centers: power density (PUE < 1.1)", color: "bg-emerald-600/30 text-emerald-300 border-emerald-500/40" }
    ],
    deepDive: "Silicon Carbide possesses a 3.26 eV bandgap (vs 1.12 eV for standard Silicon) and 3x higher thermal conductivity. This enables power conversion systems to shrink in size by 40-60%, saving hundreds of kilograms in aviation and rail, while cutting megawatt-scale heat loads in AI data centers."
  },
  customerRel: {
    title: "Customer Relationships",
    icon: "heart-handshake",
    color: "border-sky-500",
    bgAccent: "bg-sky-500/10",
    textAccent: "text-sky-400",
    question: "How do you interact with customers?",
    bullets: [
      "Dedicated technical account managers & Field Application Engineers (FAEs)",
      "Deep co-engineering / design-in support for battery pack integration",
      "Multi-year long-term supply agreements (LTSAs) with guaranteed pricing tiers",
      "Customer training, reference designs, and certification testing assistance"
    ],
    badges: [
      { text: "Embedded FAE Support", color: "bg-sky-600/30 text-sky-300 border-sky-500/40" },
      { text: "5-Year Supply Contracts", color: "bg-blue-600/30 text-blue-300 border-blue-500/40" }
    ],
    deepDive: "Because replacing Silicon with SiC requires changes in gate-drive circuits and thermal cooling, high-touch engineering support builds high switching costs and sticky, multi-year customer relationships."
  },
  customerSeg: {
    title: "Customer Segments",
    icon: "pie-chart",
    color: "border-teal-500",
    bgAccent: "bg-teal-500/10",
    textAccent: "text-teal-400",
    question: "Who are your customers?",
    bullets: [
      "EV & Heavy commercial vehicle OEMs (800V fast-charge architectures)",
      "Industrial motor drive & precision automation manufacturers",
      "Aerospace & defense electronics OEMs (UAVs, electric aircraft)",
      "Renewable energy (Solar & Wind utility inverters) makers",
      "Rail & heavy mining equipment traction systems",
      "Hyperscale data center power supply (PSU) vendors",
      "Medical imaging & MRI high-voltage pulse generators"
    ],
    badges: [
      { text: "Medical imaging OEMs", color: "bg-teal-600/30 text-teal-300 border-teal-500/40" },
      { text: "Grid & energy storage firms", color: "bg-amber-600/30 text-amber-300 border-amber-500/40" }
    ],
    deepDive: "Primary entry market is EV and high-power industrial drives where energy loss is an immediate operational penalty. Secondary expansion penetrates aviation, defence, and hyperscale AI data centers."
  },
  channels: {
    title: "Channels",
    icon: "truck",
    color: "border-purple-500",
    bgAccent: "bg-purple-500/10",
    textAccent: "text-purple-400",
    question: "How do you reach customers?",
    bullets: [
      "Direct enterprise B2B sales team targeting OEM VP/Director of Engineering",
      "Global distributor & authorized semiconductor reseller network (Arrow, Avnet)",
      "Technical keynotes at IEEE PCIM, APEC, and Battery Show expos",
      "Application notes, open hardware reference designs, and whitepapers"
    ],
    badges: [
      { text: "Design-win pilot programs", color: "bg-purple-600/30 text-purple-300 border-purple-500/40" },
      { text: "Trade shows (Aerospace, EV, Energy)", color: "bg-yellow-600/30 text-yellow-300 border-yellow-500/40" }
    ],
    deepDive: "The B2B semiconductor sales cycle relies on securing 'Design Wins'. Providing sample evaluation boards and pilot test modules converts OEM prototype projects into production line purchase orders."
  },
  keyResources: {
    title: "Key Resources",
    icon: "cpu",
    color: "border-amber-500",
    bgAccent: "bg-amber-500/10",
    textAccent: "text-amber-400",
    question: "What resources do you need?",
    bullets: [
      "Secured 200mm SiC wafer capacity allocation with partner foundries",
      "Elite talent in Wide-Bandgap (WBG) power electronics and thermal physics",
      "Proprietary patents & process IP on module interconnects and low-inductance packaging",
      "State-of-the-art testing lab (high-voltage dynamometers, environmental chambers)"
    ],
    badges: [
      { text: "200mm SiC fab line partners", color: "bg-blue-600/30 text-blue-300 border-blue-500/40" },
      { text: "Design-in engineering team", color: "bg-amber-600/30 text-amber-300 border-amber-500/40" }
    ],
    deepDive: "Securing guaranteed allocation of 200mm (8-inch) SiC wafers protects against global supply shortages, while custom IP ensures competitors cannot clone module packaging performance."
  },
  costStructure: {
    title: "Cost Structure",
    icon: "dollar-sign",
    color: "border-rose-500",
    bgAccent: "bg-rose-500/10",
    textAccent: "text-rose-400",
    question: "What are your main costs?",
    bullets: [
      "Fixed R&D, prototype tooling, and pack integration engineering (₹4,50,000 startup base)",
      "Raw material & SiC substrate/die purchase costs (₹8,000 / module)",
      "Automated assembly, precision wire-bonding, and QC testing (₹1,500 / module)",
      "Qualification, destructive reliability cycles & compliance testing",
      "Sales engineering, field application team, and logistics overhead (₹500 / module)"
    ],
    badges: [
      { text: "Low capex fabless model", color: "bg-blue-600/30 text-blue-300 border-blue-500/40" },
      { text: "Certification cycles (Aerospace/Medical)", color: "bg-yellow-600/30 text-yellow-300 border-yellow-500/40" },
      { text: "Field application engineers", color: "bg-emerald-600/30 text-emerald-300 border-emerald-500/40" }
    ],
    deepDive: "Operating a fabless assembly model avoids ₹10,000+ Crore in silicon foundry capex, limiting fixed startup cost to just ₹4.5 Lakhs with ₹10k per unit variable cost."
  },
  revenueStreams: {
    title: "Revenue Streams",
    icon: "trending-up",
    color: "border-emerald-500",
    bgAccent: "bg-emerald-500/10",
    textAccent: "text-emerald-400",
    question: "How do you make money?",
    bullets: [
      "Direct per-unit module sales (₹15,000 / unit @ 33.3% gross margin)",
      "Tiered recurring volume contracts (5–7 year production commitments)",
      "Custom NRE (Non-Recurring Engineering) and OEM integration fees",
      "Licensing of patented power module packaging designs & thermal IP",
      "Extended warranty, telemetry monitoring, and maintenance SLA plans"
    ],
    badges: [
      { text: "Volume contracts (5-7 yr)", color: "bg-blue-600/30 text-blue-300 border-blue-500/40" },
      { text: "IP licensing to fabs", color: "bg-yellow-600/30 text-yellow-300 border-yellow-500/40" },
      { text: "Support & warranty plans", color: "bg-emerald-600/30 text-emerald-300 border-emerald-500/40" }
    ],
    deepDive: "Unit sales generate predictable cash flows (₹7.5L monthly profit at 150 units run-rate), while long-term 5-7 year aerospace and EV contracts create high customer lifetime value (LTV)."
  }
};

const BMCApp = {
  currentFilter: 'all',

  init() {
    this.renderBMC();
    this.setupFilterButtons();
  },

  renderBMC() {
    const container = document.getElementById('bmc-grid-container');
    if (!container) return;

    // Layout configuration for classic 9-box BMC Grid
    const blockKeys = [
      { key: 'keyPartners', colSpan: 'lg:col-span-2 row-span-2' },
      { key: 'keyActivities', colSpan: 'lg:col-span-2' },
      { key: 'valueProp', colSpan: 'lg:col-span-2 row-span-2' },
      { key: 'customerRel', colSpan: 'lg:col-span-2' },
      { key: 'customerSeg', colSpan: 'lg:col-span-2 row-span-2' },
      { key: 'keyResources', colSpan: 'lg:col-span-2' },
      { key: 'channels', colSpan: 'lg:col-span-2' },
      { key: 'costStructure', colSpan: 'lg:col-span-5' },
      { key: 'revenueStreams', colSpan: 'lg:col-span-5' }
    ];

    let html = '';

    blockKeys.forEach(item => {
      const data = BMCData[item.key];
      if (!data) return;

      html += `
        <div class="glass-card bmc-card ${item.colSpan} ${data.color} p-5 rounded-2xl flex flex-col justify-between cursor-pointer hover:border-cyan-400 group" onclick="BMCApp.openModal('${item.key}')">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <div class="p-2 rounded-lg ${data.bgAccent} ${data.textAccent}">
                  <i data-lucide="${data.icon}" class="w-5 h-5"></i>
                </div>
                <h3 class="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">${data.title}</h3>
              </div>
              <span class="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Deep Dive <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </span>
            </div>
            <p class="text-xs font-semibold text-slate-400 mb-3 italic">${data.question}</p>
            <ul class="space-y-2 text-xs text-slate-300">
              ${data.bullets.slice(0, 4).map(b => `
                <li class="flex items-start gap-1.5">
                  <span class="text-cyan-400 text-sm leading-none">•</span>
                  <span>${b}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          
          <div class="mt-4 pt-3 border-t border-slate-700/50 flex flex-wrap gap-1.5">
            ${data.badges.map(badge => `
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-full border ${badge.color}">
                ${badge.text}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  setupFilterButtons() {
    document.querySelectorAll('[data-bmc-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = btn.dataset.bmcFilter;
        document.querySelectorAll('[data-bmc-filter]').forEach(b => {
          b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold');
          b.classList.add('bg-slate-800', 'text-slate-300');
        });
        btn.classList.remove('bg-slate-800', 'text-slate-300');
        btn.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold');
        this.filterCanvas(filter);
      });
    });
  },

  filterCanvas(filter) {
    this.currentFilter = filter;
    const cards = document.querySelectorAll('.bmc-card');
    cards.forEach(card => {
      if (filter === 'all') {
        card.style.opacity = '1';
        card.style.filter = 'none';
      } else {
        const text = card.innerText.toLowerCase();
        if (text.includes(filter.toLowerCase())) {
          card.style.opacity = '1';
          card.style.filter = 'none';
          card.classList.add('border-cyan-400');
        } else {
          card.style.opacity = '0.35';
          card.style.filter = 'grayscale(60%)';
          card.classList.remove('border-cyan-400');
        }
      }
    });
  },

  openModal(key) {
    const data = BMCData[key];
    if (!data) return;

    const modal = document.getElementById('bmc-modal');
    const modalContent = document.getElementById('bmc-modal-content');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="flex items-center justify-between pb-4 border-b border-slate-700">
        <div class="flex items-center gap-3">
          <div class="p-3 rounded-xl ${data.bgAccent} ${data.textAccent}">
            <i data-lucide="${data.icon}" class="w-6 h-6"></i>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">${data.title}</h2>
            <p class="text-sm text-cyan-400 font-medium">${data.question}</p>
          </div>
        </div>
        <button onclick="BMCApp.closeModal()" class="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="py-5 space-y-5">
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Core Strategic Initiatives</h4>
          <ul class="space-y-2.5">
            ${data.bullets.map(b => `
              <li class="flex items-start gap-2.5 text-sm text-slate-200 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
                <i data-lucide="check-circle-2" class="w-4 h-4 text-cyan-400 mt-0.5 shrink-0"></i>
                <span>${b}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Domain Badges</h4>
          <div class="flex flex-wrap gap-2">
            ${data.badges.map(b => `
              <span class="text-xs font-semibold px-3 py-1 rounded-full border ${b.color}">
                ${b.text}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-4">
          <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-1.5">
            <i data-lucide="lightbulb" class="w-4 h-4 text-cyan-400"></i> Entrepreneurship Strategy Deep-Dive
          </h4>
          <p class="text-xs text-slate-300 leading-relaxed">${data.deepDive}</p>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-700 flex justify-end">
        <button onclick="BMCApp.closeModal()" class="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20">
          Close Insights
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
  },

  closeModal() {
    const modal = document.getElementById('bmc-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }
};

window.BMCApp = BMCApp;
