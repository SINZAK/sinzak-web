FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
COPY ./.yarn .
RUN yarn install
RUN yarn build

FROM node:18-alpine

RUN apk --no-cache add curl

WORKDIR /app
ENV NODE_ENV production
EXPOSE 3000
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
CMD [ "node", "server.js" ]