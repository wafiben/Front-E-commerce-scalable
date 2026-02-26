## 🐳 Docker

### Run the application

```bash
docker compose up --build
```

- `--build` : rebuilds the image on every launch
- The app will be available at **http://localhost:3000**

### What happens under the hood

The `docker-compose.yml` points to the `Dockerfile` which uses a **multi-stage** build :

1. **`build` stage** : installs dependencies with `npm ci` and compiles the React app (`npm run build`)
2. **`runtime` stage** : Nginx serves the generated static files

run the app http://localhost:3000 not with npm ngnix will srve you the app

### Stop the application

```bash
docker compose down
```
