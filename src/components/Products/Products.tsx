import React, { useEffect, useState } from "react";
import { IProductProps } from "../../interface";
import Swal from "sweetalert2";
import ProductService from "../../services/productService";
import AddProduct from "./AddProduct";
const Products = () => {
  const [products, setProducts] = useState<IProductProps[]>([]);
  const getAll = async () => {
    const res = await ProductService.getAllProducts();
    setProducts(res);
  };

  useEffect(() => {
    getAll();
  }, []);
  const deleteHandler = async (id: number) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
      }
    });
  };
  return (
    <div>
      <AddProduct />
      <table border={1} className="tableShow">
        <thead>
          <tr>
            <th>#</th>
            <th>اسم المنتج</th>
            <th>الوصف</th>
            <th>السعر</th>
            <th>الكمية المتاحة</th>
            <th>القسم</th>
            <th>الصورة</th>
            <th>العمليات</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={product.id}>
              <td>{++index}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <img src={product.image} alt="" width={50} height={50} />
              </td>
              <td>
                <button className="edit actionsBtn">
                  <i className="fa-solid fa-edit"></i>
                </button>
                <button
                  onClick={() => deleteHandler(product.id)}
                  className="delete actionsBtn"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
