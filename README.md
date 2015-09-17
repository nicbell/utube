# utube
Youtube video player class.

## Install:
```bash
$ npm i utube
```

## Usage:
Using data attribute for options.
```html
<div class="player" data-utube-options='{"id": "oBbXxfZYTAA"}'></div>
```
```js
var UTube = require('utube');
var player = new UTube(document.querySelector('.player'));
```
Options as a parameter.
```html
<div class="player"></div>
```
```js
var UTube = require('utube');
var player = new UTube(document.querySelector('.player'), {'id': 'oBbXxfZYTAA'});
```

## Options:
Options are mainly passed directly to the [YouTube API](https://developers.google.com/youtube/player_parameters#Parameters), we have set some defaults but you can override them.

#### id
Type: `String`  
Default: `null`

YouTube video ID.

#### dispatch: 
Type: `Array` of `Number`  
Default: `[25, 50, 75, 100]`

Percentage points at which to dispatch `utube` events. `PLAYING`, `PAUSE` and `ENDED` events are also automatically dispatched.
```js
window.addEventListener('utube', function (e) {
	console.log(e.data);
});
```

#### wmode: 
Type: `String`  
Default: `opaque`

WMode for flash version of the player.

#### autohide:
Type: `Number`  
Default: `1`

See [YouTube API - autohide](https://developers.google.com/youtube/player_parameters#autohide).

#### autoplay:
Type: `Number`  
Default: `1`

See [YouTube API - autoplay](https://developers.google.com/youtube/player_parameters#autoplay).

#### cc_load_policy:
Type: `Number`  
Default: `0`

See [YouTube API - cc_load_policy](https://developers.google.com/youtube/player_parameters#cc_load_policy).

#### color:
Type: `String`  
Default: `white`

See [YouTube API - color](https://developers.google.com/youtube/player_parameters#color).

#### controls:
Type: `Number`  
Default: `1`

See [YouTube API - controls](https://developers.google.com/youtube/player_parameters#controls).

#### disablekb:
Type: `Number`  
Default: `0`

See [YouTube API - disablekb](https://developers.google.com/youtube/player_parameters#Parameters).

#### enablejsapi:
Type: `Number`  
Default: `1`

See [YouTube API - enablejsapi](https://developers.google.com/youtube/player_parameters#enablejsapi).

#### end:
Type: `Number`  
Default: `null`

See [YouTube API - end](https://developers.google.com/youtube/player_parameters#end).

#### fs:
Type: `Number`  
Default: `1`

See [YouTube API - fs](https://developers.google.com/youtube/player_parameters#fs).

#### iv_load_policy:
Type: `Number`  
Default: `3`

See [YouTube API - fs](https://developers.google.com/youtube/player_parameters#iv_load_policy).

#### loop:
Type: `Number`  
Default: `0`

See [YouTube API - fs](https://developers.google.com/youtube/player_parameters#loop).

#### modestbranding:
Type: `Number`  
Default: `1`

See [YouTube API - modestbranding](https://developers.google.com/youtube/player_parameters#modestbranding).

#### origin:
Type: `String`  
Default: `document.domain`

See [YouTube API - origin](https://developers.google.com/youtube/player_parameters#origin).

#### playsinline:
Type: `Number`  
Default: `0`

See [YouTube API - playsinline](https://developers.google.com/youtube/player_parameters#playsinline).

#### rel:
Type: `Number`  
Default: `0`

See [YouTube API - rel](https://developers.google.com/youtube/player_parameters#rel).

#### showinfo:
Type: `Number`  
Default: `0`

See [YouTube API - showinfo](https://developers.google.com/youtube/player_parameters#showinfo).

#### start:
Type: `Number`  
Default: `null`

See [YouTube API - start](https://developers.google.com/youtube/player_parameters#start).

#### theme:
Type: `String`  
Default: `dark`

See [YouTube API - theme](https://developers.google.com/youtube/player_parameters#theme).
