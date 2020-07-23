import { IApplicationVerifier } from "./IApplicationVerifier";
import { Container } from "typedi";
import { ErrorMessage } from "../../../dataContracts/ErrorMessage";
import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ApplicationRepository } from "../repositories/ApplicationRepository";

export class ApplicationVerifier implements IApplicationVerifier {
  private applicationRepository: ApplicationRepository;

  constructor() {
    this.applicationRepository = Container.get("applicationRepository");
  }

  async verifyCreateApplication(
    createAppRequest: CreateAppMsgEntity
  ): Promise<Array<ErrorMessage>> {
    const errorMessages = new Array<ErrorMessage>();

    const applicationDetail = await this.applicationRepository.getApplicationsByUserName(
      createAppRequest.username
    );
    if (!applicationDetail || applicationDetail.length == 0) {
      return null;
    }
    const errorMessage = new ErrorMessage();
    errorMessage.message = "duplicate user name found";
    errorMessages.push(errorMessage);

    return errorMessages;
  }
}
