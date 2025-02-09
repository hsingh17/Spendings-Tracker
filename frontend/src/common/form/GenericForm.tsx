import React, { FC, ReactNode, useState } from "react";
import Card from "../Card";

type GenericFormProps = {
  title: string;
  beforeFormChildren?: ReactNode;
  formChildren: ReactNode;
  afterFormChildren?: ReactNode;
  wrapperClassName?: string;
  cardClassName?: string;
  overrideClassName?: boolean;
  formClassName?: string;
  onSubmit: (inputMap: Map<string, string>) => void;
};

type FormInputFunctionalComponentProps = {
  addformvalidators: (formFieldName: string, validate: () => boolean) => void;
};

const GenericForm: FC<GenericFormProps> = ({
  beforeFormChildren,
  formChildren,
  afterFormChildren,
  title,
  wrapperClassName,
  cardClassName,
  formClassName,
  overrideClassName = false,
  onSubmit,
}) => {
  const [validators, setValidators] = useState<Map<string, () => boolean>>(
    new Map(),
  );

  const preOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = e.currentTarget as HTMLFormElement;
    const elements = formElement.elements;
    const inputMap = new Map();
    let isFormValid = true;

    for (const element of elements) {
      if (!element.hasAttribute("name")) {
        continue;
      }

      const input = element as HTMLInputElement;
      // ! because TS saying can be null but check is done above
      const formFieldName = element.getAttribute("name")!;
      const validate = validators.get(formFieldName);
      inputMap.set(formFieldName, input.value);

      // Nothing to validate... continue on
      if (!validate) {
        continue;
      }

      // Can't do inline (e.g: isFormValid &&= validate()) because of short-circuting.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment
      // Basically if LHS is false, it will never evaluate the right
      const valid = validate();
      isFormValid &&= valid;
    }

    if (isFormValid) {
      onSubmit(inputMap);
    }
  };

  const addFormValidators = (
    formFieldName: string,
    validate: () => boolean,
  ) => {
    setValidators((prev) => prev.set(formFieldName, validate));
  };

  const injectPropsAndRender = () => {
    if (!React.isValidElement(formChildren)) {
      return formChildren;
    }

    let formInputs: React.FunctionComponentElement<FormInputFunctionalComponentProps>[] =
      formChildren.props?.children;

    if (!Array.isArray(formInputs)) {
      formInputs = [formInputs];
    }

    // Inject addValidator function as props to all formChildren
    return formInputs.map(
      (
        formInput: React.FunctionComponentElement<FormInputFunctionalComponentProps>,
        idx,
      ) => {
        return React.cloneElement(formInput, {
          key: idx,
          addformvalidators: addFormValidators,
        });
      },
    );
  };

  return (
    <div
      className={`flex flex-col lg:justify-center lg:items-center lg:w-full ${wrapperClassName}`}
    >
      <Card
        className={
          overrideClassName
            ? cardClassName
            : `items-center w-full h-fit p-7 ${cardClassName}`
        }
      >
        <h1 className="mr-auto text-3xl font-bold">{title}</h1>
        {beforeFormChildren}
        <form
          className={`w-full ${formClassName}`}
          onSubmit={(e: React.FormEvent) => preOnSubmit(e)}
        >
          {injectPropsAndRender()}
        </form>
        {afterFormChildren}
      </Card>
    </div>
  );
};

export default GenericForm;
