# Employee Management System

This is a React-based Employee Management System that allows administrators to manage employee data, assign tasks, communicate via chat, and view employee details. It uses Redux Toolkit for state management and React Router for navigation.

## Features

**Admin Panel:**

*   **Dashboard:**
    *   Displays greetings based on the time of day.
    *   Shows current date and day.
    *   Provides a real-time employee performance ranking.
    *   Summarizes total employees, total tasks, completed tasks, and pending tasks.
    *   Allows viewing detailed employee information through a modal.
*   **Employee Form:**
    *   Add new employee records with personal information, earnings (Basic Salary, HRA, DA, TA, Bonus), deductions (PF, PT, Tax), service timings (shift start and end), and detailed descriptions (professional summary, key skills, additional notes).
    *   Edit existing employee records.
    *   Automatically calculates total earnings, total deductions, and net salary.
*   **Employee Data Table:**
    *   View all employee data in a sortable and paginated table.
    *   Export employee data to a CSV file.
    *   Delete selected employee records.
    *   Edit individual employee records directly from the table.
*   **Tasks Management:**
    *   Assign tasks to specific employees with a title, description, and due date.
    *   View a list of all assigned tasks.
    *   Edit and delete tasks.
*   **Chat:**
    *   Communicate with individual employees.
    *   View chat history for selected employees.
*   **Sidebar Navigation:**
    *   Collapsible sidebar for easy navigation between different admin functionalities.
    *   Logout functionality.

**User Panel:**

*   **User Dashboard:** (Basic implementation, can be expanded)
    *   Logout functionality.

**Global Features:**

*   **Authentication:** Basic login system with admin and employee roles.
*   **State Management:** Redux Toolkit for efficient and predictable state management.
*   **Persistence:** Employee data, chat messages, and tasks are stored in local storage.
*   **Notifications:** React Toastify for user feedback (success, error, info messages).
*   **Responsive Design:** Adapts to different screen sizes.

## Technologies Used

*   **React.js:** Frontend JavaScript library for building user interfaces.
*   **React Router DOM:** For declarative routing in React applications.
*   **Redux Toolkit:** Official opinionated Redux development toolset for efficient state management.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **React Icons:** A library for popular icon packs.
*   **React Toastify:** For customizable toast notifications.
*   **React Data Table Component:** For building powerful and customizable data tables.

## Project Structure

```
employee-management-system/
├── public/
├── src/
│   ├── app/
│   │   └── store.js             // Redux store configuration
│   ├── assets/
│   │   ├── loginbg.jpeg         // Background image for login
│   │   └── react.svg
│   ├── components/
│   │   ├── Aside/
│   │   │   ├── AdminAside.jsx   // Admin sidebar navigation
│   │   │   └── UserAside.jsx    // (Placeholder) User sidebar navigation
│   │   ├── Header/
│   │   │   └── Header.jsx       // Header component
│   │   └── Modal/
│   │       └── Modal.jsx        // Employee details modal
│   ├── features/                // Redux slices
│   │   ├── auth/
│   │   │   └── authSLice.js     // Authentication slice
│   │   ├── chats/
│   │   │   └── chatSlice.js     // Chat messages slice
│   │   ├── employees/
│   │   │   └── employeeSlice.js // Employee data slice
│   │   ├── modal/
│   │   │   └── modalSlice.js    // Modal state slice
│   │   ├── salary-slip/
│   │   │   └── salarySlice.js   // Salary slip slice (commented out in Dashboard)
│   │   ├── sidebar/
│   │   │   └── sidebarSlice.js  // Sidebar state slice
│   │   └── tasks/
│   │       └── tasksSlice.js    // Task management slice
│   ├── pages/
│   │   ├── adminpanel/
│   │   │   ├── Chat.jsx         // Admin chat page
│   │   │   ├── DashBoard.jsx    // Admin dashboard page
│   │   │   ├── EmpDataTable.jsx // Employee data table page
│   │   │   ├── Form.jsx         // Employee add/edit form page
│   │   │   └── Tasks.jsx        // Admin tasks management page
│   │   ├── auth/
│   │   │   └── Login.jsx        // Login page
│   │   └── userpanel/
│   │       └── UserDashboard.jsx// User dashboard page
│   ├── App.css                  // Main application CSS
│   ├── App.jsx                  // Main application component
│   └── main.jsx                 // Entry point of the React application
└── package.json
```

## Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd employee-management-system
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
2.  Open your browser and navigate to `http://localhost:5173` (or the port displayed in your terminal).

## Usage

### Login

*   **Admin Login:**
    *   Email: (any valid email, e.g., `admin@example.com`)
    *   Password: (any password)
    *   Select "Admin" radio button.
*   **Employee Login:**
    *   Email: (any valid email, e.g., `employee@example.com`)
    *   Password: (any password)
    *   Select "Employee" radio button.

### Admin Panel

After logging in as an admin, you will be redirected to the Admin Dashboard.

*   **Dashboard:** View key metrics and employee performance. Click the "eye" icon next to an employee to see their detailed profile in a modal.
*   **Form:** Use this page to add new employees or edit existing ones. Fill in the details and click "Submit".
*   **EmpDataTable:** See a comprehensive list of all employees. You can export the data, delete multiple selected rows, or edit individual employee records.
*   **Tasks:** Assign new tasks to employees and manage existing tasks.
*   **Chat:** Select an employee from the list to start a chat conversation.

### User Panel

After logging in as an employee, you will be redirected to the User Dashboard. This is a basic page and can be expanded with more user-specific functionalities.

## Redux State Structure

The Redux store is configured with the following slices:

*   `login`: Manages authentication state (`role`, `isLoggedIn`).
*   `sidebar`: Controls the state of the sidebar (`open`).
*   `employees`: Stores an array of employee objects and `editData` for the form.
*   `modal`: Manages the state of the employee details modal (`isOpen`, `employee`).
*   `tasks`: Stores an array of task objects and `editTaskObj` for task editing.
*   `chat`: Stores an array of chat messages.
*   `salarySlip`: (Currently commented out in `DashBoard.jsx`) Intended for managing salary slip generation.

## Local Storage Usage

The application uses local storage to persist data for:

*   `userAuth`: Stores the logged-in user's role and login status.
*   `employees`: Stores all employee records.
*   `messages`: Stores chat messages.
*   `tasks`: Stores all assigned tasks.

This ensures that data is not lost when the browser is refreshed.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).
