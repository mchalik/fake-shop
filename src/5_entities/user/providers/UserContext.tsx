import {
  createContext, useState, useRef,
  type ComponentType, type PropsWithChildren, type FC
} from 'react';

import { useQuery } from '@tanstack/react-query';
import { match, P } from 'ts-pattern';

import { getAuthMe, type User } from '@/entities/user';
import { Backdrop } from '@/shared/components/Backdrop';

export const UserContext = createContext<Partial<{
  user: User,
   setUser: (value: User) => void
     } >>({});

export const UserProvider: FC<PropsWithChildren & { loginForm: ComponentType }> = ({ children, loginForm: LoginForm }) => {
  const [userUpdated, setUser] = useState<User | null>(null);
  const token = useRef(localStorage.getItem('ACCESS_TOKEN') || sessionStorage.getItem('ACCESS_TOKEN'));

  const { data: initialUser, isLoading } = useQuery({
    queryKey: [],
    queryFn: () => {
      return getAuthMe(token.current!);

    },
    enabled: Boolean(token.current),
    retry: (failureCount: number, error: { cause: { status: number } }) => {
      if (error.cause.status === 401) {
        return false;
      }

      return failureCount < 3;
    }
  });

  const user = userUpdated || initialUser;

  return (
    <UserContext value={{ user, setUser }}>
      {match({ isLoading, user })
        .with({ isLoading: true }, () => <Backdrop />)
        .with({ user: P.nullish }, () => <LoginForm />)
        .otherwise(() => children)
      }
    </UserContext>
  );
};