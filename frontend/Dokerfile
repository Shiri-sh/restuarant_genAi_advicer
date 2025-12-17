# להשתמש ב-Node.js (React)
FROM node:20-alpine

# ספריית עבודה בתוך ה-container
WORKDIR /app

# העתקת package.json ו-package-lock.json בלבד
COPY package*.json ./

# התקנת התלויות
RUN npm install

# העתקת כל הקבצים לפרויקט
COPY . .

# יצירת volume להקלה על hot reload (אפשרות)
# הערה: הסנכרון עם הקבצים של המחשב נעשה בזמן הריצה עם -v
VOLUME ["/app"]

# פתיחת פורט ברירת המחדל של React
EXPOSE 3000

# הפעלת הפרויקט עם npm start
CMD ["npm", "start"]

# =========================
# הוראות שימוש:
# docker build -t react-frontend .
# docker run -p 3000:3000 -v ${PWD}:/app react-frontend
# הסבר: -v ${PWD}:/app סנכרן את הקבצים מהמערכת שלך ל-container,
# כך שכל שינוי בקוד יתעדכן מיד ב-React (hot reload עובד).
# =========================
