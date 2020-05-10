FROM node:14.1-alpine

COPY dist dist
COPY node_modules node_modules
COPY public public
COPY views views

ENTRYPOINT ["node", "dist/main.js"]
