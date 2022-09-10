let cartcontent = document.getElementById("cart-content")

let CartTotal = document.getElementById("cart-total")

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateCartItems = () => {
    if (basket.length !== 0 && basket !== []) {
        return (cartcontent.innerHTML = shopItemsdata.map((x) => {
            let search = basket.find((y) => y.id === x.id)
            if (search !== undefined){
            return `
                <div class="cart-item">
                    <img src=${x.image} alt="product-image">
                    <div>
                        <h4>${x.title}</h4>
                        <h5>₹ ${x.price}</h5>
                        <div onclick = "removeItem(${search.id})" class="remove-item">remove</div>
                    </div>
                    <div>
                        <div onclick = "increment(${search.id})" class="fas fa-chevron-up"></div>
                        <p id = ${search.id} class="item-amount">
                        ${search.item !== undefined ? search.item : 0}
                        </p>
                        <div onclick = "decrement(${search.id})" class="fas fa-chevron-down"></div>
                    </div>
                </div>
            `}
        }).join("")
        )
    }
    else{
        return (cartcontent.innerHTML = '');
    }
}
generateCartItems()

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem);
    if (search === undefined){
        basket.push({
        id : selectedItem,
        item : 1
    });
}
    else {
        search.item += 1
    }
    update(selectedItem)
    localStorage.setItem('data', JSON.stringify(basket))
   
};

let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((x)=> x.id === selectedItem);
    if (search.item === 0) return ;
    else if(search.item === undefined) return ;
    else {
        search.item -= 1
    }
    update(selectedItem)
    basket = basket.filter((x) => x.item !== 0)
    localStorage.setItem('data', JSON.stringify(basket))
    generateCartItems()
};

let update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item;
    TotalAmount()
};

let removeItem = (id) => {
    if(basket.length == 1){
        console.log('working');
        ClearCart();
    }
    else {
        selectedItem = id
        basket = basket.filter((x) => x.id !== selectedItem);
        localStorage.setItem('data', JSON.stringify(basket));
        generateCartItems();
        TotalAmount();
    }
}

let TotalAmount = () => {
    if ( basket.length !== 0  && basket !== []) {
        let amount = basket.map((x) => {
            let search = shopItemsdata.find((y) => y.id === x.id) || [];

            return x.item * search.price
        }).reduce((x,y) => x + y , 0);
        CartTotal.innerHTML = `${amount.toFixed(3)}
        <div class="cart-footer">
            <button onclick="ClearCart()" class="clear-cart banner-btn">clear cart</button>
            <button class="check-out banner-btn">check out</button>
        </div>
        `
    }
    else CartTotal.innerHTML = 0;
}

TotalAmount();

let ClearCart = () => {
    localStorage.removeItem('data');
    basket = [];
    TotalAmount();
    generateCartItems();
    
}