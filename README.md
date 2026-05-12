# SZOFTF Jegyzetelő

A **SZOFTF Jegyzetelő** egy modern, full-stack webes alkalmazás, amely lehetővé teszi a felhasználók számára jegyzetek készítését, szerkesztését és kezelését Markdown támogatással. A projekt egy React-alapú frontendből és egy Node.js (Express) alapú backendből áll, amely SQLite adatbázist használ az adatok tárolására.

## Főbb Funkciók

* **Markdown támogatás**: Jegyzetek írása és formázása Markdown szintaxissal.
* **Élő előnézet**: Váltás a szerkesztő, az előnézet és az osztott képernyős nézet között.
* **Teljes CRUD műveletek**: Jegyzetek létrehozása, megtekintése, módosítása és törlése.
* **Keresés**: Gyors keresés a jegyzetek címe és tartalma alapján.
* **Reszponzív felület**: Modern, letisztult dizájn, amely minden eszközön jól mutat.
* **Backend tesztelés**: Integrált API tesztek Jest és Supertest használatával.

## Alkalmazott Technológiák

### Frontend
* **React 19**: Modern komponens-alapú UI fejlesztés.
* **Vite**: Gyors fejlesztői környezet és build eszköz.
* **React-Markdown**: Markdown tartalom renderelése.

### Backend
* **Node.js & Express**: Szerveroldali keretrendszer.
* **SQLite3**: Könnyűsúlyú, fájlalapú relációs adatbázis.
* **Dotenv**: Környezeti változók kezelése.
* **Cors**: Keresztoldali erőforrásmegosztás kezelése.

### Tesztelés
* **Jest & Supertest**: Backend végpontok tesztelése.

## Projekt Felépítése

```text
SZOFTF_Jegyzetelo/
├── backend/            # Express szerver és adatbázis logika
│   ├── config/         # Adatbázis konfiguráció (SQLite)
│   ├── controllers/    # Üzleti logika (CRUD műveletek)
│   ├── routes/         # API útvonalak meghatározása
│   ├── tests/          # Integrációs tesztek
│   └── server.js       # Alkalmazás belépési pontja
└── frontend/           # React kliens alkalmazás
    ├── src/
    │   ├── api/        # API hívások kezelése
    │   ├── components/ # UI komponensek (Szerkesztő, Lista)
    │   └── App.jsx     # Fő alkalmazás komponens
    └── vite.config.js  # Vite konfiguráció (Proxy beállításokkal)
```

## Telepítés és Futtatás

Kövesse az alábbi lépéseket a projekt helyi környezetben történő elindításához.

### 1. Előfeltételek
* **Node.js** telepítése (v18+ ajánlott).
* A repository klónozása:
    ```bash
    git clone [https://github.com/HaLTeX1/SZOFTF_Jegyzetelo.git](https://github.com/HaLTeX1/SZOFTF_Jegyzetelo.git)
    cd SZOFTF_Jegyzetelo
    ```

### 2. Backend indítása
1.  Lépjen be a `backend` mappába:
    ```bash
    cd backend
    ```
2.  Telepítse a függőségeket:
    ```bash
    npm install
    ```
3.  Konfigurálja a környezeti fájlt:
    Másolja le a `.env.example` fájlt `.env` néven:
    ```bash
    cp .env.example .env
    ```
4.  Indítsa el a szervert:
    ```bash
    npm start
    ```
    *A szerver alapértelmezetten a `http://localhost:5000` címen fog futni.*

### 3. Frontend indítása
1.  Lépjen a `frontend` mappába a projekt gyökeréből:
    ```bash
    cd frontend
    ```
2.  Telepítse a függőségeket:
    ```bash
    npm install
    ```
3.  Indítsa el a fejlesztői szervert:
    ```bash
    npm run dev
    ```
    *A frontend alapértelmezetten a `http://localhost:5173` címen lesz elérhető, és automatikusan a 5000-es porton futó backendhez kapcsolódik.*

## Tesztelés

A backend tesztek futtatásához a `backend` mappában futtassa az alábbi parancsot:
```bash
npm test
```

## API Végpontok

Alap URL: `/api/notes`

| Metódus | Végpont | Leírás |
| :--- | :--- | :--- |
| `GET` | `/` | Összes jegyzet lekérdezése (lapozással). |
| `GET` | `/search?q=...` | Keresés a jegyzetekben. |
| `GET` | `/:id` | Egy konkrét jegyzet lekérdezése ID alapján. |
| `POST` | `/` | Új jegyzet létrehozása. |
| `PUT` | `/:id` | Meglévő jegyzet frissítése. |
| `DELETE` | `/:id` | Jegyzet törlése. |

