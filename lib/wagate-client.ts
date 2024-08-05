import { MessageMedia } from "whatsapp-web.js";
import { SClient, onReady } from "wwjs-stable-client";
import { Helper } from "../utils/helper.util";
import logger from "../utils/log.util";

export class WagateClient {
  constructor(private client = SClient, private helper = new Helper()) {}

  async init() {
    onReady(() => {
      logger.info("The bot is ready");
    });

    await this.client.initialize();
    this.setupProfile();
  }

  setupProfile() {
    if (process.env.NODE_ENV == "production") {
      const media = MessageMedia.fromFilePath("./logo.jpg");

      this.client.setProfilePicture(media);
      this.client.setDisplayName(process.env.DISPLAY_NAME || "");
    }
  }

  async sendToAdmin(msg: string) {
    this.sendMsg(msg, process.env.ADMIN_NUMBER || "");
  }

  async sendMsg(msg: string, to: string) {
    await this.helper.delay();
    this.client.sendMessage(`${to}@c.us`, msg);
  }

  async sendFile(msg: string = "", to: string, filePath: string) {
    await this.helper.delay();
    const messageMedia = MessageMedia.fromFilePath(filePath);
    this.client.sendMessage(`${to}@c.us`, messageMedia, {
      caption: msg,
    });
  }
}
