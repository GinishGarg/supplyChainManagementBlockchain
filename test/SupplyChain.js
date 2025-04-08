const { expect } = require("chai");

describe("SupplyChain Smart Contract", function () {
    let SupplyChain, supplyChain, owner, addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        SupplyChain = await ethers.getContractFactory("SupplyChain");
        supplyChain = await SupplyChain.deploy();
        await supplyChain.deployed();
    });

    it("Should add a new product", async function () {
        await supplyChain.addProduct("Laptop", "Warehouse A");
        const product = await supplyChain.getProduct(1);
        expect(product.name).to.equal("Laptop");
        expect(product.location).to.equal("Warehouse A");
    });

    it("Should update product location", async function () {
        await supplyChain.addProduct("Laptop", "Warehouse A");
        await supplyChain.updateProduct(1, "Warehouse B");
        const product = await supplyChain.getProduct(1);
        expect(product.location).to.equal("Warehouse B");
    });

    it("Should revert for non-existent product updates", async function () {
        await expect(supplyChain.updateProduct(99, "Warehouse X")).to.be.revertedWith("Product does not exist");
    });
});
