import React, { useState } from 'react';
import {
  ShoppingBag,
  TrendingDown,
  Clock,
  Sparkles,
  FileSpreadsheet,
  Compass,
  LogIn,
  LogOut,
  ShieldCheck,
  Download,
  Share2,
  X,
} from 'lucide-react';
import { useAuth } from '../firebase/authContext';
import { formatINR } from '../utils/formatters';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { AlertsNotificationDropdown } from './AlertsNotificationDropdown';
import { TabKey } from './Sidebar';

interface NavbarProps {
  onOpenTour: () => void;
  onOpenReport: () => void;
  monthlyRevenue: number;
  repeatRate: number;
  cancellationRate: number;
  deliveryTime: number;
  supportTickets?: number;
  unusedCouponRate?: number;
  onNavigateTab?: (tab: TabKey) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTour,
  onOpenReport,
  monthlyRevenue,
  repeatRate,
  cancellationRate,
  deliveryTime,
  supportTickets = 5900,
  unusedCouponRate = 44,
  onNavigateTab = () => {},
}) => {
  const { currentUser, signInWithGoogle, logOut } = useAuth();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-md pt-[env(safe-area-inset-top)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Brand Identity */}
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
                <ShoppingBag className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-base sm:text-xl tracking-tight text-white">
                    NOVA CART
                  </span>
                  <span className="text-[9px] sm:text-xs px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    RESCUE
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">
                  AI Smart Commerce & Quick-Turnaround Platform (620 Retailers • 3 Cities)
                </p>
              </div>
            </div>

            {/* Desktop Real-time KPI Ticker */}
            <div className="hidden lg:flex items-center space-x-6 text-xs bg-slate-800/80 px-4 py-1.5 rounded-lg border border-slate-700/60">
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">Monthly GMV:</span>
                <span className="font-bold text-emerald-400">{formatINR(monthlyRevenue)}</span>
              </div>
              <div className="w-px h-3.5 bg-slate-700" />
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">Repeat Rate:</span>
                <span className="font-bold text-amber-400 flex items-center">
                  {repeatRate}% <TrendingDown className="w-3 h-3 ml-0.5 text-rose-400" />
                </span>
              </div>
              <div className="w-px h-3.5 bg-slate-700" />
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">Cancellations:</span>
                <span className="font-bold text-rose-400">{cancellationRate}%</span>
              </div>
              <div className="w-px h-3.5 bg-slate-700" />
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">Avg Delivery:</span>
                <span className="font-bold text-amber-300 flex items-center">
                  <Clock className="w-3 h-3 mr-1" /> {deliveryTime}m
                </span>
              </div>
            </div>

            {/* Action CTAs, Alerts, PWA Install & Auth */}
            <div className="flex items-center space-x-2">
              {/* KPI Safety Alerts Notification System */}
              <AlertsNotificationDropdown
                cancellationRate={cancellationRate}
                supportTickets={supportTickets}
                deliveryTime={deliveryTime}
                repeatRate={repeatRate}
                unusedCouponRate={unusedCouponRate}
                onNavigateTab={onNavigateTab}
              />

              {/* PWA Install Button */}
              {!isInstalled && isInstallable && (
                <button
                  onClick={install}
                  className="inline-flex items-center px-2.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition"
                  title="Install NOVA CART mobile web app"
                >
                  <Download className="w-3.5 h-3.5 sm:mr-1.5" />
                  <span className="hidden sm:inline">Install App</span>
                </button>
              )}

              {!isInstalled && isIOS && (
                <button
                  onClick={() => setShowIOSGuide(true)}
                  className="inline-flex items-center px-2 py-1 text-[11px] font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                  title="Install on iOS Home Screen"
                >
                  <Share2 className="w-3 h-3 sm:mr-1 text-indigo-400" />
                  <span className="hidden sm:inline">Install iOS</span>
                </button>
              )}

              {/* Competition Tour trigger */}
              <button
                onClick={onOpenTour}
                className="inline-flex items-center px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition"
                title="Guided Competition Tour"
              >
                <Compass className="w-3.5 h-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">Tour</span>
              </button>

              {/* Impact Report trigger (Desktop) */}
              <button
                onClick={onOpenReport}
                className="hidden md:inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                <span>Impact Report</span>
              </button>

              {/* Auth Button */}
              <div className="flex items-center pl-1 sm:pl-2 border-l border-slate-800">
                {currentUser?.isDemo ? (
                  <button
                    onClick={signInWithGoogle}
                    className="inline-flex items-center px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                    title="Sign In with Google"
                  >
                    <LogIn className="w-3.5 h-3.5 sm:mr-1.5 text-emerald-400" />
                    <span className="hidden sm:inline">Sign In</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-1.5">
                    {currentUser?.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="User"
                        className="w-7 h-7 rounded-full border border-emerald-400"
                      />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    )}
                    <span className="hidden md:inline text-xs font-medium text-slate-200 max-w-[100px] truncate">
                      {currentUser?.displayName || currentUser?.email}
                    </span>
                    <button
                      onClick={logOut}
                      className="p-1 text-slate-400 hover:text-rose-400 hidden sm:block"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* iOS Install Guide Sheet */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center">
                <Share2 className="w-4 h-4 mr-2 text-indigo-400" />
                Install on iPhone / iPad
              </h4>
              <button onClick={() => setShowIOSGuide(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-4 space-y-2 text-xs text-slate-300">
              <p>To run NOVA CART like a native standalone mobile application:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-200">
                <li>Tap the <strong>Share</strong> button in Safari's bottom toolbar.</li>
                <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                <li>Tap <strong>"Add"</strong> in the top right corner.</li>
              </ol>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold text-white transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};
