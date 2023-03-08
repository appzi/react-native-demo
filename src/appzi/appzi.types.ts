export type PrimitiveValue = number | string | boolean;
export type AllowedJSCustomDataComposite = {
  value: PrimitiveValue;
  label: string;
};
export type AllowedJSCustomData = PrimitiveValue | AllowedJSCustomDataComposite;
export type SurveyData = Record<string, AllowedJSCustomData>;
