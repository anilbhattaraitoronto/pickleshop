import { getGrandTotal } from '/js/functions/getGrandTotal.mjs'


export let products = [
    {
        name: "Lapsi",
        unit: "Bottle",
        price: 1.99,
        quantity: 1
    },
    {
        name: "Kagati",
        unit: "Bottle",
        price: 2.99,
        quantity: 1,
    },
    {
        name: "Suntala",
        unit: "Bottle",
        price: 3.99,
        quantity: 1,
    },
    {
        name: "Nibuwa",
        unit: "Bottle",
        price: 5.99,
        quantity: 1
    },
    {
        name: "Mula",
        unit: "Bottle",
        price: 6.00,
        quantity: 1
    }
]

export function displayProducts(id) {
    let displayContainer = document.getElementById(id)
    products.forEach(product => {
        let displayItem = `
        <div class="product">
            <h3 class="productName">${product.name}</h3>
            <h4 class="productUnit">Unit: ${product.unit}</h4>
            <p> Price:
                <span class="productPrice"> ${product.price}</span>
            </p>
            <p>Quantity: <span class="quantity"> ${product.quantity} </span> </p>
            
            <input type="submit" value="add to cart" class="addButton">
        </div>
        `
        displayContainer.innerHTML += displayItem

    })

}
displayProducts('productContainer')

let cartItems = []
let cartItemIndex = 0;


export function addToCart() {
    //add selected items to array
    let productContainer = document.getElementById("productContainer")

    productContainer.addEventListener('click', (event) => {

        let addButtons = Array.from(document.getElementsByClassName("addButton"))
        let targetItem = event.target

        if (addButtons.indexOf(targetItem) !== -1) {
            // targetItem.innerHTML = "Your have added"
            targetItem.classList.toggle("addButton")

            let targetProducts = Array.from(document.querySelectorAll('.product'))
            let index = targetProducts.indexOf(targetItem.parentElement)
            let orderQuantity = targetItem.parentElement.querySelector('.quantity').textContent
            console.log(orderQuantity)
            products[index].quantity = Number(orderQuantity)

            cartItems.push(products[index])


            cartItems.forEach(item => {
                item.itemTotal = Number(item.quantity * item.price)
            })

            // cartItems.reverse()
            let cartContainer = document.getElementById('cartContainer')

            let cartItem = `
                    <div class="cart-product">
                        <h3 class="cart-product-name">${cartItems[cartItemIndex].name} </h3>
                        <p>Unit: ${cartItems[cartItemIndex].unit}</p>
                        <p> Price: ${cartItems[cartItemIndex].price}</p>
                        <label> Quantity: 
                        <input class="updatedQuantity" type="number" value=1 min=1>
                        
                        </label>
                        <button class="updateButton">Update Quantity</button>
                        
                        <p>Item Total: <span class="itemTotal">${ cartItems[cartItemIndex].itemTotal}</span></p>
                        
                        <button class="removeButton"> Remove </button>
                        
                    </div>
                    `

            cartContainer.innerHTML += cartItem

            //calculate grand total and insert it onto the DOM

            getGrandTotal(cartItems, 'grandTotal')

            cartItemIndex++

        }

    })

}
addToCart()


export function removeOrUpdateItem() {

    let cartContainer = document.querySelector("#cartContainer")

    cartContainer.addEventListener('click', (event) => {
        if (cartContainer.children) {
            //update
            let updateButtons = Array.from(document.querySelectorAll(".updateButton"))
            let targetUpdateButton = event.target
            let updateIndex = updateButtons.indexOf(targetUpdateButton)

            //remove
            let removeButtons = Array.from(document.querySelectorAll(".removeButton"))
            let targetButton = event.target
            let targetIndex = removeButtons.indexOf(targetButton)

            if (targetIndex !== -1) {

                cartItems.splice(targetIndex, 1)

                targetButton.parentElement.remove()
                //create an array of product totals from the array of product objects
                getGrandTotal(cartItems, 'grandTotal')

                cartItemIndex--
            }
            if (updateIndex !== -1) {
                let cartProducts = Array.from(document.querySelectorAll('.cart-product'))


                let updatedQuantity = targetUpdateButton.parentElement.querySelector(".updatedQuantity").value
                if (updatedQuantity > 0 && updatedQuantity != NaN) {

                    cartItems[updateIndex].quantity = updatedQuantity
                }

                cartItems.forEach(item => {
                    item.itemTotal = Number(item.quantity * item.price)
                })
                let updatedItemTotal = targetUpdateButton.parentElement.querySelector('.itemTotal')
                updatedItemTotal.innerHTML = Number(cartItems[updateIndex].itemTotal).toFixed(2)

                getGrandTotal(cartItems, 'grandTotal')

            }

        }
    })
}

removeOrUpdateItem()

