import { listPackageVersions } from '../packageManager/listPackageVersions';
import type { NpmOptions } from '../types/NpmOptions';
import { formatList } from '../logging/format';
import type { PackageInfos } from '../types/PackageInfo';

/**
 * Validate each package version being published doesn't already exist in the registry.
 */
export async function validatePackageVersions(
  packagesToValidate: string[],
  packageInfos: PackageInfos,
  options: NpmOptions
): Promise<boolean> {
  console.log('\nValidating new package versions...');

  const publishedVersions = await listPackageVersions(packagesToValidate, options);

  const okVersions: string[] = [];
  const errorVersions: string[] = [];

  for (const pkg of packagesToValidate) {
    const packageInfo = packageInfos[pkg];
    const versionSpec = `${packageInfo.name}@${packageInfo.version}`;
    if (publishedVersions[pkg].includes(packageInfo.version)) {
      errorVersions.push(versionSpec);
    } else {
      okVersions.push(versionSpec);
    }
  }

  if (okVersions.length) {
    // keep the original order here to show what order they'll be published in
    console.log(`\nPackage versions are OK to publish:\n${formatList(okVersions)}`);
  }
  if (errorVersions.length) {
    console.error(
      `\nERROR: Attempting to publish package versions that already exist in the registry:\n` +
        formatList(errorVersions.sort())
    );
    return false;
  }

  return true;
}
