## 🚀 Setup e Deploy

### 1. Crea il progetto

```bash
mkdir progressivo
cd progressivo
npm init -y
npm install @vercel/kv
npm install -D vercel
```

### 2. Crea la struttura delle cartelle

```bash
mkdir api
mkdir lib 
mkdir public
```

### 3. Copia tutti i file negli appositi percorsi

### 4. Crea il database Vercel KV

1. Vai su [vercel.com](https://vercel.com)
2. Nel tuo progetto, vai su **Storage** → **Create Database**
3. Seleziona **KV (Redis)**
4. Crea il database (il piano gratuito ha 256MB e 10,000 comandi/giorno)
5. Vercel creerà automaticamente le variabili d'ambiente `KV_REST_API_URL` e `KV_REST_API_TOKEN`

### 5. Test in locale

```bash
# Collega il progetto a Vercel
vercel link

# Scarica le variabili d'ambiente
vercel env pull

# Avvia in sviluppo
vercel dev
```

Vai su `http://localhost:3000/dc` o `http://localhost:3000/dta`

### 6. Deploy in produzione

```bash
vercel --prod
```

## ✨ Caratteristiche

✅ **Persistenza dati** - Vercel KV mantiene i dati tra le richieste  
✅ **Performance** - Redis è velocissimo  
✅ **Scalabilità** - Gestisce migliaia di richieste  
✅ **Auto-inizializzazione** - I contatori si inizializzano al primo uso  
✅ **Incremento anno automatico** - Se l'anno cambia, resetta il progressivo  
✅ **UI moderna** - Interfaccia pulita con animazioni  
✅ **Loading states** - Feedback visivo durante le operazioni

## 🎯 Limiti Piano Gratuito Vercel KV

- 256 MB storage
- 10,000 comandi al giorno
- 100 richieste al secondo
