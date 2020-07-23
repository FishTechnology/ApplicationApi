import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ErrorMessage } from "../../../dataContracts/ErrorMessage";

export interface IApplicationVerifier {
  verifyCreateApplication(
    createAppRequest: CreateAppMsgEntity
  ): Promise<Array<ErrorMessage>>;
}
