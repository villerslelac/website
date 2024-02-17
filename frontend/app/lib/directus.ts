import { createDirectus, rest } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055').with(
  rest({
    onRequest: (options) => ({ ...options, cache: 'no-store' }),
  }),
);

export default directus;
