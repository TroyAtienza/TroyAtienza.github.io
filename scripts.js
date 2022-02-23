
function addKeyListeners() {
  var inputs = document.getElementsByTagName("input");

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "text") { continue; }
    inputs[i].addEventListener("keydown", (e) => {
      if (e.keyCode == 189) {
        e.preventDefault();
        showPopup("Cannot input negative numbers", document.activeElement);
      }
    });

    inputs[i].addEventListener("keyup", (e) => {
      if (document.activeElement.value > 100) {
        showPopup("Cannot surpass 100", document.activeElement);
        while (document.activeElement.value > 100) {
          document.activeElement.value =
          parseFloat(document.activeElement.value.toString().slice(0,-1));
        }
      }
    });
  }
}

/*
 * Adds another row at the bottom of the tbody.
 * The specific html to be inputted is seen below.
 */
function addRow(tableID) {
  var tbodyRef = document.getElementById(tableID).getElementsByTagName('tbody')[0];
  var row = tbodyRef.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = '<input type="text" class="col1" name"col1">';
  cell2.innerHTML = '<input type="number" class="col2" name"col2" min="0" max="100">';
  cell3.innerHTML = '<input type="number" class="col3" name"col3" min="0" \
          max="100">';
}

/*
 * Calculates the overall grade of the user by multiplying the decimal form of
 * the Grade of the User with the Weight of the respective assessment.
 */
function calculateGrade() {
  var rows = document.getElementById("table").rows;
  var result = 0;
  var grade, weight, total;

  //loops through rows and calculates user input from Grades and Weight column.
  for (var i = 1; i < rows.length-1; i++) {
    grade = Number(rows[i].cells[1].children[0].value);
    weight = Number(rows[i].cells[2].children[0].value);
    total += weight;
    result += grade/100*weight;
  }
  var screen = document.getElementById("screen");
  screen.innerHTML = parseFloat(result).toFixed(2);
  screen.style.textAlign = "right";
  screen.style.paddingRight = "20px";
  screen.style.width = "calc(100% - 120px)";
}

/*
 * Checks whether the value inputted in the Weight column is not lower than min.
 * If so, popup shows up. Popup disappears if user does not hover on the popup for
 * more than 5 seconds.
 */
function showPopup(message, row) {
  /* First "parentNode" escapes input -> td, second: td -> tr */
  var rowNumber = row.parentNode.parentNode.rowIndex-1;
  var colNumber = row.parentNode.cellIndex-1;
  var popup = document.getElementById("popup");
  var triangle = document.getElementById("popup-triangle");

  popup.innerHTML = message;
  popup.style.width = message.length*9 + "px";
  popup.style.marginTop = 75+55*Number(rowNumber)+"px";
  popup.style.marginLeft = 270+125*Number(colNumber)+"px";
  popup.style.visibility = "visible";
  triangle.style.marginTop = 65+55*Number(rowNumber)+"px";
  triangle.style.marginLeft = 325+125*Number(colNumber)+"px";
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

  /*
   * Deletes a row and is limited to only the tbody rows. Disabling deletion of
   * header and footer
   */
function deleteRow(tableID) {
  document.getElementById(tableID).getElementsByTagName('tbody')[0].deleteRow(0);
}

/**
 * Appends value to the currently active element that the user has selected.
 * The placeholder after the input of a decimal place (0), exists because otherwise,
 * the decimal point gets removed as the number is not considered a decimal.
 * This placeholder is removed after a number is inputted.
 * @param value the value to be appended to the value of the active element.
 */
function appendNumber(value) {
  //cannot lead with a zero or a decimal point if input is empty
  if ((document.activeElement.value.length == 0 && (value == 0 || value == "."))
  || document.activeElement.type == "text") {
    return;
  }

  //decimal point gets placed along with a placeholder of 0 to ensure that the decimal point is sustained
  var current = document.activeElement.value;
  if (value == ".") {
    document.activeElement.value += ".0";
  }

  else {
    if (parseInt(current += parseInt(value)) < 100) { //ensures that number does not go above 100
      temp = current.toString();
      if (parseInt((current % 1) * 10) == "0" && temp.charAt(temp.length-3) == ".") { //checks whether the end is ".0"
        document.activeElement.value = Number(document.activeElement.value.
          toString().slice(0,-1) + parseInt(value));
      }
      else {
        document.activeElement.value += parseInt(value);
      }
    }
  }
}

/**
 * Removes the last digit of a number.
 */
function backspace() {
  if (document.activeElement.value.length == 0 || document.activeElement.type == "text"){
    return;
  }
  var result = document.activeElement.value.toString().slice(0,-1); //gets value without the last digit
  document.activeElement.value = result;
}

/**
 * Clears all input forms. Text input set to "" and number input set to NaN.
 */
function clearAll() {
  var inputs = document.getElementsByTagName("input");

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "text") {
      inputs[i].value = "";
    }
    else if (inputs[i].type == "number") {
      inputs[i].value = NaN;
    }
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
