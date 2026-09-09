# Smart Door Lock

Real-time door unlocking system using facial biometrics combining IoT and Python for secure access control.

## Features

- 📷 **Facial Recognition** - Advanced face detection and recognition using Python
- 🔒 **Secure Access** - Multi-factor authentication with confidence scoring
- 📊 **Real-time Dashboard** - Monitor door status and activity live
- 👥 **User Management** - Register and manage authorized users
- 🔔 **Instant Alerts** - Get notified of access attempts
- 📱 **IoT Integration** - Connect with Raspberry Pi and smart locks

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Python (OpenCV, face_recognition)
- **IoT:** Raspberry Pi, Servo Motor, Camera Module
- **Database:** SQLite / MySQL

## How It Works

1. Camera captures face when someone approaches the door
2. Python backend processes the image using OpenCV
3. Face is compared against registered users
4. If match confidence > 85%, door unlocks automatically
5. All access attempts are logged

## Project Structure

```
Smart-Door-Lock/
├── index.html          # Dashboard UI
├── style.css          # Styling
├── script.js          # Frontend logic
├── face_detection.py  # Python face detection
├── door_lock.py       # IoT control script
└── README.md
```

## Hardware Requirements

- Raspberry Pi 4
- Pi Camera Module
- Servo Motor (for lock mechanism)
- LED indicators (Red/Green)
- Buzzer (for alerts)

## Live Demo

[View Live Dashboard](https://smart-door-lock.vercel.app)

## Author

**Ravi Varman S**
- GitHub: [@Ravi-Varman-S](https://github.com/Ravi-Varman-S)
- LinkedIn: [ravi-varman-s](https://linkedin.com/in/ravi-varman-s)

## License

This project is open source and available under the MIT License.
