import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ApplicationModelWrapper } from "../dataContracts/models/ApplicationModelWrapper";
import { ErrorMessage } from "../../../dataContracts/ErrorMessage";

export interface IApplicationMapper {
  mapCreateAppMsgEntity(bodyReq: object): CreateAppMsgEntity;

  mapApplicationModelWrapperErrorMsg(
    errorMessage: Array<ErrorMessage>
  ): ApplicationModelWrapper;

  mapApplicationModel(
    createAppMsgEntity: CreateAppMsgEntity
  ): ApplicationModelWrapper;
}
