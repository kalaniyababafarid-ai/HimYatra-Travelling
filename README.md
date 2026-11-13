# HimYatra — Premium Himachal & Uttarakhand Travel Platform

A modern, responsive, high-performance travel and hospitality website for **HimYatra** based in Himachal Pradesh, specializing in curated tours across **Himachal Pradesh** and **Uttarakhand** for Indian travelers.

Built with **React 19**, **Vue 3** (micro-frontend / islands architecture), **Tailwind CSS**, and backed by **Supabase**.

---

## 🌟 Highlights & Features

- **Architectural Luxury Design**: Tailored visual aesthetic featuring sunlit Himalayan chalets, cedar wood lodges, and alpine valleys.
- **Dual React + Vue 3 Architecture**:
  - React 19 handles the layout, bento grids, responsive navigation, and modal dialogues.
  - Vue 3 powers the floating multi-category search widget and the interactive 50% mountain tour cost estimator.
- **Zero-Token "Send Inquiry" Flow**: Transparent direct Himachal pricing with instant submission to Supabase backend and pre-filled WhatsApp concierge handoff.
- **Top Curated Circuits**:
  - Manali, Solang & Atal Tunnel
  - Spiti Valley & Chandratal 4x4 Expedition
  - Rishikesh, Mussoorie & Emerald Lakes
  - Auli Snow Slopes & Chopta Alpine Meadows
  - Do Dham Yatra (Kedarnath & Badrinath)
- **Supabase Cloud Backend**:
  - Real-time `public.inquiries` table with Row Level Security (RLS).
  - Secure anonymous inquiry submissions with automated timestamps and regional tagging.
- **Fully Responsive**: Verified for desktop, tablet, and mobile screens with zero horizontal overflow and touch-friendly controls.

---

## 🛠️ Tech Stack

- **Frameworks**: [React 19](https://react.dev/) + [Vue 3](https://vuejs.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Lucide Vue](https://lucide.dev/)
- **Backend / Database**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/kalaniyababafarid-ai/HimYatra-Travelling.git
cd HimYatra-Travelling
npm install
```

### 2. Configure Environment
Create a `.env` file based on `.env.example`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📄 License
Private & proprietary. © HimYatra • Manali, Himachal Pradesh.
