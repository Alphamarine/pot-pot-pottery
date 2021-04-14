#  ⚱ Pot Pot Pottery

## 1. Contenuti
### processo
- ricerca su Pot Pot Pottery: sito, instagram, facebook
- download immagini di contenuto
## 2. Prismic
### processo
- registrazione
- creazione repository
- creazione dei *custom types* `home` e `product`
- inserimento contenuti
- studio della documentazione
### considerazioni
Prima volta che affrontavo un headless CMS ed è stato un piacere per velocità e intuitività, rispetto alla mia esperienza con Wordpress. Documentazione chiara.
## 3. impostazione front-end
### processo
- creazione progetto Vue 2 con Vue CLI
- integrazione Prismic
- creazione componenti base
- inizializzazione git

### considerazioni
Avevo iniziato con Vue 3, poi mi sono accorto che non è ancora supportato da Prismic per cui sono andato su Vue 2 con Options API. Ho scartato Nuxt in modo da gestire il router tramite logica astratta come richiesto. Ho scartato anche la creazione di uno store con Vuex vista la semplicità dell'impostazione dei componenti, lavorando invece con props ed emits. A livello di componenti ne ho creati tre per la home e uno per la scheda prodotto in sovrapposizione. Avrei potuto separare anche la singola card prodotto che compone la griglia in home ma ho voluto semplificare la comunicazione tra componenti.

## 4. fetch dei contenuti
- studio della documentazione Prismic
- impostazione con `async await`
- templating con componenti Prismic

### considerazioni
Ho deciso di fare un unico fetch all'inizializzazione dell'app e passare poi tramite props i dati agli altri componenti. Inizialmente avevo impostato un fetch tramite `uid` nella singola scheda prodotto ma ho pensato in termini di performance che fosse irrilevante non caricare gli altri visto che in ogni caso venivano caricati per la home sottostante.

### difficoltà
Ho impiegato più del previsto a capire come funzionavano i componenti Prismic e come pescare i diversi dati, in ogni caso nulla di esagerato.

## 5. layout grafico
### processo
- scelta carattere tipografico
- impostazione CSS
- creazione layout base

### considerazioni
Ammetto di non aver pensato troppo alla grafica vista l'esercitazione più tecnica. Ho scelto come carattere l'[Avara della Velvetyne](https://velvetyne.fr/fonts/avara/) vista la sua natura open source e imprecisa, che mi sembrava giocare bene con l'ironia delle ceramiche. Per il resto, considerata la forte presenza di colore nelle immagini ho mantenuto uno schema BN. Per il CSS ho operato come al solito, un `reset.css` che popolo all'occorrenza per eliminare gli *user agent stylesheets*, un `variables.css` con le variabili, in questo caso colori e spaziatura, e un `main.css` con gli stili condivisi dai componenti. Il resto degli stili sta nei singoli componenti di competenza con logica BEM invece che usare `scoped` che si presta a facile abuso.
## 6. impostazione router
### processo
- creazione routes
- creazione router-view e router-link
- navigazione programmatica

### considerazioni
Il routing è abbastanza semplice con una sola `router-view` condizionale che mostra o nasconde la scheda a seconda della route in cui ci si trova. Ho passato tramite props l'`uid` prodotto che permette di filtrare l'array di prodotti a seconda del `router-link` da cui si è navigato. La route della scheda prodotto è dinamica a seconda dell'`uid`. Per l'aggiornamento dei contenuti ho implementato un watcher nella home e navigation guard nella scheda prodotto per reagire alla navigazione diretta verso un link di prodotto. 
### difficoltà
Mi sono ripassato il funzionamento del vue-router con route dinamiche e ho avuto qualche difficoltà inizialmente a stabilire come passare i dati prodotto e reagire agli stessi nella route.
## 7. comportamento scheda prodotto
### processo
- impostazione transizione
- scrittura logica di sovrapposizione
- gestione tempistiche di transizione
- gestione scrolling

### considerazioni
Ho inizialmente impostato la transizione di entrata-uscita con il wrapper predisposto da Vue, poi ho studiato come creare la sovrapposizione delle due viste. Devo dire che in questo mi ha salvato questo [articolo di CSS-Tricks](https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/) e un'accurata analisi del vostro sito 👓. Inizialmente avevo creato la logica del blocco pagina sottostante tramite stili condizionali Vue, ma avevo dei problemi di scatti inaspettati, probabilmente dovuti alla sequenza di esecuzione di certe logiche interne a Vue. Ho optato quindi per una logica pura JS che cambia il CSS. Lo scrolling è gestito con un *event listener* che viene aggiunto e rimosso all'interno dei componenti, in modo da far ritornare la home nel punto precedente alla sovrapposizione. L'effetto scroll per "mandare via" la scheda prodotto è creato da un `div` trasparente con `100vh` sotto il contenuto prodotto e dal trigger dello stesso metodo eseguito dal bottone close, con la differenza che la transizione di uscita viene tagliata essendo già parte dell'effetto.

### difficoltà
Questa è stata di gran lunga la parte più difficile da far funzionare. Vuoi per gli scatti con gli stili condizionali, vuoi per la necessità di gestire dei timeout per tener conto della transizione e delle variabili legate agli scrolling sia della home che della scheda prodotto, oppure per inspiegabili glitch che ho risolto con delle ridondanze. Probabilmente non era la parte su cui volevate testarmi ma da ossessivo dei dettagli non potevo consegnarvi un risultato parziale in questo senso. Comunque è stata una bella sfida e ho imparato come gestire viste in sovrapposizione, mi sembra che funzioni tutto e che il risultato sia paragonabile al vostro sito.

## 8. dettagli finali
### processo
- implementazione responsive minima
- pulizia codice
- ... favicon ...

👋