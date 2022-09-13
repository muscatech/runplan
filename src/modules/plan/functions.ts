import { v4 as uuidV4 } from 'uuid';

import type { Plan } from './interfaces';

export function createPlan(name: string): Plan {
  const id = uuidV4();

  return {
    id,
    name,
    items: []
  };
}
