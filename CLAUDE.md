# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npx expo start          # Start dev server
npx expo start --ios    # Start on iOS simulator
npx expo start --android # Start on Android emulator
npx expo lint           # Run ESLint
```

No test framework is currently configured.

## Architecture

React Native app built with Expo SDK 54, using expo-router for file-based routing and expo-sqlite (v16) for local data storage.

### Routing

- `app/_layout.tsx` — Root layout: sets up SQLiteProvider, ThemeProvider, and Stack navigator
- `app/(tabs)/_layout.tsx` — Tab layout using `NativeTabs` (expo-router unstable API) with Home and Settings tabs
- `app/(tabs)/index.tsx` — Todo screen (form + list), manages `refreshKey` state to coordinate child component refreshes
- `app/(tabs)/setting.tsx` — Settings placeholder

### Data Flow

SQLite is the primary data source. Components access the database directly via `useSQLiteContext()` hook and execute raw SQL queries (`db.runAsync`, `db.getAllAsync`).

Refresh pattern: Parent holds a `refreshKey` counter. Creating or deleting a todo increments the key, which triggers `useEffect` in `TodoList` to re-fetch from SQLite.

### Database

- Database file: `todo.db` with WAL mode
- Migrations in `utils/db.ts` using `PRAGMA user_version`
- Single table: `todos (id INTEGER PRIMARY KEY, title TEXT, content TEXT)`

### Components

- `components/todo-form.tsx` — Create form, calls `onCreated` callback after INSERT
- `components/todo-list.tsx` — Fetches and renders todos, passes `onDeleted` to items
- `components/todo-item.tsx` — Displays todo, long-press triggers delete with Alert confirmation
- `components/api-components/` — Alternative API-based components (not used in active routes), point to a Cloudflare Workers endpoint

### Key Conventions

- Path alias: `@/*` maps to project root (e.g., `@/components/todo-form`)
- UI text is in Japanese
- Strict TypeScript enabled
- ESLint with expo flat config; VSCode auto-fixes and organizes imports on save
- Fonts: `font-noto-regular` and `font-noto-bold` (defined in `constants/theme.ts`)
- Theme colors for light/dark mode defined in `constants/theme.ts`, accessed via `useThemeColor` hook
