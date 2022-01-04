# Easer.js
javascript tween engine including async flow controller


## Tween

### ✨ Basic usage

#### Animate variable
```
x = 0;
easer.tween(1000, easer.easing.easeOutQuad).number(x, 100).run();
```

#### Animate CSS directly
```
target = document.getElementById('target');
easer.tween(1000, easer.easing.easeOutQuad).css(target.style, 'left', 'px', 100).run();
```

### 🚀 Advanced usage

#### Multiple variable
```
x = 0;
y = 50;
a = document.getElementById('a');
b = document.getElementById('b');

easer.tween(1000, easer.easing.easeOutQuad)
  .number(x, 100)
  .number(y, -50)
  .css(a.style, 'left', 'px', 100)
  .css(b.style, 'width', '%', 30)
  .run();
```

#### from to
```
x = 0;

// from 50 to 100
easer.tween(1000, easer.easing.easeOutQuad)
  .number(x, 100, 50)
  .run();
```

```
target = document.getElementById('target');

// from 50px to 100px
easer.tween(1000, easer.easing.easeOutQuad)
  .css(target.style, 'left', 'px', 100, 50)
  .run();
```

### Methods
```
```

#### play
```
```

#### stop
```
```

#### togglePlaying
```
```

#### reset
```
```

#### jump

---
### Properties

#### getIsPlaying
```
```

#### getElapsedTime
```
```

#### getDuration
```
```

#### getEasing
```
```

---
### Events

#### method chain style
```
```

#### event lister style
```
```

---
## Timeline
intuitive assembly of complex serial / parallel processing

```
```
