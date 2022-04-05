module.exports = {
  entryPoints: ['src/index.ts'],
  out: 'docs',
  includes: 'manual',
  categorizeByGroup: true,
  readme: 'manual/README.md',
  pluginPages: {
    source: 'manual',
    pages: [
      {
        title: 'Guides',
        childrenDir: 'guide',
        children: [
          { title: 'Installation', source: 'installation.md' },
          { title: 'Getting started', source: 'getting-started.md' },
          { title: 'IANA Timezones', source: 'iana-timezones.md' }
        ]
      },
      { title: 'Changelog', source: '../CHANGELOG.md' }
    ]
  }
}
