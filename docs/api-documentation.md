# API Documentation

## Auth
- `POST /api/auth/login`: Authenticate user and return token.

## Doctors
- `GET /api/doctors`: Get all doctors.
- `POST /api/doctors`: Add a new doctor.
- `PUT /api/doctors/:id`: Update doctor status.

## Blood Bank
- `GET /api/blood`: Get blood stock levels.
- `PUT /api/blood/:type`: Update blood stock.

## Emergency
- `GET /api/emergency`: Get active emergency requests.
- `POST /api/emergency`: Create new emergency alert.
