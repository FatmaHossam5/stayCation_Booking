# StayCation Booking System

A modern hotel booking application built with React, TypeScript, and Material-UI.

## 🚀 Live Demo

Visit the live application: [https://fatmahossam5.github.io/stayCation_Booking/](https://fatmahossam5.github.io/stayCation_Booking/)

## 🔐 Test Accounts

The application includes two test accounts for demonstration purposes:

### User Account
- **Email:** user@example.com
- **Password:** User123456
- **Role:** User
- **Features:** Browse rooms, make bookings, manage favorites

### Admin Account
- **Email:** admin@example.com
- **Password:** Admin123456
- **Role:** Admin
- **Features:** Manage rooms, bookings, users, and system settings

## 🛠️ Features

### For Users
- Browse available rooms
- View room details and amenities
- Make bookings
- Manage favorite rooms
- View booking history
- User profile management

### For Admins
- Dashboard with analytics
- Room management (add, edit, delete)
- Booking management
- User management
- Facility management
- Advertisement management
- System status monitoring

## 🏗️ Tech Stack

- **Frontend:** React 18, TypeScript, Material-UI
- **Routing:** React Router DOM
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Build Tool:** Vite
- **Deployment:** GitHub Pages

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fatmahossam5/stayCation_Booking.git
cd stayCation_Booking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── Components/          # React components
│   ├── Authentication/  # Login, signup, password reset
│   ├── Home/           # Dashboard components
│   ├── Rooms/          # Room management
│   ├── Bookings/       # Booking management
│   └── shared/         # Shared components
├── Context/            # React context providers
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── config/             # Configuration files
```

## 🔧 Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://upskilling-egypt.com:3000/api/v0
VITE_API_TIMEOUT=10000
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, please contact the development team or create an issue in the repository.