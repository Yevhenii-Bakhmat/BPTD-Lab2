import { publicKey, privateKey } from "../const";
import JSEncrypt from "jsencrypt";
const jsencrypt = new JSEncrypt();

export const encrypt = (data: string) => {
  jsencrypt.setPublicKey(publicKey);
  return jsencrypt.encrypt(data);
};

export const decrypt = (data: string) => {
  jsencrypt.setPrivateKey(privateKey);
  return jsencrypt.decrypt(data);
};
