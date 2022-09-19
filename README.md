# sa_technical

Node Version >=16
## Backend


Steps to run backend:

- Make sure you have docker install locally

Steps:

> npm install  
> docker-compose up  
> Open new terminal(don’t close previous)  
> Run command `docker ps`  
> Copy **CONTAINER ID** of `backend_nest`.  
> Run command `docker exec -it <container_id> sh`   
> `npx prisma migrate dev --name "init`  
> `npx prisma db seed`

Now, setup is completed(docker db connected successfully).

#

## Frontend

> Npm install   
> Create .env simillar to .env.example  
> npm start  
  
#
```API Collection``` : https://red-astronaut-681189.postman.co/workspace/My-Workspace~d4613910-69b9-4e59-8a55-9bf90363de32/collection/17072801-a86d1790-6bc0-48b5-b331-e6773e8ccefc

#