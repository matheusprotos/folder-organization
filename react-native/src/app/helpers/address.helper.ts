import { LocationGeocodedAddress } from "expo-location";

export class AddressHelper {
  /**
   * @returns {string}
   */
  public static formatAddress = (address: LocationGeocodedAddress): string =>
    `${address.district || ""}, ${address.city || address.subregion || ""} - ${
      address.region || ""
    }`;
}
