function appendRow(tableID) {
  var tbodyRef = document.getElementById(tableID).getElementsByTagName('tbody')[0];
  var row = tbodyRef.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = '<input type="text" class="col1" name"col1">';
  cell2.innerHTML = '<input type="text" class="col2" name"col2">';
  cell3.innerHTML = '<input type="text" class="col3" name"col3">';
}
