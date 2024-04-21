import React, { FC, ReactNode } from "react";
import Card from "../Card";

type GenericFormProps = {
  title: string;
  beforeFormChildren?: ReactNode;
  formChildren: ReactNode;
  afterFormChildren?: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
};

const GenericForm: FC<GenericFormProps> = ({
  beforeFormChildren,
  formChildren,
  afterFormChildren,
  onSubmit,
  title,
}) => {
  return (
    <div className="flex flex-col lg:justify-center lg:items-center lg:w-full lg:h-screen">
      <Card customStyles="items-center w-full lg:w-2/6 h-fit p-7">
        <h1 className="mr-auto text-3xl font-bold">{title}</h1>
        {beforeFormChildren}
        <form className="w-full" onSubmit={onSubmit}>
          {formChildren}
        </form>
        {afterFormChildren}
      </Card>
    </div>
  );
};

export default GenericForm;
