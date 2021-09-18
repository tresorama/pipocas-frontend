# In developoment

## 1 \_ Serving Static Assets

In `product-list` page, the html contains only one instance of `.product-grid\__item` .
This element is duplicated in js, under file "js/devTimeSaver.js" using duplicateElement().
During duplication, images src attribute is changed in order to replicate a real life feeling while wacthing at the page.
In order to do so, i've installed "parcel-plugin-static-files-copy".
This plugin can copy all files from a folder into the boundled and served app.
Doing this path like `<img src="/assets/images/products/2/1.jpg">` works.

The complete configuration is:

```bash
npm install -D parcel-plugin-static-files-copy
```

then insert in package.json

```json
{
  ...
  ...
  "staticFiles": {
    "staticPath": [
      {
        "staticPath": "tiles", -- copy all files from this directory at the root from your project...
        "staticOutDir": "tiles/" -- ... to this directory in dist/, so it becomes dist/tiles/<files>
      }
    ]
  }
  ...
  ...
}
```

In this case :

```json
{
  ...
  ...
  "staticFiles": {
    "staticPath": [
      {
        "staticPath": "assets",
        "staticOutDir": "assets/"
      }
    ]
  }
  ...
  ...
}
```
