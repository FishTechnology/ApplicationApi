import { IApplicationValidator } from "./IApplicationValidator";
import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ErrorMessage } from "../../../dataContracts/ErrorMessage";
import { JsonSchemaValidator } from "../../jsonschema/JsonSchemaValidator";
import Container from "typedi";

export class ApplicationValidator implements IApplicationValidator {
  private jsonSchemaValidator: JsonSchemaValidator;

  constructor() {
    this.jsonSchemaValidator = Container.get("jsonSchemaValidator");
  }

  validateCreateApp(createAppRequest: CreateAppMsgEntity): Array<ErrorMessage> {
    const validationResponse = this.jsonSchemaValidator.validate(
      "../../../jsonschema/CreateApplication.json",
      createAppRequest
    );

    if (validationResponse) {
      const errorMessages = Array<ErrorMessage>();
      validationResponse.forEach((error) => {
        const errorMessage = new ErrorMessage();
        errorMessage.message = error.message;
        errorMessages.push(errorMessage);
      });
      return errorMessages;
    }
    return null;
  }
}
