let productcenter = document.getElementById("product-center")

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateProducts = () => {
    return (productcenter.innerHTML = shopItemsdata.map((x) => {
        let {id,price,title,image} = x;
        return `
        <div class="product-id-${id} product">
            <div class="img-container">
                <img src=${image} alt="product-1" class="product-img">
                <button onclick="AddItem(${id})" class="bag-btn"><i class="fas fa-shopping-cart"></i>add to bag</button>
            </div>
            <h3>${title}</h3>
            <h4>₹ ${price}</h4>
        </div>
    `
    }).join("")
    )
}

generateProducts();

let AddItem = (id) => {
    let selectedItem = id
    let search = basket.find((x)=> x.id === selectedItem);
    if (search === undefined){
        basket.push({
        id : selectedItem,
        item : 1
    });
}
    else {
        return
    }
    localStorage.setItem('data', JSON.stringify(basket))
    totalItem();

}

let totalItem = () =>{
    document.getElementById("cart-items").innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

totalItem();