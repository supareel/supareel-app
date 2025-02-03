# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```


### Install Dependencies
`pnpm install --filter my-new-app`

### Create a new APPs
`pnpm create next-app apps/app-name` 

### Install local shared package in apps
`pnpm add @workspace/ory --filter=auth --workspace`