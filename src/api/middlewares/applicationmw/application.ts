import { Container } from "typedi";
import config from "../../../config";

import { ApplicationValidator } from "../applicationmw/validator/ApplicationValidator";
import { ApplicationMapper } from "./mappers/ApplicationMapper";
import { ApplicationProcessor } from "./processors/ApplicationProcessor";

const { Pool, Client } = require("pg");

const getApplicationById = async (req, res, next) => {
  //const Logger = Container.get("logger");

  try {
    //appValidator.validateCreateApp();
    const client = new Client({
      connectionString: config.databaseURL,
    });
    const query = {
      name: "fetch-applicationbyid",
      text:
        'SELECT id, name, username, password, emailaddress, createdon, createdby, modifiedon, modifiedby, status FROM public."ApplicationDetail" where id=$1',
      values: [req.params.id],
    };
    client.connect();
    const userRecord = await client
      .query(query)
      .then((dbres) => {
        if (dbres.rowCount <= 0) {
          return res.sendStatus(404);
        }
        let data = res.row;
      })
      .catch((e) => {
        let errormessage = e;
        console.error(e.stack);
      });

    await client.end();
    //Container.get("applicationModel") as ;
    //const testPlanModel = Container.get('testPlanModel') as mongoose.Model<IUser & mongoose.Document>;
    //const userRecord = await testPlanModel.findById(req.token._id);
    return next();
  } catch (e) {
    // Logger.error("🔥 Error attaching user to req: %o", e);
    return next(e);
  }
};

const createApplication = async (req, res, next) => {
  const applicationMapper = new ApplicationMapper();
  const createAppMsgEntity = applicationMapper.mapCreateAppMsgEntity(req.body);

  createAppMsgEntity.createdby = "Self";
  createAppMsgEntity.createdon = new Date();
  createAppMsgEntity.modifiedby = "Self";
  createAppMsgEntity.modifiedon = new Date();

  const appValidator = new ApplicationValidator();
  const errorMessages = appValidator.validateCreateApp(createAppMsgEntity);

  if (errorMessages) {
    return errorMessages;
  }

  const applicationProcessor = new ApplicationProcessor();
  const proErrorMessages = await applicationProcessor.processCreateApplication(
    createAppMsgEntity
  );

  if (proErrorMessages) {
    return proErrorMessages;
  }
  req.applicationModel = applicationMapper.mapApplicationModel(
    createAppMsgEntity
  );
  return next();
};

const application = {
  getApplicationById: getApplicationById,
  createApplication: createApplication,
};

export default application;
