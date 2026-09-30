# Code-Alpha-Internship-project-Tasks--project
Network Traffic Analyzer is a Python-based cybersecurity project that captures and analyzes network packets in real time. It provides a web-based dashboard for monitoring network traffic, identifying protocols, viewing source and destination IP addresses, and displaying packet statistics.
# 🛡️ Network Traffic Analyzer

A lightweight **real-time network traffic analysis tool** built with Python and web technologies. The project captures network packets using Scapy and presents analyzed traffic through an interactive web dashboard.

## 📌 Overview

The Network Traffic Analyzer is designed as a hands-on cybersecurity project for understanding how network packets can be captured, analyzed, and visualized.

The backend handles packet capture and analysis, while the frontend provides a simple dashboard for monitoring network activity.

## ✨ Features

- 📡 Real-time network packet capture
- 🔍 Packet-level traffic analysis
- 🌐 Source and destination IP detection
- 🔗 TCP, UDP, and ICMP protocol identification
- 📦 Packet size monitoring
- 📝 Basic packet payload display
- ▶️ Start packet capture
- ⏹️ Stop packet capture
- 🗑️ Clear captured packets
- 📊 Real-time packet statistics
- 🟢 Backend status monitoring
- 💻 Interactive web-based dashboard

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **Python** | Backend and packet processing |
| **Scapy** | Network packet capture and analysis |
| **Flask** | REST API backend |
| **Flask-CORS** | Frontend-backend communication |
| **HTML5** | Dashboard structure |
| **CSS3** | User interface and styling |
| **JavaScript** | API communication and live updates |

## 📂 Project Structure

```text
Network-Traffic-Analyzer/
│
├── index.html
├── style.css
├── script.js
├── network_sniffer.py
└── requirements.txt
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd Network-Traffic-Analyzer
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the backend

```bash
python network_sniffer.py
```

The Flask backend will run at:

```text
http://127.0.0.1:5000
```

### 5. Launch the frontend

Open `index.html` using **VS Code Live Server**.

> On Windows, Scapy packet capture may require **Npcap** to be installed.

## 🔄 How It Works

```text
Network Traffic
       ↓
     Scapy
       ↓
Packet Capture
       ↓
Packet Analysis
       ↓
Flask API
       ↓
JavaScript
       ↓
Web Dashboard
```

The application captures packets through Scapy, extracts relevant network information, and sends the analyzed data to the frontend through Flask API endpoints.

## 🔌 API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/start` | GET | Start packet capture |
| `/api/stop` | GET | Stop packet capture |
| `/api/packets` | GET | Retrieve captured packets |
| `/api/stats` | GET | Retrieve packet statistics |
| `/api/clear` | GET | Clear captured packets |
| `/api/status` | GET | Check backend status |

## 🔐 Cybersecurity Concepts

This project provides practical exposure to:

- Network monitoring
- Packet analysis
- Protocol identification
- IP-based traffic observation
- Network security fundamentals
- Client-server communication
- Security-focused Python development

## ⚠️ Disclaimer

This project is intended for **educational and authorized network-monitoring purposes only**. Packet capture should only be performed on networks and devices where you have appropriate authorization.

## 🚀 Future Improvements

Possible future enhancements include:

- Advanced protocol filtering
- Traffic visualization
- Packet search and filtering
- Exporting packet data
- Detection of suspicious traffic patterns
- Additional protocol support
- Improved packet analysis
- Security alert generation

## 👩‍💻 Project

**Network Traffic Analyzer**  
Developed as part of a hands-on **Cybersecurity Project Series**.
