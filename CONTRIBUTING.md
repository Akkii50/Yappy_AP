# Contributing to Yappy

Thank you for considering a contribution to Yappy. This guide explains the local setup, code style, validation steps, and pull request expectations.

---

## 1. Local Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Yappy.git
   cd Yappy
   ```

2. Install dependencies:
   ```bash
   npm install --prefix backend
   npm install --prefix frontend
   ```

3. Configure environment variables:
   ```bash
   cp backend/.env.example backend/.env
   ```

4. Fill in `backend/.env` with MongoDB, JWT, and Cloudinary values.

5. Start the backend:
   ```bash
   npm run dev --prefix backend
   ```

6. Start the frontend:
   ```bash
   npm run dev --prefix frontend
   ```

7. Visit `http://localhost:5173`.

---

## 2. Coding Conventions

- Keep changes focused and avoid unrelated refactors.
- Prefer clear component names and descriptive variable names.
- Match the existing React functional component style.
- Keep Zustand store actions small and explicit.
- Use Tailwind/DaisyUI utility classes consistently for UI changes.
- Avoid committing secrets from `backend/.env`.

---

## 3. Validation

Before opening a pull request, run:

```bash
npm run lint --prefix frontend
npm run build --prefix frontend
```

If backend behavior changed, manually verify the relevant API flow with the backend running:

```bash
npm run dev --prefix backend
```

---

## 4. Pull Request Guidelines

Please include:

- A concise summary of what changed.
- Screenshots or screen recordings for UI changes.
- Any new environment variables or migration notes.
- Validation commands run and their results.

---

## 5. Suggested Contribution Areas

- Better loading and empty states.
- Mobile chat ergonomics.
- Message delivery/read indicators.
- Notification sounds and user preferences.
- Test coverage for auth and message flows.
- Accessibility improvements for keyboard and screen-reader users.

---

## 6. Security Notes

- Never commit real credentials.
- Keep `JWT_SECRET` long and random.
- Treat uploaded media as user-provided content.
- Validate backend inputs when adding new API fields.
