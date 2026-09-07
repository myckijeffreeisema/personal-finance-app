import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../helper/auth.api";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

interface LoginValues {
  email: string;
  password: string;
}

type LoginValuesError = {
  email?: string;
  password?: string;
};

export const Login = () => {
  const {setAuthenticated} = useAuth()
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="flex flex-col hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] bg-white border-gray-300 dark:bg-gray-800 border dark:border-gray-700 gap-5 rounded-md w-full max-w-130 p-10 duration-300 dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-gray-600 dark:text-white">
          Acesse sua conta
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Insira suas informações de login para acessar sua conta.
        </p>
      </div>
      

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}

        // Envio dos dados para o servidor
        onSubmit={async (values: LoginValues) => {
          try {
            setSubmitting(true);

            const data = await loginUser(values.email, values.password);
            
            if (data.status === 200) {
              localStorage.setItem("jwt-token", data.data.token);
              setAuthenticated(true);
              navigate("/");
              return;
            }

            if (data.code === "user_not_found") {
              toast.error("Usuário não cadastrado", { position: "top-center" });
              return;
            }

            if (data.code === "invalid_credentials") {
              toast.error("Credenciais de login inválidas", { position: "top-center" });
              return;
            }

            if (data.status === 429) {
              toast.error("Muitas tentativas, tente novamente em 15 minutos.", { position: "top-center" });
              return;
            }

            toast.error("Erro ao autenticar usuário", { position: "top-center" });
          } catch (error) {
            console.log(error);
            toast.error("Erro ao autenticar usuário", { position: "top-center" });
          } finally {
            setSubmitting(false);
          }
        }}

        // Validação dos dados do input
        validate={(values) => {
          const errors: LoginValuesError = {};

          if (!values.email) {
            errors.email = "* O email é obrigatório";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "* Formato de email inválido";
          }

          if (!values.password) {
            errors.password = "* A senha é obrigatória";
          }

          return errors;
        }}

        

      >

        {/* Formulário */}
        <Form className="flex flex-col gap-5">
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
              Ainda não tem uma conta?{" "}
              <Link
                className="text-blue-500 hover:underline"
                to={`/auth/register`}
              >
                Cadastre-se
              </Link>
            </p>
          </div>

          <button
            className="bg-blue-500 duration-500 text-white py-3 rounded-md cursor-pointer hover:bg-blue-600"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Enviando..." : "Enviar"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
