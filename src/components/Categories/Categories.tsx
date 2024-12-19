import React, { useEffect, useState } from "react";
import CategoryService from "../../services/categoryService";
import { ICategoryProps } from "../../interface";
import Swal from "sweetalert2";

import "./categories.css";
import { setFips } from "crypto";
const Categories = () => {
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [name, setCatName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setimage] = useState<File | null>(null);
  const getAll = async () => {
    const res = await CategoryService.getAllCategories();
    setCategories(res);
  };

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
        await CategoryService.deleteCategory(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      }
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setimage(files[0]);
    }
  };
  const addCategoryHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await CategoryService.addNewCategory(
        name,
        description,
        image
      );
      setCategories((prevCategories) => [...prevCategories, res]);
    } catch (err) {
      console.log(err);
    } finally {
      setOpenNew(false);
      setCatName("");
      setDescription("");
      setimage(null);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <button onClick={() => setOpenNew(true)} className="addBtn">
        <i className="fa-solid fa-plus"></i>
      </button>

      {openNew && (
        <div className="addCategoryPopup">
          <div className="popupContent">
            <form onSubmit={addCategoryHandler}>
              <div className="form-group">
                <label>اسم القسم</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setCatName(e.target.value)}
                  className="inputField"
                  placeholder="اسم القسم"
                  required
                />
              </div>
              <div className="form-group">
                <label>وصف القسم</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="inputField"
                  placeholder="اسم القسم"
                />
              </div>
              <div className="form-group">
                <label>صورة القسم</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="inputField"
                />
              </div>
              <div>
                <button className="addCategoryBtn">اضافة</button>
              </div>
              <button
                className="closePopupBtn"
                onClick={() => setOpenNew(false)}
              >
                X
              </button>
            </form>
          </div>
        </div>
      )}
      <table border={1} className="tableShow">
        <thead>
          <tr>
            <th>#</th>
            <th>اسم المنتج</th>
            <th>الوصف</th>
            <th>الصورة</th>
            <th>العمليات</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category, index) => (
            <tr key={index}>
              <td>{++index}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <img src={category.image} alt="" width={50} height={50} />
              </td>
              <td>
                <button className="edit actionsBtn">
                  <i className="fa-solid fa-edit"></i>
                </button>
                <button
                  onClick={() => deleteHandler(category.id)}
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

export default Categories;
