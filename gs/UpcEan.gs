//Global Variables
var UPCParity0 = ["BBBAAA", "BBABAA", "BBAABA", "BBAAAB", "BABBAA", "BAABBA", "BAAABB", 
                  "BABABA", "BABAAB", "BAABAB"]; //Number set for UPC-E symbol (EN Table 4)
var UPCParity1 = ["AAABBB", "AABABB", "AABBAB", "AABBBA", "ABAABB", "ABBAAB", "ABBBAA", 
                  "ABABAB", "ABABBA", "ABBABA"]; //Not covered by BS EN 797:1995
var EAN2Parity = ["AA", "AB", "BA", "BB"]; //Number sets for 2-digit add-on (EN Table 6)
var EAN5Parity = ["BBAAA", "BABAA", "BAABA", "BAAAB", "ABBAA", "AABBA", "AAABB", "ABABA", 
                  "ABAAB", "AABAB"]; //Number set for 5-digit add-on (EN Table 7)
var EAN13Parity = ["AAAAA", "ABABB", "ABBAB", "ABBBA", "BAABB", "BBAAB", "BBBAA", "BABAB", 
                  "BABBA", "BBABA"]; //Left hand of the EAN-13 symbol (EN Table 3)
var EANsetA = ["3211", "2221", "2122", "1411", "1132", "1231", "1114", "1312", "1213", 
              "3112"]; //Representation set A and C (EN Table 1)
var EANsetB = ["1123", "1222", "2212", "1141", "2311", "1321", "4111", "2131", "3121", 
              "2113"]; //Representation set B (EN Table 1)

/**
 * Generate raw EAN-8 or UPC-A barcode.
 * @param {string} source  Digits to encode (EAN-8 is 8, UPC-A is 11-12).
 * @return EAN-8 or UPC-A barcode.
 * @customfunction
*/
function UPCA(source) {
  //Convert any input to string
  source = source.toString();

  //Validate input
  var regExp = new RegExp("[^0-9]");
  if (regExp.test(source)) {
    throw "Numeric values only";
  }

  if (source.length != 11 && source.length != 12 && source.length != 8)  {
    throw "Improper EAN-8 or UPC-A barcode length (8 or 11-12 digits)";
  } else if (source.length == 12 && GS1_Check(parseInt(source.substring(0,11))) != parseInt(source.substring(11,12))) {
    throw "Invalid check digit ("+GS1_Check(parseInt(source.substring(0,11)))+")";
  }

  //Calculate check digit (UPC-A only)
  if (source.length == 11) {
    source = source + GS1_Check(parseInt(source.substring(0,11)));
  }

  var half_way = source.length / 2;
  //Start characters
  var dest = [[1],[1],[1]];
  //Middle characters
  for (let i = 0; i < source.length; i++) {
    if (i == half_way) {
      dest.push([1],[1],[1],[1],[1]);
    }
    for (let j = 0; j < 4; j++) {
      dest.push([parseInt(EANsetA[source.substring(i,i+1)][j])]);
    }
  }
  //End characters
  dest.push([1],[1],[1]);
  return dest;
}

/**
 * Generate raw UPC-E barcode.
 * @param {string} source  Digits to encode.
 * @return UPC-E barcode.
 * @customfunction
*/
function UPCE(source) {
  //Convert any input to string
  source = source.toString();

  //Validate input
  var regExp = new RegExp("[^0-9]");
  if (regExp.test(source)) {
    throw "Numeric values only";
  }

  //Two number systems can be used - system 0 and system 1
  if (source.length == 7) {
    if (source.substring(0,1) > 1) {
      source = "0" + source.substring(1,7);
    }
  } else if(source.length == 6) {
    //Default number system is 0
    source = "0" + source;
  } else {
    throw "Improper UPC-E barcode length (6-7 digits)";
  }
  
  //Expand the zero-compressed UPCE code to make a UPCA equivalent (EN Table 5)
  var emode = source.substring(6,7);
  var equivalent = source.substring(0,3);
  switch(parseInt(emode)) {
    case 0:
    case 1:
    case 2:
      equivalent = equivalent+emode+"0000"+source.substring(3,6);
      break;
    case 3:
      equivalent = equivalent+source.substring(3,4)+"00000"+source.substring(4,6);
      break;
    case 4:
      equivalent = equivalent+source.substring(3,5)+"00000"+source.substring(5,6);
      break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      equivalent = equivalent+source.substring(3,6)+"0000"+emode;
      break;
  }
  
  //Calculate check digit
  var CHECK_DIGIT = GS1_Check(equivalent);
  equivalent = equivalent + CHECK_DIGIT;
  
  //Use number system and check digit to choose a parity scheme
  var parity;
  if (equivalent.substring(0,1) == 1) {
    parity = UPCParity1[CHECK_DIGIT];
  } else {
    parity = UPCParity0[CHECK_DIGIT];
  }
  
  //Start characters
  var dest = [[1],[1],[1]];
  //Middle characters
  for (let i=0; i<parity.length; i++) {
    switch(parity.substring(i,i+1)) {
      case "A":
        for (let j = 0; j < 4; j++) {
          dest.push([parseInt(EANsetA[source.substring(i+1,i+2)][j])]);
        }
        break;
      case "B":
        for (let j = 0; j < 4; j++) {
          dest.push([parseInt(EANsetB[source.substring(i+1,i+2)][j])]);
        }
        break;
    }
  }
  //End characters
  dest.push([1],[1],[1],[1],[1],[1]);
  return dest;
}
