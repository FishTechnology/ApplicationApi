import { ApplicationDAO } from "../dataContracts/daos/ApplicationDAO";
import { ApplicationModel } from "../dataContracts/models/ApplicationModel";

export interface IApplicationRepositoryMapper {
  mapSelectApplicationDao(rows: any): Array<ApplicationDAO>;

  mapSelectApplicationModel(rows: any): Array<ApplicationModel>;
}
