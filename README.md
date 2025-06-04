# 📞 CallsVid — Real-Time Video Calling App</h1> 

<br>

![Landing Page](./frontend/public/landingPage.png)

### Demo Link : [CallsVid](https://callsvid-ve69.onrender.com/)

<br>

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="60" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="60" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
</div>


## 🎯 OverView
**CallsVid** is a real-time, peer-to-peer video calling web application designed to enable seamless one-on-one video communication directly in the browser. Built using modern web technologies like WebRTC, React, and Socket.IO, it provides a secure and responsive interface for users to initiate and receive video calls without requiring third-party tools or browser extensions.

## 🎯 Key Features

- 🎥 **Video Calling**  
  Establish peer-to-peer HD video calls using WebRTC.

- 🖥️ **Screen Sharing**  
  Seamlessly share your screen with the other participant during a call.

- 💬 **Live Chat**  
  Send and receive instant messages alongside video/audio communication.

- 🔗 **Room-Based Sessions**  
  Generate and join calls using unique room IDs.

- 🛠️ **WebSocket-Powered Signaling**  
  Built on Socket.IO for reliable and fast signaling between peers.

- 🧩 **Modular Architecture**  
  Clean React components with separate services and utilities.

<br>

## 📸 Screenshots

<!-- Add screenshots or GIFs here -->

<p align="center">
  <img src="./frontend/public/authPage.png" alt="Auth Page" width="450"/>
  <img src="./frontend/public/homePage.png" alt="Home Page" width="450"/>
</p>


<p align="center">
  <img src="./frontend/public/meetPage.png" alt="Meet Page" width="300"/>
  <img src="./frontend/public/chatPage.png" alt="Chat Page" width="300"/>
  <img src="./frontend/public/historyPage.png" alt="History Page" width="300"/>
</p>



<br>

## 🏗️ Tech Stack

### 🖥️ Frontend
- [React.js](https://reactjs.org/) – UI framework
- [WebRTC](https://webrtc.org/) – Real-time media stream handling
- [Socket.IO Client](https://socket.io/docs/v4/client-api/) – Signaling
- [Material Ui](https://mui.com/) – Styling

### 🌐 Backend
- [Node.js](https://nodejs.org/) – JavaScript runtime
- [Express.js](https://expressjs.com/) – Web server
- [Socket.IO](https://socket.io/) – Real-time WebSocket communication

<br>

## 🧭 Project Structure

```plaintext
CallsVid/
├── backend/
│   ├── src/
|   |   ├── controllers/
|   |   |   ├── socketManager.js
|   |   |   └── user.controller.js
|   |   ├── models/
|   |   |   ├── meeting.model.js
|   |   |   └── user.model.js
|   |   ├── routes/
|   |   |   └── users.routes.js
|   |   ├── app.js             
├── frontend/
│   └── src/
│       ├── App.jsx
|       ├── App.css
|       ├── main.jsx
|       ├── index.css
|       ├── utils/
|       ├── styles/
|       |   └── VideoMeet.css
|       ├── contexts/
|       |   └── AuthContext.jsx
│       ├── components/
│       │   ├── CustomIcons.jsx
│       │   └── ForgotPassword.jsx
│       └── pages/
│           ├── authentication.jsx
|           ├── landing.jsx
|           ├── signup.jsx
|           └── VideoMeet.jsx
├── README.md
└── LICENSE

```

## 🧰 Installation & setup
### 🔧 Clone the repository
```plaintext
git clone https://github.com/bhawani-prajapat2006/CallsVid.git
cd CallsVid
```
### ⚙️ Backend Setup
1. Navigate to the backend folder:
```plaintext
cd backend
```
2. Install dependencies:
```plaintext
npm install
```
3. Start the server:
```plaintext
npm run dev
```

### 💻 Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
```plaintext
cd ../frontend
```
2. Install dependencies:
```plaintext
npm install
```
3. Create a .env file in frontend/ and set your backend URL:
```plaintext
VITE_SERVER_URL=http://localhost:8000
```
4. Start the frontend server:
```plaintext
npm run dev
```
