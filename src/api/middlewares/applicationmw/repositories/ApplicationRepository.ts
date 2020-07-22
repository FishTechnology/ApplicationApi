import { IApplicationRepository } from "./IApplicationRepository";
import { ApplicationDAO } from "../dataContracts/daos/ApplicationDAO";
const { Pool, Client } = require("pg");
import config from "../../../../config";

export class ApplicationRepository implements IApplicationRepository {
  async createApplication(
    applicationDAO: ApplicationDAO
  ): Promise<ApplicationDAO> {
    const client = new Client({
      connectionString: config.databaseURL,
    });
    const query = {
      name: "create-applicationby",
      text:
        'INSERT INTO public."ApplicationDetail"(name, username, password, emailaddress, createdon, createdby, modifiedon, modifiedby, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [
        applicationDAO.name,
        applicationDAO.username,
        applicationDAO.password,
        applicationDAO.emailaddress,
        applicationDAO.createdon,
        applicationDAO.createdby,
        applicationDAO.modifiedon,
        applicationDAO.modifiedby,
        applicationDAO.status,
      ],
    };
    client.connect();

    const applicationResponse = await client
      .query(query)
      .then((dbres) => {
        if (dbres.rowCount <= 0) {
          return res.sendStatus(404);
        }
        let currentRow = dbres.rows[0];
        applicationDAO.id = currentRow.id;
      })
      .catch((e) => {
        let errormessage = e;
        console.error(e.stack);
      });

    await client.end();
    return applicationDAO;
  }
}
