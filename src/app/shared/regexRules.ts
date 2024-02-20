// Regular expression to validate email addresses
export const email: RegExp = /^[a-zA-Z0-9_\.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}$/

// Regular expression to validate names (e.g., first names, last names)
export const name: RegExp = /^[a-zA-Z_-]+$/

// Regular expression to validate passwords
export const pass: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
// Explanation:
// - (?=.*[0-9]): Requires at least one digit (0-9)
// - (?=.*[a-z]): Requires at least one lowercase letter (a-z)
// - (?=.*[A-Z]): Requires at least one uppercase letter (A-Z)
// - .{8,16}: Requires a total length between 8 and 16 characters

// Regular expression to validate mobile numbers
export const mob: RegExp = /^[0-9]{1,10}$/
// Explanation:
// - [0-9]: Allows only numeric characters (0-9)
// - {1,10}: Requires a minimum of 1 and a maximum of 10 digits
