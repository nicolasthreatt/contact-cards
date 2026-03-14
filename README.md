# Contact Cards

A small NiceGUI app for personal identity sharing.
The current implementation is a mobile-friendly contact card with a downloadable vCard, a scannable QR code, and an `EN / FR / ES` language switcher.
The longer-term direction is to grow this into a small collection of shareable surfaces, including contact-card flows and Apple pass style experiences for profiles and links.

This repo is designed to work only after local personalization. It expects your private values in `.env` and your local asset files under `assets/`.

## Project structure

```text
contact-cards/
├── .env.example
├── card.py
├── requirements.txt
├── README.md
├── .gitignore
└── assets/
    └── .gitkeep
```

## Setup

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
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
CONTACT_CARD_HEADSHOT_PATH=assets/headshot.png
CONTACT_CARD_RESUME_PATH=assets/resume.pdf
```

The `assets/` directory is kept in git with `.gitkeep`, but the actual local files inside it are ignored.
Before running the app, add these local files:

```text
assets/headshot.png
assets/resume.pdf
```

If you prefer different names or locations, update `CONTACT_CARD_HEADSHOT_PATH` and `CONTACT_CARD_RESUME_PATH` in `.env`.

## Run

```bash
python card.py
```

Then open the local NiceGUI URL shown in the terminal (typically `http://127.0.0.1:8080`).

## Roadmap

- Keep the current contact card as the core identity surface.
- Add more share targets beyond the vCard flow, such as profile-specific passes or link cards.
- Explore Apple Wallet / pass style experiences for contact and profile sharing once the base flows are stable.

## Sharing Features

- `Save Contact` downloads a `.vcf` file generated from your configured contact details.
- The QR code on the card encodes the same contact record so someone can scan your phone and save your info quickly.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `CONTACT_CARD_FULL_NAME` | No | Display name shown on the card and in the vCard payload. |
| `CONTACT_CARD_DEFAULT_LANG` | No | Default UI language for the card: `en`, `fr`, or `es`. |
| `CONTACT_CARD_TITLE_EN` | No | English title shown on the card and used in the vCard payload. |
| `CONTACT_CARD_TITLE_FR` | No | French title shown when the card language is `fr`. |
| `CONTACT_CARD_TITLE_ES` | No | Spanish title shown when the card language is `es`. |
| `CONTACT_CARD_LOCATION` | No | Location shown on the card and in the vCard payload. |
| `CONTACT_CARD_EMAIL` | No | Email address embedded in the downloadable/scannable contact card. |
| `CONTACT_CARD_GITHUB_URL` | No | GitHub profile URL used by the button and vCard. |
| `CONTACT_CARD_LINKEDIN_URL` | No | LinkedIn profile URL used by the button and vCard. |
| `CONTACT_CARD_HEADSHOT_PATH` | No | Path to the headshot image served by the app. |
| `CONTACT_CARD_RESUME_PATH` | No | Path to the resume PDF served by the app. |
