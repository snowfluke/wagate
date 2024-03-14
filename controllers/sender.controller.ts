import { unlinkSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

import { client } from "..";

import { NextFunction, Request, Response } from "../interfaces/base.interface";
import { STATUS } from "../utils/constant.util";
import { BadRequestError } from "../utils/error.util";
import { Helper } from "../utils/helper.util";

export const sendMsg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, number } = req.body;
    const helper = new Helper();

    if (!content) throw new BadRequestError("No message content provided!");
    if (!helper.isValidPhoneNumber(number))
      throw new BadRequestError("Phone number is not valid! Format: 62...");

    client.sendMsg(content, number);

    const result = {
      status: "success",
      code: 200,
      message: "Message sucessfully sent",
      data: {
        number,
        content,
        type: "text",
      },
    };
    res.status(STATUS.SUCCESS).json(result);
  } catch (error) {
    return next(error);
  }
};

export const sendMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, number } = req.body;
    const helper = new Helper();

    if (!req.file) throw new BadRequestError("No file were provided!");
    if (!helper.isValidPhoneNumber(number))
      throw new BadRequestError("Phone number is not valid! Format: 62...");

    const tempFilePath = join(tmpdir(), req.file.originalname);
    writeFileSync(tempFilePath, req.file.buffer);

    client.sendFile(content, number, tempFilePath).then(() => {
      unlinkSync(tempFilePath);
    });

    const result = {
      status: "success",
      code: 200,
      message: "Message sucessfully sent",
      data: {
        number,
        content,
        type: "media",
      },
    };

    res.status(STATUS.SUCCESS).json(result);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
