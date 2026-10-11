import {
  type ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../auth/authentication/decorators/public.decorator";

const API_PREFIXES = [
  "authentication",
  "user-permissions",
  "user",
  "division",
  "extraction",
  "extracted-document-queue",
  "outgoing-documents",
];

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(@Inject(Reflector) private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isStaticRequest =
      (request.method === "GET" || request.method === "HEAD") &&
      !API_PREFIXES.some(
        (prefix) =>
          request.path === `/${prefix}` || request.path.startsWith(`/${prefix}/`),
      );

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic || isStaticRequest) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TReturn = unknown>(
    err: unknown,
    user: unknown,
    _info: unknown,
    _context: ExecutionContext,
  ): TReturn {
    if (err || !user) {
      throw err ?? new UnauthorizedException("Invalid or missing access token");
    }

    return user as TReturn;
  }
}
