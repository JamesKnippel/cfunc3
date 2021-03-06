# cfunc3

The purpose of this repo is to compare various cloud functions and their uses outside of AngularFire.

# Noted Problems

1. JSON file imports using Typescript format of "Import * as something from something.json" 
    However, using TS 3.2 through Firebase Init and importing of service account leads to inexplicable compile errors on Windows machines. 

    Previously, the fix was adding to your typings.d.ts file with:

``` declare module "*.json" {
        const value: any;
        export default value;
} ```
Recently, TS 2.9 included the following options to Json compile:

``` "compilerOptions": {
    "resolveJsonModule": true, // should be all you need
    "esmoduleInterop": true // avoid
}```

If encountered:
1. Restart VScode
2. Restart Machine
3. Check if you ran Firebase init too many times (tsconfig build file can switch from index.js to src/index.js or src depending on your firebase-tools)
3a. Revert to previous working commit prior to firebase init, and re-init making sure not to select options already included in your project