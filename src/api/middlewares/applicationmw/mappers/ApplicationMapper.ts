import { IApplicationMapper } from "./IApplicationMapper";
import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ApplicationModelWrapper } from "../dataContracts/models/ApplicationModelWrapper";
import { ErrorMessage } from "../../../dataContracts/ErrorMessage";
import { ApplicationResponseModel } from "../dataContracts/models/ApplicationResponseModel";
import { ErrorMessageModel } from "../dataContracts/models/ErrorMessageModel";

export class ApplicationMapper implements IApplicationMapper {
  mapApplicationModel(
    createAppMsgEntity: CreateAppMsgEntity
  ): ApplicationModelWrapper {
    const applicationModelWrapper = new ApplicationModelWrapper();
    const applicationModel = new ApplicationResponseModel();
    applicationModel.applicationId = createAppMsgEntity.id;
    applicationModelWrapper.applicationModel = applicationModel;
    return applicationModelWrapper;
  }

  mapApplicationModelWrapperErrorMsg(
    errorMessage: Array<ErrorMessage>
  ): ApplicationModelWrapper {
    const applicationModelWrapper = new ApplicationModelWrapper();
    const applicationModel = new ApplicationResponseModel();
    applicationModel.errorDetail = Array<ErrorMessageModel>();

    errorMessage.forEach((error) => {
      const errorMessageModel = new ErrorMessageModel();
      errorMessageModel.errorCode = error.errorCode;
      errorMessageModel.errorMessage = error.message;
      applicationModel.errorDetail.push(errorMessageModel);
    });
    applicationModelWrapper.responseStatusCode = 400;
    applicationModelWrapper.applicationModel = applicationModel;
    return applicationModelWrapper;
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
