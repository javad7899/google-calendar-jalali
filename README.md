# Google Calendar Clone with Jalali Date Support

This project is a **Google Calendar-like application** built with modern technologies, featuring **Jalali date support**. The application provides monthly and optional daily views, allowing users to add, edit, and remove events. It ensures responsiveness for mobile and desktop users while maintaining a clean design and intuitive interface.

## Features

### Calendar Functionality

1. **Monthly View (Mandatory)**:

   - Displays a monthly calendar with navigation between months.
   - Allows users to:
     - Add new events by clicking on a date.
     - Edit existing events.
     - Remove events with a confirmation prompt.

2. **Daily View (Optional)**:
   - Shows events for a selected day.
   - Allows navigation to the daily view from the monthly view.

### Event Management

Each event includes:

- Title
- Description
- Date and time
- Option for recurring events (daily, weekly, monthly)

### Responsive Design

- Fully responsive layout for mobile and desktop devices.
- Uses a modern UI framework for aesthetics and usability.

### Stack Overview

#### **Frontend**

- **Frameworks & Libraries**:

  - **Next.js**: SSR and static site generation.
  - **React**: Core UI framework.
  - **Jalaliday**: Jalali date support.
  - **Zustand**: State management.
  - **React Icons**: UI icons.
  - **React Toastify**: Notifications.
  - **Tailwind CSC**: UI styles.

- **Key Features**:
  - Built with **TypeScript** for type safety.
  - Axios for API integration.
  - Fully responsive UI using a framework like Tailwind CSS.

#### **Backend**

- **Frameworks & Libraries**:

  - **Express.js**: Backend framework.
  - **Mongoose**: MongoDB object modeling.
  - **Moment-Jalaali**: Jalali date support.
  - **dotenv**: Environment variable management.

- **Key Features**:
  - RESTful API for managing events.
  - Built with **TypeScript** for type safety.
  - Supports recurring events logic.

---

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 16 or higher recommended).
- **MongoDB**: Set up a MongoDB database.

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/javad7899/google-calendar-jalali.git
   cd google-calendar-jalali/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the `backend` directory.
   - Add the following:
     ```
     PORT=8000
     MONGO_URI=your_mongodb_connection_string
     ```

4. Run the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`.

---

## Usage

1. Open the app in your browser.
2. View the monthly calendar.
3. Click on a date to:
   - Add a new event.
   - View and edit existing events.
4. Switch to the daily view for detailed event information.
5. Manage recurring events with ease.

---

## Development

### Directory Structure

#### Backend

```
/backend
  /src
    /controllers
    /models
    /routes
    /utils
  .env
  server.ts
```

#### Frontend

```
/frontend
  /components
  /pages
  /store
  /styles
  next.config.js
  tsconfig.json
```

### Scripts

#### Backend

- `npm run dev`: Start the development server.
- `npm run build`: Build for production.

#### Frontend

- `npm run dev`: Start the frontend development server.
- `npm run build`: Build for production.

---

## Evaluation Criteria

- **Code Quality**: Clean, maintainable, and well-documented code.
- **Functionality**: Implementation of all required features.
- **Design**: Aesthetic and user-friendly.
- **Responsiveness**: Proper functioning across various devices.

---

## Live Demo and Repository

- **Live Demo**: [Deployed on Vercel/Netlify](https://google-calendar-fe.chbk.app/)
- **GitHub Repository**: [Repo Link](https://github.com/javad7899/google-calendar-jalali)

---

## Contribution

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature-name"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

Enjoy building your calendar application! 🎉
