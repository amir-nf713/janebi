# Dockerfile for Frontend

# از تصویر پایه Node.js استفاده می‌کنیم
FROM node:18-alpine

# پوشه کاری را تنظیم می‌کنیم
WORKDIR /app

# فایل‌ها را کپی می‌کنیم
COPY package.json package-lock.json ./

# نصب وابستگی‌ها
RUN npm install

# کپی کردن باقی فایل‌ها
COPY . .

# ساخت اپلیکیشن در حالت تولید
RUN npm run build

# اجرا کردن سرور در حالت تولید
CMD ["npm", "start"]
