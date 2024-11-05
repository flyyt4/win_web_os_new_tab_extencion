import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { createFs } from "indexeddb-fs";
import path from "../path";

class Fs {
  private container: WebContainer | null = null;
  private fsDb = createFs({
    databaseName: "os-fs",
    databaseVersion: 2,
    rootDirectoryName: "root",
    objectStoreName: "os-fs",
  });
  public existContainer: boolean = false;
  constructor(
    container: WebContainer | null,
    firstRun: boolean = true,
    startListeners: boolean = true
  ) {
    this.container = container;

    this.existContainer = container ? true : false;
    const persistFile = this.buildFileSystemTreeFsDb("root");

    persistFile.then((lastSession) => {
      delete lastSession[".persist"];
      if (this.container) {
        this.container.mount(lastSession, {
          mountPoint: "/",
        });
      }
    });

    if (firstRun) {
      this.firsRun();
    }

    if (startListeners) {
      this.startListeners();
    }
    return this;
  }
  private focus = () => {
    this.persist();
    this.createBackup();
  };
  private blur = () => {
    this.persist();
    this.createBackup();
  };
  private unload = () => {
    this.persist();
    this.createBackup();
  };
  private persistInterval = setInterval(async () => {}, 1000 * 60 * 1);
  private backupInterval = setInterval(async () => {}, 1000 * 60 * 1);

  public startListeners() {
    window.addEventListener("focus", this.focus);
    window.addEventListener("blur", this.blur);
    window.addEventListener("unload", this.unload);

    this.persistInterval = setInterval(async () => {
      await this.persist();
    }, 1000 * 60 * 1);
    this.backupInterval = setInterval(async () => {
      await this.createBackup();
    }, 1000 * 60 * 1);
  }
  public stopListeners() {
    window.removeEventListener("focus", this.focus);
    window.removeEventListener("blur", this.blur);
    window.removeEventListener("unload", this.unload);

    clearInterval(this.persistInterval);
    clearInterval(this.backupInterval);
  }
  private async firsRun() {
    await this.fsDb.createDirectory("root/.persist");
    await this.fsDb.writeFile(
      "root/.persist/lastBackup",
      new Date().toString()
    );
    await this.persist();
  }
  private async createBackup() {
    if (this.container) {
      const lastBackupDate = new Date(
        (await this.fsDb.readFile("root/.persist/lastBackup")) as string
      );
      const nowDate = new Date();

      if (lastBackupDate.getDate() !== nowDate.getDate()) {
        const instance = await this.buildFileSystemTreeFsDb("root");
        delete instance[".persist"];
        await this.fsDb.writeFile(
          "root/.persist/lastBackup",
          new Date().toString()
        );
        await this.fsDb.writeFile("root/.persist/backup.json", instance);
      }
    }
    return;
  }
  private async persist() {
    console.log(this.container);
    if (this.container) {
      // TODO: Convert changes completely from the container to the fsDb while maintaining\n
      //the ability to delete files from the container and see it reflected in the fsDb.
      const instanceContainer = await this.buildFileSystemTreeContainer("/");
      const instanceFsDb = await this.buildFileSystemTreeFsDb("root");
      delete instanceFsDb[".persist"];
      const pathsFsDb = await this.fileSystemTreeToPaths(instanceFsDb);
      const pathsContainer = await this.fileSystemTreeToPaths(
        instanceContainer
      );
      const uniquesFsDb = pathsFsDb.filter(
        (path) => !pathsContainer.includes(path)
      );
      const uniquesContainer = pathsContainer.filter((path) =>
        pathsFsDb.includes(path)
      );
      const uniques = [...uniquesFsDb, ...uniquesContainer];

      await this.saveFileSystemTree(instanceContainer);
      return;
    }
  }

  private async buildFileSystemTreeFsDb(
    dirPath: string
  ): Promise<FileSystemTree> {
    const tree: FileSystemTree = {};
    const entries = await this.fsDb.readDirectory(dirPath);
    for (const entryDirectory of entries.directories) {
      const fullPath = path.join(dirPath, entryDirectory.name);
      tree[entryDirectory.name] = {
        directory: await this.buildFileSystemTreeFsDb(fullPath),
      };
    }

    for (const entryFile of entries.files) {
      const fullPath = path.join(dirPath, entryFile.name);
      tree[entryFile.name] = {
        file: {
          contents: await this.fsDb.readFile(fullPath),
        },
      };
    }

    return tree;
  }
  private async saveFileSystemTree(tree: FileSystemTree) {
    const iterableTree = Object.entries(tree);

    for (const [key, value] of iterableTree) {
      if ("file" in value) {
        await this.fsDb.writeFile(
          path.join("root", key),
          (
            value.file as {
              contents: string | Uint8Array;
            }
          ).contents
        );
      } else if ("directory" in value) {
        await this.fsDb.createDirectory(path.join("root", key));
        await this.saveFileSystemTree(value.directory);
      }
    }
  }
  private async buildFileSystemTreeContainer(
    dirPath: string
  ): Promise<FileSystemTree> {
    const tree: FileSystemTree = {};
    if (this.container) {
      const entries = await this.container.fs.readdir(dirPath);
      for (const entry of entries) {
        const file =
          (await this.safeOperation(
            async () => {
              if (this.container) {
                return this.container.fs.readFile(path.join(dirPath, entry));
              }
              return null;
            },
            `Failed to read file ${path.join(dirPath, entry)}`,
            true
          )) ?? new Uint8Array();
        const directory =
          (await this.safeOperation(
            async () => {
              if (this.container) {
                return this.container.fs.readdir(path.join(dirPath, entry));
              }
              return [];
            },
            `Failed to read directory ${path.join(dirPath, entry)}`,
            true
          )) ?? [];
        const isFile = file.length > 0;
        const isDirectory =
          directory.length > 0 || (directory.length === 0 && !isFile);
        if (isFile) {
          tree[entry] = {
            file: {
              contents: file,
            },
          };
        }
        if (isDirectory) {
          tree[entry] = {
            directory: await this.buildFileSystemTreeContainer(
              path.join(dirPath, entry)
            ),
          };
        }
      }
    }
    return tree;
  }
  private async fileSystemTreeToPaths(
    tree: FileSystemTree,
    basePath: string = ""
  ): Promise<string[]> {
    const paths: string[] = [];
    for (const [key, value] of Object.entries(tree)) {
      const currentPath = path.join(basePath, key);
      if ("file" in value) {
        paths.push(currentPath);
      } else if ("directory" in value) {
        paths.push(
          ...(await this.fileSystemTreeToPaths(value.directory, currentPath))
        );
      }
    }
    return paths;
  }
  private async safeOperation<T>(
    operation: () => Promise<T>,
    errorMsg: string,
    ignoreError: boolean = false
  ) {
    try {
      return await operation();
    } catch (error) {
      if (!ignoreError) console.error(errorMsg, error);
      return null;
    }
  }

  private fixPath(path: string) {
    const pathChunks = path.split("/");
    if (pathChunks[0] === "") pathChunks[0] = "root";
    return pathChunks.join("/") === "/root" ? "root" : pathChunks.join("/");
  }

  public async readFile(
    path: string,
    callback?: (err: Error | null, data: string | null) => void
  ): Promise<string | null> {
    path = this.fixPath(path);
    const result = await this.safeOperation<string>(
      () => this.fsDb.readFile(path),
      `Failed to read file ${path}`
    );
    if (callback) callback(result ? null : new Error("File not found"), result);
    return result;
  }

  public async writeFile(
    path: string,
    data: string,
    callback?: (err: Error | null) => void
  ): Promise<void> {
    path = this.fixPath(path);
    const result = await this.safeOperation(
      () => this.fsDb.writeFile(path, data),
      `Failed to write file ${path}`
    );
    if (callback) callback(result ? null : new Error("Failed to write file"));
    if (result && this.container) await this.container.fs.writeFile(path, data);
  }

  public async mkdir(path: string, callback?: (err: Error | null) => void) {
    path = this.fixPath(path);
    const result = await this.safeOperation(
      () => this.fsDb.createDirectory(path),
      `Failed to create directory ${path}`
    );
    if (callback)
      callback(result ? null : new Error("Failed to create directory"));
    if (result && this.container) await this.container.fs.mkdir(path);
  }

  public async rmdir(path: string, callback?: (err: Error | null) => void) {
    path = this.fixPath(path);
    const result = await this.safeOperation(
      () => this.fsDb.removeDirectory(path),
      `Failed to remove directory ${path}`
    );
    if (callback)
      callback(result ? null : new Error("Failed to remove directory"));
    if (result && this.container) await this.container.fs.rm(path);
  }

  public async readdir(
    path: string,
    callback?: (err: Error | null, files: string[] | null) => void
  ): Promise<string[] | null> {
    path = this.fixPath(path);
    const result = await this.safeOperation(
      () => this.fsDb.readDirectory(path),
      `Failed to read directory ${path}`
    );
    const files = result
      ? [
          ...result.directories.map((d) => d.name),
          ...result.files.map((f) => f.name),
        ]
      : null;
    if (callback)
      callback(files ? null : new Error("Failed to read directory"), files);
    return files;
  }

  public async rename(
    oldPath: string,
    newPath: string,
    callback?: (err: Error | null) => void
  ) {
    oldPath = this.fixPath(oldPath);
    newPath = this.fixPath(newPath);
    const result = await this.safeOperation(
      () => this.fsDb.renameFile(oldPath, newPath),
      `Failed to rename ${oldPath} to ${newPath}`
    );
    if (callback) callback(result ? null : new Error("Failed to rename file"));
    if (result && this.container)
      await this.container.fs.rename(oldPath, newPath);
  }

  public async exists(path: string, callback?: (exists: boolean) => void) {
    path = this.fixPath(path);
    const result = await this.safeOperation(
      () => this.fsDb.exists(path),
      `Failed to check if ${path} exists`
    );
    if (callback) callback(Boolean(result));
    return Boolean(result);
  }
}

export default Fs;
