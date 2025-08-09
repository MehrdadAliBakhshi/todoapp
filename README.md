##فارسی
📋 TodoApp – Next.js Fullstack Project
یک اپلیکیشن مدیریت وظایف (To-Do) با Next.js 13 و MongoDB که شامل عملیات کامل CRUD، سیستم احراز هویت، دسته‌بندی وظایف و مدیریت کاربران است. 

🚀 ویژگی‌ها
مدیریت وظایف (CRUD): ایجاد، ویرایش، حذف و مشاهده لیست وظایف

دسته‌بندی وظایف: ایجاد و مدیریت دسته‌بندی‌ها برای سازماندهی بهتر

سیستم احراز هویت:

ثبت‌نام کاربر جدید

ورود و خروج

مشاهده اطلاعات پروفایل

مدیریت کاربران (ویژه مدیر سیستم)

جستجوی وظایف

رابط کاربری واکنش‌گرا (Responsive)

استفاده از App Router در Next.js 13

API Routes برای مدیریت درخواست‌های سمت سرور

ذخیره‌سازی داده‌ها با MongoDB + Mongoose

🛠️ تکنولوژی‌ها
Frontend: Next.js 13, React, CSS Modules

Backend: Next.js API Routes, Node.js

Database: MongoDB, Mongoose

Auth: JWT (JSON Web Token)

UI: HTML, CSS 

📂 ساختار پوشه‌ها
bash
Copy
Edit
/app
    /api
        /todos      → عملیات CRUD وظایف
        /category   → عملیات CRUD دسته‌بندی‌ها
        /users      → عملیات مدیریت کاربران
        /auth       → ورود، ثبت‌نام، خروج و دریافت اطلاعات کاربر
    /todos         → صفحات مدیریت وظایف
    /category      → صفحات مدیریت دسته‌بندی‌ها
    /users         → صفحات مدیریت کاربران
/models           → مدل‌های Mongoose (User, Todo, Category)
/utils            → توابع کمکی
📦 نصب و اجرا
مخزن را کلون کنید:

bash
Copy
Edit
git clone https://github.com/YourUsername/todoapp.git
cd todoapp
پکیج‌ها را نصب کنید:

bash
Copy
Edit
npm install
متغیرهای محیطی را در فایل .env.local تنظیم کنید:

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
اجرای پروژه در محیط توسعه:

bash
Copy
Edit
npm run dev
پروژه را در مرورگر باز کنید:

arduino
Copy
Edit
http://localhost:3000
🌍 دمو آنلاین
🔗 به زودی لینک نسخه آنلاین (Vercel Deploy) اینجا قرار می‌گیرد.

📸 تصاویر
بزودی

📜 لایسنس
این پروژه تحت لایسنس MIT منتشر شده و استفاده از آن آزاد است.
###ENGLISH

📋 TodoApp – Next.js Fullstack Project
A task management (To-Do) application built with Next.js 13 and MongoDB, featuring full CRUD operations, authentication system, task categorization, and user management. 

🚀 Features
Task Management (CRUD): Create, edit, delete, and list tasks

Task Categorization: Create and manage categories for better organization

Authentication System:

User registration

Login and logout

View user profile

User Management: Admin panel for managing users

Task Search

Responsive UI

Next.js 13 App Router

API Routes for server-side request handling

Data Storage: MongoDB with Mongoose

🛠️ Technologies
Frontend: Next.js 13, React, CSS Modules

Backend: Next.js API Routes, Node.js

Database: MongoDB, Mongoose

Authentication: JWT (JSON Web Token)

UI: HTML, CSS

📂 Folder Structure
bash
Copy
Edit
/app
  /api
    /todos      → CRUD operations for tasks
    /category   → CRUD operations for categories
    /users      → User management operations
    /auth       → Authentication: login, register, logout, user info
  /todos       → Task management pages
  /category    → Category management pages
  /users       → User management pages
/models       → Mongoose models (User, Todo, Category)
/utils        → Utility functions
📦 Installation and Running
Clone the repository:

bash
Copy
Edit
git clone https://github.com/YourUsername/todoapp.git
cd todoapp
Install dependencies:

bash
Copy
Edit
npm install
Set environment variables in .env.local:

ini
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the development server:

bash
Copy
Edit
npm run dev
Open the project in your browser:

arduino
Copy
Edit
http://localhost:3000
🌍 Online Demo
🔗 Online demo (Vercel deployment) link will be added here soon.

📸 Screenshots
Coming soon.

📜 License
This project is licensed under the MIT License. Feel free to use it freely.
