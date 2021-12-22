/*
 * Appends another row.
 */
function appendRow(tableID) {
  var tbodyRef = document.getElementById(tableID).getElementsByTagName('tbody')[0];
  var row = tbodyRef.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = '<input type="text" class="col1" name"col1">';
  cell2.innerHTML = '<input type="text" class="col2" name"col2" oninput="weightMirror()">';
  cell3.innerHTML = '<input type="text" class="col3" name"col3" min="0"\
          onchange="minCheck(this.value, this.min, this)">';
}

/*
 * Calculates the sum of the Grades column.
 */
function calculateGrade() {
  var rows = document.getElementById("table").rows;
  var result = 0;

  //loops through rows and adds user input from Grades column.
  for (var i = 1; i < rows.length-1; i++) {
    result += Number(rows[i].cells[1].children[0].value);
  }
  alert(result);
}

/*
 * Mirrors the number inputted in the Grade column to its
 * respective adjacent Weight column.
 */
function weightMirror() {
  var rows = document.getElementById("table").rows;
  for (var i = 1; i < rows.length-1; i++) {
    var grade = rows[i].cells[1].children[0].value;
    rows[i].cells[2].children[0].value = grade;
    rows[i].cells[2].children[0].setAttribute("min", grade);
  }
}

/*
 * Checks whether the value inputted in the Weight column is not lower than min.
 * If so, alert is sent out.
 */
function minCheck(value, min, row) {
  if (Number(value) < Number(min)) {
    /* First "parentNode" escapes input -> td, second td -> tr */
    var rowNumber = row.parentNode.parentNode.rowIndex - 1;
    var popup = document.getElementById("popup");
    var triangle = document.getElementById("popup-triangle");
    popup.style.marginTop = 60+61*Number(rowNumber)+"px";
    popup.style.visibility = "visible";
    triangle.style.marginTop = 97+61*Number(rowNumber)+"px";
    triangle.style.visibility = "visible";
    setTimeout(function(){
      popup.style.visibility = "hidden";
      triangle.style.visibility = "hidden"; }, 5000);
  }
}
