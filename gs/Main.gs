/**
 * Calculate GS1 check digit.
 * @param {string} source Numeric barcode.
 * @return GS1 check digit.
 * @customfunction
*/
function GS1_Check(source) {
  //Convert any input to string
  source = source.toString();

  //Validate input
  var regExp = new RegExp("[^0-9]");
  if (regExp.test(source)) {
    throw "Numeric values only";
  }

  // Loop through each digit to get sum
  var count = 0;
  for (let i = 0; i < source.length; i++) {
    count += parseInt(source.substring(i,i+1));
    //Length is even and even-numbered digit positions (2nd, 4th, 6th, etc.)
    //Length is odd and odd-numbered digit positions (1st, 3rd, 5th, etc.)
    if ((source.length % 2 == 0 && i % 2 != 0) || (source.length % 2 != 0 && i % 2 == 0)) {
      count += 2 * parseInt(source.substring(i,i+1));
    }
  }

  //Calculate check digit
  var Check_Digit = 10 - (count % 10);
  if (Check_Digit == 10) {
    Check_Digit = 0;
  }

  return Check_Digit;
}

/**
 * Return sparkline barcode format options.
 * @return Barcode format options for sparkline function.
 * @customfunction
*/
function BarcodeOpt() {
  // Javascript translation array: {"charttype","bar";"color1","black";"color2","white"}
  return [["charttype","bar"],["color1","black"],["color2","white"]];
}
