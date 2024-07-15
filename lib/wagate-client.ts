import qrcode from "qrcode-terminal";
import {
  Client,
  ClientOptions,
  LocalAuth,
  MessageMedia,
} from "whatsapp-web.js";
import { Helper } from "../utils/helper.util";
import logger from "../utils/log.util";

const CLIENT_OPTIONS: ClientOptions = {
  authStrategy: new LocalAuth(),
  webVersion: "2.3000.1012972578-alpha",
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/{version}.html",
  },
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
};

export class WagateClient {
  constructor(
    private client = new Client(CLIENT_OPTIONS),
    private helper = new Helper()
  ) {}

  async init() {
    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on("ready", () => {
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
