#  ⚱ Pot Pot Pottery *20210419*

## processo precedente al branch *20210415*
## 9. Inizializzazione e implementazione di Vuex
### processo
- creazione nuovo branch *20210419*
- installazione di Vuex
- trasferimento logica nello store
### considerazioni
Ho deciso di lasciare accessibile il progetto consegnato precedentemente, inizializzare un nuovo branch e implementare Vuex perchè mi sono reso conto che avrei dovuto gestire della logica di stato un po' più complessa. In questo modo potete testare anche le mie conoscenze sullo store.
## 10. Routing con due `router-view`
### processo
- prova 1: *nested routes*
- prova 2: adiacenti con *named routes* e *nested routes*
- prova 3: adiacenti con *named routes* e componenti dinamici
- tentativo astratto per concettualizzare la soluzione
- prova 4: adiacenti con *named routes* e navigation guard
### considerazioni
Come evidente dal processo si è trattato per questa sfida di un trial and error; ad ogni tentativo mi confrontavo con un buono problema che mi faceva riconsiderare la soluzione. Inizialmente avevo pensato di gestire l'overlay all'interno della pagina prodotti ma mi sono reso conto che per bloccare la pagina sottostante e mantenere il contenuto dell'overlay navigabile avrei dovuto avere 2 blocchi adiacenti al root del progetto. Mi sono rivolto quindi alle *named routes* e ho pensato di avere un nesting nella route di default in modo da tenere viva la pagina di navigazione attuale e poterci tornare alla chiusura dell'overlay. Con mia sorpresa la view default non mantiene le nested routes quando si naviga verso la pagina di single. Qui secondo me si nasconde una soluzione forse più ideale di quella trovata successivamente. L'idea immediatamente seguente è stata di usare dei componenti dinamici al posto della nested route per le pagine home e products. Ho quasi subito pensato non fosse una buona idea, magari avrebbe anche funzionato ma non era concettualmente accettabile. A questo punto di crisi ho creato un progettino semplice schematico per testare un'ultima idea che poi si è rivelata efficace. Partendo dall'idea delle *named routes* mi sono accorto che la funzionalità che desideravo era che il componente `default` della route `/products/:uid` cambiasse a seconda della pagina da cui si navigava per attivare l'overlay. Quindi con un po' di JS e tanto `console.log()` sono arrivato al risultato che mi ha permesso di completare l'esercizio:
```
beforeEnter: (to, from, next) => {
  if (from.path === "/" && from.matched.length) {
    to.matched[0].components.default = Home;
  } else {
    to.matched[0].components.default = Products;
  }
  next();
},
```
Non sono sicuro che sia l'approccio migliore ma funziona e logicamente mi sembra corretto, mi sembra strano che non ci sia un modo più semplice di indicare la condizionalità dei components nelle *named routes*.
### difficoltà
Non è stato semplice perchè si annidavano diversi dettagli inaspettati che mi hanno stimolato a ragionare in modo sempre più astratto. L'uscire dal progetto complesso e provare uno schema più semplice a parte per poi ritornarci è stato determinante
## 11. Implementazione SCSS 
### processo
- installazione modulo SASS
- conversione variabili
- utilizzo delle peculiarità SCSS
### considerazioni
SASS è stato divertente, in effetti combinato con la logica BEM è perfetto perchè permette il nesting e quindi di non dover ripetere ogni volta i selettori. Utile anche la funzionalità di `@extend` per riutilizzare parti di codice.
## 12. Pulizia codice e fix navigazione
### processo
- pulizia del codice
- implementazione dello `scrollBehavior`
- navigazione condizionale
### considerazioni
Mi sono accorto che anche nel progetto che avevo consegnato settimana scorsa c'era un errore relativo alla navigaizone da browser, che portava a punti diversi rispetto all'inizio pagina. Ho corretto e ho anche sistemato la casistica di navigazione diretta alla pagina prodotto e la chiusura dell'overlay, che provocava la navigazione alla pagina precedente nella `history` del browser. Ho risolto con una variabile nello `store` che si disattiva dopo il primo cambio route e che permette in quel caso di fare `router.push("/products")`.

🎈
