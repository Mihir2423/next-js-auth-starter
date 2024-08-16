import crypto from "crypto";

/** Generate a random token of the specified length, using crypto.randomBytes function
 * that first creates a buffer of random bytes and then converts it to a hex string.
 * @param length The length of the token to generate.
 */
export async function generateRandomToken(length: number) {
    const buf = await new Promise<Buffer>((resolve, reject) => {
        crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(buf);
            }
        });
    });

    return buf.toString("hex").slice(0, length);
}