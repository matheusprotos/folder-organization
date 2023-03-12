export interface Month {
  date: Date;
  name: string;
  active: boolean;
  onClick?: (month: Month) => void;
}

export class MonthConvert {
  public static toMonth(json: string): Month {
    return JSON.parse(json);
  }

  public static monthToJson(value: Month): string {
    return JSON.stringify(value);
  }
}
