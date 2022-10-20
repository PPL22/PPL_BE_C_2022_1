## How to Run

1. Clone repo backend

```
    git clone https://github.com/PPL22/backend.git
```

2. Clone repo frontend

```
    git clone https://github.com/PPL22/frontend.git
```

3. Install dependencies di kedua repo

```
    npm install
```

4. Migrate database

```
    npx prisma migrate dev --name init
```

5. Seed database

```
    npx prisma db seed
```

6. Run backend

```
    npm run devStart
```

7. Run frontend

```
    npm run start
```

### NB

Jangan lupa menyalakan server mysql
