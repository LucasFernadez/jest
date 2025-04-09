const {
    resetProducts,
    addProduct,
    removeProduct,
    getProducts,
    getProduct,
    updateProduct
  } = require('./product');
  
  beforeEach(() => {
    resetProducts();
  });
  
  describe("Adding Products", () => {
    test("should add a product", () => {
      const product = addProduct("Camiseta", 20);
      expect(getProducts()).toContainEqual(product);
    });
  
    test("should increment id for each product", () => {
      const p1 = addProduct("Zapatos", 50);
      const p2 = addProduct("Pantalones", 40);
      expect(p2.id).toBe(p1.id + 1);
    });
  
    test("should throw if name is missing", () => {
      expect(() => addProduct(undefined, 30)).toThrow();
    });
  
    test("should throw if price is missing", () => {
      expect(() => addProduct("Bufanda")).toThrow();
    });
  
    test("should throw if product already exists", () => {
      addProduct("Sombrero", 15);
      expect(() => addProduct("Sombrero", 20)).toThrow();
    });
  });
  
  describe("Removing Products", () => {
    test("should remove a product", () => {
      const product = addProduct("Gorra", 10);
      removeProduct(product.id);
      expect(getProducts()).not.toContainEqual(product);
    });
  
    test("should throw if product does not exist", () => {
      expect(() => removeProduct(123)).toThrow();
    });
  });
  
  describe("Getting a single product", () => {
    test("should get a product by id", () => {
      const product = addProduct("Sudadera", 60);
      const result = getProduct(product.id);
      expect(result).toEqual(product);
    });
  
    test("should throw if product does not exist", () => {
      expect(() => getProduct(999)).toThrow();
    });
  });
  
  describe("Updating Products", () => {
    test("should update a product", () => {
      const product = addProduct("Vestido", 70);
      const updated = updateProduct(product.id, "Vestido Largo", 90);
      expect(updated.name).toBe("Vestido Largo");
      expect(updated.price).toBe(90);
    });
  
    test("should throw if product does not exist", () => {
      expect(() => updateProduct(123, "Nuevo", 50)).toThrow();
    });
  
    test("should update only the price", () => {
      const product = addProduct("Cinturón", 20);
      const updated = updateProduct(product.id, undefined, 25);
      expect(updated.price).toBe(25);
      expect(updated.name).toBe("Cinturón");
    });
  
    test("should update only the name", () => {
      const product = addProduct("Bolso", 100);
      const updated = updateProduct(product.id, "Bolso de cuero");
      expect(updated.name).toBe("Bolso de cuero");
      expect(updated.price).toBe(100);
    });
  });
  