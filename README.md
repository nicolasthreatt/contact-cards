# Contact Cards

A React Native contact-card app built with Expo.

The current app is a local-first mobile profile card with:

- a bundled headshot
- a QR code that encodes your vCard contact info
- `Email`, `GitHub`, `LinkedIn`, and `Resume` actions
- an `EN / FR / ES` language switcher

The React Native app under [card/](/Users/nicolasthreatt/contact-cards/card) is now the primary implementation for this repo.

## Project structure

```text
contact-cards/
├── .env.example
├── card/
│   ├── App.js
│   ├── app.config.js
│   ├── package.json
│   ├── assets/
│   │   └── .gitkeep
│   └── src/
│       ├── components/
│       ├── config/
│       ├── i18n/
│       └── utils/
├── README.md
└── .gitignore
```

## Setup

```bash
cp .env.example .env
cd card
npm install
```

Then edit `.env` and set your local values:

```bash
CONTACT_CARD_FULL_NAME=Your Name
CONTACT_CARD_DEFAULT_LANG=en
CONTACT_CARD_TITLE_EN=Your Title
CONTACT_CARD_TITLE_FR=Votre Titre
CONTACT_CARD_TITLE_ES=Tu Titulo
CONTACT_CARD_LOCATION=City, ST
CONTACT_CARD_EMAIL=you@example.com
CONTACT_CARD_GITHUB_URL=https://github.com/yourusername
CONTACT_CARD_LINKEDIN_URL=https://linkedin.com/in/yourusername
```

The React Native app expects these exact local files so Expo can bundle them into the mobile app:

```text
card/assets/headshot.png
card/assets/resume.pdf
```

The `card/assets/` directory is kept in git with `.gitkeep`, but the actual personal files inside it are ignored by git. Expo cannot bundle those assets from a dynamic env path, so the file names need to stay fixed.

## Run

```bash
cd card
npx expo start
```

Then:

- press `i` for the iOS simulator
- press `a` for the Android emulator
- or scan the Expo Go QR code with your phone

## Behavior

- The QR code encodes the vCard directly, so another device can scan it without a hosted backend.
- `Resume` uses the native mobile share sheet for the bundled PDF.
- `Email`, `GitHub`, and `LinkedIn` open with the device's default handlers.

## Notes

- This repo now assumes the React Native app is the main implementation.
- `.env` stays at the repo root and is read by `card/app.config.js`.

## Roadmap

- Keep the current contact card as the core mobile identity surface.
- Add more share targets beyond the vCard flow, such as profile-specific passes or link cards.
- Explore Apple Wallet / pass style experiences for contact and profile sharing once the base flows are stable.
- Replace the Expo prototype with a native Swift or broader mobile implementation later if deeper platform integration becomes necessary.

## Environment Variables

| Variable | Description |
|---|---|
| `CONTACT_CARD_FULL_NAME` | Display name shown on the card and in the vCard payload. |
| `CONTACT_CARD_DEFAULT_LANG` | Default UI language for the card: `en`, `fr`, or `es`. |
| `CONTACT_CARD_TITLE_EN` | English title shown on the card and used in the vCard payload. |
| `CONTACT_CARD_TITLE_FR` | French title shown when the card language is `fr`. |
| `CONTACT_CARD_TITLE_ES` | Spanish title shown when the card language is `es`. |
| `CONTACT_CARD_LOCATION` | Location shown on the card and in the vCard payload. |
| `CONTACT_CARD_EMAIL` | Email address embedded in the downloadable/scannable contact card. |
| `CONTACT_CARD_GITHUB_URL` | GitHub profile URL used by the button and vCard. |
| `CONTACT_CARD_LINKEDIN_URL` | LinkedIn profile URL used by the button and vCard. |
