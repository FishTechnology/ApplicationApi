import { IApplicationProcessor } from "./IApplicationProcessor";
import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ApplicationRepository } from "../repositories/ApplicationRepository";
import { ApplicationProcessorMapper } from "./ApplicationProcessorMapper";
import { ErrorMessage } from "../../../dataContracts/ErrorMessage";

export class ApplicationProcessor implements IApplicationProcessor {
  async processCreateApplication(
    createAppMsgEntity: CreateAppMsgEntity
  ): Promise<Array<ErrorMessage>> {
    const applicationRepository = new ApplicationRepository();
    const applicationProcessorMapper = new ApplicationProcessorMapper();
    const applicationDAO = await applicationRepository.createApplication(
      applicationProcessorMapper.MapApplicationDAO(createAppMsgEntity)
    );
    createAppMsgEntity.id = applicationDAO.id;
    return null;
  }
}
