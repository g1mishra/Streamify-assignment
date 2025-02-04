# Streamify Analytics Dashboard Assignment

A music streaming analytics dashboard built as part of a frontend development assignment.

## Assignment Overview

This project demonstrates the implementation of a music streaming analytics dashboard that visualizes key metrics and data for a fictional streaming service "Streamify." The dashboard provides insights into user activity, revenue, and content performance through interactive visualizations and data presentations.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A modern web browser

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/streamify.git
```

2. Install dependencies

```bash
cd streamify
npm install
```

3. Start the development server

```bash
npm run dev
```

## Key Features

- Responsive layout that works across all device sizes
- Fast and efficient content loading
- Smooth animations and transitions
- Search functionality
- Category-based content organization

## Technical Decisions & Trade-offs

### Architecture

- Used a component-based architecture for better maintainability and eusability
- Implemented lazy loading for improved initial load time

### State Management

- Chosed to use React's built-in context API for state management
- Used local state where possible to avoid unnecessary complexity

### Performance

- Used code splitting to reduce the initial bundle size
- Minimized the number of re-renders by using memoization

### Styling

- Utilized Tailwind CSS modules for scoped styling
- Implemented a mobile-first approach for responsive design
