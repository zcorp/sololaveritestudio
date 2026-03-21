import { useState, useEffect } from "react";
import { fetchProducts } from "../services/jsonService.js";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data ?? []);
      setLoading(false);
    });
  }, []);

  return { products, loading };
}