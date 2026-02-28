# Dear Career

Dear Career is organized as a small monorepo with three services:

- `frontend/`: Next.js application
- `backend/`: Laravel API
- `worker/`: Python background worker

## Project Structure

```text
.
├── frontend
├── backend
├── worker
├── nginx
└── docker-compose.yml
```

## Local Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Worker

```bash
cd worker
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

## Docker

```bash
docker compose up --build
```

## Repo Init

After cleanup, initialize the repository from the project root:

```bash
git init
git add .
git commit -m "Initial commit"
```
