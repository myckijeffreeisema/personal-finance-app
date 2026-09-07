import { ErrorMessage, Field, Form, Formik } from "formik";
import { formatAmount, parseAmount } from "../helper/formatter";


type TransactionValues = {
  name: string;
  amount: string;
  type: string;
};

type TransactionValuesErros = {
  name?: string;
  amount?: string;
  type?: string;
};

const defaultValues: TransactionValues = {
  name: "",
  amount: "",
  type: ""
}

interface TransactionFormProps {
  initialValues?: TransactionValues;
  onSubmit: (values: TransactionValues, actions: any) => Promise<void>;
  buttonText: string;
}


export const TransactionForm = ({ initialValues = defaultValues, onSubmit, buttonText }: TransactionFormProps) => {
  return (
    <div className="flex flex-col gap-10">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => onSubmit(values, actions)}
        validate={(values) => {
          const errors: TransactionValuesErros = {};

          if (!values.name) {
            errors.name = "* O nome da transação é obrigatório";
          }
          if (!values.amount) {
            errors.amount = "* O valor da transação é obrigatório";
          }

          const amount = parseAmount(values.amount);
          if (amount < 1) {
            errors.amount = "* O valor da transação não pode ser zero";
          }

          const type = values.type;
          const validTypes = ["entry", "exit"];

          if (!type || type.length < 1) {
            errors.type = "* O tipo da transação é obrigatório";
          } else if (!validTypes.includes(type)) {
            errors.type = "* O tipo da transação é inválido";
          }

          return errors;
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1 dark:text-gray-200 ">
                <label htmlFor="name">Nome:</label>
                <Field
                  className="border border-gray-400 dark:border-gray-600 p-2 rounded-md outline-none focus:ring ring-blue-600"
                  name="name"
                  id="name"
                  placeholder="Nome da transação..."
                  type="text"
                />
              </div>
              <ErrorMessage
                className="text-sm text-red-500"
                name="name"
                id="name"
                component={`p`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-3 dark:text-gray-200 ">
                <label htmlFor="amount">Valor:</label>
                <Field
                  className="border w-max border-gray-400 dark:border-gray-600 p-2 rounded-md outline-none focus:ring ring-blue-600"
                  name="amount"
                  id="amount"
                  placeholder="R$ 0,00"
                  type="text"
                  value={values.amount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const amount = Number(e.target.value.replace(/\D/g, ""));
                    const formatedValue = formatAmount(amount);
                    setFieldValue("amount", formatedValue);
                  }}
                />
              </div>
              <ErrorMessage
                className="text-sm text-red-500"
                name="amount"
                id="amount"
                component={`p`}
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-3 dark:text-gray-200 ">
                <label htmlFor="type">Tipo:</label>

                <Field
                  as="select"
                  className="border w-max border-gray-400 dark:focus:bg-gray-700 dark:border-gray-600 p-2 rounded-md outline-none focus:ring ring-blue-600"
                  name="type"
                  id="type"
                >
                  <option value="">Tipo de movimentação</option>
                  <option value="entry">Entrada</option>
                  <option value="exit">Saída</option>
                </Field>
              </div>
              <ErrorMessage
                className="text-sm text-red-500"
                name="type"
                id="type"
                component={`p`}
              />
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="px-5 w-max py-2 mt-5 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 duration-500"
            >
              {isSubmitting ? "Enviando..." : buttonText}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
