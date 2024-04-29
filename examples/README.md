Unless you have access to a RAW SBG course in canvas use the example HTMLs.  

add https://lnc-juice.github.io/example/cansbg/ to your manifest.

```json
{
  "manifest_version": 3,
  "name": "CanSBG",
  "description": "Canvas view all grades for SBG",
  "version": "0.0.1",

  "content_scripts": [
    {
      "matches": [
        "https://stem.instructure.com/grades",
        "https://lnc-juice.github.io/example/cansbg/"
      ],
      "js": ["cansbg-grades.js"]
    }
  ]
}
```

And open the [site](https://lnc-juice.github.io/example/cansbg/) to test.