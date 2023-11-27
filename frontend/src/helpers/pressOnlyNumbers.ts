export const pressOnlyNumbers = e => {
    const charCode = e.which || e.keyCode || e.key;
  
    // Allow certain special keys like Backspace, Delete, Arrow keys, etc.
    if (
      (charCode > 47 && charCode < 58) ||  // Numeric keys
      charCode === 8 ||                     // Backspace
      charCode === 9 ||                     // Tab
      charCode === 46 ||                    // Delete
      (charCode >= 37 && charCode <= 40)    // Arrow keys
    ) {
      // Allow the key
    } else {
      // Prevent non-numeric input
      e.preventDefault();
    }
  };
  