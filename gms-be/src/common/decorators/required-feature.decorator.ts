import { SetMetadata } from '@nestjs/common';

export const RequiredFeature = (feature: string) => SetMetadata('requiredFeature', feature);
