/**
 * SiCharge - Interactive Supply Chain, Production & Risk Matrix Flowchart
 * Recreates and enriches the research mindmap and risk factors
 */

const RiskFactors = [
  {
    title: "Manufacturing Defects",
    tag: "Yield Risk",
    color: "border-rose-500 bg-rose-500/10 text-rose-300",
    description: "SiC wafer crystal dislocations and micropipe defects can cause early electrical breakdown.",
    mitigation: "Partner with tier-1 foundries using automated optical inspection (AOI) and 100% gate-leakage screening before assembly."
  },
  {
    title: "Transportation Breakdown",
    tag: "Logistics Risk",
    color: "border-amber-500 bg-amber-500/10 text-amber-300",
    description: "Vibration and electrostatic discharge (ESD) during transit can degrade sensitive gate oxides.",
    mitigation: "Anti-static ESD nitrogen-sealed packaging with embedded shock/vibration indicator sensors for all shipments."
  },
  {
    title: "High Initial Cost",
    tag: "Capex Risk",
    color: "border-purple-500 bg-purple-500/10 text-purple-300",
    description: "Building an in-house fab requires over $1B+ in upfront capital expenditure.",
    mitigation: "Adopt the asset-light Fabless Module Assembly model (Fixed cost: ₹4.5L, BEP: 90 units) outsourcing wafer fab."
  },
  {
    title: "Low Trust Factor (New Tech)",
    tag: "Market Adoption",
    color: "border-blue-500 bg-blue-500/10 text-blue-300",
    description: "Conservative industrial OEMs are hesitant to replace proven 30-year-old Silicon IGBTs.",
    mitigation: "Deploy low-friction design-win evaluation kits, publish open whitepapers, and offer 5-year performance warranties."
  },
  {
    title: "Longer Approval Time",
    tag: "Regulatory Risk",
    color: "border-indigo-500 bg-indigo-500/10 text-indigo-300",
    description: "Aerospace (DO-160) and Automotive (AEC-Q101) qualification cycles take 9-18 months.",
    mitigation: "Execute parallel pre-compliance testing with certified national labs and target fast-turn drone/inverter markets first."
  },
  {
    title: "Payment Delay",
    tag: "Cash Flow Risk",
    color: "border-orange-500 bg-orange-500/10 text-orange-300",
    description: "Large enterprise OEMs frequently operate on 90 to 120-day credit cycles.",
    mitigation: "Enforce 30% advance on prototype purchase orders, milestone-based progress billing, and invoice discounting facilities."
  },
  {
    title: "Reliability Testing Time",
    tag: "R&D Cycle",
    color: "border-teal-500 bg-teal-500/10 text-teal-300",
    description: "High-voltage endurance testing requires thousands of hours of high-temp reverse bias (HTRB).",
    mitigation: "Accelerated Stress Testing (HASS/HALT) with thermal shock chambers to simulate 10-year lifespans in 3 weeks."
  }
];

const FlowchartApp = {
  init() {
    this.renderRisks();
  },

  renderRisks() {
    const container = document.getElementById('risk-factors-container');
    if (!container) return;

    let html = '';
    RiskFactors.forEach((rf, idx) => {
      html += `
        <div class="glass-card p-4 rounded-xl border ${rf.color.split(' ')[0]} hover:scale-[1.02] transition-all">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-full border ${rf.color}">
              ${rf.tag}
            </span>
            <span class="text-xs text-slate-400 font-mono">Risk #0${idx + 1}</span>
          </div>
          <h4 class="font-bold text-white text-sm mb-1">${rf.title}</h4>
          <p class="text-xs text-slate-300 mb-3">${rf.description}</p>
          <div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs">
            <span class="text-emerald-400 font-semibold flex items-center gap-1 mb-0.5">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Strategic Mitigation:
            </span>
            <span class="text-slate-300">${rf.mitigation}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  }
};

window.FlowchartApp = FlowchartApp;
