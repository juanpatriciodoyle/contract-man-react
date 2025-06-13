# ContractFlow: AI-Powered Contract Management
![Days](https://img.shields.io/static/v1?label=Working-Days&message=3&color=blue)
![Status](https://img.shields.io/static/v1?label=Done-Status&message=60%&color=yellow)
![ContractFlow Application Screenshot](public/gif-test.gif)
## 🚀 Overview

ContractFlow is a cutting-edge, AI-powered contract management system designed to revolutionize how businesses handle their contracts. It offers a seamless, automated workflow for both administrators and vendors, providing intelligent insights, efficient document processing, and robust compliance assurance throughout the entire contract lifecycle.

**TODO:**
1. Contract CRUD
2. Use Headless CMS
3. More things from Foundry aside the Contract Domino app (AI, new feature)

## ✨ Key Features

### Admin Portal Capabilities:
* **Comprehensive Dashboard**: Gain immediate high-level insights into overall contract metrics, average processing times, approval rates, and contracts nearing expiration.
* **Dynamic Contract Management**: A powerful interface to view, search, filter, sort, and manage all contracts with detailed information and AI scoring.
* **AI Analytics Dashboard**: Dive deep into the performance of the AI engine, track automation rates, risk distribution, and review recent AI-driven analyses and recommendations.
* **Vendor Management**: Oversee registered vendor accounts, monitor their verification statuses, and streamline vendor onboarding processes.
* **Advanced Reports**: Generate and export comprehensive reports (PDF, Excel, CSV) on monthly contract trends, top-performing vendors, and detailed risk analyses by category.

### Vendor Portal Capabilities:
* **Personalized Dashboard**: A dedicated space for vendors to track their submitted contracts, monitor approval statuses, and review their business performance with the system.
* **Interactive Verification Status**: Follow the multi-step verification process of contract documents through a visually intuitive progress bar (Upload, OCR Processing, Government Verification, Review & Submit, Complete).
* **Secure Document Upload**: Easily upload contract documents with built-in file type validation (supporting PDF, JPG, JPEG, PNG) and size limits.
* **Quick Actions**: Access essential vendor-centric functionalities like submitting new contracts, viewing contract templates, scheduling meetings, and reporting issues directly from the dashboard.

## 🛠️ Technologies Used

* **Frontend**: React (with TypeScript)
* **Styling**: Styled Components
* **Animation**: Framer Motion
* **Routing**: React Router DOM
* **API Integration**: Custom React Hooks utilizing the `fetch` API for secure token-based communication.
* **Reusable UI**: Custom-built UI components including responsive tables, versatile KPI cards, and interactive progress indicators.
* **Data Export**: `jspdf`, `xlsx`, `file-saver` for exporting reports in various formats.
* **Icons**: [Lucide React](https://lucide.dev/) for crisp, scalable vector icons.

## ⚙️ Getting Started

Follow these steps to set up and run the ContractFlow application on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/en/) (LTS version recommended)
* [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/getting-started/install)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [Your Repository URL Here]
    cd contract-man-react
    ```
    *(Replace `[Your Repository URL Here]` with the actual URL of your Git repository.)*

2.  **Install project dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  **Configure API Connection**:
    This application relies on external API endpoints for data fetching and authentication. You need to configure your API details in `src/data.json`.
    Open `src/data.json` and update the `BASE_URL` and `getTokensParams` (including `X-Voltmx-App-Key`, `X-Voltmx-App-Secret`, `userid`, and `password`) with your actual API credentials.

2.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    This command will:
    * Start the development server.
    * Open the application in your default web browser at `http://localhost:3000`.
    * Provide live linting and type checking feedback in your console and browser.

## 📝 Usage

Navigate through the application using the sidebar. ContractFlow offers distinct experiences for administrators and vendors:

### Admin Portal
Switch to the "Admin" view using the user profile toggle at the top of the sidebar. Explore comprehensive dashboards, manage contracts, analyze AI performance, oversee vendor accounts, and generate detailed reports.

### Vendor Portal
Toggle to the "Vendor" view in the sidebar to access the vendor-specific dashboard. Here, you can monitor the status of your document verifications, submit new contracts, and utilize quick action shortcuts.


Coded with ❤️ by Juan Patricio Doyle ✨2025