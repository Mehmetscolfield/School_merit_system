School_merit_system
# Galaxy School Merit System

A simple, single-page React application for managing and viewing student merit points at the "Galaxy International School".

This project was bootstrapped with Vite and uses React. It's a self-contained application that runs entirely in the browser, using `localStorage` to persist student data.

## Key Features

- **Dual Roles**: Separate views and functionalities for Students and Administrators.
- **Student Dashboard**:
  - View current merit points and rank.
  - See percentile and progress towards the next merit tier.
  - Tiers are defined as: Elite, Outstanding, Excellent, Great, Developing, and Beginner.
- **Admin Dashboard**:
  - View a list of all students.
  - Search for specific students.
  - Edit merit points for any student.
  - Reset student passwords.
  - View system statistics like total students and average points.
- **Secure Login**: Separate login flows for students and administrators.
- **Data Persistence**: Student data, including points and passwords, is stored in the browser's `localStorage`. This means data will persist between sessions on the same browser.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn/pnpm) must be installed.

### Installation & Running the App

1.  **Clone the repository** (or download the files).
2.  **Navigate to the project directory**:
    ```bash
    cd merit-demerit
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run preview`: Serves the production build locally.

## Login Credentials

For demonstration and testing purposes, you can use the following credentials.

### Student Login

You can log in as any of the pre-defined students. A feature on the login page allows you to "Show All Student Passwords" to see the randomly generated password for each student.

**Example Student Names:**
- Ayaulym Abdigashim
- Aiya Abdyrakhma
- Khadis Aidyn
- ...and 13 more.

### Admin Login

- Click the "Admin Login" button on the main page.
- **Password**: `admin123`

## Technical Details

- **Framework**: React 18
- **Build Tool**: Vite
- **Icons**: `lucide-react`
- **Styling**: Inline CSS styles within the main component.
- **Data Storage**: Browser `localStorage` is used to simulate a database. The key `galaxy-students` holds all student information.
