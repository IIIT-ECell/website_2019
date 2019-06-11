# Working repository for the new E-Cell website

Built with Bootstrap 4

## Testing locally

_Note: we used github pages during site construction, that is being discontinued henceforth (since deployment to permanent server) due to issues with baseurl and \_config.yml_

1. [Install jekyll](https://jekyllrb.com/docs/installation/) and associated dependencies, like bundler, Ruby, etc.
2. Fork and clone the repository. For solely local testing, just cloning will do.
3. cd into the repo folder and run `bundle exec jekyll serve`. See [jekyll docs](https://jekyllrb.com/docs/usage/) for more details.
4. Navigate to `localhost:4000/` (by default)

## Deployment Method (only for admins)

As of now, we're employing a very rudimentary deployment system, essentially scp-ing the built site into the server.

The basic steps are highlighted hence:

1. Build the site
2. scp all contents of \_site/ into the site/ directory of the server home

Suggestions welcome

## Contribution guideline

### Git Workflow

#### Summary

0.  Create an account on GitHub if you don't already have one.
1.  Fork this repo on GitHub (click Fork button) (if you don't have master access)
1.  Clone to computer (`git clone git://github.com/<your_username>/website_2019.git` for forks. If you have master access, use `git clone git://github.com/IIIT-ECell/website_2019.git`)
1.  Don't forget to cd into your repo: (`cd website_2019/`)
1.  Set up remote upstream (`git remote add upstream git://github.com/IIIT-ECell/website_2019.git`) (for forks).
1.  Create a branch for new issue. Branches with meaningful names are appreciated. (`git checkout -b 404-new-feature`)
1.  Develop on issue branch. (Time passes, the main repository accumulates new commits)
1.  Commit changes to your local issue branch. Meaningful commit messages are appreciated. Don't commit all your work at once and don't spam the commit history with 1000s of commits (`git add <file(s)>; git commit -m 'a nice commit message'`)
1.  Fetch upstream (`git fetch upstream`) (for those with master access, fetch origin)
1.  Update local master (`git checkout master; git merge upstream/master`)
1.  Rebase issue branch (`git checkout 404-new-feature; git rebase master`)
1.  Repeat steps 6-11 until the work is finished.
1.  Push branch to GitHub (`git push origin 404-new-feature`)
1.  Start your browser, go to your GitHub repo, switch to "404-new-feature" branch and press the [Pull Request] button
1.  After making a pull request, it is not recommended to pull/merge anymore. If you absolutely have to make any changes to the code (a rebase for example), use `git push <remote> <branch> --force` to send the new commits to your branch, which also updates your pull request on GitHub.
1.  After the pull request has been merged, delete this branch locally and on remote. However, if you plan on doing similar work, you may keep it.
1.  Update your local master branch with the code that got merged (`git checkout master; git pull upstream master`)

_NOTE: if git:// doesn't work for you, try using https://_

### Automation

After you set up the repo locally, run `npm install`.

Features:

1.  This sets up a git hook which runs whenever you stage files. It automatically prettifies your files [js, css for now].
2.  Run `npm run dist` to build the site. It also

-   minifies js files
-   adds browser prefixes to css files and minifies them
-   minifies html files

3.  Run `npm run deploy` to build the site and deploy it to ecell server [you must have your ssh keys on the server for this]

### Keeping gh-pages up to date with master

[This should work](https://gist.github.com/mandiwise/44d1edce18f2ffb14f63)

```
// Reference: http://lea.verou.me/2011/10/easily-keep-gh-pages-in-sync-with-master/

$ git add .
$ git status // to see what changes are going to be commited
$ git commit -m 'Some descriptive commit message'
$ git push origin master

$ git checkout gh-pages // go to the gh-pages branch
$ git rebase master // bring gh-pages up to date with master
$ git push origin gh-pages // commit the changes
$ git checkout master // return to the master branch
```

Main changes are incorporated from branches into master, then into gh-pages. Ideally.
