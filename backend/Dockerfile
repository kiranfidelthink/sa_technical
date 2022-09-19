FROM node:16-alpine As development
# App directory
WORKDIR /app

# App dependencies
COPY package*.json ./

# Here Prisma folder to the container
COPY prisma ./prisma/

# Copy app source code
COPY . .

# Env setup
COPY .env.example .env

# Install dependencies
RUN npm i

# Generate prisma
RUN npx prisma generate

#Expose port and begin application
EXPOSE 3000

# Start the app
CMD [ "npm", "run", "start:dev"]