import { products } from '/js/products.mjs'

//filter products

export let filterProducts = function (prodArray, inputId, filteredProductContainerId) {
    let value = document.getElementById(inputId).value
    let filteredProducts = prodArray.filter(item =>
        item.name == value
    )

    return filteredProducts
}


