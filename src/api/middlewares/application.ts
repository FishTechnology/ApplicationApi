import { Container } from "typedi";

const testPlanMW = async (req, res, next) => {
  const Logger = Container.get("logger");

  try {

    //const testPlanModel = Container.get('testPlanModel') as mongoose.Model<IUser & mongoose.Document>;
    //const userRecord = await testPlanModel.findById(req.token._id);
    return next();
  } catch (e) {
   // Logger.error("🔥 Error attaching user to req: %o", e);
    return next(e);
  }
};
