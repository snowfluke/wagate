# WA-GATE

A very simple typescript whatsapp gateway via expressjs REST API using whatsapp-web.js.

- For more process-oriented whatsapp bot without a REST API, you can visit: https://github.com/snowfluke/wajs-bot-boilerplate
- For dial-based bot whatsapp, visit: https://github.com/snowfluke/dial-wabot-boilerplate

## Contribution

Any features request and contribution are welcome! ^\_^

## Installation & Configuration

### Configuration

1. Make sure you clone this repo first
2. Copy `.env.example` and rename it to `.env`
3. Change the configuration there
4. Don't forget to change the `logo.jpg` in the root directory

### Installation

1. Node.js v20+ , I've setups to 20 in package.json, you can change it but generally it works in Node.js v12 higher
2. npm package manager
3. You can go for docker for an easy setups, or if you deploy it manually you will need to install Google Chrome
4. On an Ubuntu server, you will need to run this command:

```bash
sudo apt-get update && sudo apt-get install -y \
    gconf-service \
    libgbm-dev \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget
```

5. `cd` into the project directory
6. run `npm install`
7. run `npm run build`
8. run `npm run start`
9. After that you will need to scan the QR that is printed to the terminal
10. You're basically done, or if you want to be more robust, you can use `pm2` for a better process management

## Removing delay

You can commented out this line https://github.com/snowfluke/wagate/blob/fdbf04baae84d2d8414f03e67df218cbfab1de0b/lib/wagate-client.ts#L57 and also this line https://github.com/snowfluke/wagate/blob/fdbf04baae84d2d8414f03e67df218cbfab1de0b/lib/wagate-client.ts#L62

## Endpoints

- [GET] /api/v1/

Response:

```json
{
  "message": "REST API is working"
}
```

- [POST][Multipart/form-data] /api/v1/send/

| name    | value        |
| ------- | ------------ |
| number  | 628XXX...    |
| content | your message |

Response:

```json
{
  "status": "success",
  "code": 200,
  "message": "Message sucessfully sent",
  "data": {
    "number": "628XXX...",
    "content": "Hi, mom!",
    "type": "text"
  }
}
```

- [POST][Multipart/form-data] /api/v1/send/media

| name    | value        |
| ------- | ------------ |
| number  | 628XXX...    |
| content | your message |
| file    | binary file  |

Response:

```json
{
  "status": "success",
  "code": 200,
  "message": "Message sucessfully sent",
  "data": {
    "number": "628XXX...",
    "content": "this is your media caption",
    "type": "media"
  }
}
```

### Error response

```json
{
  "status": "error",
  "code": 400,
  "message": "Bad Image"
}
```

#### Error code

| Code | Status                |
| ---- | --------------------- |
| 200  | SUCCESS               |
| 201  | CREATED               |
| 204  | NO CONTENT            |
| 400  | BAD REQUEST           |
| 401  | UNAUTHORIZED          |
| 403  | FORBIDDEN             |
| 404  | NOT FOUND             |
| 408  | TIME OUT              |
| 429  | TOO MANY REQUEST      |
| 500  | INTERNAL SERVER ERROR |
| 503  | SERVICE UNAVAILABLE   |

# Debugging

- Delete `.wwebjs_auth` folder
- Delete `node_modules` folder
- Delete `package-lock.json` file
- Logout the linked devices on your Whatsapp
- Remove `whatsapp-web.js` from `package.json`
- Run `npm install github:pedroslopez/whatsapp-web.js#webpack-exodus`
