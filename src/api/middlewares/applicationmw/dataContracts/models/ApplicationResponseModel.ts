import { ErrorMessageModel } from "./ErrorMessageModel";

export class ApplicationResponseModel {
  applicationId?: number;
  errorDetail: Array<ErrorMessageModel>;
}
