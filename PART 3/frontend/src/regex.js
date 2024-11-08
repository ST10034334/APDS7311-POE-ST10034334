{/* Defines all regex patterns */}
{/* TutorialsPoint (2023) demonstrates how to use RegEx */}

export const validName = new RegExp(
  //Microsoft (2022) demonstrates how to create a RegEx pattern:
  //Requires starting with a capital letter; at least one space; allows letters (upper and lowercase), 
  //hyphens, and apostrophes; total length must be 8 to 40 characters.
  `^(?=.*\\s)[A-Z][a-zA-Z\\s'\\-]{7,39}$`
 );

 export const validIDNumber = new RegExp(
  //Microsoft (2022) demonstrates how to create a RegEx pattern:
  //Western Cape Government (2019) demonstrates the format of the SA ID number.
  //Requires exactly 13 digits; valid dates for year, month, and day of birth; 4 gender digits; citizenship status (0 or 1); final checksum digit.
   `^\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\\d{4}[01]\\d{2}$`
 );


 export const validAccountNumber = new RegExp(
  //Microsoft (2022) demonstrates how to create a RegEx pattern:
  //Requires a total length of 8 to 11 digits.
   `^\\d{8,11}$`
 );

 export const validPassword = new RegExp(
  //Microsoft (2022) demonstrates how to create a RegEx pattern:
  //Requires at least one lowercase letter; at least one uppercase letter; at least one digit; at least one special character from @$!%*?&; 
  //only letters, digits, and special characters allowed; total length must be 8 to 20 characters.
   `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&^\\(\\)])[A-Za-z\\d@$!%*?&^()]{8,20}$`
 );

 export const validCurrency = new RegExp(
  //Microsoft (2022) demonstrates how to create a RegEx pattern:
  //Requires one or more letters (both uppercase and lowercase) and spaces (for currency name); a space between the currency name and brackets; 
  //an open bracket; 3 uppercase letters; a closed bracket.
   `^[A-Za-z\\s]+ \\([A-Z]{3}\\)$`
 );

 export const validProvider = new RegExp(
  //Microsoft (2022) demonstrates how to create a RegEx pattern:
  //Requires exactly 5 uppercase letters (SWIFT is only provider available).
   `^[A-Z]{5}$`
 );

 export const validRecipientBankName = new RegExp(
  //Microsoft (2022) demonstrates how to create a RegEx pattern:
  //Requires starting with a capital letter; allows letters (upper and lowercase), and spaces; total length must be 4 to 40 characters.
   `^[A-Z][A-Za-z\\s]{3,39}$`
 );

 export const validRecipientBranchCode = new RegExp(
  //Microsoft (2022) demonstrates how to create a RegEx pattern:
  //Requires exactly 6 digits.
   `^\\d{6}$`
 );


 export const validSWIFTCode = new RegExp(
  //Microsoft (2022) demonstrates how to create a RegEx pattern:
  //Banco Santander S.A (2022) demonstrates the format of the SWIFT Code.
  //Requires 4 letters for the bank; 2 letters for the country; 2 letters for the bank’s location; and 3 digits for receiving branch (this is optional); total length must be 8 to 11 characters.
   `^[A-Za-z]{4}[A-Za-z]{2}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$`
 );
 

{/* REFERENCE LIST:

Microsoft. 2022. Regular Expression Language - Quick Reference, 18 June 2022 (Version 1.0)
[Source code] https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference
(Accessed 4 October 2024).

TutorialsPoint. 2023. RegEx in ReactJS, 14 September 2023 (Version 2.0)
[Source code] https://www.tutorialspoint.com/regex-in-reactjs
(Accessed 4 October 2024).

Western Cape Government. 2019. Decoding your South African ID number, 13 February 2019.
[Online]. Available at: https://www.westerncape.gov.za/general-publication/decoding-your-south-african-id-number-0#:~:text=A%20South%20African%20ID%20number,used%20to%20define%20your%20gender.
(Accessed 4 October 2024).

Banco Santander S.A. 2022. SWIFT code: Why does it matter, 7 October 2022.
[Online]. Available at: https://www.santander.com/en/stories/swift-code-why-does-it-matter#:~:text=Each%20bank%20has%20a%20unique,to%20specify%20the%20receiving%20branch.
(Accessed 4 October 2024).
*/} 