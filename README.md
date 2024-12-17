# Artwork Collection Viewer

## Overview
The Artwork Collection Viewer is a web application that displays a paginated table of artworks fetched from the Art Institute of Chicago API. Users can:
- View detailed artwork information such as title, origin, artist, inscriptions, and dates.
- Select multiple rows or specific numbers of rows to view.
- Navigate through pages of data with a custom paginator.

## Features
- **Paginated Table**: Displays artworks with support for selecting multiple rows and viewing specific ranges of rows.
- **Overlay Panel**: A dropdown to specify the number of rows to select and view.
- **Dynamic Data Fetching**: Fetches artworks from the API dynamically based on page and range.
- **Customizable Rows Per Page**: Adjust the number of rows displayed in the table per page.
- **Loading Indicator**: Displays a loading state while data is being fetched.

---
## Deployement Link
- **Link->*https://jolly-alfajores-e4099b.netlify.app*:

## Installation and Setup

### Prerequisites
- Node.js installed on your system.
- Basic knowledge of React and TypeScript.

### Steps to Set Up Locally

1. **Clone the Repository**:
   ```bash
   git clone <repository-link>
   cd artwork-collection-viewer
Install Dependencies:

bash
Copy code
npm install
Start the Development Server:

bash
Copy code
npm start
Access the Application: Open your browser and navigate to http://localhost:3000 to view the app.

Code Explanation
Components and Logic
Table Component:

Displays the paginated data table using PrimeReact components.
Handles fetching artworks from the API for a specific page.
Implements a paginator and an overlay panel for custom row selection.
Data Fetching:

Fetches artworks dynamically for specific page ranges.
Uses the fetchArtworksByRange function to extract artwork data from multiple pages when selecting rows.
fetchArtworksByRange Utility:

Accepts a range (startRow, endRow) and fetches data for the required pages.
Extracts and returns only the relevant rows within the specified range.
Pagination:

Custom paginator using PrimeReact's Paginator component.
Calculates the total number of rows and pages dynamically.
State Management:

Manages data such as artworks, selected rows, pagination state, and loading status using React's useState hook.
Uses useEffect to fetch the initial page of data on component mount.
How to Use
View Artworks:

The app automatically loads the first page of artworks when launched.
Use the paginator at the bottom to navigate through pages.
Select Rows:

Click the dropdown button (arrow icon) in the table header.
Enter the number of rows to select and click Submit.
Fetch Data Dynamically:

Artworks are fetched dynamically when navigating between pages or selecting rows.
Deployment
You can deploy this application on any hosting platform that supports React. For example:

Steps to Deploy on Netlify
Build the Project:

bash
Copy code
npm run build
Upload the Build Folder:

Login to Netlify.
Drag and drop the build folder into the deployment area.
Access the Deployed Application:
Link Provided above 

API Details
Base URL: https://api.artic.edu/api/v1/artworks
Endpoints Used:
?page=<number>: Fetch artworks data for a specific page.
Sample API Response
json
Copy code
{
  "data": [
    {
      "id": 1,
      "title": "Artwork Title",
      "place_of_origin": "Place",
      "artist_display": "Artist",
      "inscriptions": "Inscription",
      "date_start": "Start Date",
      "date_end": "End Date"
    }
  ],
  "pagination": {
    "total_pages": 100,
    "total": 1200
  }
}
Dependencies
React: Framework for building the UI.
TypeScript: Strongly typed language for better code quality.
PrimeReact: Provides ready-to-use UI components.
Tailwind CSS: For styling.
Contribution Guidelines
Fork the repository and create a new branch.
Make your changes and test thoroughly.
Submit a pull request with detailed information about your changes.
License
This project is licensed under the MIT License. See the LICENSE file for details.
