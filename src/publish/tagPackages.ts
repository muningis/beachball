import type { PublishBumpInfo } from '../types/BumpInfo';
import { generateTag } from '../git/generateTag';
import { gitFailFast } from 'workspace-tools';
import type { BeachballOptions } from '../types/BeachballOptions';
import type { DeepReadonly } from '../types/DeepReadonly';

function createTag(tag: string, cwd: string): void {
  gitFailFast(['tag', '-a', '-f', tag, '-m', tag], { cwd });
}

/**
 * Create git tags for each changed package, unless the package or repo has opted out of git tags.
 * Also, if git tags aren't disabled for the repo and the overall dist-tag (`options.tag`) has a
 * non-default value (not "latest"), create a git tag for the dist-tag.
 */
export function tagPackages(
  bumpInfo: Pick<
    DeepReadonly<PublishBumpInfo>,
    'modifiedPackages' | 'newPackages' | 'packageInfos' | 'calculatedChangeTypes'
  >,
  options: Pick<BeachballOptions, 'gitTags' | 'path' | 'tag'>
): void {
  const { gitTags, tag: distTag, path: cwd } = options;
  const { modifiedPackages, newPackages, packageInfos, calculatedChangeTypes } = bumpInfo;

  for (const pkg of [...modifiedPackages, ...(newPackages || [])]) {
    const packageInfo = packageInfos[pkg];
    const changeType = calculatedChangeTypes[pkg];
    // Do not tag change type of "none", private packages, or packages opting out of tagging
    if (changeType === 'none' || packageInfo.private || !packageInfo.combinedOptions.gitTags) {
      continue;
    }
    console.log(`Tagging - ${packageInfo.name}@${packageInfo.version}`);
    const generatedTag = generateTag(packageInfo.name, packageInfo.version);
    createTag(generatedTag, cwd);
  }

  if (gitTags && distTag && distTag !== 'latest') {
    console.log(`Tagging - ${distTag}`);
    createTag(distTag, cwd);
  }
}
