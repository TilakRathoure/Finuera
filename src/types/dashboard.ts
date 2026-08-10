interface CharInfo {
  label: string;
  color: string;
}

export interface ChartConfig {
  housing?: CharInfo;
  transportation?: CharInfo;
  groceries?: CharInfo;
  utilities?: CharInfo;
  entertainment?: CharInfo;
  food?: CharInfo;
  shopping?: CharInfo;
  healthcare?: CharInfo;
  education?: CharInfo;
  personal?: CharInfo;
  travel?: CharInfo;
  insurance?: CharInfo;
  gifts?: CharInfo;
  bills?: CharInfo;
  "other-expense"?: CharInfo;
}

export interface Dashboard {
  error: boolean;
  currencysymbol: string;
  totalAmount: number;
  monthlySpending: { month: string; spent: number }[];
  categories: { category: string; amount: number }[];
  tip: {
    part1: string;
    part2: string;
  };
  chartconfig: ChartConfig;
  confidence: {
    text: string;
    number: number;
  };
}
