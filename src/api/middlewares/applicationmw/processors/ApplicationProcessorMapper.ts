import { IApplicationProcessorMapper } from "./IApplicationProcessorMapper";
import { CreateAppMsgEntity } from "../dataContracts/messageEntities/CreateAppMsgEntity";
import { ApplicationDAO } from "../dataContracts/daos/ApplicationDAO";

export class ApplicationProcessorMapper implements IApplicationProcessorMapper {
  MapApplicationDAO(createAppMsgEntity: CreateAppMsgEntity): ApplicationDAO {
    const applicationDAO = new ApplicationDAO();
    applicationDAO.name = createAppMsgEntity.name;
    applicationDAO.username = createAppMsgEntity.username;
    applicationDAO.password = createAppMsgEntity.password;
    applicationDAO.emailaddress = createAppMsgEntity.emailaddress;
    applicationDAO.createdby = createAppMsgEntity.createdby;
    applicationDAO.createdon = createAppMsgEntity.createdon;
    applicationDAO.modifiedby = createAppMsgEntity.modifiedby;
    applicationDAO.modifiedon = createAppMsgEntity.modifiedon;
    applicationDAO.status = "CREATED";
    return applicationDAO;
  }
}
