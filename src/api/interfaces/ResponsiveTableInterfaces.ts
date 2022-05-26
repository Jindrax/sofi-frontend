import {SchemaFieldType} from "src/api/enums/SchemaFieldType";
import {ComputedField} from "src/api/interfaces/ComputedField";

export interface ResponsiveTableSchemaField{
  field: string;
  label: string;
  type: SchemaFieldType;
  responsive?: boolean;
  computed?: ComputedField;
  formatter?: Function;
  options?: string[];
  prefix?: string;
  suffix?: string;
}
export interface ResponsiveTableAction{
  icon?: string;
  label?: string;
  onClick: (item: any, itemIndex: number) => void;
  class: string;
}
