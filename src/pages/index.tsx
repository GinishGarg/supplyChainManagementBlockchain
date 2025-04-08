"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../constants/address";
import contractJson from "../constants/abi.json";
const abi = contractJson.abi;

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [productLocation, setProductLocation] = useState("");
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [updateLocation, setUpdateLocation] = useState("");
  const [products, setProducts] = useState<any[]>([  
    { id: 1, name: "Laptop", location: "Warehouse A", owner: "0x123...abc", timestamp: "2025-04-02 10:00:00" },  
    { id: 2, name: "Phone", location: "Warehouse B", owner: "0x456...def", timestamp: "2025-04-02 11:00:00" },  
    { id: 3, name: "Tablet", location: "Warehouse C", owner: "0x789...ghi", timestamp: "2025-04-02 12:00:00" }  
  ]);

  function getEthereum() {
    return typeof window !== "undefined" ? (window as any).ethereum : null;
  }

  async function connectWallet() {
    const ethereum = getEthereum();
    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  }

  return (
    <div className="container">
      <div className="hero">
        <h1>Supply Chain Monitor</h1>
        <button onClick={connectWallet} className="button">
          {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
        </button>
      </div>

      <div className="content">
        <div className="card">
          <h2>Add Product</h2>
          <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input type="text" placeholder="Location" value={productLocation} onChange={(e) => setProductLocation(e.target.value)} />
          <button className="button">Add</button>
        </div>

        <div className="card">
          <h2>Update Product Location</h2>
          <input type="number" placeholder="Product ID" value={updateId ?? ""} onChange={(e) => setUpdateId(Number(e.target.value))} />
          <input type="text" placeholder="New Location" value={updateLocation} onChange={(e) => setUpdateLocation(e.target.value)} />
          <button className="button">Update</button>
        </div>
      </div>

      <div className="card">
        <h2>Product List</h2>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id} className="border-b p-2">
                <p><strong>ID:</strong> {product.id}</p>
                <p><strong>Name:</strong> {product.name}</p>
                <p><strong>Location:</strong> {product.location}</p>
                <p><strong>Owner:</strong> {product.owner.slice(0, 6)}...</p>
                <p><strong>Last Updated:</strong> {product.timestamp}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}