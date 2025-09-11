export const Products = {
  Backpack: 'Sauce Labs Backpack',
  BikeLight: 'Sauce Labs Bike Light',
  BoltTShirt: 'Sauce Labs Bolt T-Shirt',
  FleeceJacket: 'Sauce Labs Fleece Jacket',
  Onesie: 'Sauce Labs Onesie',
  RedTShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export const ALL_PRODUCTS: readonly string[] = [
  Products.Backpack,
  Products.BikeLight,
  Products.BoltTShirt,
  Products.FleeceJacket,
  Products.Onesie,
  Products.RedTShirt,
] as const;
