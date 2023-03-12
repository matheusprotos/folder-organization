export interface Expense {
  id: string;
  group_id: string;
  name: string;
  value: number;
  status: number;
  recurrent: boolean;
  due_date: Date;
  created_at: Date;
  updated_at: Date;
  repeat: number;
  payers: any[];
  payments: any[];
}

export class ExpenseConvert {
  public static toExpense(json: string): Expense {
    return JSON.parse(json);
  }

  public static expenseToJson(value: Expense): string {
    return JSON.stringify(value);
  }
}
