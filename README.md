



![Hero Image Placeholder](path/to/hero-image.jpg)

## dirl 
`dirl` is a JavaScript library designed to simplify interactions with the local file system. By abstracting away boilerplate code, managing file and directory operations becomes seamless for developers. The library helps in avoiding complex syntax, excessive loops, and extensive error handling by providing straightforward methods for common tasks such as acquiring directory information, moving and copying files, and flattening directory structures.

## Installation
To install `dirl` via npm, run the following command in your project directory:
```bash
npm install dirl
```

## Usage
To use `dirl`, first import it into your JavaScript file:

```js
import dirl from 'dirl';
```

The `dirl` class is instantiated internally with the current working directory, meaning you don't need to create an instance. You can directly access its methods. 

### method groups
dirl consists of 4 main groups of methods: `get`, `move`, `copy`, and `flatten`.

`get`  Acquires information about the directory tree such as file paths, directory sizes, and duplicate files.

`move`  Moves a directory tree from one location to another.

`copy`  Copies a directory tree from one location to another.

`flatten`  Copies files residing under a directory tree into a single directory.

### Paths 
Both absolute and relative paths are accepted for the directory parameter.

>[!NOTE]
>If you use relative paths, the current working directory is used as the base path.

### Filters 
`filters` is an optional parameter that allows users to limit the effect of dirl method only to the selected files and directories.  Filtering works by matching the `filters` values against file paths and directory paths underneath the target directory.  Paths that don't match the `filters` values are scoped out of dirl method and only the matching paths are processed.

filters parameter takes the form of following object: `{dir: string, file: string, ext: string}`

`dir` matches against directory path.

`file` matches against filename without its extension.

`ext` matches against file extension, excluding the dot.

>[!TIP]
>You can write regular expressions for `dir`, `file`, and `ext` parameters.  Passed string is converted to regular expression internally.
>:white_check_mark: `{file: "^test"}`
>:x: `{file: "/^test/"}`


>[!WARNING]
> When 
`filters` parameters work in AND not OR.  When multiple filters are passed, all filters must match for the path to be included in the result.
>EXAMPLE:
>file path: `/my-directory/test.txt`
>filters A: `{file: "test", ext: "txt"}`
>result A: path is included in the result because both filters match.
>filters B: `{file: "test", ext: "md"}`
>result B: path is not included in the result because not all filters match.

### System Files
System generated files like `.DS_Store` and `Thumbs.db` are excluded from the results by default.  Those files are excluded from count and size calculations and move/copy/flatten operations.

## Methods
### dirl.get
The `dirl.get` methods are used to acquire information about the directory tree.

#### `dirl.get.filePaths(rootDir: string, filters: Filters = {})`
- **Parameters**:
  - `rootDir`: The root directory to search for files.
  - `filters`: Regular expression strings that match against directory path, filename, and file extension for filtering.
- **Returns**: A promise that resolves to an array of file paths.
  
Example:
```js
const filePaths = await dirl.get.filePaths('./my-directory', { file: /\.js$/ });
console.log(filePaths);
```

#### `dirl.get.dirPaths(rootDir: string, filters: Filters = {})`
- **Parameters**: Same as above.
- **Returns**: A promise that resolves to an array of directory paths.

Example:
```js
const dirPaths = await dirl.get.dirPaths('./my-directory');
console.log(dirPaths);
```

#### `dirl.get.fileCount(rootDir: string, filters: Filters = {})`
- **Parameters**: Same as above.
- **Returns**: A promise that resolves to the number of files.

Example:
```js
const fileCount = await dirl.get.fileCount('./my-directory');
console.log(`Number of files: ${fileCount}`);
```

#### `dirl.get.fileSizes(rootDir: string, filters: Filters = {}, mode: "int" | "str" = "str")`
- **Parameters**:
  - `rootDir`: The root directory.
  - `filters`: Same as above.
  - `mode`: Defines the return type of file sizes ('int' for bytes, 'str' for human-readable strings).
- **Returns**: A promise that resolves to an array of objects with file path and size properties.

Example:
```js
const fileSizes = await dirl.get.fileSizes('./my-directory', {}, 'str');
console.log(fileSizes);
```

#### `dirl.get.dirSizes(rootDir: string, filters: Filters = {}, mode: "int" | "str" = "str")`
- **Parameters**: Same as above.
- **Returns**: A promise that resolves to an array of objects with directory path and size properties.

Example:
```js
const dirSizes = await dirl.get.dirSizes('./my-directory');
console.log(dirSizes);
```

#### `dirl.get.duplicateFiles(rootDir: string, filters: Filters = {})`
- **Parameters**: Same as above.
- **Returns**: A promise that resolves to an array of duplicate paths, with each element being an array of duplicate file paths.

Example:
```js
const duplicates = await dirl.get.duplicateFiles('./my-directory');
console.log(duplicates);
```

### dirl.move
The `dirl.move` methods are for moving files and directories.

#### `dirl.move.overwrite(srcDir: string, dstDir: string, filters: Filters = {})`
- **Parameters**: 
  - `srcDir`: The source directory.
  - `dstDir`: The destination directory.
  - `filters`: Same as above.
- **Returns**: A promise that resolves to move operation results.

Example:
```js
const moveResults = await dirl.move.overwrite('./source', './destination');
console.log(moveResults);
```

#### `dirl.move.diff(srcDir: string, dstDir: string, filters: Filters = {})`
- **Parameters**: Same as above.
- **Returns**: A promise that resolves to move operation results.

Example:
```js
const moveDiffResults = await dirl.move.diff('./source', './destination');
console.log(moveDiffResults);
```

#### `dirl.move.ifNew(srcDir: string, dstDir: string, filters: Filters = {})`
- **Parameters**: Same as above.
- **Returns**: A promise that resolves to move operation results only for newer files.

Example:
```js
const moveIfNewResults = await dirl.move.ifNew('./source', './destination');
console.log(moveIfNewResults);
```

### dirl.copy
The `dirl.copy` methods are for copying files and directories.

#### `dirl.copy.overwrite(srcDir: string, dstDir: string, filters: Filters = {})`
- **Parameters**: Same as move methods.
- **Returns**: A promise that resolves to copy operation results.

Example:
```js
const copyResults = await dirl.copy.overwrite('./source', './destination');
console.log(copyResults);
```

#### `dirl.copy.diff(srcDir: string, dstDir: string, filters: Filters = {})`
- **Parameters**: Same as above.
- **Returns**: A promise that resolves to copy operation results.

Example:
```js
const copyDiffResults = await dirl.copy.diff('./source', './destination');
console.log(copyDiffResults);
```

#### `dirl.copy.ifNew(srcDir: string, dstDir: string, filters: Filters = {})`
- **Parameters**: Same as above.
- **Returns**: A promise that resolves to copy operation results only for newer files.

Example:
```js
const copyIfNewResults = await dirl.copy.ifNew('./source', './destination');
console.log(copyIfNewResults);
```

### dirl.flatten
The `dirl.flatten` methods are for flattening a directory tree.

#### `dirl.flatten.all(srcDir: string, dstDir: string, separator: string = "_", filters: Filters = {})`
- **Parameters**: 
  - `srcDir`: The source directory.
  - `dstDir`: The destination directory.
  - `separator`: The separator for flattened names, default is "_" (underscore).
  - `filters`: Same as above.
- **Returns**: A promise that resolves to the copy operation results.

Example:
```js
const flattenResults = await dirl.flatten.all('./source', './flattened', '_');
console.log(flattenResults);
```

#### `dirl.flatten.unique(srcDir: string, dstDir: string, separator: string = "_", filters: Filters = {})`
- **Parameters**: Same as above.
- **Returns**: A promise that resolves to the copy operation results excluding duplicate files.

Example:
```js
const flattenUniqueResults = await dirl.flatten.unique('./source', './flattened', '_');
console.log(flattenUniqueResults);
```
