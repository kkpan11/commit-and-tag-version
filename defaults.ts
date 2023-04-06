import spec from "conventional-changelog-config-spec/versions/2.1.0/schema.json";

type Defaults = Readonly<
  {
    infile: string;
    firstRelease: boolean;
    sign: boolean;
    noVerify: boolean;
    commitAll: boolean;
    silent: boolean;
    tagPrefix: string;
    releaseCount: number;
    scripts: {
      prerelease?: string;
      prebump?: string;
      postbump?: string;
      prechangelog?: string;
      postchangelog?: string;
      precommit?: string;
      postcommit?: string;
      pretag?: string;
      posttag?: string;
    };
    skip: {
      bump?: boolean;
      changelog?: boolean;
      commit?: boolean;
      tag?: boolean;
    };
    dryRun: boolean;
    tagForce: boolean;
    gitTagFallback: boolean;
    preset: string;
    npmPublishHint: string | undefined;
    packageFiles: readonly string[];
    bumpFiles: readonly string[];
  } & {
    [key in keyof typeof spec.properties]: typeof spec.properties[key]["default"];
  }
>;

const defaults = {
  infile: "CHANGELOG.md",
  firstRelease: false,
  sign: false,
  noVerify: false,
  commitAll: false,
  silent: false,
  tagPrefix: "v",
  releaseCount: 1,
  scripts: {},
  skip: {},
  dryRun: false,
  tagForce: false,
  gitTagFallback: true,
  preset: require.resolve('conventional-changelog-conventionalcommits'),
  npmPublishHint: undefined,
  /**
   * Sets the default for `header` (provided by the spec) for backwards
   * compatibility. This should be removed in the next major version.
   */
  header:
    "# Changelog\n\nAll notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.\n",
  packageFiles: ["package.json", "bower.json", "manifest.json"],
  bumpFiles: [
    "package.json",
    "bower.json",
    "manifest.json",
    "package-lock.json",
    "npm-shrinkwrap.json",
  ],
} as const satisfies Partial<Readonly<Defaults>>;

/**
 * Merge in defaults provided by the spec
 */
Object.keys(spec.properties).forEach((propertyKey) => {
  const k: keyof typeof spec.properties =
    propertyKey as keyof typeof spec.properties;
  const property = spec.properties[k];
  // @ts-expect-error - we know that the key exists
  defaults[k] = property.default;
});

export default defaults as any as Defaults;
