# Updating

After you clone Homestack, make sure you are in the correct branch in order to not pull breaking changes. 
Homestack uses versioning looks like `<major>.<minor>`. Any minor change should not break you.

## Check the branch

Make sure you aren't following the `master` branch in order not to fetch the breaking changes.

```sh
> git branch

master
* 1.x
```

## Update

First run `git status` to make sure that you haven't changed any Homestack default file or folder. Homestack has been designed 
that you don't need to change any of the default file.

When you see

```sh
> git status

....
nothing to commit, working tree clean
```

You can update using

```sh
git pull
```

That's it!