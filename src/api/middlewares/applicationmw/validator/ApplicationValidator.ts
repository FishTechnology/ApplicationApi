import { IApplicationValidator } from "./IApplicationValidator";
import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ErrorMessage } from "../../../dataContracts/ErrorMessage";

import { JsonSchemaValidator } from "../../jsonschema/JsonSchemaValidator";

export class ApplicationValidator implements IApplicationValidator {
  validateCreateApp(createAppRequest: CreateAppMsgEntity): Array<ErrorMessage> {
    var jsonSchemaValidator = new JsonSchemaValidator();
    //     /^ Start of the string.
    // (?=.*[A-z]) must contains a characters (lowercase or uppercase characters).
    // (?=.*[a-z]) must contains one lowercase characters.
    // (?=.*[A-Z]) must contains one uppercase characters.
    // (?=.*[0-9]) must contains one digit from 0-9.
    // (?=.*[$@]) must contains one special symbols in this list $ and @.
    // (?!.*[iIoO]) match any charcuter except i I o and O.
    // \S{6,12} length at least 6 characters and a maximum of 12.
    // $/ End of the string.
    const validationResponse = jsonSchemaValidator.validate(
      "../../../jsonschema/CreateApplication.json",
      createAppRequest
    );
    if (validationResponse.errors) {
      const errorMessages = Array<ErrorMessage>();
      validationResponse.errors.forEach((error) => {
        errorMessages.push(error);
      });
      return errorMessages;
    }
    return null;
  }
}
