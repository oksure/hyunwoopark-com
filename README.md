# [Academic Homepage for Hyunwoo Park](https://hyunwoopark.com)

## Roadmap

1. Revise the README file to ensure others can easily understand and reuse it.
2. Implement a publication filter by year to better organize and display research outputs.
3. Implement a publication filter by category to help users find specific types of publications.
4. Update the service items to display shorter items on a single line.
5. Clean up the ad-hoc reviewer section so that long journal names can be shown in full only as requested.
6. Investigate and resolve why the external link icon is rendered differently in the footer.
7. Implement dedicated pages for "bio", "photos", "places", "personal", "contacts", and "maps".
8. Catch up on PDF generation process.
9. Shut down the old server.
10. Shut down the old object storage.
11. Add animation.

## TypeScript Next.js Chakra example (This is the source that I started from)

This is a really simple project that shows the usage of Next.js with TypeScript.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/next.js/tree/canary/examples/with-typescript)

## How to use it?

### Using `create-next-app`

Execute
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
with [npm](https://docs.npmjs.com/cli/init) or
[Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-typescript with-typescript-app
# or
yarn create next-app --example with-typescript with-typescript-app
```

### Download manually

Download the example:

```bash
curl https://codeload.github.com/vercel/next.js/tar.gz/canary | tar -xz --strip=2 next.js-canary/examples/with-typescript
cd with-typescript
```

Install it and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Deploy it to the cloud with
[Vercel](https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example)
([Documentation](https://nextjs.org/docs/deployment)).

## Notes

This example shows how to integrate the TypeScript type system into Next.js.
Since TypeScript is supported out of the box with Next.js, all we have to do is
to install TypeScript.

```bash
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and
Node.

```bash
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts`
or `.tsx` files in our project and builds it. It even automatically creates a
`tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for
Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's
`tsc` CLI in `noEmit` mode to run type-checking separately. You can then include
this, for example, in your `test` scripts.
