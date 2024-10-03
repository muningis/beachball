import { performBump } from '../bump/performBump';
import { BeachballOptions } from '../types/BeachballOptions';
import { BumpInfo } from '../types/BumpInfo';
import { validate } from '../validation/validate';

/**
 * Run validation and bump versions
 * @returns bump info for testing
 */
export async function bump(options: BeachballOptions): Promise<BumpInfo | undefined> {
  const bumpInfo = validate(options, { checkChangeNeeded: false }).bumpInfo!;

  return performBump(bumpInfo, options);
}
