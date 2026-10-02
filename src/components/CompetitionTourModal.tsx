import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Sparkles,
  LayoutDashboard,
  Users,
  PackageSearch,
  Truck,
  Flame,
  LifeBuoy,
  Cpu,
  CalendarCheck2,
  FileSpreadsheet,
} from 'lucide-react';
import { TabKey } from './Sidebar';

interface CompetitionTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabKey) => void;
  onOpenReport: () => void;
}

interface TourStep {
  stepNumber: number;
  tab: TabKey | 'report';
  title: string;
  category: string;
  headline: string;
  narrative: string;
  judgeObservation: string;
}

export const CompetitionTourModal: React.FC<CompetitionTourModalProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenReport,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const tourSteps: TourStep[] = [
    {
      stepNumber: 1,
      tab: 'executive',
      title: 'Executive Dashboard Diagnostics',
      category: 'Module A',
      headline: 'Gross Growth Masking Severe Operational Bleed',
      narrative:
        'NOVA CART has reached 120,000 registered users, 38,500 monthly orders, and ₹26.1 Lakh monthly revenue across 620 retailers in Bengaluru, Mumbai, and Delhi NCR. However, management must address deep underlying issues.',
      judgeObservation:
        'Notice the comparison cards: Repeat purchase dropped from 41% to 27%, cancellations doubled from 6% to 11%, and monthly marketing burn reached ₹17 Lakh with 44% unused vouchers.',
    },
    {
      stepNumber: 2,
      tab: 'executive',
      title: 'Evidence-Based Diagnostic Trends',
      category: 'Module A Charts',
      headline: 'The Correlation of Churn, Late Deliveries & Support Surges',
      narrative:
        'Late deliveries (>15 mins) climbed to 13% while average delivery rose from 29 to 37 minutes. This triggered a 90% explosion in monthly customer support tickets (3,100 to 5,900) and eroded repeat order propensity.',
      judgeObservation:
        'Switch between the charts above to see how Marketing Spend vs Revenue decoupled over the past 5 months.',
    },
    {
      stepNumber: 3,
      tab: 'customer_intelligence',
      title: 'Customer Intelligence & 3-Streak Milestone',
      category: 'Module B',
      headline: 'Order #3 Yields a 72% Next-Month Retention Probability',
      narrative:
        'Analyzing 120,000 users reveals that the critical failure point is right after Order 1—only 31% place a second order within 30 days. Customers acquired through heavy blanket discounts show minimal organic loyalty.',
      judgeObservation:
        'Click on "At-Risk Customers" or "Discount-Dependent Customers" in the table to view the tailor-made retention nudges and trigger a campaign.',
    },
    {
      stepNumber: 4,
      tab: 'inventory',
      title: 'Smart Inventory & Kirana Sync',
      category: 'Module C',
      headline: 'Eliminating the Primary Driver of Avoidable Cancellations',
      narrative:
        'Retailers struggle with manual inventory logging. 62% of platform cancellations are caused by customers paying for items that local Kiranas and Pharmacies do not have in stock.',
      judgeObservation:
        'Notice the stock accuracy indicator (74%). Test clicking "- / +" to adjust inventory or click "Masked (Hidden)" to simulate real-time catalog protection.',
    },
    {
      stepNumber: 5,
      tab: 'order_rescue',
      title: 'Order Rescue & Delivery Operations',
      category: 'Module D',
      headline: 'Real-Time Heuristic Risk Detection & 1-Tap Interventions',
      narrative:
        'The order risk engine flags bottlenecks transparently: unacknowledged store orders (>4 mins), rider pool shortages (>6 mins), and orders breaching the 35-minute delivery ceiling.',
      judgeObservation:
        'Inspect the orders at risk. Click "Execute 1-Tap Rescue" or "Send ₹50 Delay Credit" to see how the system stabilizes orders before customer cancellation.',
    },
    {
      stepNumber: 6,
      tab: 'promotions',
      title: 'Smart Promotions & Reallocation Simulator',
      category: 'Module E',
      headline: 'Reallocating ₹17 Lakh Burn from Wasteful Vouchers to Retention',
      narrative:
        'Instead of blanket 50% acquisition vouchers with 44% breakage, the model shifts capital into 3-Order Streak bonuses and merchant-co-funded neighborhood baskets.',
      judgeObservation:
        'Adjust the "Retention Share" slider from 42% to 65%+ in the simulator to see projected orders and marketing ROAS rise without extra capital burn.',
    },
    {
      stepNumber: 7,
      tab: 'support',
      title: 'Support Resolution & Instant UPI Refunds',
      category: 'Module F',
      headline: 'Cutting 9.2-Hour Ticket Latency to Sub-2-Hour Speed',
      narrative:
        'Support tickets jumped to 5,900/month. The root-cause audit identifies refunds and delays as 62% of complaints. Automating webhook refunds upon store rejection eliminates repetitive contacts.',
      judgeObservation:
        'Click "Quick Resolve" or add resolution notes to test live ticket resolution workflows.',
    },
    {
      stepNumber: 8,
      tab: 'simulator',
      title: 'Central Business Rescue Simulator',
      category: 'Module G',
      headline: 'Testing the 6-Month Turnaround Under the ₹25 Lakh Cap',
      narrative:
        'The center of the platform allows management to simulate the exact impact of operational levers (Repeat Rate, Cancellation Rate, Delivery Time, Inventory Accuracy, AOV) on monthly orders and net revenue.',
      judgeObservation:
        'Click "Run Business Rescue Simulation" to observe transparent multi-variable projections and save scenarios to the database.',
    },
    {
      stepNumber: 9,
      tab: 'action_plan',
      title: 'Six-Month Roadmap & ₹25 Lakh Budget Planner',
      category: 'Module H & Report',
      headline: 'Disciplined Capital Allocation and Milestone Execution',
      narrative:
        'Enforcing the strict ₹25 Lakh six-month budget across six pillars with an interactive allocation tool and task checklist spanning Month 1 (Diagnosis) to Month 6 (Scale).',
      judgeObservation:
        'Test modifying the budget allocations to verify that exceeding ₹25 Lakh triggers the instant governance warning banner.',
    },
  ];

  const currentStep = tourSteps[currentStepIndex];

  const handleGoToStep = (index: number) => {
    setCurrentStepIndex(index);
    const step = tourSteps[index];
    if (step.tab === 'report') {
      onOpenReport();
    } else {
      onSelectTab(step.tab);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < tourSteps.length - 1) {
      handleGoToStep(currentStepIndex + 1);
    } else {
      onClose();
      onOpenReport();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      handleGoToStep(currentStepIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 flex flex-col justify-between max-h-[92vh] overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-xl bg-indigo-100 text-indigo-700">
                <Compass className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                  Judges & Evaluators Walkthrough
                </span>
                <h3 className="text-base font-black text-slate-900">
                  Step {currentStep.stepNumber} of 9: {currentStep.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center justify-between py-3">
            {tourSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => handleGoToStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStepIndex
                    ? 'w-10 bg-indigo-600'
                    : idx < currentStepIndex
                    ? 'w-4 bg-emerald-500'
                    : 'w-4 bg-slate-200'
                }`}
                title={`Step ${idx + 1}: ${step.title}`}
              />
            ))}
          </div>

          {/* Step Body */}
          <div className="space-y-3.5 my-2">
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-[10px] font-bold uppercase">
              {currentStep.category}
            </div>

            <h4 className="text-base font-bold text-slate-900 leading-snug">
              {currentStep.headline}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              {currentStep.narrative}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Evaluator Action to Observe in Current View:
              </span>
              <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                👉 {currentStep.judgeObservation}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold transition ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Previous
          </button>

          <span className="text-[11px] text-slate-400 font-mono font-medium">
            Step {currentStep.stepNumber} / 9
          </span>

          <button
            onClick={handleNext}
            className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-black bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition"
          >
            {currentStepIndex === tourSteps.length - 1 ? (
              <>
                Finish & Open Audit Report
                <Sparkles className="w-3.5 h-3.5 ml-1.5" />
              </>
            ) : (
              <>
                Next Step
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
