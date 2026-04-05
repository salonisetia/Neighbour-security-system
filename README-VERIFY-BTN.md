# How to See Verify Button

## Step 1: Start Servers
```
cmd /c \"cd backend & npm start\"
cmd /c \"cd frontend & npm run dev\"
```
Backend: http://localhost:5000  
Frontend: http://localhost:5173

## Step 2: Admin Login
http://localhost:5173/login
- Email: `rk@g.com`
- Password: `22222222`

## Step 3: Create Pending Alert
Dashboard → **POST ALERT** (blue button top-right) → Fill form → Submit

## Step 4: See Button
Dashboard → New alert card → **VERIFY ALERT** (green button below description)

## Debug
```
F12 > Console:
localStorage.getItem('userRole')  // 'admin'
fetch('/api/get_alert').then(r=>r.json()).then(console.log)  // pending alerts?
```

