fetch('./annunci.json').then((response) => response.json()).then((data) => {
    data.sort((a, b) => a.price - b.price );

    let radiowrapper = document.querySelector('#radiowrapper');
    let cardwrapper = document.querySelector('#cardwrapper');


    function radiocreate() {
        // 1. Estrai tutte le categorie (con duplicati)
        let categories = data.map((annuncio) => annuncio.category);

        // 2. Crea l'array senza duplicati usando Set
        let uniquecategories = Array.from(new Set(categories));

        uniquecategories.forEach((category) => {

            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
             <input class="form-check-input" type="radio" name="radioDefault" id="${category}">
                  <label class="form-check-label" for="${category}">
                    ${category}
                  </label>
                `;
            radiowrapper.appendChild(div);
        })
    }

    // Inserisco il radio "Tutte le categorie" con id "all"
    let allDiv = document.createElement('div');
    allDiv.classList.add('form-check');
    allDiv.innerHTML = `
        <input class="form-check-input" type="radio" name="radioDefault" id="all" checked>
        <label class="form-check-label" for="all">
          Tutte le categorie
        </label>
    `;
    radiowrapper.appendChild(allDiv);

    radiocreate();

    function truncateword(stringa) {
        if (stringa.length > 15) {
            return stringa.slice(0, 15) + '...';
        } else {
            return stringa;
        }
    }

    function showcards(arr = data) {
        cardwrapper.innerHTML = ''; // Pulizia prima di aggiungere
        arr.forEach((annuncio, i) => {
            let div = document.createElement('div');

            div.classList.add('col-12', 'col-md-6', 'col-lg-4');

            div.innerHTML = ` 
              <div class="card-custom">
                <img src="https://picsum.photos/${300 + i}" alt="Immagine casuale" class="img-fluid img-card">
                <p class="h2 mt-2" title="${annuncio.name}">${truncateword(annuncio.name)}</p>
                <p class="h4">${annuncio.category}</p>
                <p class="lead">${annuncio.price} €</p>
              </div>
            `;
            cardwrapper.appendChild(div);
        });
    }

    showcards();

    function filterbycategory(category) {
        if (category !== 'all') {
            let filtered = data.filter((annuncio) => annuncio.category == category);
            showcards(filtered);
        } else {
            showcards(data);
        }
    }

    
    let radiobuttons = document.querySelectorAll('.form-check-input');

    radiobuttons.forEach((button) => {
        button.addEventListener('click', () => {
            filterbycategory(button.id);
        });
    });
    
     let priceinput = document.querySelector('#priceinput');
      let pricevalue = document.querySelector('#pricevalue');

   function setpriceinput() {
    let prices = data.map((annuncio) => +annuncio.price);
    prices.sort( (a, b)=> a - b);
    let maxprice = Math.ceil(prices.pop());
   console.log(maxprice);
    priceinput.max = maxprice;
    priceinput.value = maxprice;
    pricevalue.innerHTML = maxprice;
}

setpriceinput();

function filterbyprice(){
let filtered = data.filter( (annuncio)=> annuncio.price <= priceinput.value);
console.log(filtered);

}
priceinput.addEventListener('input', () => {
    pricevalue.innerHTML = priceinput.value;  // Aggiorna il valore visualizzato
    
    let maxPrice = Number(priceinput.value);
    let filtered = data.filter(annuncio => +annuncio.price <= maxPrice);
    showcards(filtered);
});


let wordinput = document.querySelector('#wordinput');

function filterbyword(parola) {
    let filtered = data.filter(function(annuncio) {
        return annuncio.name.toLowerCase().indexOf(parola.toLowerCase()) !== -1;
    });
    console.log(filtered);
    showcards(filtered);
}

wordinput.addEventListener('input', function() {
    filterbyword(wordinput.value);
});

});


