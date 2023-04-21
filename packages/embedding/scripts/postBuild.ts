import { readFile, writeFile } from 'node:fs/promises';
import { PackageJson } from 'type-fest';
import sortPackageJson from 'sort-package-json';
import { pick } from 'lodash-es';

(async () => {
  const devPackageJson = JSON.parse(await readFile('package.json', 'utf8')) as PackageJson;
  const rootPackageJson = JSON.parse(await readFile('../../package.json', 'utf8')) as PackageJson;
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
})();
