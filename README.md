# Data Review Application

## Overview

This application provides a data review interface for examining and managing records with potential errors. It allows users to view data in a tabular format, identify and inspect errors, and export data to CSV format for further analysis.

## Features

- **Data Visualization**: Display records in a responsive table with clear formatting
- **Error Handling**: Visual indicators for records with errors, categorized by severity (critical/warning)
- **Error Details**: Modal view for examining detailed error information for each record
- **CSV Export**: One-click export functionality for data analysis in external tools
- **Dark/Light Mode**: Theme toggle with persistent preferences using localStorage
- **Interactive Tutorial**: Step-by-step guidance for new users with progress tracking
- **Responsive Design**: Mobile-friendly interface that adapts to different screen sizes
- **Accessibility**: Keyboard navigation, ARIA attributes, and focus management

## Tech Stack

- **Frontend Framework**: React 18 with Next.js 14
- **Styling**: Tailwind CSS with custom theme configuration
- **State Management**: React Context API for tutorial state
- **Icons**: Lucide React for consistent iconography

## Architecture

The application follows a component-based architecture with clear separation of concerns:

### Core Components

- **DataReviewTable**: Main container component that manages data fetching, theme toggling, and layout
- **DataTable**: Renders the tabular data with appropriate headers and rows
- **TableRow/TableCell**: Handle individual record display with error highlighting
- **ErrorModal**: Displays detailed error information for selected records
- **ExportButton**: Manages CSV data export functionality
- **TutorialTooltip**: Provides interactive guidance with positioning and animations

### State Management

- **TutorialContext**: Manages tutorial state, progression, and persistence across sessions
- Local component state for UI interactions and data display

### Data Flow

1. Data is fetched from the API endpoint (`/api/data`) using the `fetchDataRecords` service
2. The main component distributes data to child components
3. User interactions trigger appropriate state updates and UI changes
4. Error handling is managed at multiple levels for resilience

### Styling Approach

- Utility-first CSS with Tailwind
- Custom theme configuration for dark/light mode with smooth transitions
- Consistent design language across components
- Custom CSS variables for theme colors

## Implementation Details

### Error Handling

The application implements a comprehensive error handling system:

- Visual indicators for fields with errors using color-coding
- Severity-based categorization (critical/warning) with appropriate icons
- Detailed error information in modal views with sorting by severity
- Error counts displayed for quick reference
- Tooltips for quick error information on hover

### Tutorial System

A step-by-step tutorial guides new users through the application:

- Persistent state tracking across sessions using localStorage
- Progress indicators showing current step and total steps
- Targeted tooltips highlighting key features (theme toggle, export, error view)
- Reset functionality to restart the tutorial via the help button

### Theme Management

The application supports both dark and light modes:

- Theme persistence using document class and localStorage
- Smooth transitions between themes with CSS variables
- Consistent styling across all components with theme-specific colors
- Accessibility considerations for both themes

## Running Locally

1. Install dependencies

   ```
   npm install
   ```

2. Start the development server

   ```
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Future Improvements

Given more time, I would implement the following enhancements:

1. **Advanced Filtering**: Add filtering capabilities for records based on status, error severity, etc.
2. **Sorting Functionality**: Allow users to sort data by different columns
3. **Pagination**: Implement pagination for handling larger datasets
4. **Error Resolution**: Add functionality to mark errors as resolved or add notes
5. **Data Editing**: Allow in-place editing of record data to fix errors
6. **Enhanced Animations**: More polished transitions between states
7. **Comprehensive Testing**: Add unit and integration tests for all components
8. **Performance Monitoring**: Implement analytics to track performance metrics

## Assumptions

During development, I made the following assumptions:

1. The data structure will remain consistent with the provided mock data
2. The application will primarily be used on desktop devices, but should be responsive
3. Users may need guidance when first using the application
4. Error information is critical for user decision-making
5. Dark mode is preferred by many users for extended usage

## Approach

My development approach focused on:

1. **User Experience**: Creating an intuitive interface with clear error indicators and helpful tooltips
2. **Accessibility**: Ensuring the application is usable by all users with keyboard navigation and ARIA attributes
3. **Code Quality**: Writing maintainable, well-structured code with TypeScript for type safety
4. **Performance**: Optimizing for smooth interactions and minimal load times
5. **Progressive Enhancement**: Building core functionality first, then adding enhancements like the tutorial system
