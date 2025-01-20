// for large strings, use this from https://stackoverflow.com/a/49124600
const buff_to_base64 = (buff: Uint8Array) => btoa(
    new Uint8Array(buff).reduce(
        (data, byte) => data + String.fromCharCode(byte), ''
    )
);

const base64_to_buf = (b64: string) =>
    Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

const enc = new TextEncoder();
const dec = new TextDecoder();

const getPasswordKey = (password: string) =>
    crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
        "deriveKey",
    ]);

const deriveKey = (passwordKey: CryptoKey, salt: Uint8Array, keyUsage: KeyUsage[]) =>
    crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 250000,
            hash: "SHA-256",
        },
        passwordKey,
        { name: "AES-GCM", length: 256 },
        false,
        keyUsage
    );

async function decryptData(encryptedData: string, password: string, salt: string) {
    try {
        const encryptedDataBuff = base64_to_buf(encryptedData);
        const iv = encryptedDataBuff.slice(0, 12);
        const data = encryptedDataBuff.slice(12);
        const passwordKey = await getPasswordKey(password);
        const aesKey = await deriveKey(passwordKey, enc.encode(salt), ["decrypt"]);
        console.log('encryptedData ' + encryptedData)
        console.log('password ' + password)
        console.log('salt ' + salt)
        const decryptedContent = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv, },
            aesKey,
            data
        );
        console.log('ic' + decryptedContent)
        return dec.decode(decryptedContent);
    } catch (e) {
        console.log(`Error - ${e}`);
        return "";
    }
}

export { decryptData };