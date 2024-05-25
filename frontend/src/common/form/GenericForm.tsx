import React, { FC, ReactNode, useState } from "react";
import Card from "../Card";

type GenericFormProps = {
  title: string;
  beforeFormChildren?: ReactNode;
  formChildren: ReactNode;
  afterFormChildren?: ReactNode;
  onSubmit: (inputMap: Map<string, string>) => void;
};

type FormInputFunctionalComponentProps = {
  addFormValidators: (formFieldName: string, validate: () => boolean) => void;
};

const GenericForm: FC<GenericFormProps> = ({
  beforeFormChildren,
  formChildren,
  afterFormChildren,
  onSubmit,
  title,
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

      console.log(formFieldName, validate, validators);

      // TODO: Figure out why validate() needs to be called twice for it to work properly.
      // validate();
      isFormValid &&= validate();
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

  const renderFormChildren = () => {
    if (!React.isValidElement(formChildren)) {
      return formChildren;
    }

    const formInputs: React.FunctionComponentElement<FormInputFunctionalComponentProps>[] =
      formChildren.props?.children;

    // Inject addValidator function as props to all formChildren
    return formInputs.map(
      (
        formInput: React.FunctionComponentElement<FormInputFunctionalComponentProps>,
        idx,
      ) => {
        return React.cloneElement(formInput, {
          key: idx,
          addFormValidators: addFormValidators,
        });
      },
    );
  };

  return (
    <div className="flex flex-col lg:justify-center lg:items-center lg:w-full lg:h-screen">
      <Card customStyles="items-center w-full lg:w-2/6 h-fit p-7">
        <h1 className="mr-auto text-3xl font-bold">{title}</h1>
        {beforeFormChildren}
        <form
          className="w-full"
          onSubmit={(e: React.FormEvent) => preOnSubmit(e)}
        >
          {renderFormChildren()}
        </form>
        {afterFormChildren}
      </Card>
    </div>
  );
};

export default GenericForm;
