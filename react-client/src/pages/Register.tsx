import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../helper/auth.api";
import { createUserAccount } from "../helper/user.api";
import { useAuth } from "../hooks/useAuth";

interface RegisterValues {
  name?: string;
  email: string;
  password: string;
}

type RegisterValuesError = {
  name?: string;
  email?: string;
  password?: string;
};

export const Register = () => {
  const [submiting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  return (
    <div className="flex flex-col hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] bg-white border-gray-300 dark:bg-gray-800 border dark:border-gray-700 gap-5 rounded-md w-full max-w-130 p-10 duration-300 dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-gray-600 dark:text-white">
          Crie sua conta
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Insira suas informações para criar uma nova conta.
        </p>
      </div>

      {/* Formulário */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        // Envio dos dados para o servidor
        onSubmit={async (values: RegisterValues) => {
          try {
            setSubmitting(true);

            const response = await createUserAccount(values);

            if (response.status === 201) {
              const loginResponse = await loginUser(
                values.email,
                values.password,
              );
              if (loginResponse.status === 200) {
                localStorage.setItem("jwt-token", loginResponse.data.token);
                navigate("/");
                setAuthenticated(true);
                setSubmitting(false);
                return;
              }

              navigate("/auth");
              setSubmitting(false);
              return;
            }
            setSubmitting(false);
          } catch (error) {
            setSubmitting(false);
          }
        }}
        validate={(values) => {
          const errors: RegisterValuesError = {};

          if (!values.name) {
            errors.name = "* O nome é obrigatório";
          } else if (values.name.length < 2) {
            errors.name = "* O nome precisa ter pelo menos duas letras";
          }

          if (!values.email) {
            errors.email = "* O email é obrigatório";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "* Formato de email inválido";
          }

          if (!values.password) {
            errors.password = "* A senha é obrigatória";
          } else if (values.password.length < 8) {
            errors.password = "* A senha precisa ter pelo menos 8 caracteres.";
          }

          return errors;
        }}
      >
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-gray-600 dark:text-gray-200 text-lg"
              >
                Nome completo:
              </label>
              <Field
                id="name"
                name="name"
                className="dark:text-gray-200 border-gray-300 dark:placeholder:text-gray-400 py-2 px-2 outline-none focus:ring-2 focus:ring-blue-500 border dark:border-gray-600 rounded-md"
                placeholder="Digite seu nome completo..."
                type="text"
              />
            </div>

            <ErrorMessage
              className="text-sm text-red-500"
              name="name"
              component={`p`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-gray-600 dark:text-gray-200 text-lg"
              >
                Email:
              </label>
              <Field
                id="email"
                name="email"
                className="dark:text-gray-200 border-gray-300 dark:placeholder:text-gray-400 py-2 px-2 outline-none focus:ring-2 focus:ring-blue-500 border dark:border-gray-600 rounded-md"
                placeholder="Digite seu email..."
                type="email"
              />
            </div>

            <ErrorMessage
              className="text-sm text-red-500"
              name="email"
              component={`p`}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-gray-600 dark:text-gray-200 text-lg"
              >
                Senha:
              </label>
              <Field
                id="password"
                name="password"
                className="dark:text-gray-200 border-gray-300 dark:placeholder:text-gray-400 py-2 px-2 outline-none focus:ring-2 focus:ring-blue-500 border dark:border-gray-600 rounded-md"
                placeholder="Digite sua senha..."
                type="password"
              />
            </div>
            <ErrorMessage
              className="text-sm text-red-500"
              name="password"
              component={`p`}
            />
          </div>

          <div className="flex dark:text-white mt-2">
            <p>
              Já tem uma conta?{" "}
              <Link
                className="text-blue-500 hover:underline"
                to={`/auth`}
              >
                Faça login.
              </Link>
            </p>
          </div>

          <button
            className={`bg-blue-500 duration-500 text-white py-3 rounded-md cursor-pointer hover:bg-blue-600 ${submiting ? "pointer-events-none" : ""}`}
            type="submit"
          >
            {submiting ? "Enviando..." : "Enviar"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
