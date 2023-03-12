import * as Localization from "expo-localization";
import moment, { Moment } from "moment-timezone";

export class CacheHelper {
  private static _instance: CacheHelper;

  public static get Instance(): CacheHelper {
    return this._instance || (this._instance = new this());
  }

  /**
   * @param receivedDate
   * @param expirationInMinutes
   * @returns {boolean}
   */
  public currentDateIsSameOrBefore = (
    receivedDate: string,
    expirationInMinutes: string
  ): boolean => {
    const parsedDate: Moment = moment(JSON.parse(receivedDate)).tz(
      Localization.timezone
    );

    const currentDate: Moment = moment().tz(Localization.timezone);

    const endTime = moment(parsedDate, "HH:mm:ss").add(
      expirationInMinutes,
      "minutes"
    );

    const isSameOrBefore: boolean = currentDate.isSameOrBefore(endTime);

    return isSameOrBefore;
  };
}
