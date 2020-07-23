import { Container } from "typedi";
import LoggerInstance from "./logger";
import { ApplicationRepositoryMapper } from "../api/middlewares/applicationmw/repositories/ApplicationRepositoryMapper";
import { ApplicationMapper } from "../api/middlewares/applicationmw/mappers/ApplicationMapper";
import { json } from "body-parser";
import { JsonSchemaValidator } from "../api/middlewares/jsonschema/JsonSchemaValidator";
import { ApplicationValidator } from "../api/middlewares/applicationmw/validator/ApplicationValidator";
import { ApplicationRepository } from "../api/middlewares/applicationmw/repositories/ApplicationRepository";
import { ApplicationProcessor } from "../api/middlewares/applicationmw/processors/ApplicationProcessor";
import { ApplicationProcessorMapper } from "../api/middlewares/applicationmw/processors/ApplicationProcessorMapper";
import { ApplicationVerifier } from "../api/middlewares/applicationmw/verifier/ApplicationVerifier";

export default () => {
  try {
    LoggerInstance.info("✌️ start injected into container");

    Container.set("applicationMapper", new ApplicationMapper());

    Container.set("logger", LoggerInstance);
    Container.set(
      "applicationRepositoryMapper",
      new ApplicationRepositoryMapper()
    );

    Container.set("applicationRepository", new ApplicationRepository());

    Container.set("jsonSchemaValidator", new JsonSchemaValidator());
    Container.set("applicationValidator", new ApplicationValidator());

    Container.set("applicationVerifier", new ApplicationVerifier());

    Container.set(
      "applicationRepositoryMapper",
      new ApplicationRepositoryMapper()
    );

    Container.set(
      "applicationProcessorMapper",
      new ApplicationProcessorMapper()
    );

    Container.set("applicationProcessor", new ApplicationProcessor());

    LoggerInstance.info("✌️ end injected into container");
  } catch (e) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
