const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

/* class CartList extends ProductsList {
    constructor(container = '.cart-div', goods, allProducts, amount, countGoods) {
        super(container, goods, allProducts)
        this.amount = amount;
        this.countGoods = countGoods;
        this._getProducts()
            .then(contents => { //data - объект js
                this.goods = [...contents];
                this.render();
            });
    }
    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new CartItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class CartItem extends ProductItem {
    constructor(title, price, id, img, quantity) {
        super(title, price, id, img);
        this.quantity = quantity;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                <div class="cart-desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <p>${this.quantity} $</p>
                </div>
            </div>`
    } */
/* } */

class CartList {
    constructor(container = '.cart-div') {
        this.container = container;
        this.cartgoods = [];//массив товаров
        this.allCart = [];//массив объектов
        this._getProducts()
            .then(data => {
                this.cartgoods = [...Object.values(data)];
                this.render();
            });
    }
    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    render() {
        const block = document.querySelector(this.container);
        block.insertAdjacentHTML('beforeend', `<p class="cart-amount">Итого: ${this.cartgoods[0]} $</p>
        <p class="cart-goods">Всего товаров: ${this.cartgoods[1]}</p>`);
        for (let item of this.cartgoods[2]) {
            const cartObj = new CartItem(item);
            this.allCart.push(cartObj);
            block.insertAdjacentHTML('beforeend', cartObj.render());
        }
    }
}

class CartItem {
    constructor(contents) {
        this.id = contents.id_product;
        this.price = contents.price;
        this.name = contents.product_name;
        this.quantity = contents.quantity;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
        <div class="cart-desc">
            <h3>${this.name}</h3>
            <p>${this.price} $</p>
            <p>${this.quantity}</p>
        </div>
    </div>`
    }
}

/* CartList.prototype = Object.create(ProductsList.prototype);
CartList.prototype.constructor = CartList;

CartItem.prototype = Object.create(ProductItem.prototype);
CartItem.prototype.constructor = CartItem; */

let cart = new CartList();
let list = new ProductsList();
