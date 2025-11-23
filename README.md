🛠️ Cliff_Tech Solutions

A premium, full-stack web application for a modern tech repair agency.

📖 About The Project

Cliff_Tech Solutions is a digital platform designed to modernize the device repair industry in Ghana. Unlike standard static websites, this is a Full-Stack Application that allows customers to book repairs, receive email confirmations, and track the real-time status of their device using a live database.

Built with a focus on Creative Technology, it blends robust backend logic with a high-end, immersive frontend experience using scroll animations, glassmorphism, and interactive elements.

✨ Key Features

📡 Live Repair Tracker: Customers can enter their phone number to check if their device is "Received", "In Progress", or "Ready".

📅 Booking System: A fully functional contact form that saves orders to MongoDB and sends email notifications via Nodemailer.

🎨 Immersive UI: Features "Glassmorphism" cards, ambient background glows, and a cyber-grid aesthetic.

⚡ Reactive Animations: Powered by Framer Motion for scroll reveals and React Type Animation for dynamic text.

📱 Fully Responsive: Optimized for mobile, tablet, and desktop viewing.

💻 Tech Stack

Frontend

Backend

🚀 Getting Started

To run this project locally, you will need Node.js installed on your machine.

1. Clone the Repository

git clone [https://github.com/YOUR_USERNAME/clifftech-solutions.git](https://github.com/YOUR_USERNAME/clifftech-solutions.git)
cd clifftech-solutions


2. Backend Setup (Root Folder)

Install the server dependencies and configure environment variables.

# Install backend packages
npm install

# Create a .env file
touch .env


Inside .env add:

PORT=3000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password


3. Frontend Setup (Client Folder)

Install the React dependencies.

cd client
npm install


4. Running the App

You need to run the Server and Client simultaneously in two separate terminals.

Terminal 1 (Backend):

# From root folder
node server.js


(You should see: "✅ Connected to MongoDB")

Terminal 2 (Frontend):

# From client folder
cd client
npm run dev


(Open the link: http://localhost:5173)

🔌 API Endpoints

Method

Endpoint

Description

POST

/api/contact

Submits a new repair inquiry & sends email.

GET

/api/status/:phone

Fetches repair jobs associated with a phone number.

GET

/api/admin/all-jobs

(Dev Only) View all raw database entries.

👤 Author

Clifford D. - Creative Technologist

Graphic Design & UI/UX

Full Stack Development

🤝 Contributing

Contributions, https://www.google.com/search?q=issues, and feature requests are welcome! Feel free to check the issues page.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request
