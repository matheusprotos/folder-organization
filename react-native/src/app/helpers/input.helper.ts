export class InputHelper {
  /**
   * @returns {string}
   */
  public static trimAndTransformToLowerCase(text: string): string {
    const response: string = text.trim().toLowerCase();

    return response;
  }
}
