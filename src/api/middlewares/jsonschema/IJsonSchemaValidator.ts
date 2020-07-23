import { ErrorObject } from "ajv";

export interface IJsonSchemaValidator {
  validate<T extends object>(url: string, data: T): Array<ErrorObject>;
}
