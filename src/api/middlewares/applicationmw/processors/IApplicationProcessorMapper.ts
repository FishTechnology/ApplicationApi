import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ApplicationDAO } from "../dataContracts/daos/ApplicationDAO";

export interface IApplicationProcessorMapper {
  MapApplicationDAO(createAppMsgEntity: CreateAppMsgEntity): ApplicationDAO;
}
