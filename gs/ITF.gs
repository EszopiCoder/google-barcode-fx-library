var ITFtable = ["11221", "21112", "12112", "22111", "11212",
              "21211", "12211", "11122", "21121", "12121"];

/**
 * Generate raw ITF barcode.
 * @param {string} source Even number of digits to encode.
 * @return Raw ITF barcode.
 * @customfunction
*/
function ITF(source) {  
  //Convert any input to string
  source = source.toString();

  //Validate input
  var regExp = new RegExp("[^0-9]");
  if (regExp.test(source)) {
    throw "Numeric values only";
  }

  //ITF requires an even number of digits. If odd, add a zero to the beginning
  if (source.length % 2 != 0) {
    source = "0" + source;
  }

  //Start character
  var dest = [[1],[1],[1],[1]];
  //Middle characters
  for (let i = 0; i < source.length; i+=2) {
    //Interleave 2 digits at a time (1st digit is bars, 2nd digit is spaces)
    for (let j = 0; j < 5; j++) {
      dest.push([parseInt(ITFtable[source.substring(i,i+1)][j])]);
      dest.push([parseInt(ITFtable[source.substring(i+1,i+2)][j])]);
    }
  }
  //End characters
  dest.push([2],[1],[1]);
  return dest;
}

/**
 * Generate raw ITF-14 barcode.
 * @param {string} source Even number of digits to encode.
 * @return Raw ITF-14 barcode.
 * @customfunction
*/
function ITF_14(source) {
  //Convert any input to string
  source = source.toString();

  //Validate input
  var regExp = new RegExp("[^0-9]");
  if (regExp.test(source)) {
    throw "Numeric values only";
  }
  if (source.length < 13 || source.length > 14)  {
    throw "Improper ITF-14 barcode length (13-14 digits)";
  } else if (source.length == 14 && GS1_Check(parseInt(source.substring(0,13))) != parseInt(source.substring(13,14))) {
    throw "Invalid check digit ("+GS1_Check(parseInt(source.substring(0,13)))+")";
  }

  //Calculate check digit
  if (source.length == 13) {
    source += GS1_Check(parseInt(source.substring(0,13)));
  }

  //Start character
  var dest = [[1],[1],[1],[1]];
  //Middle characters
  for (let i = 0; i < source.length; i+=2) {
    //Interleave 2 digits at a time (1st digit is bars, 2nd digit is spaces)
    for (let j = 0; j < 5; j++) {
      dest.push([parseInt(ITFtable[source.substring(i,i+1)][j])]);
      dest.push([parseInt(ITFtable[source.substring(i+1,i+2)][j])]);
    }
  }
  //End characters
  dest.push([2],[1],[1]);
  return dest;
}
