import useLoginRegister from "../../../hooks/useContextHooks/useLoginRegister";
import { Link } from "react-router-dom";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../axios/axios";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  username: string;
  password: string;
  conpassword: string;
};

const Register = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConPass, setShowConPass] = useState<boolean>(false);
  const navigate = useNavigate();
  const { handleRegister, regName, setRegName, regPass, setRegPass } =
    useLoginRegister();

  // const handleRegister = async (data: RegisterFormData) => {
  //   await axios.post(`${BASE_URL}/register`, {
  //     nameReg: data.username,
  //     passwordReg: data.password,
  //   });

  //   navigate("/login");
  // };

  const registerFormSchema: ZodType<RegisterFormData> = z
    .object({
      username: z.string().min(2).max(30),
      password: z.string().min(7).max(20),
      conpassword: z.string().min(7).max(20)
    })
    .refine((data) => data.password === data.conpassword, {
      message: "Passwords do not match",
      path: ["conpassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  return (
    <section className="reg">
      <h2 className="reg__heading">Register</h2>
      <form onSubmit={handleSubmit(handleRegister)} className="reg__form">
        <div className="reg__inputcont">
          <input
            {...register("username")}
            placeholder="Enter username..."
            type="text"
            name="username"
            id="username"
          />
          {errors.username && (
            <span className="reg__error">{errors.username.message}</span>
          )}
        </div>
        <div className="reg__inputcont">
          <input
            {...register("password")}
            name="password"
            id="password"
            placeholder="Enter password..."
            type={showPass ? "text" : "password"}
          />
          {errors.password && (
            <span className="reg__error">{errors.password.message}</span>
          )}
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            className="reg__toggle"
          >
            {showPass ? "hide" : "show"}
          </button>
        </div>
        <div className="reg__inputcont">
          <input
            {...register("conpassword")}
            placeholder="Confirm password..."
            name="conpassword"
            id="conpassword"
            type={showConPass ? "text" : "password"}
          />
          {errors.conpassword && (
            <span className="reg__error">{errors.conpassword.message}</span>
          )}
          <button
            type="button"
            onClick={() => setShowConPass((prev) => !prev)}
            className="reg__toggle"
          >
            {showConPass ? "hide" : "show"}
          </button>
        </div>
        <button  type="submit">Register</button>
      </form>
      <Link className="loginreg__redirect" to="/">
        Login if you have an account
      </Link>
    </section>
  );
};

export default Register;
