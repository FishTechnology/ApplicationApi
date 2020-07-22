import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ErrorMessage } from "../../../dataContracts/ErrorMessage";

export interface IApplicationProcessor {
  processCreateApplication(
    createAppMsgEntity: CreateAppMsgEntity
  ): Promise<Array<ErrorMessage>>;
}
