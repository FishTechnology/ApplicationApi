import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ApplicationModel } from "../dataContracts/models/ApplicationModel";

export interface IApplicationMapper {
  mapCreateAppMsgEntity(bodyReq: object): CreateAppMsgEntity;

  mapApplicationModel(createAppMsgEntity: CreateAppMsgEntity): ApplicationModel;
}
