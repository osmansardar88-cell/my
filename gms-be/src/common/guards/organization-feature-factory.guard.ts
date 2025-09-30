import { Injectable, CanActivate, ExecutionContext, ForbiddenException, SetMetadata } from '@nestjs/common';

export const RequiredFeature = (feature: string) => SetMetadata('requiredFeature', feature);

export function OrganizationFeatureGuardFactory(feature: string) {
  @Injectable()
  class OrgFeatureGuard implements CanActivate {
    constructor(private readonly prisma: any) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const orgId = request.user?.organizationId || request.headers['x-organization-id'] || request.body.organizationId || request.query.organizationId;
      if (!orgId) throw new ForbiddenException('Organization ID missing');
      const org = await this.prisma.organization.findUnique({ where: { id: orgId } });
      if (!org) throw new ForbiddenException('Organization not found');
      if (!org.features?.includes(feature)) {
        throw new ForbiddenException(`Organization does not have permission for feature: ${feature}`);
      }
      return true;
    }
  }
  return OrgFeatureGuard;
}
