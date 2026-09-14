# Private Participant Schema (Internal Only)

> **Example documentation only.** This file describes fields for a private master roster maintained offline by coordinators. It must **never** be published to the public website, GitHub Pages, or `data/public-directory.json`. Do not store real PII in this repository.

## Purpose

Coordinators may keep a private spreadsheet or database to track expressions of interest and later participation status. Public pages show only consented, non-email directory fields (or an empty list).

## Recommended private fields

| Field | Type | Notes |
|-------|------|-------|
| `record_id` | string | Internal opaque ID (not a public username) |
| `full_name` | string | Private until consent for directory listing |
| `email` | string | **Never** publish in public JSON or HTML |
| `institution` | string | University / organization |
| `country` | enum | `US` \| `UK` \| `Australia` \| `Other` |
| `role_title` | string | e.g., Assistant Professor |
| `discipline` | string | Free text or controlled vocabulary |
| `courses_of_interest` | string | Optional |
| `desired_activities` | string[] | From participation options A–E |
| `expertise_keywords` | string[] | Opt-in topical tags |
| `public_directory_consent` | boolean | Required before any public listing |
| `public_display_name` | string | Only if consent = true |
| `status` | enum | See below |
| `notes` | string | Internal coordinator notes only |
| `date_expressed_interest` | date | ISO 8601 |
| `last_updated` | date | ISO 8601 |
| `updated_by` | string | Coordinator initials |

## Status values

| Status | Meaning |
|--------|---------|
| `interested` | Expressed interest; not yet confirmed for a role |
| `confirmed` | Agreed to a bounded next step or role description |
| `active` | Currently contributing to an agreed activity |
| `committee` | Serving on a community leadership / working committee |
| `advisor` | Advising without day-to-day implementation duties |

## Privacy rules

1. Emails and private notes stay in the private master only.
2. Public directory may include only consented display name, institution, country, discipline, and role interests — never email.
3. Expressions of interest are **not** formal appointments.
4. Do not invent or publish names of people who have not consented.
5. Delete or anonymize records when requested.

## Example private record (fictional)

```json
{
  "record_id": "ex-0001",
  "full_name": "Alex Example",
  "email": "alex.example@example.edu",
  "institution": "Example University",
  "country": "US",
  "role_title": "Assistant Professor",
  "discipline": "Engineering Education",
  "desired_activities": ["A", "B"],
  "public_directory_consent": false,
  "status": "interested",
  "date_expressed_interest": "2026-09-10",
  "last_updated": "2026-09-10",
  "updated_by": "WZ"
}
```
