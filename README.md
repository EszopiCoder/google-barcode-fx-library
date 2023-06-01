# Barcode Function Library for Google Sheets
## Purpose and Features
Custom function library to generate the following 1D barcodes using `=SPARKLINE()`:
| Barcode Type | Barcodes | Status |
| --- | --- | --- |
| 1D Code | ~~Code 11, Code 39, Code 93, Code 128~~ | In progress |
| 1D UPC/EAN | EAN-2, EAN-5, EAN-8, EAN-13, UPC-A, UPC-E | Completed |
| 1D ITF | ITF, ITF-14 | Completed |
## Usage
- Barcode generation is performed by repurposing `=SPARKLINE()` using the following options `{"charttype","bar";"color1","black";"color2","white"}`
- The individual barcode functions return an array indicating the length of the alternating bars (black) and spaces (white)
- Use the following function template to generate barcodes: `=SPARKLINE(ITF(INSERT BARCODE HERE),BarcodeOpt())`
- All check digits are auto-calculated.

| Function Name | Data Types | Length |
| --- | --- | --- |
| `EAN_2()` | Numeric | 2 digits |
| `EAN_5()` | Numeric | 5 digits |
| `EAN_13()` | Numeric | 12 digits + check digit |
| `ITF()` | Numeric | Unlimited |
| `ITF_14()` | Numeric | 13 digits + check digit |
| `UPCA()` | Numeric | 11 + check digit (UPC-A) or 8 digits (EAN-8) |
| `UPCE()` | Numeric | ("0" or "1") + 6 digits |

[Google Sheets Link](https://docs.google.com/spreadsheets/d/1ohJxMztwFqVtb1zq3c3esE75vtXWQDQ3wkB3KA7Ip_g/edit?usp=sharing)

## Sample Images
Coming soon
