export interface ErrResponse {
  error: string;
  message: string;
}

export interface AIResponse {
  totalAmount?: number;
  monthlySpending?: { month: string; spent: number }[];
  categories?: { category: string; amount: number }[];
  tip?: string;
  chartconfig?: [{ label: string; color: string }];
  error: string;
}
