import { Region } from "react-native-maps";

export class ExploreConstants {
  public static readonly INITIAL_REGION: Region = {
    latitude: -19.7884883,
    longitude: -43.8768724,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  public static readonly MARKERS: Array<any> = [
    {
      coordinates: {
        latitude: -19.7884883,
        longitude: -43.8768724,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      title: "Totó",
      description:
        "Doggo ipsum boofers porgo. Corgo smol lotsa pats porgo pupper",
    },
    {
      coordinates: {
        latitude: -19.7624807,
        longitude: -43.8761428,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      title: "Lelé",
      description:
        "Doggo ipsum boofers porgo. Corgo smol lotsa pats porgo pupper",
    },

    {
      coordinates: {
        latitude: -19.77076,
        longitude: -43.8605217,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      title: "Maluco",
      description:
        "Doggo ipsum boofers porgo. Corgo smol lotsa pats porgo pupper",
    },
  ];
}
