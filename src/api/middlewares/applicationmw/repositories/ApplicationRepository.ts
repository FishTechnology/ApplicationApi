import { IApplicationRepository } from "./IApplicationRepository";
import { ApplicationDAO } from "../dataContracts/daos/ApplicationDAO";
import { Container } from "typedi";
const { Pool, Client } = require("pg");
import config from "../../../../config";
import { ApplicationRepositoryMapper } from "./ApplicationRepositoryMapper";

export class ApplicationRepository implements IApplicationRepository {
  private applicationRepositoryMapper: ApplicationRepositoryMapper;

  constructor() {
    this.applicationRepositoryMapper = Container.get(
      "applicationRepositoryMapper"
    );
  }

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

    await client
      .query(query)
      .then((dbres) => {
        if (dbres.rowCount <= 0) {
          return applicationDAO;
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

  async getApplicationsByUserName(
    username: string
  ): Promise<Array<ApplicationDAO>> {
    let applicationDAOs = Array<ApplicationDAO>();
    const client = new Client({
      connectionString: config.databaseURL,
    });

    const query = {
      name: "create-applicationby",
      text:
        'SELECT id, name, username, password, emailaddress, createdon, createdby, modifiedon, modifiedby, status FROM public."ApplicationDetail" where username=$1 and status!=$2;',
      values: [username, "DELETED"],
    };

    client.connect();

    await client
      .query(query)
      .then((dbres) => {
        if (dbres.rowCount <= 0) {
          return null;
        }
        applicationDAOs = this.applicationRepositoryMapper.mapSelectApplicationDao(
          dbres.rows
        );
      })
      .catch((e) => {
        console.error(e.stack);
      });

    await client.end();
    return applicationDAOs;
  }
}
