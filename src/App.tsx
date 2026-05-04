import type { ReactElement } from 'react'
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
import Retail from '@/pages/solutions/industries/Retail'
import Banking from '@/pages/solutions/industries/Banking'
import Insurance from '@/pages/solutions/industries/Insurance'
import AirportRetail from '@/pages/solutions/industries/AirportRetail'
import Logistics from '@/pages/solutions/industries/Logistics'
import Telecommunications from '@/pages/solutions/industries/Telecommunications'
import Tourism from '@/pages/solutions/industries/Tourism'
import RealEstate from '@/pages/solutions/industries/RealEstate'
import OilAndGas from '@/pages/solutions/industries/OilAndGas'
import PortAuthority from '@/pages/solutions/industries/PortAuthority'
import LawEnforcement from '@/pages/solutions/industries/LawEnforcement'
import Manufacturing from '@/pages/solutions/industries/Manufacturing'
import Agriculture from '@/pages/solutions/industries/Agriculture'
import RiskManagement from '@/pages/solutions/department/RiskManagement'
import ITServices from '@/pages/solutions/department/ITServices'
import HRResources from '@/pages/solutions/department/HRResources'
import ConsultingServices from '@/pages/solutions/department/ConsultingServices'
import CrossAndUpSelling from '@/pages/solutions/department/CrossAndUpSelling'
import EnergyDistribution from '@/pages/solutions/department/EnergyDistribution'
import PriceForecastingRetail from '@/pages/solutions/department/PriceForecastingRetail'
import MobileDashboards from '@/pages/solutions/department/MobileDashboards'
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
import Industry40 from '@/pages/solutions/domain/Industry40'
import SmartCity from '@/pages/solutions/domain/SmartCity'
import SmartBuilding from '@/pages/solutions/domain/SmartBuilding'
import RiskAssessmentEngine from '@/pages/solutions/domain/RiskAssessmentEngine'

const ROUTES: Array<{ path: string; element: ReactElement }> = [
  // Phoenix AIP
  { path: 'phoenix-aip/cortexus',             element: <Cortexus /> },
  { path: 'phoenix-aip/phoenix-insights',     element: <PhoenixInsights /> },
  { path: 'phoenix-aip/spotlight-lakehouse',  element: <SpotlightLakehouse /> },
  { path: 'phoenix-aip/dataforge',            element: <Dataforge /> },

  // Platforms
  { path: 'platforms/instabi',                element: <InstaBI /> },
  { path: 'platforms/eagle-eye',              element: <EagleEye /> },
  { path: 'platforms/reporting-system',       element: <ReportingSystem /> },
  { path: 'platforms/globes',                 element: <Globes /> },
  { path: 'platforms/foresight',              element: <Foresight /> },
  { path: 'platforms/falcon',                 element: <Falcon /> },
  { path: 'platforms/ezdata',                 element: <EzData /> },
  { path: 'platforms/memdb',                  element: <MemDB /> },
  { path: 'platforms/smart-data-governance',  element: <SmartDataGovernance /> },
  { path: 'platforms/excel-automation',       element: <ExcelAutomation /> },
  { path: 'platforms/spotlight-bda',          element: <SpotlightBDA /> },
  { path: 'platforms/ezsync',                 element: <EzSync /> },

  // About
  { path: 'services',                         element: <Services /> },
  { path: 'partners',                         element: <Partners /> },
  { path: 'about/company',                    element: <Company /> },
  { path: 'about/contact',                    element: <Contact /> },

  // Industries
  { path: 'industries/retail',                element: <Retail /> },
  { path: 'industries/banking',               element: <Banking /> },
  { path: 'industries/insurance',             element: <Insurance /> },
  { path: 'industries/airport-retail',        element: <AirportRetail /> },
  { path: 'industries/logistics',             element: <Logistics /> },
  { path: 'industries/telecommunications',    element: <Telecommunications /> },
  { path: 'industries/tourism',               element: <Tourism /> },
  { path: 'industries/real-estate',           element: <RealEstate /> },
  { path: 'industries/oil-and-gas',           element: <OilAndGas /> },
  { path: 'industries/port-authority',        element: <PortAuthority /> },
  { path: 'industries/law-enforcement',       element: <LawEnforcement /> },
  { path: 'industries/manufacturing',         element: <Manufacturing /> },
  { path: 'industries/agriculture',           element: <Agriculture /> },

  // Departments
  { path: 'department/risk-management',       element: <RiskManagement /> },
  { path: 'department/it-services',           element: <ITServices /> },
  { path: 'department/hr-resources',          element: <HRResources /> },
  { path: 'department/consulting-services',   element: <ConsultingServices /> },
  { path: 'department/cross-and-up-selling',  element: <CrossAndUpSelling /> },
  { path: 'department/energy-distribution',   element: <EnergyDistribution /> },
  { path: 'department/price-forecasting-retail', element: <PriceForecastingRetail /> },
  { path: 'department/mobile-dashboards',     element: <MobileDashboards /> },

  // Domains
  { path: 'domain/industry-4-0',              element: <Industry40 /> },
  { path: 'domain/smart-city',                element: <SmartCity /> },
  { path: 'domain/smart-building',            element: <SmartBuilding /> },
  { path: 'domain/risk-assessment-engine',    element: <RiskAssessmentEngine /> },
]

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  )
}
