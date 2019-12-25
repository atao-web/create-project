import { createProject } from './main';
import { fetchOptionsFrom } from './config';

export async function cli(args) {
  const options = await fetchOptionsFrom(args);
  await createProject(options);
}
