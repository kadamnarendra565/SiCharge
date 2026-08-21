/**
 * SiCharge - Industry Expansion Matrix & Semiconductor Physics Comparator
 */

const IndustryData = [
  {
    id: 'drones',
    category: 'ready',
    title: 'High-End UAVs & Drones',
    icon: 'plane',
    readiness: 'Ready to Implement',
    statusColor: 'emerald',
    painPoint: 'Excess battery pack & ESC weight limits payload capacity and restricts flight time under 30 mins.',
    sicAdvantage: 'High power density and 50% smaller heatsinks reduce motor drive weight drastically.',
    impactMetric: '+28% Flight Endurance',
    voltageRange: '48V - 100V'
  },
  {
    id: 'inverters',
    category: 'ready',
    title: 'Solar & Wind Inverters',
    icon: 'sun',
    readiness: 'Ready to Implement',
    statusColor: 'emerald',
    painPoint: 'Conventional silicon inverters suffer 3-5% conversion energy loss as waste heat under peak sun.',
    sicAdvantage: '>98.8% conversion efficiency with direct high-voltage string MPPT input (1500V DC).',
    impactMetric: '+4.2% Annual MWh Yield',
    voltageRange: '800V - 1500V'
  },
  {
    id: 'purification',
    category: 'ready',
    title: 'Off-Grid Water Purification',
    icon: 'droplets',
    readiness: 'Ready to Implement',
    statusColor: 'emerald',
    painPoint: 'Remote solar-powered pumps & RO desalinators require bulky power conditioning units prone to heat failure.',
    sicAdvantage: 'Operates stably in 50°C ambient deserts with passive convection cooling, eliminating fan failures.',
    impactMetric: '3x Reliability in Extreme Heat',
    voltageRange: '400V - 800V'
  },
  {
    id: 'appliances',
    category: 'ready',
    title: 'Smart Household Appliances',
    icon: 'home',
    readiness: 'Ready to Implement',
    statusColor: 'emerald',
    painPoint: 'Variable-speed heat pumps & induction cooktops have bulky PFC inductors and humming switching noise.',
    sicAdvantage: 'High switching frequency (>50 kHz) shifts noise above human hearing and shrinks magnetics by 60%.',
    impactMetric: '60% Smaller Magnetic Coils',
    voltageRange: '230V - 400V'
  },
  {
    id: 'ev',
    category: 'emerging',
    title: 'Electric Vehicles (800V Fast Charge)',
    icon: 'car',
    readiness: 'High-Growth Horizon',
    statusColor: 'cyan',
    painPoint: '400V silicon architectures take 45+ mins to charge and lose 10-15% range in winter heating.',
    sicAdvantage: 'Enables native 800V architecture, 10-minute 10-80% ultra-fast charging, and 5-8% longer range.',
    impactMetric: '+7% Total EV Range',
    voltageRange: '800V - 1000V'
  },
  {
    id: 'railways',
    category: 'emerging',
    title: 'High-Speed Rail & Locomotives',
    icon: 'train',
    readiness: 'High-Growth Horizon',
    statusColor: 'cyan',
    painPoint: 'Heavy silicon GTO/IGBT traction inverters weigh several tons and demand massive oil-cooling loops.',
    sicAdvantage: 'Air-cooled SiC traction inverters shed 1.5 tons per coach and slash regeneration losses by 40%.',
    impactMetric: '-35% Traction Energy Loss',
    voltageRange: '1500V - 3300V'
  },
  {
    id: 'datacenters',
    category: 'emerging',
    title: 'AI Hyperscale Data Centers',
    icon: 'server',
    readiness: 'High-Growth Horizon',
    statusColor: 'cyan',
    painPoint: 'AI GPU clusters draw 100kW+ per rack, driving massive AC-to-DC conversion heat and cooling overhead.',
    sicAdvantage: 'Titanium-grade 97.5% PSU efficiency at 48V bus, cutting megawatts of cooling power.',
    impactMetric: 'PUE Cut from 1.4 to 1.12',
    voltageRange: '400V - 800V DC'
  },
  {
    id: 'aviation',
    category: 'emerging',
    title: 'Electric Aviation & eVTOL',
    icon: 'send',
    readiness: 'High-Growth Horizon',
    statusColor: 'cyan',
    painPoint: 'Extreme weight penalties; every kilogram of power converter displaces passenger or battery capacity.',
    sicAdvantage: 'Highest power-to-weight ratio (>25 kW/kg) and safe operation at high altitude unpressurized zones.',
    impactMetric: '-45% Inverter Weight',
    voltageRange: '600V - 1200V'
  },
  {
    id: 'defence',
    category: 'emerging',
    title: 'Defence & Radar Systems',
    icon: 'shield',
    readiness: 'High-Growth Horizon',
    statusColor: 'cyan',
    painPoint: 'Active Electronically Scanned Array (AESA) radars and directed energy weapons require pulsed MW power.',
    sicAdvantage: 'Radiation-hardened wide-bandgap structure tolerates massive pulse voltages without breakdown.',
    impactMetric: '10x Breakdown Resistance',
    voltageRange: '1200V - 6500V'
  },
  {
    id: 'agriculture',
    category: 'emerging',
    title: 'Precision Agri & Solar Pumps',
    icon: 'sprout',
    readiness: 'High-Growth Horizon',
    statusColor: 'cyan',
    painPoint: 'High grid voltage fluctuations in rural feeders destroy conventional silicon mosfet drivers.',
    sicAdvantage: 'Robust surge tolerance and MPPT efficiency runs submersible pumps 2 extra hours per day.',
    impactMetric: '+25% Water Discharge/Day',
    voltageRange: '415V - 800V'
  },
  {
    id: 'mining',
    category: 'emerging',
    title: 'Heavy Mining & Construction',
    icon: 'hard-hat',
    readiness: 'High-Growth Horizon',
    statusColor: 'cyan',
    painPoint: '200-ton haul trucks generate extreme vibration, shock loads, and 120°C motor bay temperatures.',
    sicAdvantage: 'Rugged SiC modules withstand 175°C continuous junction temperatures in dirt and dust.',
    impactMetric: '4x MTBF in Severe Shocks',
    voltageRange: '1200V - 3300V'
  },
  {
    id: 'marine',
    category: 'emerging',
    title: 'Marine Electric Propulsion',
    icon: 'anchor',
    readiness: 'High-Growth Horizon',
    statusColor: 'cyan',
    painPoint: 'Corrosive salt environments corrode complex water cooling pumps on electric ferries.',
    sicAdvantage: 'Compact sealed air-cooled pods simplify hull space and prevent seawater heat exchanger fouling.',
    impactMetric: '-50% Maintenance Cycles',
    voltageRange: '800V - 1500V'
  }
];

const IndustryApp = {
  currentTab: 'all',

  init() {
    this.renderCards();
    this.setupTabs();
  },

  renderCards() {
    const container = document.getElementById('industry-cards-container');
    if (!container) return;

    const filtered = this.currentTab === 'all' 
      ? IndustryData 
      : IndustryData.filter(item => item.category === this.currentTab);

    let html = '';
    filtered.forEach(item => {
      const isReady = item.category === 'ready';
      const badgeBg = isReady ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      const borderHover = isReady ? 'hover:border-emerald-400' : 'hover:border-cyan-400';

      html += `
        <div class="glass-card p-6 rounded-2xl border border-slate-700/60 ${borderHover} flex flex-col justify-between group transition-all duration-300">
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="p-3 rounded-xl ${isReady ? 'bg-emerald-500/10 text-emerald-400' : 'bg-cyan-500/10 text-cyan-400'} group-hover:scale-110 transition-transform">
                <i data-lucide="${item.icon}" class="w-6 h-6"></i>
              </div>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeBg}">
                ${item.readiness}
              </span>
            </div>

            <h3 class="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">${item.title}</h3>
            
            <div class="space-y-2.5 my-4">
              <div class="bg-rose-950/20 border border-rose-500/20 rounded-lg p-2.5 text-xs text-slate-300">
                <span class="font-bold text-rose-400 block mb-0.5">Silicon Limitation:</span>
                ${item.painPoint}
              </div>
              <div class="bg-cyan-950/20 border border-cyan-500/20 rounded-lg p-2.5 text-xs text-slate-300">
                <span class="font-bold text-cyan-400 block mb-0.5">SiCharge Breakthrough:</span>
                ${item.sicAdvantage}
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs">
            <span class="text-slate-400">Voltage: <strong class="text-white">${item.voltageRange}</strong></span>
            <span class="font-bold px-2 py-1 rounded-lg ${isReady ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'}">
              ${item.impactMetric}
            </span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  },

  setupTabs() {
    document.querySelectorAll('[data-ind-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = btn.dataset.indTab;
        this.currentTab = tab;
        document.querySelectorAll('[data-ind-tab]').forEach(b => {
          b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold');
          b.classList.add('bg-slate-800', 'text-slate-300');
        });
        btn.classList.remove('bg-slate-800', 'text-slate-300');
        btn.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold');
        this.renderCards();
      });
    });
  }
};

window.IndustryApp = IndustryApp;
