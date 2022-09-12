import fs from 'fs-extra';
import minimatch from 'minimatch';
import path from 'path';
import { getWorkspaces, listAllTrackedFiles, findPackageRoot, findProjectRoot } from 'workspace-tools';
import { BeachballOptions } from '../types/BeachballOptions';
import { PackageInfo, PackageInfos } from '../types/PackageInfo';
import { infoFromPackageJson } from './infoFromPackageJson';

/**
 * Get a mapping from package name to package info for all packages that are in scope in the workspace
 * (reading from package.json files).
 */
export function getPackageInfos(options: Pick<BeachballOptions, 'path' | 'ignorePatterns'>): PackageInfos {
  const { path: cwd, ignorePatterns } = options;
  const projectRoot = findProjectRoot(cwd);
  const packageRoot = findPackageRoot(cwd);

  const ignoreRegex = ignorePatterns?.map(pattern => new minimatch.Minimatch(pattern, { matchBase: true }));
  const isPackageIgnored = (info: PackageInfo) => {
    if (!ignoreRegex) return false;
    const comparePath = path.relative(cwd, info.packageJsonPath);
    return ignoreRegex.some(pattern => pattern.match(comparePath));
  };

  return (
    (projectRoot && getPackageInfosFromWorkspace(projectRoot, isPackageIgnored)) ||
    (projectRoot && getPackageInfosFromNonWorkspaceMonorepo(projectRoot, isPackageIgnored)) ||
    (packageRoot && getPackageInfosFromSingleRepo(packageRoot)) ||
    {}
  );
}

function getPackageInfosFromWorkspace(projectRoot: string, isPackageIgnored: (pkg: PackageInfo) => boolean) {
  try {
    const packageInfos: PackageInfos = {};

    // first try using the workspace provided packages (if available)
    const workspaceInfo = getWorkspaces(projectRoot);

    if (workspaceInfo && workspaceInfo.length > 0) {
      workspaceInfo.forEach(info => {
        const { path: packagePath, packageJson } = info;
        const packageJsonPath = path.join(packagePath, 'package.json');

        try {
          const packageInfo = infoFromPackageJson(packageJson, packageJsonPath);
          if (!isPackageIgnored(packageInfo)) {
            packageInfos[packageJson.name] = packageInfo;
          }
        } catch (e) {
          // Pass, the package.json is invalid
          console.warn(`Invalid package.json file detected ${packageJsonPath}: `, e);
        }
      });

      return packageInfos;
    }
  } catch (e) {
    // not a recognized workspace from workspace-tools
  }
}

function getPackageInfosFromNonWorkspaceMonorepo(projectRoot: string, isPackageIgnored: (pkg: PackageInfo) => boolean) {
  const packageJsonFiles = listAllTrackedFiles(['**/package.json', 'package.json'], projectRoot);

  const packageInfos: PackageInfos = {};

  if (packageJsonFiles && packageJsonFiles.length > 0) {
    packageJsonFiles.forEach(packageJsonPath => {
      let hasDuplicatePackage = false;
      try {
        const packageJsonFullPath = path.join(projectRoot, packageJsonPath);
        const packageJson = fs.readJSONSync(packageJsonFullPath);
        const packageInfo = infoFromPackageJson(packageJson, packageJsonFullPath);
        if (!isPackageIgnored(packageInfo)) {
          if (packageInfos[packageJson.name]) {
            hasDuplicatePackage = true;
            throw new Error(
              `Two packages in different workspaces have the same name. Please rename one of these packages:\n- ${
                packageInfos[packageJson.name].packageJsonPath
              }\n- ${packageJsonPath}`
            );
          }
          packageInfos[packageJson.name] = infoFromPackageJson(packageJson, packageJsonFullPath);
        }
      } catch (e) {
        if (hasDuplicatePackage) {
          throw e; // duplicate package error should propagate
        }
        // Pass, the package.json is invalid
        console.warn(`Invalid package.json file detected ${packageJsonPath}: `, e);
      }
    });

    return packageInfos;
  }
}

function getPackageInfosFromSingleRepo(packageRoot: string) {
  const packageInfos: PackageInfos = {};
  const packageJsonFullPath = path.resolve(packageRoot, 'package.json');
  const packageJson = fs.readJSONSync(packageJsonFullPath);
  packageInfos[packageJson.name] = infoFromPackageJson(packageJson, packageJsonFullPath);
  return packageInfos;
}
