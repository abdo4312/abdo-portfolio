import bookstoreImg from '../assets/images/projects/bookstore.png'
import aromaImg from '../assets/images/projects/aroma.png'
import roadToIslamHome from '../assets/images/projects/road-to-islam/01-home.png'
import roadToIslamPrayerTimes from '../assets/images/projects/road-to-islam/02-prayer-times.png'
import roadToIslamSplash from '../assets/images/projects/road-to-islam/03-splash.png'
import roadToIslamMosquesMap from '../assets/images/projects/road-to-islam/04-mosques-map.png'
import roadToIslamQibla from '../assets/images/projects/road-to-islam/05-qibla.png'
import roadToIslamKnowledgeQa from '../assets/images/projects/road-to-islam/06-knowledge-qa.png'
import roadToIslamFindMentor from '../assets/images/projects/road-to-islam/07-find-mentor.png'
import roadToIslamAdminDashboard from '../assets/images/projects/road-to-islam/08-admin-dashboard.png'
import roadToIslamSettingsAccount from '../assets/images/projects/road-to-islam/09-settings-account.png'
import roadToIslamSettingsPreferences from '../assets/images/projects/road-to-islam/10-settings-preferences.png'
import roadToIslamLearnProgram from '../assets/images/projects/road-to-islam/11-learn-program.png'

export interface ProjectKeyPoint {
  number: number
  text: string
}

export interface GalleryImage {
  src: string
  caption: string
}

export interface Project {
  id: string
  tabLabel: string
  title: string
  viewport: 'desktop' | 'mobile'
  role: string
  stack: string
  keyPoints: ProjectKeyPoint[]
  metric: string
  titleBlock: {
    dwg: string
    version: string
    status: string
  }
  image: string
  gallery?: GalleryImage[]
}

export const projects: Project[] = [
  {
    id: 'bookstore',
    tabLabel: 'A-01 / BOOKSTORE',
    title: 'Bookstore Order Manager',
    viewport: 'desktop',
    role: 'Solo developer — architecture, UI, both backends',
    stack: 'Electron · React · TypeScript · SQLite · Supabase',
    keyPoints: [
      { number: 1, text: 'Dual-backend: SQLite or Supabase via a config flag' },
      { number: 2, text: '7 views, one interface' },
      { number: 3, text: 'PDF / Excel / thermal receipt export' },
    ],
    metric: '100 CUSTOMERS · SEASONAL USE',
    titleBlock: {
      dwg: 'DWG: BOOKSTORE-ORDER-MANAGER',
      version: 'REV: v2.4.0',
      status: 'STATUS: IN PRODUCTION',
    },
    image: bookstoreImg,
  },
  {
    id: 'road-to-islam',
    tabLabel: 'A-02 / ROAD TO ISLAM',
    title: 'Road to Islam',
    viewport: 'mobile',
    role: 'Solo developer — React UI + native Android layer',
    stack: 'React · Capacitor · 17 native Java files',
    keyPoints: [
      { number: 1, text: 'Native Adhan overlay (WindowManager)' },
      { number: 2, text: 'Hourly re-scheduling via WorkManager' },
      { number: 3, text: 'Offline cache, 5-min fresh / 24h stale' },
      { number: 4, text: 'Arabic RTL admin dashboard (lectures, users, questions)' },
    ],
    metric: '5 LANGUAGES · NATIVE ANDROID',
    titleBlock: {
      dwg: 'DWG: ROAD-TO-ISLAM',
      version: 'APK: v1.1',
      status: 'STATUS: ACTIVELY MAINTAINED',
    },
    image: roadToIslamHome,
    gallery: [
      { src: roadToIslamHome, caption: 'Home — greeting, next prayer, daily progress' },
      { src: roadToIslamPrayerTimes, caption: 'Prayer times list with city and date' },
      { src: roadToIslamSplash, caption: 'App splash screen' },
      { src: roadToIslamMosquesMap, caption: 'Mosques near you — map view' },
      { src: roadToIslamQibla, caption: 'Qibla direction compass' },
      { src: roadToIslamKnowledgeQa, caption: 'Knowledge & Q&A section' },
      { src: roadToIslamFindMentor, caption: 'Find a mentor' },
      { src: roadToIslamAdminDashboard, caption: 'Admin dashboard (Arabic RTL)' },
      { src: roadToIslamSettingsAccount, caption: 'Settings — account & preferences' },
      { src: roadToIslamSettingsPreferences, caption: 'Settings — spiritual tools & support' },
      { src: roadToIslamLearnProgram, caption: '30-day learning program' },
    ],
  },
  {
    id: 'aroma',
    tabLabel: 'A-03 / AROMA',
    title: 'Aroma Corner',
    viewport: 'desktop',
    role: 'Product & UX direction — AI-assisted, human-directed',
    stack: 'React · Zustand · TanStack Query · Zod',
    keyPoints: [
      { number: 1, text: 'Two shopping paths — beans & Box Builder' },
      { number: 2, text: 'Cart keeps box contents expandable' },
      { number: 3, text: 'Delivery Preview checkout — demo only' },
    ],
    metric: 'UI/UX & FRONTEND ARCHITECTURE',
    titleBlock: {
      dwg: 'DWG: AROMA-STOREFRONT',
      version: 'MODE: MOCK DATA',
      status: 'STATUS: FRONTEND SHOWCASE',
    },
    image: aromaImg,
  },
]
