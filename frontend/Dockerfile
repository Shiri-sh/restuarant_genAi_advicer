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
