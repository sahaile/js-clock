# ⏱️ JavaScript Clock, Timer, Stopwatch & Countdown

This is a responsive web-based **Clock**, **Timer**, **Stopwatch**, and **Countdown** application built using **HTML**, **CSS**, and **Vanilla JavaScript**.  
Each tool is displayed in its own section and updates in real-time using a shared `Ticker` class with the **Observer Design Pattern**.

## 🚀 Live Demo

🔗 [View it on GitHub Pages](https://sahaile.github.io/js-clock/)

---

## 📦 Features

### 🕒 Clock
- Displays the current system time.
- Updates every second.
- Digital style with Orbitron font.

### ⏳ Timer
- Input minutes and seconds.
- Start/stop toggle and restart button.
- Progress bar visualizing remaining time.
- Input validation (e.g., seconds must be 0–59).

### ⌚ Stopwatch
- Accurate stopwatch down to milliseconds.
- Start, stop, and reset buttons.
- Display in `hh:mm:ss.ms` format.

### 📅 Countdown
- Enter a future (or past) date and time.
- Displays time remaining or time elapsed in:
  - Years, months, days, hours, minutes, seconds.
- Message shows when countdown is complete.

---

## 🧠 Technical Overview

- **Ticker Class**: Central timer loop using `setTimeout()` every 1000ms.
- **Observer Pattern**: Clock, Timer, Stopwatch, and Countdown subscribe to the `Ticker` to receive updates.
- **Modular Classes**: Each component (Clock, Timer, etc.) is encapsulated in its own class.


