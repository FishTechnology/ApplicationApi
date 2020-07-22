import Ajv from "ajv";

export class JsonSchemaValidator {
  validate<T extends object>(url: string, data: T) {
    var ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
    // Fetch the JSON content, pretending it was downloaded from a URL
    const schemaFile = require(url);
    return ajv.validate(schemaFile, data);
  }
}
