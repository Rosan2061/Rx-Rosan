document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("invoice-date").textContent = new Date().toLocaleDateString();
});

function addRow() {
  const tableBody = document.getElementById("invoice-body");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td class="description-container">
      <textarea class="description-input" placeholder="Enter Item Description..." oninput="autoExpand(this)"></textarea>
    </td>
    <td><input type="number" value="" min="1" class="qty" oninput="calculateTotals()"></td>
    <td><input type="number" value="" min="0" step="0.01" class="price" oninput="calculateTotals()"></td>
    <td><input type="number" value="" min="0" max="100" step="0.1" class="discount" oninput="calculateTotals()"></td>
    <td><input type="number" value="" min="0" max="100" step="0.1" class="tax" oninput="calculateTotals()"></td>
    <td class="price-after-discount">0.00</td>
    <td class="total">0.00</td>
    <td><button onclick="deleteRow(this)">❌</button></td>
  `;

  tableBody.appendChild(row);
  calculateTotals();
}

function deleteRow(button) {
  button.parentElement.parentElement.remove();
  calculateTotals();
}

function calculateTotals() {
  let subtotal = 0;
  let totalTax = 0;
  let totalDiscount = 0;

  document.querySelectorAll("#invoice-body tr").forEach(row => {
    const qty = parseFloat(row.querySelector(".qty").value) || 0;
    const price = parseFloat(row.querySelector(".price").value) || 0;
    const discount = parseFloat(row.querySelector(".discount").value) / 100 || 0;
    const tax = parseFloat(row.querySelector(".tax").value) / 100 || 0;

    // Calculate the discounted price
    const discountedPrice = price * (1 - discount);
    let totalPrice = qty * discountedPrice;
    let taxAmount = totalPrice * tax;

    // Update the row
    row.querySelector(".price-after-discount").textContent = discountedPrice.toFixed(2);
    row.querySelector(".total").textContent = (totalPrice + taxAmount).toFixed(2);

    subtotal += totalPrice;
    totalTax += taxAmount;
    totalDiscount += price * discount * qty;
  });

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = totalTax.toFixed(2);
  document.getElementById("discount").textContent = totalDiscount.toFixed(2);
  document.getElementById("grand-total").textContent = (subtotal + totalTax).toFixed(2);
}

// Auto-expand description field
function autoExpand(textarea) {
  textarea.style.height = "40px"; // Reset height
  textarea.style.height = textarea.scrollHeight + "px"; // Set new height
}

// Print functionality
function printInvoice() {
  // Hide the "Add Item" button and action columns for print
  const actionColumns = document.querySelectorAll("td:last-child, th:last-child, button");
  const addItemButton = document.querySelector("#add-btn");

  // Hide the elements
  addItemButton.style.display = "none";  // Hide add row button
  actionColumns.forEach(el => el.style.display = "none");  // Hide delete button and action column

  // Print the page
  window.print();

  // Restore the hidden elements after printing
  addItemButton.style.display = "inline-block";  // Show add row button
  actionColumns.forEach(el => el.style.display = "");  // Restore delete button and action column
}
