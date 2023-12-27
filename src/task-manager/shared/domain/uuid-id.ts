import { Id } from './id';
import { v4 as uuidv4 } from 'uuid';

export class UuidId extends Id {
  static next(): UuidId {
    return new UuidId(uuidv4());
  }

  static fromPrimitive(value: string) {
    return new UuidId(value);
  }
}
