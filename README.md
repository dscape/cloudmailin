# cloudmailin

simple service to test the [cloudmailin] service for development. will intercept emails and return them to you so you can `curl` them locally to your app while developing.

# installation

1. install [node.js]
2. install [npm]

```sh
  git clone git://github.com/dscape/cloudmailin.git
  cd cloudmailin
  npm install
  node server.js
```

if you like you can use a service like [nodejitsu] or [no.de] to host your service.

# usage

just point your `cloudmailin` account to `http://cloudmailin.no.de`. now visit `http://cloudmailin.no.de` and follow the instructions.

after subscribing send an email to your cloudmailin email address and see the curl appear.

# roadmap, bugs

check [issue]

# contribute

everyone is welcome to contribute. patches, bugfixes, new features

1. create an [issue] on github so the community can comment on your idea
2. fork `nano` in github
3. create a new branch `git checkout -b my_branch`
4. create tests for the changes you made
5. make sure you pass both existing and newly inserted tests
6. commit your changes
7. push to your branch `git push origin my_branch`
8. create an pull request

# meta

* code: `git clone git://github.com/cloudmailin/nano.git`
* home: <http://github.com/dscape/cloudmailin>
* bugs: <http://github.com/dscape/cloudmailin/issues>

`(oO)--',-` in [caos]

[cloudmailin]: https://cloudmailin.com
[issue]: http://github.com/dscape/cloudmailin/issues
[caos]: http://caos.di.uminho.pt/
[nodejitsu]: http://nodejitsu.com
[no.de]: http://no.de
[npm]: http://npmjs.org
[node.js]: http://nodejs.org/