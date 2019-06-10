import { bump, BumpInfo } from './bump';
import { packagePublish } from './packageManager';
import path from 'path';
import { git, revertLocalChanges } from './git';

interface PublishArgs {
  _: string[];
  branch?: string;
  tag?: string;
  registry?: string;
}

export function publish(args: PublishArgs, cwd: string) {
  const branch = args.branch || 'master';
  const registry = args.registry || 'https://registry.npmjs.org';

  // checkout publish branch
  const publishBranch = 'publish_' + String(new Date().getTime());
  git(['checkout', '-b', publishBranch]);

  // Step 1. Bump + npm publish
  // bump the version
  console.log('Bumping version for npm publish');
  const bumpInfo = bump(cwd);

  // npm / yarn publish
  Object.keys(bumpInfo.packageChangeTypes).forEach(pkg => {
    const packageInfo = bumpInfo.packageInfos[pkg];
    console.log(`Publishing - ${packageInfo.name}@${packageInfo.version}`);
    packagePublish(path.dirname(packageInfo.packageJsonPath), registry);
  });

  // Step 2.
  // - For repos with no remotes: just commit and move on!
  // - For repos with remotes: reset, fetch latest from origin/master (to ensure less chance of conflict), then bump again + commit
  const remoteResult = git(['remote', 'get-url', 'origin']);

  if (!remoteResult.success) {
    console.log('Remote "origin" not found. Committing changes locally.');
    const mergePublishBranchResult = mergePublishBranch(publishBranch, branch, cwd);

    if (!mergePublishBranchResult.success) {
      console.error('CRITICAL ERROR: merging to target has failed!');
      displayManualRecovery(bumpInfo);
      process.exit(1);
    }
  } else {
    const remote = 'origin';

    console.log('Reverting and fetching from remote');

    // pull in latest from origin branch
    revertLocalChanges(cwd);
    git(['fetch', remote], { cwd });
    const mergeResult = git(['merge', '-X', 'theirs', `${remote}/${branch}`], { cwd });
    if (!mergeResult.success) {
      console.error('CRITICAL ERROR: pull from master has failed!');
      console.error(mergeResult.stderr);
      displayManualRecovery(bumpInfo);
      process.exit(1);
    }

    // bump the version
    console.log('Bumping the versions for git push');
    bump(cwd);

    // checkin
    const mergePublishBranchResult = mergePublishBranch(publishBranch, branch, cwd);

    if (!mergePublishBranchResult.success) {
      console.error('CRITICAL ERROR: merging to target has failed!');
      displayManualRecovery(bumpInfo);
      process.exit(1);
    }

    // Step 3. Push to remote
    // push
    console.log(`pushing to ${remote}/${branch}`);
    git(['push', remote, branch]);
  }
}

function displayManualRecovery(bumpInfo: BumpInfo) {
  console.error('Published versions to npm registry are not merged back to git. Manually update these package and versions:');

  Object.keys(bumpInfo.packageChangeTypes).forEach(pkg => {
    const packageInfo = bumpInfo.packageInfos[pkg];
    console.error(`- ${packageInfo.name}@${packageInfo.version}`);
  });
}

function mergePublishBranch(publishBranch: string, branch: string, cwd: string) {
  git(['add', '.'], { cwd });
  git(['commit', '-m', '<beachball> applying package updates'], { cwd });
  git(['checkout', branch], { cwd });

  const mergePublishBranchResult = git(['merge', '-X', 'ours', publishBranch], { cwd });
  if (mergePublishBranchResult.success) {
    git(['branch', '-D', publishBranch]);
  }

  return mergePublishBranchResult;
}
