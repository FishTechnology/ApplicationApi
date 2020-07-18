import { Router, Request, Response } from "express";
//import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.get("/test", (req: Request, res: Response) => {
    res.json({ status: "success" }).status(200);
  });

  app.use("/testplans", route);
  route.get(
    "/testplan",
    //middlewares.isAuth,
    //middlewares.attachCurrentUser,
    (req: Request, res: Response) => {
      return res.json({ user: "testplans" }).status(200);
    }
  );
};
