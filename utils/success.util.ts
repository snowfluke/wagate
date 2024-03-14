export class SuccessResponse {
  status: string;
  code: number;
  message: string;
  data: any;

  constructor(code: number, message: string, data: any) {
    this.status = "success";
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
