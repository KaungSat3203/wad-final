"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function Home() {
  const APIBASE = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, []);

  const startEdit = (id) => async () => {
    // TODO
  }

  async function fetchProducts() {
    try {
      const data = await fetch(`${APIBASE}/product`);
      if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
      const p = await data.json();
      setProducts(p);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async function fetchCategory() {
    try {
      const data = await fetch(`${APIBASE}/category`);
      if (!data.ok) throw new Error(`HTTP error! status: ${data.status}`);
      const c = await data.json();
      setCategory(c);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

    const createProduct = async (data) => {
    try {
      const response = await fetch(`${APIBASE}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      await fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

    const handleDelete = (id) => async () => {
    try {
      const response = await fetch(`${APIBASE}/product/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <div className="flex flex-row gap-4">
        <div className="flex-1 w-64 ">
          <form onSubmit={handleSubmit(createProduct)}>
            <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
              <div>Code:</div>
              <div>
                <input
                  name="code"
                  type="text"
                  {...register("code", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Name:</div>
              <div>
                <input
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Description:</div>
              <div>
                <textarea
                  name="description"
                  {...register("description", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Price:</div>
              <div>
                <input
                  name="name"
                  type="number"
                  {...register("price", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Category:</div>
              <div>
                <select
                  name="category"
                  {...register("category", { required: true })}
                  className="border border-black w-full"
                >
                  {category.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <input
                  type="submit"
                  value="Add"
                  className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="border m-4 bg-slate-300 flex-1 w-64">
          <h1 className="text-2xl">Products ({products.length})</h1>
          <ul className="list-disc ml-8">
            {
              products.map((p) => (
                <li key={p._id}>
                  <button className="border border-black p-1/2" onClick={startEdit(p._id)}>📝</button>{' '}
                  <button className="border border-black p-1/2" onClick={deleteById(p._id)}>❌</button>{' '}
                  <Link href={`/product/${p._id}`} className="font-bold">
                    {p.name}
                  </Link>{" "}
                  - {p.description}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
