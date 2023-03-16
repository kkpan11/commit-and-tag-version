import spec from 'conventional-changelog-config-spec/versions/2.1.0/schema.json'

type Defaults = {
  infile: "CHANGELOG.md";
  firstRelease: false;
  sign: false;
  noVerify: false;
  commitAll: false;
  silent: false;
  tagPrefix: "v";
  releaseCount: 1;
  scripts: {};
  skip: {};
  dryRun: false;
  tagForce: false;
  gitTagFallback: true;
  preset: any;
  npmPublishHint: undefined;
} & {
  packageFiles: ['package.json', 'bower.json', 'manifest.json'],
  bumpFiles: ['package.json', 'bower.json', 'manifest.json', 'package-lock.json', 'npm-shrinkwrap.json']
} & {
  [key in keyof typeof spec.properties]: typeof spec.properties[key]["default"]
}

const defaults: Defaults = {
  infile: 'CHANGELOG.md',
  firstRelease: false,
  sign: false,
  noVerify: false,
  commitAll: false,
  silent: false,
  tagPrefix: 'v',
  releaseCount: 1,
  scripts: {},
  skip: {},
  dryRun: false,
  tagForce: false,
  gitTagFallback: true,
  preset: require.resolve('conventional-changelog-conventionalcommits'),
  npmPublishHint: undefined
} as any;

/**
 * Merge in defaults provided by the spec
 */
Object.keys(spec.properties).forEach((propertyKey) => {
  const k: keyof typeof spec.properties = propertyKey as any;
  const property = spec.properties[k]
  // @ts-expect-error - we know that the key exists
  defaults[k] = property.default
})

/**
 * Sets the default for `header` (provided by the spec) for backwards
 * compatibility. This should be removed in the next major version.
 */
defaults.header =
  '# Changelog\n\nAll notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.\n'

defaults.packageFiles = ['package.json', 'bower.json', 'manifest.json']

defaults.bumpFiles = [
  ...defaults.packageFiles,
  'package-lock.json',
  'npm-shrinkwrap.json'
];

export default defaults
