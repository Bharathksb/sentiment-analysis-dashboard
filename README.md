# 📊 Sentiment Analysis Dashboard

A full-stack web application that analyzes text sentiment 
as **Positive**, **Negative**, or **Neutral** using 
React.js frontend and Java Spring Boot backend.

![Dashboard Preview](screenshots/dashboard.png)

---

## 🚀 Live Demo

> Login Credentials for Demo:
> - Username: `testuser`
> - Password: `test123`

---

## ✨ Features

- 🔐 **JWT Authentication** - Secure login/register
- 🔍 **Sentiment Analysis** - Positive/Negative/Neutral detection
- 📊 **Real-time Charts** - Pie chart and Bar chart
- 📜 **Analysis History** - Track all past analyses
- 🗑️ **Delete History** - Remove individual entries
- 🎨 **Animations** - Smooth Framer Motion effects
- 📱 **Responsive Design** - Works on all screen sizes

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js + Vite | UI Framework |
| Framer Motion | Animations |
| Recharts | Data Visualization |
| Axios | HTTP Client |
| React Router DOM | Navigation |

### Backend
| Technology | Purpose |
|---|---|
| Java Spring Boot | REST API Server |
| Spring Security | Authentication |
| Spring Data JPA | Database ORM |
| JWT (jjwt) | Token Authentication |
| BCrypt | Password Hashing |
| MySQL | Database |

---

## 📸 Screenshots
### 🔐 Login Page
![Login](screenshots/login%20page.png)

### 📝 Register Page
![Register](screenshots/Register%20.png)

### 📊 Dashboard View 1
![Dashboard1](screenshots/DashBoard1.png)

### 📊 Dashboard View 2
![Dashboard2](screenshots/DashBoard%202.png)

### 📈 Charts and Statistics
![Dashboard3](screenshots/DashBoard3.png)


---

## 🗄️ Database Schema


sentiment-analysis-dashboard/
│
├── sentiment-dashboard/        → Spring Boot Backend
│   └── src/main/java/
│       └── com/sentiment/dashboard/
│           ├── controller/     → REST API Controllers
│           ├── service/        → Business Logic
│           ├── repository/     → Database Access
│           ├── model/          → JPA Entities
│           ├── dto/            → Data Transfer Objects
│           └── security/       → JWT + Spring Security
│
├── frontend/                   → React Frontend
│   └── src/
│       ├── pages/              → Login, Register, Dashboard
│       ├── services/           → Axios API Functions
│       └── components/         → Reusable Components
│
├── screenshots/                → Project Screenshots
└── README.md                   → This file

---

## ⚙️ How to Run Locally

### Prerequisites
✅ Java 21 or higher
✅ Node.js 18 or higher
✅ MySQL 8.0
✅ Maven 3.x
✅ Git

### Step 1 — Clone Repository
```bash
git clone https://github.com/YourUsername/sentiment-analysis-dashboard.git
cd sentiment-analysis-dashboard
```

### Step 2 — Setup Database
```sql
CREATE DATABASE sentiment_db;
```

### Step 3 — Configure Backend
Open: sentiment-dashboard/src/main/resources/application.properties
Update:
spring.datasource.url=jdbc:mysql://localhost:3306/sentiment_db
spring.datasource.username=root
spring.datasource.password=yourpassword

### Step 4 — Run Backend
```bash
cd sentiment-dashboard
mvn spring-boot:run
```
Backend starts at: http://localhost:8080

### Step 5 — Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend starts at: http://localhost:5173

### Step 6 — Open Browser
http://localhost:5173
Register a new account and start analyzing!

---

## 🔒 Security Implementation
✅ JWT tokens with HMAC-SHA256 signature
✅ Token expiry: 24 hours
✅ BCrypt password hashing (no plain text)
✅ Spring Security filter chain
✅ JwtAuthFilter validates every request
✅ Protected API endpoints
✅ CORS configuration
✅ Frontend PrivateRoute protection

---

## 🧠 How Sentiment Analysis Works
Input Text → Convert to lowercase
→ Count positive keywords
(good, great, amazing, excellent,
wonderful, fantastic, happy, love,
best, awesome, brilliant, perfect)
→ Count negative keywords
(bad, terrible, awful, horrible,
worst, hate, disgusting, poor,
disappointing, failure, pathetic)
→ Compare counts
→ positiveCount > negativeCount = POSITIVE
→ negativeCount > positiveCount = NEGATIVE
→ equal counts = NEUTRAL
→ Calculate confidence score
→ Save to database
→ Return result to frontend

---

## 🎯 What I Learned Building This

- Full-stack development from scratch
- JWT authentication end-to-end implementation
- Spring Security configuration for REST APIs
- React hooks in real-world applications
- Database design with JPA relationships
- CORS configuration for cross-origin requests
- REST API design principles
- Debugging complex multi-layer applications

---

## 👨‍💻 Author

**Bharath KS**
- 🎓 BE Computer Science — 2023
- 💼 Looking for Full Stack Developer roles
- 📧 bharathks98408@gmail.com
- 🔗 LinkedIn: https://www.linkedin.com/in/ks-bharath/
- 🐙 GitHub: https://github.com/Bharathksb

---

## 📄 License

This project is open source under the
[MIT License](LICENSE)

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

**Built with ❤️ by Bharath KS**

</div>
