# AniPulse Nexus 

AniPulse Nexus is a full-stack, serverless Business Intelligence (BI) dashboard engineered to track, aggregate, and visualize real-time viewership vectors and telemetry streams. 

Designed with a focus on edge-network performance and zero-dependency rendering, the application implements an automated ETL (Extract, Transform, Load) pipeline to ingest external GraphQL data into a time-series relational database, exposing metrics through a highly optimized Next.js Server Component architecture.

## 📸 System Interface

### Public Gateway & Credential Terminal (Bento Grid)
![Landing Page](screenshots/landingpage.jpg)

### Analytics Workspace & Server-Rendered SVG Trend Mapping
![Dashboard Main](screenshots/dashboard.jpg)
![Dashboard Filtered View](screenshots/dashboard5.jpg)

### Native Server-Side Pagination & Edge-Network Filtering
![Dashboard Page 2](screenshots/dashboard3.jpg)
![Dashboard Page 3](screenshots/dashboard4.jpg)

## 🏗️ System Architecture & Engineering Choices

### 1. Serverless ETL Pipeline
Instead of relying on fragile client-side fetching, the system utilizes a **Next.js Serverless Route Handler (`/api/cron`)** acting as an automated chronometer. 
* **Extract:** Queries the AniList GraphQL API for live trending datasets.
* **Transform:** Normalizes nested nodes and calculates gross engagement pools.
* **Load:** Pushes immutable time-series snapshots into a **Neon PostgreSQL** database via **Prisma ORM**.

### 2. Zero-Dependency Server Charting
To avoid the runtime bloat of heavy charting libraries (like Chart.js or Tremor), the trend distribution visualizer is built using **pure, server-rendered SVG math**. The server computes scale mappings, min/max domains, and coordinate pixel offsets internally, streaming a pre-compiled `<polyline>` directly to the client. This results in a 0kB JavaScript bundle footprint for the primary data visualization.

### 3. Edge-Network Security Guard
The administrative workspace is protected by a dual-role HTTP Basic Authentication firewall executed entirely within **Next.js Edge Middleware**. By intercepting unauthorized traffic at the CDN layer, the application drops malicious requests *before* Node.js server threads or database connection pools are initialized, preventing serverless compute exhaustion.

### 4. Native URL State Management
Pagination and category filtering (e.g., `?format=TV&page=2`) are handled exclusively via URL Query Parameters and Next.js Server Components. This enables precise SQL `skip`/`take` offsets and `where` clauses at the database level, ensuring the client only ever receives the exact payload required for the current view.

### 5. Bulletproof CSS Grid Aesthetics
The UI avoids fragile flexbox stretching by utilizing explicit **CSS Grid Bento Box** layouts. Hard-coded fractional constraints and absolute-positioned image layers guarantee that external media assets never disrupt the intrinsic aspect ratios of the dashboard, regardless of viewport size.

## ⚙️ Tech Stack

* **Framework:** Next.js (App Router, React 19)
* **Language:** JavaScript (ES6+)
* **Database:** PostgreSQL (Neon Serverless Cluster)
* **ORM:** Prisma 7 
* **Styling:** Tailwind CSS 
* **External Data Provider:** AniList GraphQL API

## 🚀 Local Development Setup

**1. Clone the repository**
```bash
git clone [https://github.com/YOUR_USERNAME/anipulse-nexus.git](https://github.com/YOUR_USERNAME/anipulse-nexus.git)
cd anipulse-nexus
2. Install dependencies

Bash
npm install
3. Configure Environment Variables
Create a .env file in the root directory and add the following keys:

Code snippet
# Database Connection (Ensure it ends with ?sslmode=verify-full)
DATABASE_URL="postgresql://user:password@endpoint.neon.tech/dbname?sslmode=verify-full"

# Cron Job Security Token
CRON_SECRET="your_secure_random_string_here"

# Edge Middleware Authentication
ADMIN_PASSWORD="your_secure_admin_password"
GUEST_PASSWORD="anipulse-guest"
4. Initialize the Database
Sync the Prisma schema with your Neon PostgreSQL instance:

Bash
npx prisma db push
5. Ingest Initial Data
Before viewing the dashboard, trigger the ETL pipeline manually to seed the database:

Send a GET request to http://localhost:3000/api/cron (Use Thunder Client or Postman). Ensure you pass an Authorization header with Bearer YOUR_CRON_SECRET.

6. Start the Development Server

Bash
npm run dev
Navigate to http://localhost:3000. Access the dashboard using the guest credentials: recruiter / anipulse-guest