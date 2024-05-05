import React, { FC, ReactNode } from "react";
import Card from "../Card";

type GenericFormProps = {
  title: string;
  beforeFormChildren?: ReactNode;
  formChildren: ReactNode;
  afterFormChildren?: ReactNode;
  onSubmit: (inputMap: Map<string, string>) => void;
};

const GenericForm: FC<GenericFormProps> = ({
  beforeFormChildren,
  formChildren,
  afterFormChildren,
  onSubmit,
  title,
}) => {
  const preOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = e.currentTarget as HTMLFormElement;
    const elements = formElement.elements;

    const inputMap = new Map();
    for (const element of elements) {
      if (!element.hasAttribute("name")) {
        continue;
      }

      const input = element as HTMLInputElement;
      inputMap.set(element.getAttribute("name"), input.value);
    }

    onSubmit(inputMap);
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
          {formChildren}
        </form>
        {afterFormChildren}
      </Card>
    </div>
  );
};

export default GenericForm;
