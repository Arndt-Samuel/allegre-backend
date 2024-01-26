import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getUserByRequest = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user;
  },
);

export const LoggedUser = () => getUserByRequest();
