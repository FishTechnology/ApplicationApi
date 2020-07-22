import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ErrorMessage } from "../../../dataContracts/ErrorMessage";

export interface IApplicationValidator {
  validateCreateApp(createAppRequest: CreateAppMsgEntity);
}
