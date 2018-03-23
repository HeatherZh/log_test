FROM node:8.6.0-alpine

# Set a working directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install Node.js dependencies, including dev-dependencies so it can run build
RUN yarn install

# create build
RUN yarn run build-release

# remove node_modules and other unnecesary files
RUN rm -rf node_modules public src test tools package.json yarn.lock

# Copy application files
RUN cp -r ./build/* .

# In build dir, package.json and yarn.lock does not include dev-dependencies
# Install Node.js dependencies, only production dependencies
RUN yarn install --production --no-progress

# Run the container under "node" user by default
USER node

EXPOSE 3000

CMD [ "node", "server.js" ]
