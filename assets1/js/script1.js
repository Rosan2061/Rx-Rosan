const addRowBtn = document.getElementById("addRowBtn");
const dataTable = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
const saveFileBtn = document.getElementById("saveFileBtn");
const openFileBtn = document.getElementById("openFileBtn");

// Totals and Final Balance Elements
const totalExpenseCell = document.getElementById("totalExpense");
const totalIncomeCell = document.getElementById("totalIncome");
const finalBalanceCell = document.getElementById("finalBalance");

// Add a new row
addRowBtn.addEventListener("click", () => {
  addRow();
});

// Add a row function
function addRow(data = {}) {
  const newRow = dataTable.insertRow();
  const rowCount = dataTable.rows.length;

  newRow.innerHTML = `
    <td>${rowCount}</td>
    <td><input type="text" name="title" placeholder="Enter Title" value="${data.title || ""}"></td>
    <td><input type="number" name="expense" placeholder="0" class="expense-input" value="${data.expense || ""}"></td>
    <td><input type="number" name="income" placeholder="0" class="income-input" value="${data.income || ""}"></td>
    <td><input type="text" name="remark" placeholder="Enter Remark" value="${data.remark || ""}"></td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  const deleteBtn = newRow.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    newRow.remove();
    updateRowNumbers();
    updateTotalsAndBalance();
  });

  const expenseInput = newRow.querySelector(".expense-input");
  const incomeInput = newRow.querySelector(".income-input");

  expenseInput.addEventListener("input", updateTotalsAndBalance);
  incomeInput.addEventListener("input", updateTotalsAndBalance);

  // Ensure totals are recalculated immediately after adding a new row
  updateTotalsAndBalance();
}

// Update row numbers after deletion
function updateRowNumbers() {
  const rows = dataTable.rows;
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[0].innerText = i + 1;
  }
}

// Update totals and final balance
function updateTotalsAndBalance() {
  let totalExpense = 0;
  let totalIncome = 0;

  // Calculate totals
  const expenseInputs = document.querySelectorAll(".expense-input");
  const incomeInputs = document.querySelectorAll(".income-input");

  expenseInputs.forEach(input => {
    totalExpense += parseFloat(input.value) || 0;
  });

  incomeInputs.forEach(input => {
    totalIncome += parseFloat(input.value) || 0;
  });

  // Update totals in the table footer
  totalExpenseCell.textContent = totalExpense.toFixed(2);
  totalIncomeCell.textContent = totalIncome.toFixed(2);

  // Update final balance
  const finalBalance = totalIncome - totalExpense;
  finalBalanceCell.textContent = finalBalance.toFixed(2);
}

// Save Table Data
saveFileBtn.addEventListener("click", () => {
  const tableData = [];
  const rows = dataTable.rows;

  for (const row of rows) {
    const cells = row.getElementsByTagName("td");
    const rowData = {
      sn: cells[0].innerText,
      title: cells[1].querySelector("input").value,
      expense: cells[2].querySelector("input").value,
      income: cells[3].querySelector("input").value,
      remark: cells[4].querySelector("input").value,
    };
    tableData.push(rowData);
  }

  const blob = new Blob([JSON.stringify(tableData, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Rx-Presents/Daiinaki Khata_data.json";
  link.click();
});

// Open File Button - Load Data
openFileBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (!Array.isArray(data)) throw new Error("Invalid file format");

        // Clear existing rows
        dataTable.innerHTML = "";

        // Populate rows from file
        data.forEach(row => addRow(row));

        // Update totals and final balance
        updateRowNumbers();
        updateTotalsAndBalance();
      } catch (error) {
        alert("Error loading file: " + error.message);
      }
    };

    reader.readAsText(file);
  };

  input.click();
});

// Ensure initial totals are calculated on page load
updateTotalsAndBalance();
