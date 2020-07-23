import Ajv, { ErrorObject } from "ajv";
import { IJsonSchemaValidator } from "./IJsonSchemaValidator";

export class JsonSchemaValidator implements IJsonSchemaValidator {
  validate<T extends object>(url: string, data: T): Array<ErrorObject> {
    var ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
    // Fetch the JSON content, pretending it was downloaded from a URL
    const schemaFile = require(url);
    const valid = ajv.validate(schemaFile, data);
    if (!valid) {
      return ajv.errors;
    }
    return null;
  }
}
