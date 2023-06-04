# Barcode Function Library for Google Sheets
## Purpose and Features
Custom function library to generate the following 1D barcodes using `=SPARKLINE()`:
| Barcode Type | Barcodes | Status |
| --- | --- | --- |
| 1D Code | Code 11, Code 39, Code 93, ~~Code 128~~ | In progress |
| 1D UPC/EAN | EAN-2, EAN-5, EAN-8, EAN-13, UPC-A, UPC-E | Completed |
| 1D ITF | ITF, ITF-14 | Completed |
## How It Works
- Barcode generation is performed by repurposing `=SPARKLINE()` using the following options `{"charttype","bar";"color1","black";"color2","white"}`
- The individual barcode functions return an array indicating the width of the alternating bars (black) and spaces (white)
## Installation and Usage
- To install, you can manually copy/paste the code into the Google Apps Script Editor
- To install as a library in the Google Apps Script Editor, follow these [instructions](https://developers.google.com/apps-script/guides/libraries) using script ID: 1UudrKNziZj_sKPi_L_Bmav9vnvCJKB3QOpffaakWv5x4VBJcK-kOxOpR
- Use the following function template to generate barcodes: `=SPARKLINE(ITF(INSERT BARCODE HERE),BarcodeOpt())`
- All check digits are auto-calculated if not included and verified if included.

| Function Name | Data Types | Length and Format | Check Digit |
| --- | --- | --- | --- |
| `Code11()` | Numeric and dash | Unlimited | None |
| `Code39()` | Uppercase alphanumeric, space, and -$%./+ | Unlimited + check digit (optional) | Modulo 43 |
| `Code93()` | Uppercase alphanumeric, space, and -$%./+ | Unlimited + 2 check digits | Modulo 47 |
| `EAN_2()` | Numeric | 2 digits | None |
| `EAN_5()` | Numeric | 5 digits | None |
| `EAN_13()` | Numeric | 12 digits + check digit | GS1 check digit |
| `ITF()` | Numeric | Unlimited | None |
| `ITF_14()` | Numeric | 13 digits + check digit | GS1 check digit |
| `UPCA()` | Numeric | 11 + check digit (UPC-A) or 8 digits (EAN-8) | GS1 check digit |
| `UPCE()` | Numeric | ("0" or "1") + 6 digits | None |

[Google Sheets Link](https://docs.google.com/spreadsheets/d/1ohJxMztwFqVtb1zq3c3esE75vtXWQDQ3wkB3KA7Ip_g/edit?usp=sharing)

## Sample Images
Coming soon
