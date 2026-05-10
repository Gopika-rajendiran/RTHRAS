# Database Schema (SQLite)

## Doctors
- `id`: INTEGER PRIMARY KEY
- `name`: TEXT
- `specialization`: TEXT
- `status`: TEXT (Available, On Duty, Off)

## Blood Bank
- `id`: INTEGER PRIMARY KEY
- `blood_type`: TEXT (A+, O-, etc.)
- `units`: INTEGER

## Emergency
- `id`: INTEGER PRIMARY KEY
- `type`: TEXT
- `priority`: TEXT
- `status`: TEXT
