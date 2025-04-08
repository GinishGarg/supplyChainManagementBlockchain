import axios from "axios";

export const addProduct = async (name: string, location: string) => {
    return await axios.post("/api/supplyChain", { name, location });
};

export const updateProduct = async (id: number, location: string) => {
    return await axios.put("/api/supplyChain", { id, location });
};
