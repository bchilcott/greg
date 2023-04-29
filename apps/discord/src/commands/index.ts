import type { SlashCommand } from '~/commands/types';
import Create from './create';
import Link from './link';

const Commands: SlashCommand[] = [Create, Link];

export default Commands;
