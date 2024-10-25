# Space Exploration Journal

## Overview

The **Space Exploration Journal** application allows users to simulate trips to various planets, collect data, and visualize this information through an interactive dashboard. Users can select multiple planets for their trips, launch their expeditions, and analyze the data through stacked bar charts showing the number of trips and images collected (APOD: Astronomy picture of the day).

This is implemented using NASA's APIs with React (Typescript) in the frontend and Node.js (Express) in the backend.

## Features

- Select multiple planets for exploration using a user-friendly dropdown.
- Simulate rocket launches for each selected planet, recording the date and time of each trip.
- Collect and visualize data through stacked bar charts using Chart.js.
- Display the most visited planets and the total number of images collected each month.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: For type safety and better code quality.
- **Tailwind CSS**: For styling the application.
- **Chart.js**: For creating interactive charts and visualizations.
- **Shadcn/UI**: For UI components like popovers and dropdowns.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm)

### Environment Variables

Create two .env files in both frontend and backend directories

For frontend:

```bash
VITE_SERVER_URL=https://localhost:5000
VITE_SERVER_API_PATH=/api
```

For backend

```bash
VITE_NASA_API_KEY="Enter Your API  key"
VITE_SOLAR_SYSTEM_API=https://api.le-systeme-solaire.net/rest/bodies
```

### Installation

**Clone the repository:**

```bash
  git clone https://github.com/your-username/space-exploration-journal.git
  cd space-exploration-journal
```

**Install dependencies:**
cd into frontend

```bash
npm install
```

cd into backend

```bash
npm install
```

**To start the application in development mode, run the following command:**

```bash
npm run dev
```

This will start the development server, and you can access the application at http://localhost:3000 in your web browser.

## APIs Used

[Planetary Systems API](https://api.le-systeme-solaire.net/): To gather data about the planets.
[APOD API](https://api.nasa.gov/planetary/apod): To show a relevant image of the planet or something related to space.

## How to Use

1. Select Planets: Use the dropdown menu to select multiple planets for your exploration trip.
2. Launch: Click the launch button (rocket icon) to simulate the trips. Each trip will be recorded with the date and time.
3. Visualize Data: After launching, navigate to the visualization page to see stacked bar charts that display:
   - The most visited planets per month.
   - The number of images collected for each planet per month.

## Data Structure

The application uses a JSON structure for storing trip data as follows:

```json
{
  "january": [{ "planet": "Callisto", "tripDate": "07/10/2024, 16:06:43", "images": ["image1.jpg", "image2.jpg", "image3.jpg"] }],
  "february": [{ "planet": "Europa", "tripDate": "08/10/2024, 16:06:43", "images": ["image4.jpg"] }]
}
```

The data is saved in the localStorage as under the "journal" key.

## Deployment

The application was deployed to vercel - [Space Exploration Journal](https://https://space-exploration-journal.vercel.app/)
