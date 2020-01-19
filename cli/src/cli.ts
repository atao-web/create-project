import { fetchOptionsFrom } from './config';
import { createProject } from './main';

export async function cli(args) {
    const options = await fetchOptionsFrom(args);
    await createProject(options);
}
