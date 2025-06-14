export type SettledResponse<T> =
  | {
      status: "fulfilled";
      value: T;
    }
  | {
      status: "rejected";
      reason: Error;
    };

export type SettledResponses<T> = SettledResponse<T>[];

export interface SecretUtils {
  getPubkey: () => Promise<Uint8Array>;
  decrypt: (ciphertext: Uint8Array, nonce: Uint8Array) => Promise<Uint8Array>;
  encrypt: (
    contractCodeHash: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    msg: object
  ) => Promise<Uint8Array>;
  getTxEncryptionKey: (nonce: Uint8Array) => Promise<Uint8Array>;
}