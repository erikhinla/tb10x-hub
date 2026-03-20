# TB10X Handoff README

Use these exact commands to run each subproject locally.

## 1) Social Asset Hub (campaign generator + publish routes)

```bash
cd /Users/erikhowerbush/PROJECTS/TRANSFORM_BY_10X/public/tb10x-hub
npm install
npm run dev
```

Build check:

```bash
cd /Users/erikhowerbush/PROJECTS/TRANSFORM_BY_10X/public/tb10x-hub
npm run build
```

## 2) AIVA App

```bash
cd /Users/erikhowerbush/PROJECTS/TRANSFORM_BY_10X/aiva-app
npm install
npm run dev
```

Build check:

```bash
cd /Users/erikhowerbush/PROJECTS/TRANSFORM_BY_10X/aiva-app
npm run build
```

## 3) BizBrain Lite (FastAPI control plane)

```bash
cd /Users/erikhowerbush/PROJECTS/TRANSFORM_BY_10X/services/fastapi/bizbrain_lite
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Optional tests:

```bash
cd /Users/erikhowerbush/PROJECTS/TRANSFORM_BY_10X/services/fastapi/bizbrain_lite
source .venv/bin/activate
pytest
```
