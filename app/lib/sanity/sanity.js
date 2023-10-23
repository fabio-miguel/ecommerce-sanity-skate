import {createClient} from '@sanity/client';

export const projectId = 'e56w00iw';
export const dataset = 'production';
const apiVersion = '2023-03-30';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
