import { UuidId } from '../../../src/productivity-manager/shared/domain/uuid-id';

describe('uuid', () => {
  it('should be generate uuid', () => {
    let uuid = UuidId.next();
    expect(uuid).not.toBeNull();
  });
});
