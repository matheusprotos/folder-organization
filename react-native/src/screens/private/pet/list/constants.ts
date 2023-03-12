import { Pet } from "@entities/pet.entity";

export class PetConstants {
  public static readonly PETS: Array<Pet> = [
    {
      id: 1,
      name: "Totó",
    },
    {
      id: 2,
      name: "Lelé",
    },
    {
      id: 3,
      name: "Maluco",
    },
  ];
}
