import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let reflector: Reflector;
  let guard: RolesGuard;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector); // Proporciona el mock de Reflector aquí
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
