import React from "react";
import { Form } from "@formio/react";

const FormComponent = () => {
  const formSchema = {
    components: [
      {
        type: "textfield",
        key: "name",
        label: "Name",
        placeholder: "Enter your name",
        input: true,
      },
      {
        type: "email",
        key: "email",
        label: "Email",
        placeholder: "Enter your email",
        input: true,
      },
      {
        type: "button",
        action: "submit",
        label: "Submit",
        theme: "primary",
      },
    ],
  };

  const handleSubmit = (submission) => {
    console.log("Form submitted:", submission.data);
  };

  return (
    <div>
      <h1>My Form</h1>
      <Form form={formSchema} onSubmit={(submission) => handleSubmit(submission)} />
    </div>
  );
};

export default FormComponent;
