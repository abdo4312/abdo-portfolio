// src/data/caseStudies.ts
import type { GalleryImage } from './projects'

import homeImg from '../assets/images/projects/road-to-islam/01-home.png'
import prayerTimesImg from '../assets/images/projects/road-to-islam/02-prayer-times.png'
import splashImg from '../assets/images/projects/road-to-islam/03-splash.png'
import mosquesMapImg from '../assets/images/projects/road-to-islam/04-mosques-map.png'
import qiblaImg from '../assets/images/projects/road-to-islam/05-qibla.png'
import knowledgeQaImg from '../assets/images/projects/road-to-islam/06-knowledge-qa.png'
import findMentorImg from '../assets/images/projects/road-to-islam/07-find-mentor.png'
import adminDashboardImg from '../assets/images/projects/road-to-islam/08-admin-dashboard.png'
import settingsAccountImg from '../assets/images/projects/road-to-islam/09-settings-account.png'
import settingsPreferencesImg from '../assets/images/projects/road-to-islam/10-settings-preferences.png'
import learnProgramImg from '../assets/images/projects/road-to-islam/11-learn-program.png'

// Content policy: every technical claim below is backed by the research report
// on the actual Road to Islam codebase (file + class/function evidence).
// No unverified numbers, dates or stack names may be added here.

export type StationDifficulty = 'standard' | 'medium' | 'complex'

export interface CaseStudyStation {
  id: string
  slot: string
  title: string
  difficulty: StationDifficulty
  images: GalleryImage[]
  insight: string
}

export interface CaseStudyFeature {
  label: string
  text: string
  evidence: string
}

export interface CaseStudyChallengePiece {
  index: string
  title: string
  text: string
  evidence: string
}

export interface CaseStudyPlaybackMode {
  mode: string
  behavior: string
}

export interface CaseStudyContent {
  slug: string
  slot: string
  title: string
  summary: string
  meta: { label: string; value: string }[]
  overview: string[]
  role: string
  roleDetail: string
  stack: string[]
  features: CaseStudyFeature[]
  stations: CaseStudyStation[]
  challenge: {
    title: string
    intro: string
    pieces: CaseStudyChallengePiece[]
    playbackModes: CaseStudyPlaybackMode[]
    playbackModesNote: string
  }
  results: string[]
  nextProject: {
    title: string
    tagline: string
    note: string
    href: string
  }
}

export const caseStudies: CaseStudyContent[] = [
  {
    slug: 'road-to-islam',
    slot: 'A-02',
    title: 'Road to Islam',
    summary:
      'A two-layer Android app for daily Islamic practice — prayer times, nearby mosques, Qibla, mentorship and a 30-day learning program — with a React web layer on top of a native Java core that exists to make the adhan unskippable.',
    meta: [
      { label: 'PLATFORM', value: 'ANDROID · MOBILE' },
      { label: 'TYPE', value: 'COMPANION APP' },
      { label: 'LANGUAGES', value: 'EN · AR · FR · TR · UR' },
      { label: 'STATUS', value: 'ACTIVELY MAINTAINED' },
    ],
    overview: [
      'Road to Islam bundles the daily essentials of Muslim religious practice into one Android app: prayer times for the user’s city, nearby mosques on a live map, a Qibla compass, a mentor-request flow, a public knowledge Q&A, and a 30-day structured learning program.',
      'It is a two-layer system. The interface is a React and TypeScript web layer; behind it sits a native Java layer that owns everything the web layer cannot guarantee — exact alarm scheduling, recovery after device reboots, and the full-screen adhan overlay. The split is visible in the module map: services and hooks on the web side (prayerAPI.ts, useMosques.ts, useQibla.ts, useProgress.ts), schedulers, receivers and players on the native side.',
      'The app ships in five languages — English, Arabic, French, Turkish and Urdu — with full right-to-left layouts for Arabic and Urdu.',
    ],
    role: 'Solo developer — React web layer + native Android layer',
    roleDetail:
      'Architecture and UI, the Supabase schema and data flow, and the native scheduling chain: PrayerScheduler, BootReceiver, PrayerRescheduleWorker, AdhanOverlayManager and AdhanPlayerService.',
    stack: [
      'React',
      'TypeScript',
      'Supabase',
      'Leaflet (CDN)',
      'Aladhan API',
      'Overpass API (OpenStreetMap)',
      'Native Java — AlarmManager · WorkManager · WindowManager',
    ],
    features: [
      {
        label: 'Reliable adhan alarms',
        text: 'The adhan fires at the exact prayer time whether the app is in the foreground, swiped away, or the phone has just rebooted — four cooperating mechanisms make that guarantee.',
        evidence:
          'PrayerScheduler.java · BootReceiver.java · PrayerRescheduleWorker.java · AdhanOverlayManager.java — detailed in 05 — TECHNICAL CHALLENGE',
      },
      {
        label: 'Prayer times',
        text: 'Fetched from the Aladhan API by city or by coordinates, with a calculation-method parameter, and held in a registered PWA cache so the list survives without a fresh network call.',
        evidence:
          'src/services/prayerAPI.ts — fetchPrayerData() · fetchPrayerDataByCoords() · vite.config.ts — aladhan-api-cache',
      },
      {
        label: 'Nearby mosques',
        text: 'A live OpenStreetMap query — places of worship tagged religion=muslim within a radius of the user — rendered on Leaflet, with distances computed and results sorted and filtered on-device.',
        evidence:
          'src/hooks/useMosques.ts — findMosques() · src/screens/MosquesScreen.tsx — window.L',
      },
      {
        label: 'Qibla compass',
        text: 'The bearing to the Kaaba is computed with the Great Circle formula against fixed coordinates, driven by device-orientation events from the web layer — webkitCompassHeading on iOS, alpha on Android.',
        evidence:
          'src/hooks/useQibla.ts — calculateQiblaBearing() · KAABA_LAT / KAABA_LON',
      },
      {
        label: 'Mentor program',
        text: 'Students pick a mentor and send a request with their question; the mentor’s WhatsApp contact is revealed only after the request is approved.',
        evidence:
          'Supabase — profiles (role = mentor) · mentor_requests · RPC get_mentor_whatsapp()',
      },
      {
        label: 'Knowledge Q&A',
        text: 'Questions carry a category, a public flag and an answer with author and timestamp; a notification is written when an answer lands.',
        evidence: 'Supabase — questions · notifications',
      },
      {
        label: '30-day learning program',
        text: 'Local-first by design: the day counter lives in localStorage and only syncs to the cloud for signed-in users.',
        evidence:
          "src/hooks/useProgress.ts · src/lib/syncService.ts — 'user_progress_days' → user_journey",
      },
    ],
    stations: [
      {
        id: 'onboarding',
        slot: 'STA-01',
        title: 'Onboarding',
        difficulty: 'standard',
        images: [
          { src: splashImg, caption: 'App splash screen' },
          { src: homeImg, caption: 'Home — greeting, next prayer, daily progress' },
        ],
        insight:
          'Splash into a home screen that surfaces the next prayer and the day’s program progress. Pure interface work — every Java module on record in this codebase serves the alarm and overlay chain, so nothing on this path crosses the bridge.',
      },
      {
        id: 'prayer-times',
        slot: 'STA-02',
        title: 'Prayer Times',
        difficulty: 'complex',
        images: [{ src: prayerTimesImg, caption: 'Prayer times list with city and date' }],
        insight:
          'Times come from the Aladhan API (timingsByCity / timings) — no local Adhan calculation library exists in the project — and responses are held in the aladhan-api-cache PWA cache registered in vite.config.ts. Marked complex not for the fetch itself, but because the native alarm chain depends on this data being right.',
      },
      {
        id: 'mosques-map',
        slot: 'STA-03',
        title: 'Mosques Map',
        difficulty: 'medium',
        images: [{ src: mosquesMapImg, caption: 'Mosques near you — map view' }],
        insight:
          'Leaflet is loaded from a CDN and used through window.L rather than an npm dependency, and the mosques are a live Overpass API query against OpenStreetMap: nodes tagged amenity=place_of_worship and religion=muslim within a radius. Distance calculation, sorting and filtering all happen client-side in useMosques.ts.',
      },
      {
        id: 'qibla',
        slot: 'STA-04',
        title: 'Qibla',
        difficulty: 'medium',
        images: [{ src: qiblaImg, caption: 'Qibla direction compass' }],
        insight:
          'The bearing is pure math — the Great Circle formula against fixed Kaaba coordinates in calculateQiblaBearing() — but the heading comes from browser-level device orientation (webkitCompassHeading on iOS, alpha on Android), so the real difficulty is cross-platform sensor behavior, not trigonometry.',
      },
      {
        id: 'community',
        slot: 'STA-05',
        title: 'Community',
        difficulty: 'standard',
        images: [
          { src: findMentorImg, caption: 'Find a mentor' },
          { src: knowledgeQaImg, caption: 'Knowledge & Q&A section' },
        ],
        insight:
          'Standard Supabase CRUD with one deliberate gate: mentor contact details sit behind the get_mentor_whatsapp() RPC and appear only after a request is approved. The Q&A side reads the questions table and writes a notification when an answer lands.',
      },
      {
        id: 'learning-program',
        slot: 'STA-06',
        title: 'Learning Program',
        difficulty: 'standard',
        images: [{ src: learnProgramImg, caption: '30-day learning program' }],
        insight:
          "A local-first decision: the day counter’s primary source is localStorage ('user_progress_days'), and syncing to the Supabase user_journey table happens only for signed-in users. A notable architecture call, but standard complexity in execution — which is why it is not flagged complex.",
      },
      {
        id: 'admin',
        slot: 'STA-07',
        title: 'Admin',
        difficulty: 'standard',
        images: [{ src: adminDashboardImg, caption: 'Admin dashboard (Arabic RTL)' }],
        insight:
          'The operations side of the same Supabase schema the student-facing screens read from — lectures, users and questions, managed in a right-to-left Arabic layout.',
      },
      {
        id: 'settings',
        slot: 'STA-08',
        title: 'Settings',
        difficulty: 'standard',
        images: [
          { src: settingsAccountImg, caption: 'Settings — account & preferences' },
          { src: settingsPreferencesImg, caption: 'Settings — spiritual tools & support' },
        ],
        insight:
          'Account and preference screens. One preference is native-backed: the adhan playback mode — full, short or silent — is persisted through PrayerDataStore.java rather than web storage.',
      },
    ],
    challenge: {
      title: 'Making the adhan unskippable',
      intro:
        'One requirement shaped the entire native layer: the adhan must fire at the exact prayer time whether the app is in the foreground, swiped away, or the phone has just rebooted. Android works against all three — Doze mode defers background work, killed apps lose their alarms, and a reboot wipes them entirely. Four mechanisms cooperate, each covering a different failure mode.',
      pieces: [
        {
          index: '01',
          title: 'Exact alarms',
          text: 'Alarms are scheduled with AlarmManager.setExactAndAllowWhileIdle — in both PrayerScheduler.java and PrayerCountdownService.java — so they are permitted to fire inside Doze windows. Notably, setAlarmClock is never used; the app stays on the exact-alarm API.',
          evidence:
            'AlarmManager.setExactAndAllowWhileIdle — PrayerScheduler.java · PrayerCountdownService.java',
        },
        {
          index: '02',
          title: 'Boot persistence',
          text: 'A reboot clears every scheduled alarm, so BootReceiver.java listens for BOOT_COMPLETED, MY_PACKAGE_REPLACED and QUICKBOOT_POWERON and rebuilds the schedule from scratch: PrayerScheduler.scheduleNextAlarms(), PrayerCountdownWorker.start() and PrayerRescheduleWorker.start().',
          evidence:
            'BootReceiver.java — ACTION_BOOT_COMPLETED · MY_PACKAGE_REPLACED · QUICKBOOT_POWERON',
        },
        {
          index: '03',
          title: 'Full-screen overlay',
          text: 'When the app is not in the foreground, AdhanPlayerService.java hands playback to AdhanOverlayManager.java, which draws over whatever is on screen through WindowManager — TYPE_APPLICATION_OVERLAY on API 26+, falling back to TYPE_SYSTEM_OVERLAY on older devices.',
          evidence:
            'AdhanOverlayManager.java — WindowManager · TYPE_APPLICATION_OVERLAY / TYPE_SYSTEM_OVERLAY',
        },
        {
          index: '04',
          title: 'Periodic safety net',
          text: "Anything the first three mechanisms miss, the safety net catches: a WorkManager PeriodicWorkRequest runs PrayerRescheduleWorker every hour under the unique work name 'prayer_reschedule_safety_net' and re-validates the schedule.",
          evidence:
            "WorkManager — PeriodicWorkRequest · 'prayer_reschedule_safety_net'",
        },
      ],
      playbackModes: [
        { mode: 'FULL', behavior: 'Complete adhan audio — the default mode.' },
        {
          mode: 'SHORT',
          behavior: 'About 27-39 seconds depending on the muezzin — a custom cutoff per muezzin (SHORT_CUT_MS).',
        },
        {
          mode: 'SILENT',
          behavior: 'No adhan audio — a ringtone or beep repeated up to 6 times.',
        },
      ],
      playbackModesNote:
        'Stored via PrayerDataStore.java · playback logic in AdhanPlayerService.java',
    },
    results: [
      'The adhan chain holds across Doze mode, app kills, package replacement and device reboots — four mechanisms with overlapping coverage.',
      'Prayer times survive without a fresh network call: the Aladhan endpoint is served from the registered aladhan-api-cache PWA cache.',
      'Mosque discovery needs no backend of its own — live OpenStreetMap data via Overpass, filtered and sorted on-device.',
      'Five languages from one codebase, with full right-to-left layouts for Arabic and Urdu.',
      'The 30-day program tracks progress locally even before sign-in, syncing to the cloud only for authenticated users.',
    ],
    nextProject: {
      title: 'Aroma Corner',
      tagline: 'Coffee storefront & Box Builder — React · Zustand · TanStack Query',
      note: 'FRONTEND SHOWCASE · MOCK DATA',
      href: '/work/aroma',
    },
  },
]

export const getCaseStudyBySlug = (
  slug: string | undefined,
): CaseStudyContent | undefined =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug)
