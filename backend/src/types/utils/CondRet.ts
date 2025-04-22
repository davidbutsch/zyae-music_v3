export type CondRet<Parameter, Condition, TrueType, FalseType> =
  Parameter extends Condition ? TrueType : FalseType;
