export function getGrandTotal(priceArray, id) {

    let grandTotal = Number(priceArray.map(item => item.itemTotal).reduce((a, b) => a + b, 0)).toFixed(2)
    let grandTotalContainer = document.getElementById(id)
    grandTotalContainer.innerHTML = grandTotal

    return grandTotalContainer
}