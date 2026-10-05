# Configuration Overview

The configuration of releaseasy is very simple. You only need to export a configuration object in the configuration file, and the object consists of the following properties:

- `increments` - An array containing version increment types
- `distTags` - An array representing npm dist-tags
- `git` - An object for Git-related configuration
- `hooks` - An object for configuring hook lifecycles
