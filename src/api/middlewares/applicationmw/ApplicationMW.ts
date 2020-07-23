import { Container } from "typedi";
import config from "../../../config";

import { ApplicationValidator } from "../applicationmw/validator/ApplicationValidator";
import { ApplicationProcessor } from "./processors/ApplicationProcessor";
import { ApplicationVerifier } from "./verifier/ApplicationVerifier";

const { Pool, Client } = require("pg");

const getApplicationById = async (req, res, next) => {
  const Logger = Container.get("logger");
  const applicationRepositoryMapper = Container.get(
    "applicationRepositoryMapper"
  );
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
        res.applicationModel = applicationRepositoryMapper.mapSelectApplicationDao(
          dbres.rows
        );
      })
      .catch((e) => {
        let errormessage = e;
        console.error(e.stack);
        res.sendStatus(404);
      });

    await client.end();

    return next();
  } catch (e) {
    Logger.error("🔥 Error attaching user to req: %o", e);
    res.sendStatus(500);
    return next(e);
  }
};

const createApplication = async (req, res, next) => {
  const applicationMapper = Container.get("applicationMapper"); // new ApplicationMapper();
  const appValidator = Container.get("applicationValidator");
  const appVerifier = Container.get("applicationVerifier");
  const applicationProcessor = Container.get("applicationProcessor");

  const createAppMsgEntity = applicationMapper.mapCreateAppMsgEntity(req.body);

  createAppMsgEntity.createdby = "Self";
  createAppMsgEntity.createdon = new Date();
  createAppMsgEntity.modifiedby = "Self";
  createAppMsgEntity.modifiedon = new Date();

  const errorMessages = appValidator.validateCreateApp(createAppMsgEntity);

  if (errorMessages) {
    req.applicationModelWrapper = applicationMapper.mapApplicationModelWrapperErrorMsg(
      errorMessages
    );
    return next();
  }

  const verifyErrorMessages = await appVerifier.verifyCreateApplication(
    createAppMsgEntity
  );

  if (verifyErrorMessages) {
    req.applicationModelWrapper = applicationMapper.mapApplicationModelWrapperErrorMsg(
      verifyErrorMessages
    );
    return next();
  }

  const proErrorMessages = await applicationProcessor.processCreateApplication(
    createAppMsgEntity
  );

  if (proErrorMessages) {
    req.applicationModelWrapper = applicationMapper.mapApplicationModelWrapperErrorMsg(
      proErrorMessages
    );
    return next();
  }

  req.applicationModelWrapper = applicationMapper.mapApplicationModel(
    createAppMsgEntity
  );
  return next();
};

const ApplicationMW = {
  getApplicationById: getApplicationById,
  createApplication: createApplication,
};

export default ApplicationMW;
