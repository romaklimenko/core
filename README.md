# ⚛ May the Core be with you

[![Build Status](https://travis-ci.org/romaklimenko/core.svg?branch=master)](https://travis-ci.org/romaklimenko/core)

<img src="https://raw.githubusercontent.com/romaklimenko/core/master/img/core.png" height="128" width="128" />

Core is a Sitecore cross platform desktop application. It runs on Mac, Windows and Linux. https://vimeo.com/152064489

Mac OS X:

<img src="https://raw.githubusercontent.com/romaklimenko/core/master/img/screenshot-mac.png" height="600" />

Windows:

<img src="https://raw.githubusercontent.com/romaklimenko/core/master/img/screenshot-win.png" height="500" style="margin-left:500px;" />

## Under the hood

Here are main technologies on which Core is based on:
 * [Electron](http://electron.atom.io/)
 * [React](https://facebook.github.io/react/)
 * [Redux](http://redux.js.org/)
 
But I didn't intend to use as many buzzwords as possible. I take simplicity, ease of adding new features and supportability at the first place. This is why there is no TypeScript, JSX and Babel traspillers at the current stage of the project.
 

## Setting up Sitecore

Connection and configuration management is not implemented yet. It is expected that Sitecore instance is available at http://sitecore.api/ and Sitecore Item Web API has setup like this:

In Sitecore.ItemWebApi.config, enable Sitecore Item Web API and allow anonymous access:
```xml
<site name="website">
  <patch:attribute name="itemwebapi.mode">StandardSecurity</patch:attribute>
  <patch:attribute name="itemwebapi.access">ReadOnly</patch:attribute>
  <patch:attribute name="itemwebapi.allowanonymousaccess">true</patch:attribute>
</site>
```

In Web.config, enable CORS:
```xml
<system.webServer>
  <httpProtocol>
    <customHeaders>
      <add name="Access-Control-Allow-Origin" value="*" />
      <add name="Access-Control-Allow-Headers" value="Content-Type" />
      <add name="Access-Control-Allow-Methods" value="GET, POST, PUT, DELETE, OPTIONS" />
    </customHeaders>
  </httpProtocol>
```


## Build, test and run

There are only two global npm dependencies (and I aspire to remove global dependencies at all #23):
```
> npm install -g gulp
> npm install -g browserify
```

When you have gulp and browserify installed globally, install all the development dependencies:
```
> npm install
```

Build:
``` 
> gulp
```

Install production dependencies (there is only one and I am going to remove it #24):
```
> cd dist
> npm install --production
> cd ..
```

Run tests:
```
> npm test
```

Run application:
```
> npm run
```

## Help wanted

I will appreciate any feedback about:
* Current application architecture
* New features
* Bugs
