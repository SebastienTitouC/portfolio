var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// for large strings, use this from https://stackoverflow.com/a/49124600
const buff_to_base64 = (buff) => btoa(new Uint8Array(buff).reduce((data, byte) => data + String.fromCharCode(byte), ''));
const base64_to_buf = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
const enc = new TextEncoder();
const dec = new TextDecoder();
const getPasswordKey = (password) => crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveKey",
]);
const deriveKey = (passwordKey, salt, keyUsage) => crypto.subtle.deriveKey({
    name: "PBKDF2",
    salt: salt,
    iterations: 250000,
    hash: "SHA-256",
}, passwordKey, { name: "AES-GCM", length: 256 }, false, keyUsage);
function decryptData(encryptedData, password, salt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const encryptedDataBuff = base64_to_buf(encryptedData);
            const iv = encryptedDataBuff.slice(0, 12);
            const data = encryptedDataBuff.slice(12);
            const passwordKey = yield getPasswordKey(password);
            const aesKey = yield deriveKey(passwordKey, enc.encode(salt), ["decrypt"]);
            const decryptedContent = yield crypto.subtle.decrypt({ name: "AES-GCM", iv: iv, }, aesKey, data);
            return dec.decode(decryptedContent);
        }
        catch (e) {
            console.log(`Error - ${e}`);
            return "";
        }
    });
}
export { decryptData };
