# PizzaHub - React Only

## Fixed authentication
This version has **no MongoDB, Mongoose, Node/Express API, or external database**. Login and registration use the browser's `localStorage`, so the project runs as a React/Vite frontend only.

### Demo Login
- Email: `Arshid123@gmail.com`
- Password: `Arshid123@123`

### Run
```cmd
npm install
npm run dev
```

Then open the Vite URL, normally `http://localhost:5173`.

### Notes
- New registrations are saved in `localStorage` on the current browser.
- Demo login works without registration.
- Forgot/reset password is implemented locally for registered accounts.
- Clearing browser site data will remove locally registered accounts.
