const incomeUserInput = document.querySelector("#income");
const yearUserInput = document.querySelector("#year");
const submitButton = document.querySelector("button");
const taxOutput = document.querySelector("#result");


interface TaxInput {
    income: number;
    year: number;
  }
  
  interface TaxResult {
    zvE: number;
    tax: number;
    taxBracket: string;
  }
  
  interface TaxConstants {
    grundfreibetrag: number;
    grenze1: number;
    grenze2: number;
    grenze3: number;
    grenze4: number;
  }
  
  const taxConstants: Record<number, TaxConstants> = {
    2022: {
      grundfreibetrag: 10347,
      grenze1: 10909,
      grenze2: 14926,
      grenze3: 58596,
      grenze4: 277825,
    },
    2023: {
      grundfreibetrag: 10908,
      grenze1: 10909,
      grenze2: 14926,
      grenze3: 58596,
      grenze4: 277825,
    },
    2024: {
      grundfreibetrag: 11604,
      grenze1: 11605,
      grenze2: 15499,
      grenze3: 62809,
      grenze4: 277825,
    },
    2025: {
      grundfreibetrag: 12096,
      grenze1: 11605,
      grenze2: 15499,
      grenze3: 62809,
      grenze4: 277825,
    },
    2026: {
      grundfreibetrag: 12096,
      grenze1: 12097,
      grenze2: 17443,
      grenze3: 68480,
      grenze4: 277825,
    },
  };
  
  function calculateZvE(input: TaxInput): number {
    const constants = taxConstants [input.year];
    if(!constants) throw new Error(`Jahr ${input.year} ist nicht verfügbar`);
    return Math.max (0, input.income - constants.grundfreibetrag);
  }
  
  function calculateTax(input: TaxInput): TaxResult {
    const constants = taxConstants [input.year];
    if(!constants) throw new Error(`Jahr ${input.year} ist nicht verfügbar`);
  
    const zvE = calculateZvE(input);
    let tax = 0;
    let taxBracket = '';
  
    if (zvE <= 0) {
      taxBracket = 'Fall 1 - Unterhalb Grundfreibetrag';
    } else if ( zvE <= constants.grenze2 - constants.grundfreibetrag) {
      const y = (zvE - (constants.grenze1 - constants.grundfreibetrag)) / 10000;
      tax = (1088.67 * y + 1400) * y;
      taxBracket = 'fall 2 - basicsteuersatz';
    } else if ( zvE <= constants.grenze3 - constants.grundfreibetrag) {
      const z = (zvE - (constants.grenze2 - constants.grundfreibetrag)) / 10000;
      tax = (206.43 * z + 1400) * z + 869.32;
      taxBracket = 'fall 3 - zwischen Basic u. spitzensteuersatz';
    } else if ( zvE <= constants.grenze4 - constants.grundfreibetrag) {
      tax = 0.42 * zvE - 9336.45;
      taxBracket = 'fall 4 - spitzensteuersatz';
    } else {
      tax = 0.45 * zvE - 17671.20;
      taxBracket = 'fall 5 - höchststeuersatz';
    }
    return {
      zvE: Math.round(zvE),
      tax: Math.round(tax),
      taxBracket,
    }    
  
  }