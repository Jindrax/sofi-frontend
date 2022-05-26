export interface ComputedField {
  dependencies: string[];
  compute: (value: any | any[], oldValue: any | any[]) => any;
}
