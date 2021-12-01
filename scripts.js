function appendRow(tableID) {
  var tbodyRef = document.getElementById(tableID).getElementsByTagName('tbody')[0];
  var row = tbodyRef.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = "Test 1";
  cell2.innerHTML = "Test 2";
  cell3.innerHTML = "Test 3";
}
