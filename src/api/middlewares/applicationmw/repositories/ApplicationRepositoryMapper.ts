import { IApplicationRepositoryMapper } from "./IApplicationRepositoryMapper";
import { ApplicationDAO } from "../dataContracts/daos/ApplicationDAO";
import { ApplicationModel } from "../dataContracts/models/ApplicationResponseModel";

export class ApplicationRepositoryMapper
  implements IApplicationRepositoryMapper {
  mapSelectApplicationDao(rows: any): Array<ApplicationDAO> {
    const applicationDAOs = Array<ApplicationDAO>();
    rows.forEach((row) => {
      let applicationDAO = new ApplicationDAO();
      applicationDAO.id = row.id;
      applicationDAO.name = row.name;
      applicationDAO.username = row.username;
      applicationDAO.emailaddress = row.emailaddress;
      applicationDAO.status = row.status;
      applicationDAO.createdby = row.createdby;
      applicationDAO.createdon = row.createdon;
      applicationDAO.modifiedby = row.modifiedby;
      applicationDAO.modifiedon = row.modifiedon;
      applicationDAOs.push(applicationDAO);
    });
    return applicationDAOs;
  }

  mapSelectApplicationModel(rows: any): Array<ApplicationModel> {
    const applicationModels = Array<ApplicationModel>();
    rows.forEach((row) => {
      let applicationModel = new ApplicationModel();
      applicationModel.id = row.id;
      applicationModel.name = row.name;
      applicationModel.username = row.username;
      applicationModel.emailaddress = row.emailaddress;
      applicationModel.status = row.status;
      applicationModel.createdby = row.createdby;
      applicationModel.createdon = row.createdon;
      applicationModel.modifiedby = row.modifiedby;
      applicationModel.modifiedon = row.modifiedon;
      applicationModels.push(applicationModel);
    });
    return applicationModels;
  }
}
