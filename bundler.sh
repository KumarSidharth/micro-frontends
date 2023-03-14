rm -r dist
mkdir dist
mkdir dist/react-typescript
mkdir dist/vue2-grand-child
cp -r angular-parent/dist/angular-parent/* dist/
cp -r react-typescript/build/* dist/react-typescript
cp -r vue2-grand-child/dist/* dist/vue2-grand-child
