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
  cell2.innerHTML = '<input type="number" class="col2" name"col2" min="0" max="100">';
  cell3.innerHTML = '<input type="number" class="col3" name"col3" min="0" \
          max="100" onchange="minCheck(this.value, this.min, this)">';
}

/*
 * Calculates the overall grade of the user by multiplying the decimal form of
 * the Grade of the User with the Weight of the respective assessment.
 */
function calculateGrade() {
  var rows = document.getElementById("table").rows;
  var result = 0;
  var grade, weight;

  //loops through rows and calculates user input from Grades and Weight column.
  for (var i = 1; i < rows.length-1; i++) {
    grade = Number(rows[i].cells[1].children[0].value);
    weight = Number(rows[i].cells[2].children[0].value);
    result += grade/100*weight;
  }
  var screen = document.getElementById("screen");
  screen.innerHTML = result;
  screen.style.textAlign = "right";
  screen.style.paddingRight = "20px";
  screen.style.width = "calc(100% - 120px)";
}

/*
 * Checks whether the value inputted in the Weight column is not lower than min.
 * If so, popup shows up. Popup disappears if user does not hover on the popup for
 * more than 5 seconds.
 */
function minCheck(value, min, row) {
  if (Number(value) < Number(min)) {
    /* First "parentNode" escapes input -> td, second td -> tr */
    var rowNumber = row.parentNode.parentNode.rowIndex - 1;
    var popup = document.getElementById("popup");
    var triangle = document.getElementById("popup-triangle");
    popup.style.marginTop = 75+61*Number(rowNumber)+"px";
    popup.style.visibility = "visible";
    triangle.style.marginTop = 97+61*Number(rowNumber)+"px";
    triangle.style.visibility = "visible";

    /* The timer */
    var timer;
    popup.addEventListener("mouseover", function(event) {
      popup.style.visibility = "visible";
      triangle.style.visibility = "visible";
      clearTimeout(timer);
    }, false);

    popup.addEventListener("mouseout", function(event) {
      timer = setTimeout(function(){
        popup.style.visibility = "hidden";
        triangle.style.visibility = "hidden"; }, 5000);
    }, false);
  }
}



/*********************************************************************/
/*Deprecated Functions*/

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
