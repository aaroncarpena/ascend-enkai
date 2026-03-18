import React from "react";
import { useForm } from "react-hook-form";
import useAuthProvider from "../../../hooks/useAuthProvider.js";
const SignUp = () => {
  const { defaultDataSesion } = useAuthProvider();
  const { register, handleSubmit } = useForm({ defaultValues: defaultDataSesion });
    const onSubmit = (data) => console.log(data)

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Username: </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Enter your username."
          />
          <label htmlFor="email">Email: </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email"
          />
          <label htmlFor="telefono">Phone: </label>
          <input
            {...register("telefono")}
            type="tel"
            id="telefono"
            placeholder="Enter your phone number."
          />
          <label htmlFor="password">Password: </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          <label htmlFor="password_verified">Confirm password: </label>
          <input
            {...register("password_verified")}
            type="password"
            id="password_verified"
            placeholder="Repeat your password"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
