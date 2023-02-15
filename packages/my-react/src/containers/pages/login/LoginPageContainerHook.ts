import { ChangeEvent, useState, MouseEvent } from 'react';

export interface ILoginPageContainerState {
  id?: string;
  password?: string;
}

export const LoginPageContainerHook = () => {
  const [state, updateState] = useState<ILoginPageContainerState>({
    id: '',
    password: '',
  });

  const setState = (item: ILoginPageContainerState = {}) => (
    updateState((prev) => ({ ...prev, ...item }))
  );

  const self = {
    state,
    setState,

    onChangeId: (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value: id },
      } = event;
      setState({ id });
    },

    onChangePassword: (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value: password },
      } = event;
      setState({ password });
    },

    onClickLogin: async (_: MouseEvent<HTMLButtonElement>) => {
      const { id, password } = state;

      const response = await fetch('/auth/local', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          username: id,
          password,
        }),
      });

      if (response.redirected) {
        window.location.href = response.url;
      }
    },
  };

  return self;
};
