import semver from 'semver';
import { performBump } from '../bump/performBump';
import { setDependentVersions } from '../bump/setDependentVersions';
import { listPackageVersions } from '../packageManager/listPackageVersions';
import { publishToRegistry } from '../publish/publishToRegistry';
import { BeachballOptions } from '../types/BeachballOptions';
import { validate } from '../validation/validate';

export async function canary(options: BeachballOptions): Promise<void> {
  const repoInfo = validate(options, { checkChangeNeeded: false });
  let bumpInfo = repoInfo.bumpInfo!;

  // TODO: Previously this was called oldPackageInfo but was then passed to bumpInPlace, which mutated it...
  // If bumping based on the new versions was the intended behavior, this line should be switched
  // to use bumpInfo.packageInfos instead.
  const oldPackageInfo = repoInfo.packageInfos;

  options.keepChangeFiles = true;
  options.generateChangelog = false;

  if (options.all) {
    bumpInfo = {
      ...bumpInfo,
      modifiedPackages: new Set([...bumpInfo.modifiedPackages, ...Object.keys(bumpInfo.packageInfos)]),
    };
  }

  const packageVersions = await listPackageVersions([...bumpInfo.modifiedPackages], options);

  for (const pkg of bumpInfo.modifiedPackages) {
    let newVersion = oldPackageInfo[pkg].version;

    do {
      newVersion = semver.inc(newVersion, 'prerelease', options.canaryName || 'canary')!;
    } while (packageVersions[pkg].includes(newVersion));

    bumpInfo.packageInfos[pkg].version = newVersion;
  }

  setDependentVersions(bumpInfo, options);

  await performBump(bumpInfo, options);

  if (options.publish) {
    await publishToRegistry(bumpInfo, options);
  } else {
    console.log('Skipping publish');
  }
}
