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
  