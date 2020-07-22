import { Router, Request, Response } from "express";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.get("/test", (req: Request, res: Response) => {
    res.json({ status: "success" }).status(200);
  });

  app.use("/applications", route);
  route.get(
    "/:id",
    middlewares.applicationDetail.getApplicationById,
    //middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res; //.json({ application: res.application }).status(200);
      //return res.json({ application: res.application }).status(200);
    }
  );

  route.post(
    "/",
    middlewares.applicationDetail.createApplication,
    (req: Request, res: Response) => {
      return res.json({ user: req.applicationModel }).status(200);
    }
  );
};
