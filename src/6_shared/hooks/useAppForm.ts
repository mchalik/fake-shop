import { useForm, type FieldValues } from 'react-hook-form';

export const useAppForm = <Props extends FieldValues>() => {
  const {
    register: registerBase,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Props>();

  type RegisterParams = Parameters<typeof registerBase>;

  const register = (name: RegisterParams[0], rules?: RegisterParams[1]) => ({
    ...registerBase(name, rules),
    error: !!errors[name],
    helperText: errors[name]?.message?.toString() || ' '
  });

  return {
    register,
    handleSubmit,
    reset
  };
};