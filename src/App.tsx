import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './firebase/authContext';
import { Navbar } from './components/Navbar';
import { Sidebar, TabKey } from './components/Sidebar';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { CustomerIntelligence } from './components/CustomerIntelligence';
import { SmartInventory } from './components/SmartInventory';
import { OrderRescue } from './components/OrderRescue';
import { SmartPromotions } from './components/SmartPromotions';
import { SupportTickets } from './components/SupportTickets';
import { BusinessSimulator } from './components/BusinessSimulator';
import { ActionPlanAndBudget } from './components/ActionPlanAndBudget';
import { RecommendationEngine } from './components/RecommendationEngine';
import { ImpactReportModal } from './components/ImpactReportModal';
import { CompetitionTourModal } from './components/CompetitionTourModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileDrawer } from './components/MobileDrawer';
import { StoreRadarMaps } from './components/StoreRadarMaps';
import { MarketTrendsSearch } from './components/MarketTrendsSearch';
import { PromoVideoStudio } from './components/PromoVideoStudio';

import {
  INITIAL_METRICS,
  INITIAL_SEGMENTS,
  INITIAL_INVENTORY,
  INITIAL_ORDERS,
  INITIAL_CAMPAIGNS,
  INITIAL_TICKETS,
  INITIAL_BUDGET,
  INITIAL_RECOMMENDATIONS,
} from './data/seedData';
import {
  BaselineMetrics,
  CustomerSegment,
  InventoryItem,
  OperationalOrder,
  Campaign,
  SupportTicket,
  BudgetInitiative,
  BusinessRecommendation,
  SimulationResults,
} from './types';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<TabKey>('executive');
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Persistent / Reactive App State with LocalStorage fallbacks
  const [metrics, setMetrics] = useState<BaselineMetrics>(() => {
    const saved = localStorage.getItem('novacart_metrics');
    return saved ? JSON.parse(saved) : INITIAL_METRICS;
  });

  const [segments, setSegments] = useState<CustomerSegment[]>(INITIAL_SEGMENTS);

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('novacart_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [orders, setOrders] = useState<OperationalOrder[]>(() => {
    const saved = localStorage.getItem('novacart_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem('novacart_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('novacart_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [initiatives, setInitiatives] = useState<BudgetInitiative[]>(() => {
    const saved = localStorage.getItem('novacart_initiatives');
    return saved ? JSON.parse(saved) : INITIAL_BUDGET;
  });

  const [recommendations, setRecommendations] = useState<BusinessRecommendation[]>(INITIAL_RECOMMENDATIONS);

  // Pre-fill state when linking from Customer Intelligence to Promotions
  const [campaignPrefill, setCampaignPrefill] = useState<{
    segment: string;
    discount: number;
  } | null>(null);

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem('novacart_metrics', JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    localStorage.setItem('novacart_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('novacart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('novacart_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('novacart_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('novacart_initiatives', JSON.stringify(initiatives));
  }, [initiatives]);

  // Dynamic Badges
  const openOrdersAtRisk = orders.filter(
    (o) => (o.riskLevel === 'Critical' || o.riskLevel === 'High') && !o.isRescued
  ).length;

  const openTicketsCount = tickets.filter(
    (t) => t.status === 'Open' || t.status === 'In Progress'
  ).length;

  const lowStockItemsCount = inventory.filter(
    (i) => i.availableStock < 5 || i.stockStatus === 'Low Stock' || i.stockStatus === 'Out of Stock'
  ).length;

  // Cross-Module Handlers
  const handleLaunchCampaignForSegment = (segmentName: string, recommendedDiscount: number) => {
    setCampaignPrefill({ segment: segmentName, discount: recommendedDiscount });
    setCurrentTab('promotions');
  };

  const handleSimulationRun = (results: SimulationResults) => {
    // Optionally update live metrics with simulation projections for demonstration
    setMetrics((prev) => ({
      ...prev,
      monthlyRevenue: results.projectedMonthlyRevenue,
      monthlyOrders: results.projectedMonthlyOrders,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 relative">
      {/* Ambient background glow for high-end aesthetic */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_60%_at_90%_40%,rgba(99,102,241,0.08),rgba(255,255,255,0))]" />

      {/* Top Navbar */}
      <Navbar
        onOpenTour={() => setIsTourOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        monthlyRevenue={metrics.monthlyRevenue}
        repeatRate={metrics.repeatPurchaseRate}
        cancellationRate={metrics.cancellationRate}
        deliveryTime={metrics.averageDeliveryTime}
        supportTickets={metrics.monthlySupportTickets}
        unusedCouponRate={metrics.unusedCouponRate}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Container with Sidebar & Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          openOrdersAtRisk={openOrdersAtRisk}
          openTickets={openTicketsCount}
          lowStockItemsCount={lowStockItemsCount}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 pb-28 sm:pb-8">
          {currentTab === 'executive' && (
            <ExecutiveDashboard
              metrics={metrics}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'customer_intelligence' && (
            <CustomerIntelligence
              segments={segments}
              onLaunchCampaignForSegment={handleLaunchCampaignForSegment}
            />
          )}

          {currentTab === 'inventory' && (
            <SmartInventory
              inventory={inventory}
              onUpdateInventory={(updated) => setInventory(updated)}
            />
          )}

          {currentTab === 'order_rescue' && (
            <OrderRescue
              orders={orders}
              onUpdateOrders={(updated) => setOrders(updated)}
            />
          )}

          {currentTab === 'promotions' && (
            <SmartPromotions
              campaigns={campaigns}
              onUpdateCampaigns={(updated) => setCampaigns(updated)}
              prefillSegment={campaignPrefill?.segment}
              prefillDiscount={campaignPrefill?.discount}
            />
          )}

          {currentTab === 'support' && (
            <SupportTickets
              tickets={tickets}
              onUpdateTickets={(updated) => setTickets(updated)}
            />
          )}

          {currentTab === 'simulator' && (
            <BusinessSimulator
              baselineMetrics={INITIAL_METRICS}
              onSimulationRun={handleSimulationRun}
            />
          )}

          {currentTab === 'action_plan' && (
            <ActionPlanAndBudget
              initiatives={initiatives}
              onUpdateInitiatives={(updated) => setInitiatives(updated)}
            />
          )}

          {currentTab === 'recommendations' && (
            <RecommendationEngine
              recommendations={recommendations}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {/* Google Maps Grounding Feature (gemini-3.5-flash with googleMaps tool) */}
          {currentTab === 'store_radar' && <StoreRadarMaps />}

          {/* Google Search Grounding Feature (gemini-3.5-flash with googleSearch tool) */}
          {currentTab === 'market_trends' && <MarketTrendsSearch />}

          {/* Veo Video Generations Feature (veo-3.1-fast-generate-preview) */}
          {currentTab === 'promo_studio' && <PromoVideoStudio />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenDrawer={() => setIsMobileDrawerOpen(true)}
        openOrdersAtRisk={openOrdersAtRisk}
        lowStockCount={lowStockItemsCount}
        openTickets={openTicketsCount}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTour={() => setIsTourOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        openTickets={openTicketsCount}
        monthlyRevenue={metrics.monthlyRevenue}
        repeatRate={metrics.repeatPurchaseRate}
        cancellationRate={metrics.cancellationRate}
        deliveryTime={metrics.averageDeliveryTime}
      />

      {/* Competition Tour Modal (Guided demo journey for judges) */}
      <CompetitionTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenReport={() => {
          setIsTourOpen(false);
          setIsReportOpen(true);
        }}
      />

      {/* Comprehensive Business Impact Report Modal */}
      <ImpactReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        metrics={metrics}
        initiatives={initiatives}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
