import { Router, Request, Response } from "express";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/applications", route);

  route.get(
    "/:id",
    middlewares.ApplicationMW.getApplicationById,
    async (req: Request, res: Response) => {
      try {
        return res.json(res.applicationModel).status(200);
      } catch (e) {
        return res.status(500).send(e.message);
      }
    }
  );
  route.post(
    "/",
    middlewares.ApplicationMW.createApplication,
    async (req: Request, res: Response) => {
      try {
        const appModelWrapper = req.applicationModelWrapper;
        return res
          .json(appModelWrapper.applicationModel)
          .status(appModelWrapper.responseStatusCode);
      } catch (e) {
        return res.status(500).send(e.message);
      }
    }
  );
};
