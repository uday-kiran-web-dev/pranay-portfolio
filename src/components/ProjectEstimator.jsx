import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Clock, DollarSign, ShieldAlert, Sliders } from 'lucide-react';
import { Badge } from './ui/Badge';
import { NeonBorder } from './originkit/NeonBorder';
import { LiquidCarveButton } from './originkit/LiquidCarveButton';

export function ProjectEstimator({ onOpenContactWithSpecs }) {
  const [projectType, setProjectType] = useState('commercial');
  const [turnaround, setTurnaround] = useState('standard');
  const [addons, setAddons] = useState({
    colorGrading: true,
    soundDesign: true,
    socialCutdowns: false,
    rawArchive: false,
  });

  const projectTypes = [
    { id: 'commercial', name: 'Brand Commercial', basePrice: 4000, desc: '30s - 90s High-impact commercial cut' },
    { id: 'music_video', name: 'Music Video', basePrice: 3500, desc: 'Kinetic multi-cam rhythmic edit' },
    { id: 'narrative', name: 'Narrative Short', basePrice: 5500, desc: '10-25 min film festival cut' },
    { id: 'vertical', name: 'Vertical / Reels Batch', basePrice: 2800, desc: '5x High-retention viral cutdowns' },
    { id: 'documentary', name: 'Docu / Long Form', basePrice: 6500, desc: 'Paced archival & field cut' },
  ];

  const turnaroundOptions = [
    { id: 'rush', name: 'Rush 48h Turnaround', multiplier: 1.35, badge: 'Rapid Rough Cut' },
    { id: 'standard', name: 'Standard (1-2 Weeks)', multiplier: 1.0, badge: 'Recommended' },
    { id: 'retainer', name: 'Dedicated Monthly Retainer', multiplier: 2.2, badge: 'Priority Slot' },
  ];

  const addonOptions = [
    { id: 'colorGrading', name: 'DaVinci Resolve ACES Color Grade', price: 1200, desc: 'HDR10+ / Rec.709 Master LUT pass' },
    { id: 'soundDesign', name: '5.1 Dolby Atmos Sound Design & Foley', price: 950, desc: 'Custom SFX, dialogue clean & mix' },
    { id: 'socialCutdowns', name: '9:16 & 1:1 Social Cutdowns (3x)', price: 750, desc: 'Optimized hooks & kinetic captions' },
    { id: 'rawArchive', name: '8K Master Archive & Project Bin', price: 500, desc: 'Complete NLE project archive package' },
  ];

  const toggleAddon = (id) => {
    setAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const calculatedEstimate = useMemo(() => {
    const selectedTypeObj = projectTypes.find((t) => t.id === projectType) || projectTypes[0];
    const selectedTurnObj = turnaroundOptions.find((t) => t.id === turnaround) || turnaroundOptions[1];

    let base = selectedTypeObj.basePrice;
    let addonsTotal = 0;

    addonOptions.forEach((add) => {
      if (addons[add.id]) {
        addonsTotal += add.price;
      }
    });

    const subtotal = (base + addonsTotal) * selectedTurnObj.multiplier;
    const min = Math.round(subtotal * 0.95);
    const max = Math.round(subtotal * 1.15);

    return {
      min: min.toLocaleString(),
      max: max.toLocaleString(),
      selectedTypeObj,
      selectedTurnObj,
    };
  }, [projectType, turnaround, addons]);

  const handleProceedToBooking = () => {
    const activeAddonNames = addonOptions
      .filter((a) => addons[a.id])
      .map((a) => a.name);

    onOpenContactWithSpecs({
      projectType: calculatedEstimate.selectedTypeObj.name,
      turnaround: calculatedEstimate.selectedTurnObj.name,
      estimatedRange: `$${calculatedEstimate.min} - $${calculatedEstimate.max}`,
      addons: activeAddonNames,
    });
  };

  return (
    <section id="pricing" className="py-24 relative bg-kage-ink/90 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <Badge variant="rose" size="sm" className="mb-3">
            COMMISSION & RATES
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Interactive Rate & Scope Calculator
          </h2>
          <p className="text-kage-boneDim text-sm sm:text-base mt-3 leading-relaxed">
            Select your deliverable specs, required turnaround speed, and finishing options to calculate an immediate transparent estimate for working with Pranay.
          </p>
        </div>

        {/* Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* 1. Project Type */}
            <div className="origin-card rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-kage-ember uppercase tracking-wider">
                  1. Select Deliverable Category
                </span>
                <span className="text-[11px] font-mono text-kage-muted">Fixed Rate Tiers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      projectType === type.id
                        ? 'bg-kage-ink2 border-kage-vermilion text-white shadow-glow-vermilion'
                        : 'bg-kage-ink border-white/10 text-kage-muted hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-white">{type.name}</div>
                      <div className="text-xs text-kage-muted mt-1">{type.desc}</div>
                    </div>
                    <div className="mt-3 text-xs font-mono text-kage-ember font-bold">
                      From ${type.basePrice.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Turnaround */}
            <div className="origin-card rounded-2xl p-6 flex flex-col gap-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                2. Pacing & Delivery Speed
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {turnaroundOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTurnaround(opt.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      turnaround === opt.id
                        ? 'bg-kage-ink2 border-cyan-500 text-white shadow-glow-cyan'
                        : 'bg-kage-ink border-white/10 text-kage-muted hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold text-xs text-white">{opt.name}</div>
                    <div className="mt-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/10 text-cyan-300">
                        {opt.badge}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Add-ons */}
            <div className="origin-card rounded-2xl p-6 flex flex-col gap-4">
              <span className="text-xs font-mono font-bold text-kage-vermilion uppercase tracking-wider">
                3. Finishing & Technical Add-Ons
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonOptions.map((add) => (
                  <button
                    key={add.id}
                    onClick={() => toggleAddon(add.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all flex items-start gap-3 ${
                      addons[add.id]
                        ? 'bg-kage-ink2 border-kage-vermilion/60 text-white'
                        : 'bg-kage-ink border-white/10 text-kage-muted hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        addons[add.id]
                          ? 'bg-kage-vermilion border-kage-vermilion text-white'
                          : 'border-white/20 bg-kage-ink'
                      }`}
                    >
                      {addons[add.id] && <Check className="w-3.5 h-3.5 font-bold" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{add.name}</div>
                      <div className="text-[11px] text-kage-muted mt-0.5">{add.desc}</div>
                      <div className="text-xs font-mono text-kage-ember font-bold mt-1">+${add.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Estimate Card */}
          <div className="lg:col-span-4 sticky top-28">
            <NeonBorder
              color="#e0231c"
              secondaryColor="#ff5a3c"
              borderRadius="1rem"
              className="w-full shadow-2xl"
            >
              <div className="p-6 sm:p-8 flex flex-col gap-6 bg-kage-ink relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-kage-vermilion/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <span className="text-[11px] font-mono text-kage-muted uppercase tracking-wider block mb-1">
                    Instant Budget Projection
                  </span>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                    ${calculatedEstimate.min} <span className="text-kage-ember text-xl font-normal">to</span> ${calculatedEstimate.max}
                  </div>
                  <div className="text-xs text-kage-muted mt-1 font-mono">
                    USD • Estimated scope package
                  </div>
                </div>

                {/* Summary Checklist */}
                <div className="flex flex-col gap-2 pt-4 border-t border-white/10 text-xs text-kage-boneDim font-mono">
                  <div className="flex justify-between">
                    <span>Deliverable:</span>
                    <span className="text-white font-semibold">{calculatedEstimate.selectedTypeObj.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Turnaround:</span>
                    <span className="text-cyan-400 font-semibold">{calculatedEstimate.selectedTurnObj.name.split(' ')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Add-ons Active:</span>
                    <span className="text-kage-ember font-semibold">
                      {Object.values(addons).filter(Boolean).length} Selected
                    </span>
                  </div>
                </div>

                {/* Action */}
                <LiquidCarveButton
                  variant="amber"
                  size="lg"
                  onClick={handleProceedToBooking}
                  icon={ArrowRight}
                  className="w-full text-sm font-bold"
                >
                  Inquire With These Specs
                </LiquidCarveButton>

                <p className="text-[11px] text-center text-kage-muted leading-normal">
                  Direct collaboration with Pranay. Includes 2 rounds of creative editorial revisions and DCI 4K ProRes deliverables.
                </p>
              </div>
            </NeonBorder>
          </div>

        </div>

      </div>
    </section>
  );
}
