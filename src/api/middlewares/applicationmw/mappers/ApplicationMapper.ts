import { IApplicationMapper } from "./IApplicationMapper";
import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ApplicationModel } from "../dataContracts/models/ApplicationModel";

export class ApplicationMapper implements IApplicationMapper {
  mapApplicationModel(
    createAppMsgEntity: CreateAppMsgEntity
  ): ApplicationModel {
    const applicationModel = new ApplicationModel();
    applicationModel.applicationId = createAppMsgEntity.id;
    return applicationModel;
  }
  mapCreateAppMsgEntity(bodyReq: object): CreateAppMsgEntity {
    const createAppMsgEntity = new CreateAppMsgEntity();
    createAppMsgEntity.name = bodyReq.name;
    createAppMsgEntity.username = bodyReq.username;
    createAppMsgEntity.password = bodyReq.password;
    createAppMsgEntity.emailaddress = bodyReq.emailaddress;
    return createAppMsgEntity;
  }
}
