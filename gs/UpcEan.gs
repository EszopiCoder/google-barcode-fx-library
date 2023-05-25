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
    throw "Numeric values only"
  };

  if (source.length != 11 && source.length != 12 && source.length != 8)  {
    throw "Improper EAN-8 or UPC-A barcode length (8 or 11-12 digits)"
  } else if (source.length == 12 && GS1_Check(parseInt(source.substring(0,11))) != parseInt(source.substring(11,12))) {
    throw "Invalid check digit ("+GS1_Check(parseInt(source.substring(0,11)))+")"
  };

  //Calculate check digit (UPC-A only)
  if (source.length == 11) {
    source = source + GS1_Check(parseInt(source.substring(0,11)))
  }

  var half_way = source.length / 2;
  //Start character
  var dest = [[1],[1],[1]];
  //Middle characters
  for (let i = 0; i < source.length; i++) {
    if (i == half_way) {
      dest.push([1],[1],[1],[1],[1])
    }
    for (let j = 0; j < 4; j++) {
      dest.push([parseInt(EANsetA[source.substring(i,i+1)][j])])
    }
  };
  //End characters
  dest.push([1],[1],[1]);
  return dest
}
