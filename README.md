🇬🇧 [English](#-english) | 🇷🇺 [Русский](#-русский)

---

# 🇬🇧 English

# 📐 Pasha — Math Learning Journey

An interactive, gamified math-learning web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Designed as a personal math tutor for Pasha, it turns olympiad-level math practice into an adventure game inspired by *Hollow Knight*.

## ✨ Features

- **🗺️ Island World Map** — four themed islands to explore:
  - **Number Theory** — divisibility, primes, GCD/LCM
  - **Algebra** — percents, equations, polynomials, progressions
  - **Combinatorics** — counting principles, probability, logic
  - **Geometry** — angles, triangles, circles, coordinate geometry
- **⭐ Star Rating System** — earn up to 3 stars per subtopic (90 stars total across 30 subtopics)
- **🎭 Evolving Hero Avatar** — character evolves through 4 levels as you progress (Beginner → Advanced → Master → Hero)
- **📊 Player HUD** — real-time dashboard showing stars, level, XP, and daily streak
- **🔥 Streak Tracking** — tracks daily practice consistency
- **📝 Problem Generator** — math problems across all four categories
- **💾 Local Progress** — progress saved in localStorage

## 📂 Project Structure

```
Pasha/
├── math-journey/            # Next.js application
│   ├── app/                 # App router (layout, page, styles)
│   ├── components/          # React components
│   │   ├── WorldMap.tsx     # Main island map
│   │   ├── PlayerHUD.tsx    # Stats dashboard
│   │   ├── TopicNode.tsx    # Topic nodes on the map
│   │   ├── TopicModal.tsx   # Topic detail & problem view
│   │   ├── HeroModal.tsx    # Hero avatar display
│   │   └── StreakModal.tsx   # Streak information
│   ├── data/                # Topics & problem banks
│   │   ├── topics.ts        # 30 subtopics across 4 islands
│   │   └── problems/        # Problems: algebra, geometry, combinatorics, number theory
│   ├── lib/                 # Business logic
│   │   ├── progress.ts      # Progress & stats management
│   │   ├── studentProgress.ts
│   │   ├── loadStudentProgress.ts
│   │   └── problemGenerator.ts
│   └── types/               # TypeScript type definitions
├── IMPROVEMENT_PLAN.md      # Roadmap: achievements, bosses, hints, leaderboards
├── *.pdf                    # Printable math worksheets & lesson plans
└── .github/workflows/       # CI/CD: auto-deploy to GitHub Pages
```

## 🚀 Getting Started

```bash
cd math-journey
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework with App Router |
| React 19 | UI library |
| TypeScript 5 | Type safety |
| Tailwind CSS 4 | Styling |
| localStorage | Client-side progress persistence |
| GitHub Pages | Deployment |

## 🌐 Deployment

The app auto-deploys to **GitHub Pages** on every push to `main` via a GitHub Actions workflow. The built static export is served from the `math-journey/out` directory.

## 📄 Math Materials (PDFs)

| File | Description |
|---|---|
| `1 этап - пример заданий.pdf` | Stage 1 — sample tasks |
| `2 этап - пример заданий.pdf` | Stage 2 — sample tasks |
| `Контрольная_для_печати.pdf` | Printable test/quiz |
| `План_урока_для_печати.pdf` | Printable lesson plan |

---

# 🇷🇺 Русский

# 📐 Pasha — Математическое Путешествие

Интерактивное веб-приложение для изучения математики с элементами геймификации, построенное на **Next.js**, **TypeScript** и **Tailwind CSS**. Создано как персональный математический тренажёр для Паши — превращает подготовку к олимпиадам в приключенческую игру в стиле *Hollow Knight*.

## ✨ Возможности

- **🗺️ Карта мира с островами** — четыре тематических острова:
  - **Теория чисел** — делимость, простые числа, НОД/НОК
  - **Алгебра** — проценты, уравнения, многочлены, прогрессии
  - **Комбинаторика** — принципы счёта, вероятность, логика
  - **Геометрия** — углы, треугольники, окружности, координатная геометрия
- **⭐ Система звёзд** — до 3 звёзд за каждую подтему (всего 90 звёзд по 30 подтемам)
- **🎭 Эволюция аватара** — персонаж развивается через 4 уровня (Beginner → Advanced → Master → Hero)
- **📊 HUD игрока** — панель с текущими звёздами, уровнем, опытом и стриком
- **🔥 Отслеживание стрика** — учёт ежедневных занятий
- **📝 Генератор задач** — математические задачи по всем четырём категориям
- **💾 Локальное сохранение** — прогресс хранится в localStorage

## 📂 Структура проекта

```
Pasha/
├── math-journey/            # Приложение Next.js
│   ├── app/                 # App Router (layout, страница, стили)
│   ├── components/          # React-компоненты
│   │   ├── WorldMap.tsx     # Главная карта островов
│   │   ├── PlayerHUD.tsx    # Панель статистики
│   │   ├── TopicNode.tsx    # Узлы тем на карте
│   │   ├── TopicModal.tsx   # Модальное окно темы и задач
│   │   ├── HeroModal.tsx    # Отображение аватара героя
│   │   └── StreakModal.tsx   # Информация о стрике
│   ├── data/                # Темы и банки задач
│   │   ├── topics.ts        # 30 подтем на 4 островах
│   │   └── problems/        # Задачи: алгебра, геометрия, комбинаторика, теория чисел
│   ├── lib/                 # Бизнес-логика
│   │   ├── progress.ts      # Управление прогрессом и статистикой
│   │   ├── studentProgress.ts
│   │   ├── loadStudentProgress.ts
│   │   └── problemGenerator.ts
│   └── types/               # Определения типов TypeScript
├── IMPROVEMENT_PLAN.md      # Дорожная карта: достижения, боссы, подсказки, лидерборды
├── *.pdf                    # Печатные материалы: задания и планы уроков
└── .github/workflows/       # CI/CD: авто-деплой на GitHub Pages
```

## 🚀 Быстрый старт

```bash
cd math-journey
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 🛠️ Технологии

| Технология | Назначение |
|---|---|
| Next.js 16 | React-фреймворк с App Router |
| React 19 | Библиотека UI |
| TypeScript 5 | Типизация |
| Tailwind CSS 4 | Стилизация |
| localStorage | Сохранение прогресса на клиенте |
| GitHub Pages | Деплой |

## 🌐 Деплой

Приложение автоматически разворачивается на **GitHub Pages** при каждом пуше в ветку `main` через GitHub Actions. Статическая сборка отдаётся из директории `math-journey/out`.

## 📄 Математические материалы (PDF)

| Файл | Описание |
|---|---|
| `1 этап - пример заданий.pdf` | 1-й этап — примеры заданий |
| `2 этап - пример заданий.pdf` | 2-й этап — примеры заданий |
| `Контрольная_для_печати.pdf` | Контрольная работа для печати |
| `План_урока_для_печати.pdf` | План урока для печати |
