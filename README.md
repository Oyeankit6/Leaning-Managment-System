# 📚 Learning Management System (LMS)

A full-stack **Learning Management System (LMS)** application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The platform allows students to register, explore courses, and manage their profiles, while admins can manage users, courses, and view payment activities.

---

## 🚀 Tech Stack

- **MongoDB** – NoSQL database
- **Express.js** – Web framework for Node.js
- **React.js** – Frontend library
- **Node.js** – JavaScript runtime

---

## 📂 Project Structure

```bash
lms/
├── client/           # React frontend
├── server/           # Node + Express backend
└── README.md         # Project readme



🔑 Features
👨‍🎓 Student Functionality
✅ Register

✅ Login

🔄 Reset Password

👤 View & Update Profile

📚 List Courses (/api/v1/courses)

📘 View Course by ID

💳 Subscribe (Payment)

🧑‍💼 Admin Functionality
👥 Manage Users:

Create Account

Login / Logout

Reset Password

View / Update Profile

📘 Manage Courses:

List

View

Create

Edit

Delete

💰 Manage Payments:

List

View

📌 API Endpoints
📁 User Routes (/api/v1/user)
POST /register – Create Account

POST /login – Login

POST /change-password – Reset Password

GET /me – Get Profile

PUT /me/:id – Update Profile

POST /logout – Logout

📁 Course Routes (/api/v1/courses)
GET / – List All Courses

GET /:id – View Course by ID

📁 Payment Routes
POST /subscribe – Subscribe (Student)

GET /payments – List Payments (Admin)

GET /payments/:id – View Payment (Admin)

🛠 Installation & Setup
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/yourusername/lms-mern.git
cd lms-mern
2. Backend Setup
bash
Copy
Edit
cd server
npm install
npm run dev
3. Frontend Setup
bash
Copy
Edit
cd client
npm install
npm start
📷 Screenshot
<!-- Replace with actual path -->

🤝 Contributing
Contributions are welcome! Feel free to fork this repository and submit a pull request.

📄 License
This project is licensed under the MIT License.

🙋‍♂️ Author
Ankit Kumar

GitHub: @Oyeankit6

LinkedIn: https://www.linkedin.com/in/ankit-kumar-cse
