class ShopingCart {
    constructor() {
        this.articles = [];
        this.total = 0;
        this.pagado = false;
    }
    addArticle(article, price) {
        this.articles.push(article, price);
        console.log(`articulos en el carrito ${this.articles}`);
    }
}

class Articulo {
    constructor(data) {
        this.data = data;
    }
    static async getArticle(articleSearch = '') {
        if (articleSearch != '') {

            console.log(`Entramos en la búsqueda ${articleSearch}`);
            let url = `https://api.mercadolibre.com/sites/MLM/search?q=${articleSearch}`;
            let resp = await fetch(url);
            let data = await resp.json();
            let datosArticulo = new Articulo(data);
            await datosArticulo.CreateArticle();
        } else {
            console.log("obteniento url");
            let url = `https://api.mercadolibre.com/sites/MLM/search?category=MLM1051`;
            const resp = await fetch(url);
            const data = await resp.json();
            let datosArticulo = new Articulo(data);
            await datosArticulo.CreateArticle();
        }
    }

    async CreateArticle() {


        let datos = JSON.stringify(this.data.results);

        let j = 0;
        let newAddCart = [];

        console.log(this.data);

        for (let i = 0; i < this.data.results.length; i++) {

            const divProducts = document.createElement("div");
            divProducts.setAttribute("id", "p" + i);
            divProducts.setAttribute("class", "Card");
            let producto = `
            <div class = "card" style = "width: 18rem; margin-top: 20px">
                <img src = ${this.data.results[i].thumbnail}/50px90/" alt = "Card image cap" > 
                    <div class = "card-title form-control" " > 
                        <h5 id = ${this.data.results[i].id} class = "card-title"> ${this.data.results[i].title}</h5>
                        <h3 id=${j} >$${this.data.results[i].price}</h3 > 
                        <a is= "5" name= "Add" class = "btn btn-primary" id = Boton ${j} onclick ="addCart();" > Agregar al carrito </a>
                    </div>
            </div>`;
            divProducts.innerHTML += producto;
            articleDiv.appendChild(divProducts);

            newAddCart.push({
                id: `${j}`,
                name: `${this.data.results[i].title}`,
                price: `${this.data.results[i].price}`
            });

            j += 1;

        }

        console.log(`Estos son los datos del articulo ----> ${JSON.stringify(newAddCart)}`);

    }
}


Articulo.getArticle();


const searchArticle = () => {
    let articleSearch = document.getElementById("busqueda").value;
    Articulo.getArticle(articleSearch);
}

function addCart() {
    console.log(`valor del boton pulsado --- > `);
    console.log('Se va a agregar un articulo al carrito');

    //const carrito = new ShopingCart();
    //carrito.addArticle(nombreCarrito, precioCarrito);
}

const getTendencias = async () => {
    console.log("tendencia");
    let url = `https://api.mercadolibre.com/trends/MLM/MLM1055`;
    let resp = await fetch(url);
    let data = await resp.json();

    console.log(`Tendencia en México de celulares ${data}`);


}