import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/AxiosInstance";
import { findAllByPlaceholderText } from "@testing-library/react";

const RegisterNewAdmin = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const addNewAdmin = async () => {
    if (
      !email ||
      !firstName ||
      !lastName ||
      !phone ||
      password ||
      confirmPass
    ) {
      toast.error("الرجاء إدخال كل البيانات ");
      return;
    }

    if (password !== confirmPass) {
      toast.error("الرقم السري غير متشابه ");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post("Account/CreateAdminAccount", {
        email,
        firstName,
        password,
        lastName,
        phone,
        confirmPass,
      });
      console.log(res);
      toast.success("تم تسجيل الدخول بنجاح ");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={addNewAdmin}>
        <div className="form-group">
          <label>البريد الالكتروني</label>
          <input
            type="email"
            placeholder=""
            className="inputFiled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>الاسم الاول</label>
          <input
            type="text"
            placeholder=""
            className="inputFiled"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>الاسم الاخير</label>
          <input
            type="text"
            placeholder=""
            className="inputFiled"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>رقم الهاتف</label>

          <input
            type="text"
            placeholder=""
            className="inputFiled"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label> كلمة المرور</label>
          <input
            type="password"
            placeholder=""
            className="inputFiled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>اعادة كلمة السر</label>
          <input
            type="password"
            placeholder=""
            className="inputFiled"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        <button type="submit" className="btn submitBtn" disabled={loading}>
          {loading ? "loading" : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
};

export default RegisterNewAdmin;
