import React, { useEffect, useState } from "react";
import CategoryService from "../../services/categoryService";
import { ICategoryProps } from "../../interface";
import Swal from "sweetalert2";
import "./categories.css";
import AddCategory from "./AddCategory";
import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [categoryToEdit, setCategoryToEdit] = useState<ICategoryProps | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState<string>("");
  const [editID, setEditID] = useState<number>(0);
  const [editDescription, setEditDescription] = useState<string>("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const getAll = async () => {
    const res = await CategoryService.getAllCategories();
    setCategories(res);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setEditImage(files[0]);
    }
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
  const openEditPopup = (category: ICategoryProps) => {
    setCategoryToEdit(category);
    setEditID(category.id);
    setEditName(category.name);
    setEditDescription(category.description);
    setEditImage(null);
    setOpenEdit(true);
  };

  const editCategoryHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    if (categoryToEdit?.id) {
      try {
        const res = await CategoryService.updateCategory(
          editID,
          editName,
          editDescription,
          editImage
        );
        console.log("res", res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setOpenEdit(false);
        setEditName("");
        setEditDescription("");
        setEditImage(null);
      }
    } else {
      console.log("مفيش id");
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <AddCategory />
      {openEdit && (
        <div className="addCategoryPopup">
          <div className="popupContent">
            <form onSubmit={editCategoryHandler}>
              <div className="form-group">
                {editID}
                <label>اسم القسم</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="inputField"
                  placeholder="اسم القسم"
                  required
                />
              </div>
              <div className="form-group">
                <label>وصف القسم</label>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
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
                <img src={categoryToEdit?.image} width={30} height={30} />
              </div>
              <div>
                <button className="addCategoryBtn">{"تعديل"}</button>
              </div>
              <button
                className="closePopupBtn"
                onClick={() => setOpenEdit(false)}
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
                <button
                  onClick={() => openEditPopup(category)}
                  className="edit actionsBtn"
                >
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
