/**
 * Generate raw Code 11 barcode.
 * @param {string} source Digits to encode.
 * @return Raw Code 11 barcode.
 * @customfunction
*/
function Code11(source) {
  var Code11chars = "0123456789-";
  var Code11Table = ["111121", "211121", "121121", "221111", "112121",
            "212111", "122111", "111221", "211211", "211111", "112111"];
  
  //Convert any input to string
  source = source.toString();

  //Validate input
  for (let i = 0; i < source.length; i++) {
    if (Code11chars.includes(source.substring(i,i+1)) == false) {
      throw "Invalid character found: "+source.substring(i,i+1);
    }
  }

  //Start characters
  var dest = [[1],[1],[2],[2],[1],[1]];
  //Middle characters
  for (let j = 0; j < source.length; j++) {
    for (let k = 0; k < 6; k++) {
      dest.push([parseInt(Code11Table[parseInt(Code11chars.search(source.substring(j,j+1)))][k])]);
    }
  }
  //End characters
  dest.push([1],[1],[2],[2],[1]);
  return dest;
}

/**
 * Generate raw Code 39 barcode.
 * @param {string} source  Text to encode.
 * @param {boolean} CHECK_DIGIT [OPTIONAL] Add check digit.
 * @return Raw Code 39 barcode.
 * @customfunction
*/
function Code39(source, CHECK_DIGIT = false) {
  var Code39chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%";
  var Code39Table = ["1112212111", "2112111121", "1122111121", "2122111111", "1112211121",
    "2112211111", "1122211111", "1112112121", "2112112111", "1122112111", "2111121121",
    "1121121121", "2121121111", "1111221121", "2111221111", "1121221111", "1111122121",
    "2111122111", "1121122111", "1111222111", "2111111221", "1121111221", "2121111211",
    "1111211221", "2111211211", "1121211211", "1111112221", "2111112211", "1121112211",
    "1111212211", "2211111121", "1221111121", "2221111111", "1211211121", "2211211111",
    "1221211111", "1211112121", "2211112111", "1221112111", "1212121111", "1212111211",
    "1211121211", "1112121211"];

  //Convert any input to string
  source = source.toString();

  //Convert all letters to uppercase
  source = source.toUpperCase();

  //Validate input
  for (let i = 0; i < source.length; i++) {
    if (Code39chars.includes(source.substring(i,i+1)) == false) {
      throw "Invalid character found: "+source.substring(i,i+1);
    }
  }

  var count = 0;
  //Start character (asterisk)
  var dest = [[1],[2],[1],[1],[2],[1],[2],[1],[1],[1]];
  //Middle characters
  for (let j = 0; j < source.length; j++) {
    for (let k = 0; k < 10; k++) {
      dest.push([parseInt(Code39Table[parseInt(Code39chars.search(source.substring(j,j+1)))][k])]);
      count += parseInt(Code39chars.search(source.substring(j,j+1)));
    }
  }
  //Check digit (Code 39 mod 43)
  if (CHECK_DIGIT == true) {
    count %= 43;
    for (let l = 0; l < 10; l++) {
      dest.push(parseInt(Code39Table[count][l]));
    }
  }
  //End character (asterisk)
  dest.push([1],[2],[1],[1],[2],[1],[2],[1],[1],[1]);
  return dest;
}

function test() {
  Logger.log(Code93("CODE 93"));
}

/**
 * Generate raw Code 93 barcode.
 * @param {string} source Text to encode.
 * @return Raw Code 93 barcode.
 * @customfunction
*/
function Code93(source) {
  var Code93chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%";
  var Code93Table = ["131112", "111213", "111312", "111411", "121113", "121212", "121311",
        "111114", "131211", "141111", "211113", "211212", "211311", "221112", "221211", "231111",
        "112113", "112212", "112311", "122112", "132111", "111123", "111222", "111321", "121122",
        "131121", "212112", "212211", "211122", "211221", "221121", "222111", "112122", "112221",
        "122121", "123111", "121131", "311112", "311211", "321111", "112131", "113121", "211131",
        "121221", "312111", "311121", "122211"];
  
  //Convert any input to string
  source = source.toString();

  //Convert all letters to uppercase
  source = source.toUpperCase();

  //Validate input
  for (let i = 0; i < source.length; i++) {
    if (Code93chars.includes(source.substring(i,i+1)) == false) {
      throw "Invalid character found: "+source.substring(i,i+1);
    }
  }
  
  //Start character
  var dest = [[1],[1],[1],[1],[4],[1]];
  //Calculate check digit C
  var c = 0;
  var weight = 1;
  for (let j = source.length-1; j > -1; j--) {
    c += parseInt(Code93chars.search(source.substring(j,j+1))) * weight;
    weight += 1;
    if (weight == 21) {
      weight = 1;
    }
  }
  c %= 47;
  source += Code93chars.substring(c,c+1);
  //Calculate check digit K
  var k = 0;
  weight = 1;
  for (let l = source.length-1;l > -1; l--) {
    k += parseInt(Code93chars.search(source.substring(l,l+1))) * weight;
    weight += 1;
    if (weight == 16) {
      weight = 1;
    }
  }
  k %= 47;
  source += Code93chars.substring(k,k+1);
  //Middle characters with check digits C and K
  for (let m = 0; m < source.length; m++) {
    for (let n = 0; n < 6; n++) {
      dest.push([parseInt(Code93Table[parseInt(Code93chars.search(source.substring(m,m+1)))][n])]);
    }
  }
  //End character
  dest.push([1],[1],[1],[1],[4],[1],[1]);
  return dest;
}
