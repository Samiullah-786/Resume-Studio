# 📄 Resume Studio — Build Your Next Chapter

**Resume Studio** is a modern, responsive, client-side resume builder web application. It features live real-time editing and preview, dual layout templates (*Modern* & *Classic*), customizable color accents, a built-in **ATS Readiness Checklist**, repeatable work experience and education sections, auto-saving drafts, and print-ready A4 PDF export.

---

## ✨ Features

- **⚡ Real-Time Live Preview**: Instant side-by-side preview updates automatically as you type.
- **🎯 ATS Readiness Score**: Real-time scoring engine (0–100%) checking key structural details to maximize ATS compliance.
- **🎨 Dynamic Customization**:
  - **Multiple Layouts**: Switch between *Modern* and *Classic* templates.
  - **Custom Accent Colors**: Native color picker to match personal branding.
- **🧩 Repeatable Sections**: Easily add, edit, or remove multiple **Experience** and **Education** items.
- **🏷️ Interactive Skill Chips**: Type comma-separated skills to instantly generate formatted visual skill tags.
- **🖨️ One-Click PDF Export**: Styled specifically for native browser A4 printing (`window.print()`), hiding builder controls and outputting a clean document.
- **🔒 Privacy & Local Persistence**: Auto-saves your draft locally in your browser (`resume-studio-v1`). No login or external server uploads required.
- **🔄 Instant Reset**: Reset draft to built-in sample data anytime with one click.

---

## 📁 Project Structure

```
Resume-Studio/
├── index.html     # Builder forms and live resume paper view
├── style.css      # CSS layout, preview theme, color variables & A4 print styles
├── script.js      # State management, ATS scoring engine, DOM renderer & LocalStorage
└── README.md      # Project documentation
```

---

## 🚀 Getting Started

1. **Download or Clone** the repository files.
2. Keep `index.html`, `style.css`, and `script.js` in the same directory.
3. Open `index.html` in any web browser.
4. **No npm install, external server, or build step required!**

---

## 📖 How to Use

### 1. Fill Out Personal & Professional Details
- Enter your **Name**, **Professional Title**, **Contact Info**, and **Summary**.
- Note the live character count helper for the summary section.

### 2. Add Experience & Education
- Click **＋ Add role** to add work experience entries (Title, Company, Location, Dates, Description).
- Click **＋ Add education** to add academic qualifications or certifications.
- Click the **×** icon on any entry to remove it.

### 3. Add Core Skills
- Enter skills as a comma-separated list (e.g. `JavaScript, React, UI Design, Git`).
- Skill tags automatically generate in both editor and preview sections.

### 4. Tailor Visual Design
- Select **Template** (*Modern* or *Classic*) in the top preview toolbar.
- Click **Accent** to choose a custom color scheme for section headers and accents.

### 5. Export to PDF
- Click **Export PDF** in the top header.
- In the browser print dialog, select **Save as PDF** as the destination.
- Ensure margins are set to default and background graphics are enabled for best results.

---

## ⚙️ Customization

- **Starter Content**: Edit the `DEFAULTS` object in `script.js` to change default sample data.
- **ATS Scoring Rules**: Adjust criteria and points inside `atsScore()` function in `script.js`.
- **CSS Styling & Fonts**: Tweak font families, dimensions, or A4 print styles in `style.css`.

---

## 🛠️ Tech Stack

- **HTML5**: Structured semantic markup, native input types.
- **CSS3**: Custom CSS Properties (Variables), `@media print` layout rules, Flexbox & Grid.
- **JavaScript (ES6+)**: Vanilla JS, LocalStorage API, dynamic DOM manipulation.

---

## 📄 License

Open source and available for personal or professional customization.

