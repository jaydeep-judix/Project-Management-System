export type AuthFormProps = React.ComponentProps<"div"> & {
  type: "login" | "register";
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};
