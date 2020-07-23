import { ErrorMessageModel } from "./ErrorMessageModel";
import { BaseResponseModel } from "./BaseResponseModel";
import { ApplicationModel } from "./ApplicationResponseModel";

export class ApplicationModelWrapper implements BaseResponseModel {
  applicationModel?: ApplicationModel;
  responseStatusCode?: number | 200;
}
