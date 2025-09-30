import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationFeatureGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const orgId = request.user?.organizationId || request.headers['x-organization-id'] || request.body.organizationId || request.query.organizationId;
    const requiredFeature = Reflect.getMetadata('requiredFeature', context.getHandler());
    if (!requiredFeature) return true;
    if (!orgId) throw new ForbiddenException('Organization ID missing');
    const org = await this.prisma.organization.findUnique({ where: { id: orgId } });
    if (!org) throw new ForbiddenException('Organization not found');
    if (!org.features?.includes(requiredFeature)) {
      throw new ForbiddenException(`Organization does not have permission for feature: ${requiredFeature}`);
    }
    return true;
  }
}
