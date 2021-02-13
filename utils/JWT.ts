import jsonwebtoken = require("jsonwebtoken");
import { SECRET } from "../config";

export interface TokenData {
  status: boolean;
  id?: string;
  email?: string;
}

export default class JWT {
  static generateAccessToken(id: string): string {
    const payload = {
      id,
    };
    return jsonwebtoken.sign(payload, SECRET, {
      expiresIn: "7d",
    });
  }

  static generateEmailToken(email: string): string {
    const payload = {
      email,
    };
    return jsonwebtoken.sign(payload, SECRET, {
      expiresIn: "15m",
    });
  }

  static __verifyToken(token: string): boolean | any {
    return jsonwebtoken.verify(token, SECRET);
  }
  static async verifyToken(token): Promise<TokenData> {
    return await new Promise((resolve) => {
      jsonwebtoken.verify(token, SECRET, (err, decoded) => {
        if (err) {
          resolve({
            status: false,
          });
        } else {
          resolve({
            status: true,
            ...decoded,
          });
        }
      });
    });
  }
}
