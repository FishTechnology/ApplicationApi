import { ApplicationDAO } from "../dataContracts/daos/ApplicationDAO";

export interface IApplicationRepository {
  createApplication(applicationDAO: ApplicationDAO): Promise<ApplicationDAO>;
}
