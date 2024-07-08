FROM node:18-bullseye-slim as base

RUN npm add --global pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=secret,id=npm,target=/root/.npmrc pnpm install --frozen-lockfile

COPY . ./

RUN pnpm run build
ENV NODE_ENV=production

EXPOSE 3000
CMD ["pnpm", "start"]
