/**
 * SiCharge - Experiment 4 Financial Plan & Break-Even Simulator
 * Handles real-time formulas, sensitivity analysis, preset scenarios, and Chart.js integration
 */

const FinancialSimulator = {
  // State
  fixedCosts: {
    prototyping: 180000,
    integration: 150000,
    certification: 100000,
    branding: 20000
  },
  variableCosts: {
    chipsSubstrate: 8000,
    assemblyQC: 1500,
    logistics: 500
  },
  sellingPrice: 15000,
  targetMonthlyVolume: 150,
  pilotQ1Volume: 50,
  chartInstance: null,

  // Helper formatting
  formatINR(val) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  },

  formatUSD(inrVal) {
    const usd = inrVal / 96; // Image reference $1 = ~₹96
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(usd);
  },

  getTotalFixedCost() {
    return Object.values(this.fixedCosts).reduce((acc, curr) => acc + curr, 0);
  },

  getTotalVariableCost() {
    return Object.values(this.variableCosts).reduce((acc, curr) => acc + curr, 0);
  },

  calculate() {
    const FC = this.getTotalFixedCost();
    const VC = this.getTotalVariableCost();
    const SP = this.sellingPrice;
    const CM = SP - VC; // Contribution Margin per unit
    const CMRatio = SP > 0 ? (CM / SP) * 100 : 0;
    const BEP_units = CM > 0 ? FC / CM : Infinity;
    const BEP_revenue = BEP_units * SP;

    // Monthly Profit at Target Volume
    const monthlyRevenue = this.targetMonthlyVolume * SP;
    const monthlyTotalVC = this.targetMonthlyVolume * VC;
    const monthlyGrossMargin = this.targetMonthlyVolume * CM;
    
    // Pilot Q1 Evaluation
    const pilotRevenue = this.pilotQ1Volume * SP;
    const pilotVC = this.pilotQ1Volume * VC;
    const pilotGrossMargin = this.pilotQ1Volume * CM;
    const pilotNetResult = pilotGrossMargin - FC;

    // Payback Period (in months) once target monthly volume is reached
    const paybackMonths = monthlyGrossMargin > 0 ? (FC / monthlyGrossMargin) : Infinity;
    const paybackDays = paybackMonths * 30;

    // Margin of Safety
    const marginOfSafetyUnits = this.targetMonthlyVolume - BEP_units;
    const marginOfSafetyPercent = this.targetMonthlyVolume > 0 ? (marginOfSafetyUnits / this.targetMonthlyVolume) * 100 : 0;

    return {
      FC,
      VC,
      SP,
      CM,
      CMRatio,
      BEP_units: Math.ceil(BEP_units),
      BEP_revenue,
      monthlyRevenue,
      monthlyTotalVC,
      monthlyGrossMargin,
      paybackMonths,
      paybackDays,
      pilotRevenue,
      pilotVC,
      pilotGrossMargin,
      pilotNetResult,
      marginOfSafetyUnits: Math.round(marginOfSafetyUnits),
      marginOfSafetyPercent
    };
  },

  updateUI() {
    const results = this.calculate();

    // Metric Badges & KPIs
    const elBEP = document.getElementById('val-bep-units');
    if (elBEP) elBEP.innerText = `${results.BEP_units} units`;

    const elBEPRev = document.getElementById('val-bep-revenue');
    if (elBEPRev) elBEPRev.innerText = this.formatINR(results.BEP_revenue);

    const elCM = document.getElementById('val-unit-cm');
    if (elCM) elCM.innerText = `${this.formatINR(results.CM)} (${results.CMRatio.toFixed(1)}%)`;

    const elMonthlyProfit = document.getElementById('val-monthly-profit');
    if (elMonthlyProfit) elMonthlyProfit.innerText = this.formatINR(results.monthlyGrossMargin);

    const elPayback = document.getElementById('val-payback');
    if (elPayback) {
      if (results.paybackMonths <= 0 || !isFinite(results.paybackMonths)) {
        elPayback.innerText = 'N/A (Loss)';
      } else {
        elPayback.innerText = `~${results.paybackMonths.toFixed(1)} mo (${Math.round(results.paybackDays)} days)`;
      }
    }

    const elMarginSafety = document.getElementById('val-margin-safety');
    if (elMarginSafety) {
      if (results.marginOfSafetyPercent >= 0) {
        elMarginSafety.innerHTML = `<span class="text-emerald-400 font-bold">+${results.marginOfSafetyPercent.toFixed(1)}%</span> (${results.marginOfSafetyUnits} units above BEP)`;
      } else {
        elMarginSafety.innerHTML = `<span class="text-rose-400 font-bold">${results.marginOfSafetyPercent.toFixed(1)}%</span> (${Math.abs(results.marginOfSafetyUnits)} units below BEP)`;
      }
    }

    // Cost Breakdown Displays
    const elTotalFC = document.getElementById('display-total-fc');
    if (elTotalFC) elTotalFC.innerText = this.formatINR(results.FC);

    const elTotalVC = document.getElementById('display-total-vc');
    if (elTotalVC) elTotalVC.innerText = this.formatINR(results.VC);

    const elDisplayPrice = document.getElementById('display-selling-price');
    if (elDisplayPrice) elDisplayPrice.innerText = this.formatINR(results.SP);

    const elDisplayVolume = document.getElementById('display-target-volume');
    if (elDisplayVolume) elDisplayVolume.innerText = `${this.targetMonthlyVolume} units/mo`;

    // Sliders synchronization
    const sliderPrice = document.getElementById('slider-selling-price');
    if (sliderPrice) sliderPrice.value = this.sellingPrice;

    const sliderVolume = document.getElementById('slider-target-volume');
    if (sliderVolume) sliderVolume.value = this.targetMonthlyVolume;

    // Pilot Q1 Box
    const elPilotStatus = document.getElementById('val-pilot-q1');
    if (elPilotStatus) {
      if (results.pilotNetResult < 0) {
        elPilotStatus.innerHTML = `<span class="text-amber-400">Initial Gap: ${this.formatINR(Math.abs(results.pilotNetResult))}</span> (40 units away from BEP)`;
      } else {
        elPilotStatus.innerHTML = `<span class="text-emerald-400">Net Profit: ${this.formatINR(results.pilotNetResult)}</span>`;
      }
    }

    // Update Experiment 4 Worksheet sync
    this.updateWorksheetView(results);

    // Update Chart
    this.renderChart(results);
  },

  updateWorksheetView(results) {
    const wsFC = document.getElementById('ws-fixed-cost');
    if (wsFC) wsFC.innerText = this.formatINR(results.FC);

    const wsVC = document.getElementById('ws-variable-cost');
    if (wsVC) wsVC.innerText = this.formatINR(results.VC);

    const wsSP = document.getElementById('ws-selling-price');
    if (wsSP) wsSP.innerText = this.formatINR(results.SP);

    const wsBEP = document.getElementById('ws-bep-units');
    if (wsBEP) wsBEP.innerText = `${results.BEP_units} units`;

    const wsProfit = document.getElementById('ws-monthly-profit');
    if (wsProfit) wsProfit.innerText = this.formatINR(results.monthlyGrossMargin);

    const wsPayback = document.getElementById('ws-payback');
    if (wsPayback) wsPayback.innerText = `~${results.paybackMonths.toFixed(1)} months (${Math.round(results.paybackDays)} days)`;
  },

  renderChart(results) {
    const ctx = document.getElementById('breakEvenChart');
    if (!ctx) return;

    const maxUnits = Math.max(250, Math.ceil(results.BEP_units * 2.2), this.targetMonthlyVolume + 50);
    const step = Math.ceil(maxUnits / 10);
    const labels = [];
    const fixedCostData = [];
    const totalCostData = [];
    const totalRevenueData = [];

    for (let u = 0; u <= maxUnits; u += step) {
      labels.push(u);
      fixedCostData.push(results.FC);
      totalCostData.push(results.FC + (u * results.VC));
      totalRevenueData.push(u * results.SP);
    }

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total Revenue (TR = P × Q)',
            data: totalRevenueData,
            borderColor: '#10b981', // Emerald
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            fill: '+1',
            borderWidth: 3,
            tension: 0.1,
            pointRadius: 4,
            pointBackgroundColor: '#10b981'
          },
          {
            label: 'Total Cost (TC = FC + VC × Q)',
            data: totalCostData,
            borderColor: '#f43f5e', // Rose
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            fill: false,
            borderWidth: 3,
            tension: 0.1,
            pointRadius: 4,
            pointBackgroundColor: '#f43f5e'
          },
          {
            label: 'Fixed Costs (FC)',
            data: fixedCostData,
            borderColor: '#f59e0b', // Amber
            borderDash: [6, 6],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#e2e8f0',
              font: {
                family: 'Plus Jakarta Sans',
                size: 13,
                weight: '600'
              },
              usePointStyle: true,
              padding: 18
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#38bdf8',
            bodyColor: '#f8fafc',
            borderColor: '#334155',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              title: function(context) {
                return `Production Volume: ${context[0].label} Units`;
              },
              label: (context) => {
                const label = context.dataset.label.split('(')[0] || '';
                const val = context.parsed.y;
                return `${label}: ${FinancialSimulator.formatINR(val)}`;
              },
              afterBody: (context) => {
                const u = parseInt(context[0].label, 10);
                const rev = u * results.SP;
                const tc = results.FC + (u * results.VC);
                const diff = rev - tc;
                if (diff >= 0) {
                  return `\n🟢 Operating Profit: +${FinancialSimulator.formatINR(diff)}`;
                } else {
                  return `\n🔴 Operating Loss: -${FinancialSimulator.formatINR(Math.abs(diff))}`;
                }
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Production & Sales Volume (Units)',
              color: '#94a3b8',
              font: { weight: 'bold', size: 12 }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.06)'
            },
            ticks: {
              color: '#cbd5e1'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Financial Amount (₹ INR)',
              color: '#94a3b8',
              font: { weight: 'bold', size: 12 }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.06)'
            },
            ticks: {
              color: '#cbd5e1',
              callback: (value) => `₹${(value / 100000).toFixed(1)}L`
            }
          }
        }
      }
    });
  },

  applyPreset(presetName) {
    if (presetName === 'default') {
      this.fixedCosts = { prototyping: 180000, integration: 150000, certification: 100000, branding: 20000 };
      this.variableCosts = { chipsSubstrate: 8000, assemblyQC: 1500, logistics: 500 };
      this.sellingPrice = 15000;
      this.targetMonthlyVolume = 150;
    } else if (presetName === 'conservative') {
      this.fixedCosts = { prototyping: 200000, integration: 180000, certification: 120000, branding: 30000 }; // ₹5.3L
      this.variableCosts = { chipsSubstrate: 9000, assemblyQC: 1800, logistics: 700 }; // ₹11.5k
      this.sellingPrice = 14500;
      this.targetMonthlyVolume = 80;
    } else if (presetName === 'aggressive') {
      this.fixedCosts = { prototyping: 180000, integration: 150000, certification: 100000, branding: 50000 }; // ₹4.8L
      this.variableCosts = { chipsSubstrate: 7000, assemblyQC: 1200, logistics: 400 }; // ₹8.6k
      this.sellingPrice = 16000;
      this.targetMonthlyVolume = 300;
    } else if (presetName === 'fabless_scale') {
      this.fixedCosts = { prototyping: 350000, integration: 250000, certification: 200000, branding: 100000 }; // ₹9.0L
      this.variableCosts = { chipsSubstrate: 5500, assemblyQC: 900, logistics: 300 }; // ₹6.7k
      this.sellingPrice = 12500;
      this.targetMonthlyVolume = 600;
    }

    // Sync input fields
    document.querySelectorAll('[data-cost-key]').forEach(input => {
      const category = input.dataset.costCat;
      const key = input.dataset.costKey;
      if (category === 'fc' && this.fixedCosts[key] !== undefined) {
        input.value = this.fixedCosts[key];
      } else if (category === 'vc' && this.variableCosts[key] !== undefined) {
        input.value = this.variableCosts[key];
      }
    });

    this.updateUI();
  },

  init() {
    // Attach listener to individual cost inputs
    document.querySelectorAll('[data-cost-key]').forEach(input => {
      input.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) || 0;
        const cat = e.target.dataset.costCat;
        const key = e.target.dataset.costKey;
        if (cat === 'fc') this.fixedCosts[key] = val;
        if (cat === 'vc') this.variableCosts[key] = val;
        this.updateUI();
      });
    });

    // Selling Price slider
    const sliderPrice = document.getElementById('slider-selling-price');
    if (sliderPrice) {
      sliderPrice.addEventListener('input', (e) => {
        this.sellingPrice = parseFloat(e.target.value) || 0;
        this.updateUI();
      });
    }

    // Volume slider
    const sliderVolume = document.getElementById('slider-target-volume');
    if (sliderVolume) {
      sliderVolume.addEventListener('input', (e) => {
        this.targetMonthlyVolume = parseInt(e.target.value, 10) || 0;
        this.updateUI();
      });
    }

    // Preset buttons
    document.querySelectorAll('[data-preset]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-preset]').forEach(b => b.classList.remove('bg-cyan-500/30', 'border-cyan-400'));
        btn.classList.add('bg-cyan-500/30', 'border-cyan-400');
        this.applyPreset(btn.dataset.preset);
      });
    });

    this.updateUI();
  }
};

window.FinancialSimulator = FinancialSimulator;
