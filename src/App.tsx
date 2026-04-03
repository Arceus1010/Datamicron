import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import Cortexus from '@/pages/phoenix-aip/Cortexus'
import PhoenixInsights from '@/pages/phoenix-aip/PhoenixInsights'
import SpotlightLakehouse from '@/pages/phoenix-aip/SpotlightLakehouse'
import Dataforge from '@/pages/phoenix-aip/Dataforge'
import Services from '@/pages/about/Services'
import Partners from '@/pages/Partners'
import Company from '@/pages/about/Company'
import Contact from '@/pages/about/Contact'

// Industries
import Retail from '@/pages/industries/Retail'
import Banking from '@/pages/industries/Banking'
import Insurance from '@/pages/industries/Insurance'
import AirportRetail from '@/pages/industries/AirportRetail'
import Logistics from '@/pages/industries/Logistics'
import Telecommunications from '@/pages/industries/Telecommunications'
import Tourism from '@/pages/industries/Tourism'
import RealEstate from '@/pages/industries/RealEstate'
import OilAndGas from '@/pages/industries/OilAndGas'
import PortAuthority from '@/pages/industries/PortAuthority'
import LawEnforcement from '@/pages/industries/LawEnforcement'
import Manufacturing from '@/pages/industries/Manufacturing'
import Agriculture from '@/pages/industries/Agriculture'

// Departments
import RiskManagement from '@/pages/department/RiskManagement'
import ITServices from '@/pages/department/ITServices'
import HRResources from '@/pages/department/HRResources'
import ConsultingServices from '@/pages/department/ConsultingServices'
import CrossAndUpSelling from '@/pages/department/CrossAndUpSelling'
import EnergyDistribution from '@/pages/department/EnergyDistribution'
import PriceForecastingRetail from '@/pages/department/PriceForecastingRetail'
import MobileDashboards from '@/pages/department/MobileDashboards'

// Platforms
import InstaBI from '@/pages/platforms/InstaBI'
import EagleEye from '@/pages/platforms/EagleEye'
import ReportingSystem from '@/pages/platforms/ReportingSystem'
import Globes from '@/pages/platforms/Globes'
import Foresight from '@/pages/platforms/Foresight'
import Falcon from '@/pages/platforms/Falcon'
import EzData from '@/pages/platforms/EzData'
import MemDB from '@/pages/platforms/MemDB'
import SmartDataGovernance from '@/pages/platforms/SmartDataGovernance'
import ExcelAutomation from '@/pages/platforms/ExcelAutomation'
import SpotlightBDA from '@/pages/platforms/SpotlightBDA'
import EzSync from '@/pages/platforms/EzSync'

// Domains
import Industry40 from '@/pages/domain/Industry40'
import SmartCity from '@/pages/domain/SmartCity'
import SmartBuilding from '@/pages/domain/SmartBuilding'
import RiskAssessmentEngine from '@/pages/domain/RiskAssessmentEngine'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="phoenix-aip/cortexus" element={<Cortexus />} />
        <Route path="phoenix-aip/phoenix-insights" element={<PhoenixInsights />} />
        <Route path="phoenix-aip/spotlight-lakehouse" element={<SpotlightLakehouse />} />
        <Route path="phoenix-aip/dataforge" element={<Dataforge />} />
        <Route path="platforms/instabi" element={<InstaBI />} />
        <Route path="platforms/eagle-eye" element={<EagleEye />} />
        <Route path="platforms/reporting-system" element={<ReportingSystem />} />
        <Route path="platforms/globes" element={<Globes />} />
        <Route path="platforms/foresight" element={<Foresight />} />
        <Route path="platforms/falcon" element={<Falcon />} />
        <Route path="platforms/ezdata" element={<EzData />} />
        <Route path="platforms/memdb" element={<MemDB />} />
        <Route path="platforms/smart-data-governance" element={<SmartDataGovernance />} />
        <Route path="platforms/excel-automation" element={<ExcelAutomation />} />
        <Route path="platforms/spotlight-bda" element={<SpotlightBDA />} />
        <Route path="platforms/ezsync" element={<EzSync />} />
        <Route path="services" element={<Services />} />
        <Route path="partners" element={<Partners />} />
        <Route path="about/company" element={<Company />} />
        <Route path="about/contact" element={<Contact />} />

        {/* Industries */}
        <Route path="industries/retail" element={<Retail />} />
        <Route path="industries/banking" element={<Banking />} />
        <Route path="industries/insurance" element={<Insurance />} />
        <Route path="industries/airport-retail" element={<AirportRetail />} />
        <Route path="industries/logistics" element={<Logistics />} />
        <Route path="industries/telecommunications" element={<Telecommunications />} />
        <Route path="industries/tourism" element={<Tourism />} />
        <Route path="industries/real-estate" element={<RealEstate />} />
        <Route path="industries/oil-and-gas" element={<OilAndGas />} />
        <Route path="industries/port-authority" element={<PortAuthority />} />
        <Route path="industries/law-enforcement" element={<LawEnforcement />} />
        <Route path="industries/manufacturing" element={<Manufacturing />} />
        <Route path="industries/agriculture" element={<Agriculture />} />

        {/* Departments */}
        <Route path="department/risk-management" element={<RiskManagement />} />
        <Route path="department/it-services" element={<ITServices />} />
        <Route path="department/hr-resources" element={<HRResources />} />
        <Route path="department/consulting-services" element={<ConsultingServices />} />
        <Route path="department/cross-and-up-selling" element={<CrossAndUpSelling />} />
        <Route path="department/energy-distribution" element={<EnergyDistribution />} />
        <Route path="department/price-forecasting-retail" element={<PriceForecastingRetail />} />
        <Route path="department/mobile-dashboards" element={<MobileDashboards />} />

        {/* Domains */}
        <Route path="domain/industry-4-0" element={<Industry40 />} />
        <Route path="domain/smart-city" element={<SmartCity />} />
        <Route path="domain/smart-building" element={<SmartBuilding />} />
        <Route path="domain/risk-assessment-engine" element={<RiskAssessmentEngine />} />
      </Route>
    </Routes>
  )
}
