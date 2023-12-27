FROM node:18.16-alpine as builder

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=16384"
COPY . .

RUN yarn && export VITE_BACKEND_API=http://localhost && yarn build

FROM node:18.16-alpine

ENV APP_ROOT=/data/code
ENV TIME_ZONE=Asia/Shanghai

RUN echo "${TIME_ZONE}" > /etc/timezone \
  && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime \
  && mkdir -p ${APP_ROOT}/.output

COPY --from=builder /app/.output ${APP_ROOT}/.output

WORKDIR ${APP_ROOT}

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "node .output/server/index.mjs"]
