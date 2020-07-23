import { IApplicationProcessor } from "./IApplicationProcessor";
import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ErrorMessage } from "../../../dataContracts/ErrorMessage";
import { ApplicationProcessorMapper } from "./ApplicationProcessorMapper";
import { ApplicationRepository } from "../repositories/ApplicationRepository";
import { Container } from "typedi";

export class ApplicationProcessor implements IApplicationProcessor {
  private applicationRepository: ApplicationRepository;
  private applicationProcessorMapper: ApplicationProcessorMapper;

  constructor() {
    this.applicationProcessorMapper = Container.get(
      "applicationProcessorMapper"
    );
    this.applicationRepository = Container.get("applicationRepository");
  }

  async processCreateApplication(
    createAppMsgEntity: CreateAppMsgEntity
  ): Promise<Array<ErrorMessage>> {
    const applicationDAO = await this.applicationRepository.createApplication(
      this.applicationProcessorMapper.MapApplicationDAO(createAppMsgEntity)
    );
    createAppMsgEntity.id = applicationDAO.id;
    return null;
  }
}
