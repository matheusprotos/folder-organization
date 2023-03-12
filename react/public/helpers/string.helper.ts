export class StringHelper {
  /**
   * @returns {string}
   */
  public static parseBearerToken = (token: string): string =>
    Buffer.from(token.split(".")[1], "base64").toString();

  /**
   * @param {string} price Preço que será convertido
   * @returns {number} Preço convertido
   */
  public static priceToNumber = (price: string): number =>
    +price.replace(".", "").replace(",", ".").replace("R$ ", "");
}
