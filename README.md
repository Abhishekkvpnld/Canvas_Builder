# 🗃️ Canvas Builder App

A full-stack web application where users can create a custom canvas with shapes, text, and images, and export it as a downloadable PDF. The generated PDF is stored in **Cloudinary** and its metadata is saved in **MongoDB**.

---

## 🔧 Tech Stack

**Frontend:**

* React.js
* Tailwind CSS
* HTML5 Canvas API
* Axios
* React Hot Toast

**Backend:**

* Node.js
* Express.js
* MongoDB with Mongoose
* Cloudinary (for PDF storage)
* PDFKit (for PDF generation)
* dotenv, morgan, cors

---

## ✨ Features

* 🎨 Draw **rectangles**, **circles**, **texts**, and **images** on canvas
* ✍️ Input custom size and position values
* 📄 Export canvas as a **PDF**
* ☁️ Upload PDF to **Cloudinary**
* 📟 Save canvas metadata to **MongoDB**
* 📂 View all saved canvases
* 🕒 Show creation date using `moment.js`
* 📅 Download or ❌ delete previous canvas

---

## 💠 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Abhishekkvpnld/Canvas_Builder.git
cd canvas-builder-app
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

Start server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

---

## 🔗 API Endpoints

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/canvas/add`        | Save canvas & upload PDF |
| GET    | `/canvas/all`        | List all canvases        |
| DELETE | `/canvas/delete/:id` | Delete a saved canvas    |

---


## 📦 Dependencies Highlights

* `pdfkit` – create PDF on the server from base64 image
* `cloudinary` – upload & store PDFs
* `moment` – date formatting
* `react-hot-toast` – beautiful toasts
* `axios` – HTTP client

---
