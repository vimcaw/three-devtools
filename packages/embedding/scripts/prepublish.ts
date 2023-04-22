import { readFile, writeFile, cp } from 'node:fs/promises';
import { join } from 'node:path';
import { PackageJson } from 'type-fest';
import sortPackageJson from 'sort-package-json';
import { pick } from 'lodash-es';

(async () => {
  const rootPath = '../../';
  const copiedOwnFileNames = ['CHANGELOG.md'];
  const copiedRootFileNames = [
    'README.md',
    'LICENSE',
    'CONTRIBUTING.md',
    'CODE_OF_CONDUCT.md',
    'resource',
  ];
  const devPackageJson = JSON.parse(await readFile('package.json', 'utf8')) as PackageJson;
  const rootPackageJson = JSON.parse(
    await readFile(join(rootPath, 'package.json'), 'utf8')
  ) as PackageJson;
  const prodPackageJsonTemplate = JSON.parse(
    await readFile('package.prod.json', 'utf8')
  ) as PackageJson;

  const prodPackageJson = sortPackageJson({
    ...pick(rootPackageJson, [
      'name',
      'description',
      'keywords',
      'homepage',
      'repository',
      'bugs',
      'author',
      'contributors',
      'license',
    ] satisfies (keyof PackageJson)[]),
    ...prodPackageJsonTemplate,
    ...pick(devPackageJson, ['version'] satisfies (keyof PackageJson)[]),
  });

  await writeFile('dist/package.json', JSON.stringify(prodPackageJson, null, 2), {
    encoding: 'utf8',
  });

  await Promise.all(
    copiedOwnFileNames.map(async fileName => {
      await cp(fileName, `dist/${fileName}`, { recursive: true }).catch();
    })
  );

  await Promise.all(
    copiedRootFileNames.map(async fileName => {
      await cp(join(rootPath, fileName), `dist/${fileName}`, { recursive: true }).catch();
    })
  );
})();
